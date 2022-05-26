<?php

namespace App\GraphQL;

use App\Entity\Person\Person;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The root of all mutation operations.")
 */
class Mutation
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->validator = $validator;
    }

    /**
     * @GQL\Field(type="Boolean!")
     * @GQL\Description("Create person.")
     * @GQL\Access("isAuthenticated()")
     */
    public function createPerson(Person $person): string
    {
        $dbperson = new Person();
        $dbperson->cloneFrom($person);

        // Check validation errors.
        $msg = $this->validate($dbperson);
        if (null !== $msg) {
            return $msg;
        }

        $this->em->persist($dbperson);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="Boolean!")
     * @GQL\Description("Update person.")
     * @GQL\Access("isAuthenticated()")
     */
    public function updatePerson(string $id, Person $person): string
    {
        $dbperson = $this->em->getRepository(Person::class)->findOneBy(['id' => $id]);
        if (null !== $dbperson) {
            $dbperson->cloneFrom($person);

            // Check validation errors.
            $msg = $this->validate($dbperson);
            if (null !== $msg) {
                return $msg;
            }

            $this->em->persist($dbperson);
            $this->em->flush();

            return 'success';
        }

        return "failure: person with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="Boolean!")
     * @GQL\Description("Delete person.")
     * @GQL\Access("isAuthenticated()")
     */
    public function deletePerson(string $id): string
    {
        $dbperson = $this->em->getRepository(Person::class)->findOneBy(['id' => $id]);
        if (null !== $dbperson) {
            $this->em->remove($dbperson);
            $this->em->flush();

            return 'success';
        }

        return "failure: person with id {$id} was not found";
    }

    /**
     * @return string|null
     */
    private function validate(object $object)
    {
        $errors = $this->validator->validate($object);

        if (count($errors) > 0) {
            $msg = 'failure: on validation.';
            foreach ($errors as $err) {
                $msg = $msg."\n error: {$err->getMessage()}";
            }

            return $msg;
        }

        return null;
    }
}
