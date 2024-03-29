<?php

namespace App\Security;

use App\Entity\Person\Person;
use App\Repository\PersonRepository;
use Jumbojett\OpenIDConnectClient;
use Jumbojett\OpenIDConnectClientException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProvider implements UserProviderInterface
{
    /** @var OpenIDConnectClient */
    private $client;

    /** @var PersonRepository */
    private $personRepository;

    public function __construct(OpenIDConnectClient $client, PersonRepository $personRepository)
    {
        $this->client = $client;
        $this->personRepository = $personRepository;
    }

    /**
     * Symfony calls this method if you use features like switch_user
     * or remember_me.
     *
     * If you're not using these features, you do not need to implement
     * this method.
     *
     * @throws UserNotFoundException if the user is not found
     */
    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        // test whether provided access token (as $identifier) is validT
        // var_dump($identifier);
        $this->client->setAccessToken($identifier);
        try {
            $info = $this->client->requestUserInfo();
        } catch (OpenIDConnectClientException $e) {
            throw new UserNotFoundException('Invalid API token', 0, $e);
        }

        // build user from userinfo data
        $user = new TokenUser();
        $user->setToken($identifier);

        if (!is_object($info)) {
            var_dump($info);
            throw new \Exception('InfoError');
        }

        if (property_exists($info, 'sub')) {
            $user->setSub($info->sub);
            $person = $this->personRepository->findOneBy(['sub' => $info->sub]);

            if (null != $person) {
                if (null != $person->getName()) {
                    $user->setName($person->getName());
                }
                if (null != $person->getEmail()) {
                    $user->setName($person->getEmail());
                }
            }

            if (null != $person && Person::ADMIN_ROLE == $person->getRole()) {
                $user->setRoles(['ROLE_ADMIN']);
            }
        }

        if (property_exists($info, 'name')) {
            $user->setName($info->name);
        }
        if (property_exists($info, 'email')) {
            $user->setEmail($info->email);
        }

        return $user;
    }

    /**
     * @deprecated since Symfony 5.3, loadUserByIdentifier() is used instead
     */
    public function loadUserByUsername(string $username): UserInterface
    {
        return $this->loadUserByIdentifier($username);
    }

    /**
     * Refreshes the user after being reloaded from the session.
     *
     * When a user is logged in, at the beginning of each request, the
     * User object is loaded from the session and then this method is
     * called. Your job is to make sure the user's data is still fresh by,
     * for example, re-querying for fresh User data.
     *
     * If your firewall is "stateless: true" (for a pure API), this
     * method is not called.
     */
    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof TokenUser) {
            throw new UnsupportedUserException(sprintf('Invalid user class "%s".', get_class($user)));
        }

        if (null != $user->getToken()) {
            return $this->loadUserByIdentifier($user->getToken());
        }

        return $user;
    }

    /**
     * Tells Symfony to use this provider for this User class.
     */
    public function supportsClass(string $class): bool
    {
        return TokenUser::class === $class || is_subclass_of($class, TokenUser::class);
    }
}
