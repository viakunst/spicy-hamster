<?php

namespace App\Service;

use App\Entity\Person\Person;
use App\Repository\PersonRepository;
use Aws\CognitoIdentity\CognitoIdentityClient;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;

class CognitoService
{
    /** @var CognitoIdentityClient */
    private $cognitoIdentityClient;

    /** @var LoggerInterface */
    private $logger;

    /** @var PersonRepository */
    private $pr;

    private EntityManagerInterface $em;

    public function __construct(LoggerInterface $logger, EntityManagerInterface $em, PersonRepository $personRepository)
    {
        $this->pr = $personRepository;
        $this->em = $em;

        $this->cognitoIdentityClient = new CognitoIdentityClient([
            'region' => $_ENV['REGION'],
            'version' => 'latest',
            'credentials' => false,
        ]);

        $this->logger = $logger;
    }

    public function importAllPersons(string $token): string
    {
        $this->logger->info('importing Users');
        $cognitoClient = $this->getCognitoClient($token);

        // First request.
        $usersResult = $cognitoClient->listUsers([
            'AttributesToGet' => ['email', 'given_name', 'family_name', 'sub', 'address'],
            'UserPoolId' => $_ENV['USER_POOL_ID'],
        ]);
        $users = $usersResult->get('Users');
        $token = $usersResult->get('PaginationToken');

        while (null !== $token) {
            if (!is_string($token)) {
                throw new \Exception();
            }
            $this->logger->info($token);

            if (!is_array($users)) {
                throw new \Exception();
            }
            $this->handleUsers($users);

            $usersResult = $cognitoClient->listUsers([
                'PaginationToken' => $token,
                'AttributesToGet' => ['email', 'given_name', 'family_name', 'sub', 'address'],
                'UserPoolId' => $_ENV['USER_POOL_ID'],
            ]);
            $users = $usersResult->get('Users');
            $token = $usersResult->get('PaginationToken');
        }

        if (!is_array($users)) {
            throw new \Exception();
        }
        $this->handleUsers($users);

        return 'succes';
    }

    /**
     * @return CognitoIdentityProviderClient
     */
    private function getCognitoClient(string $token)
    {
        $region = $_ENV['REGION'];
        $userpool = $_ENV['USER_POOL_ID'];

        // Get identity
        $getIdResult = $this->cognitoIdentityClient->getId([
            'IdentityPoolId' => $_ENV['IDENTITY_POOL_ID'],
            'Logins' => [
                "cognito-idp.$region.amazonaws.com/$userpool" => $token,
            ],
        ]);

        $identity = $getIdResult->get('IdentityId');

        $getCredentialsResult = $this->cognitoIdentityClient->getCredentialsForIdentity([
            'RoleArn' => $_ENV['ROLE_ARN'],
            'IdentityId' => $identity,
            'Logins' => [
                "cognito-idp.$region.amazonaws.com/$userpool" => $token,
            ],
        ]);

        $rawCredentials = $getCredentialsResult->get('Credentials');

        if (!is_array($rawCredentials)) {
            var_dump($rawCredentials);
            throw new \Exception('credential error');
        }

        $credentials = [
            'key' => $rawCredentials['AccessKeyId'],
            'secret' => $rawCredentials['SecretKey'],
            'token' => $rawCredentials['SessionToken'],
        ];

        return new CognitoIdentityProviderClient([
            'credentials' => $credentials,
            'region' => $_ENV['REGION'],
            'version' => 'latest',
        ]);
    }

    /**
     * @param array<mixed> $users
     */
    private function handleUsers($users): void
    {
        $this->logger->info('Handling Users');
        foreach ($users as $user) {
            if (!is_array($user)) {
                throw new \Exception();
            }

            $attributes = $user['Attributes'];
            if (!is_array($attributes)) {
                throw new \Exception();
            }

            $givenName = $this->getAttribute('given_name', $attributes);
            $familyName = $this->getAttribute('family_name', $attributes);
            $address = $this->getAttribute('address', $attributes);
            $email = $this->getAttribute('email', $attributes);
            $sub = $this->getAttribute('sub', $attributes);

            $found = $this->pr->findOneBy(['sub' => $sub]);

            if (null === $found) {
                $this->logger->info("Importing new peron with name: {$givenName} {$familyName}");
                $person = new Person();
                $person->setSub($sub);
                $person->setEmail($email);
                $person->setGivenName($givenName);
                $person->setFamilyName($familyName);
                $person->setAddress($address);
                $person->setRole(Person::USER_ROLE);
                $this->em->persist($person);
                $this->em->flush();
            }
        }
    }

    /**
     * @param array<mixed> $array
     */
    private function getAttribute(string $key, $array): string
    {
        foreach ($array as $entry) {
            if (!is_array($entry)) {
                throw new \Exception();
            }
            if ($entry['Name'] == $key) {
                return $entry['Value'];
            }
        }

        return 'not found';
    }
}
