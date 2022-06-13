<?php

namespace App\GraphQL\Mutation;

use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use App\GraphQL\Mutation;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The person mutation operations.")
 */
class PersonMutation extends AbstractMutation
{
    /**
     * @GQL\Field(type="String!")
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
     * @GQL\Field(type="String!")
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
     * @GQL\Field(type="String!")
     * @GQL\Description("Send transaction reminder.")
     * @GQL\Access("isAuthenticated()")
     */
    public function sendAllRemindersByPerson(string $id): string
    {
        $dbperson = $this->em->getRepository(Person::class)->findOneBy(['id' => $id]);
        if (null !== $dbperson) {
            $transaction = $this->em->getRepository(Transaction::class)->findBy(['person' => $dbperson]);

            // Email stuff.

            return 'success';
        }

        return "failure: person with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
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
}
