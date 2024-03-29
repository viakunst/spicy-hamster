<?php

namespace App\GraphQL\Mutation;

use App\Entity\Mail\Mail;
use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The person mutation operations.")
 */
class EmailMutation extends AbstractMutation
{
    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Send transaction reminder.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function sendAllReminders(): string
    {
        $persons = $this->em->getRepository(Person::class)->findAll();
        $this->logger->debug('Sending emails.');

        foreach ($persons as $person) {
            $transactions = $this->em->getRepository(Transaction::class)->findBy([
                'person' => $person,
                'status' => Transaction::OUTSTANDING,
            ]);

            // Only send if open transactions.
            if (0 == count($transactions)) {
                continue;
            }

            $count = count($transactions);
            $name = $person->getName();
            $this->logger->debug("Sending email to $name for $count transactions.");

            $hmtl = $this->mailGenerator->generateBaseEmail($person, $transactions);
            $this->mailer->message([$person], 'Viakunst Betaalherrinnering', $hmtl);
        }

        return 'success';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Arg(name="ids", type="[String]")
     * @GQL\Description("Send transaction reminder.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @param array<string> $ids
     */
    public function sendAllRemindersByPerson($ids): string
    {
        $persons = $this->em->getRepository(Person::class)->findBy(['id' => $ids]);

        if (0 !== count($persons)) {
            foreach ($persons as $person) {
                $transactions = $this->em->getRepository(Transaction::class)->findBy([
                    'person' => $person,
                    'status' => Transaction::OUTSTANDING,
                ]);
                $hmtl = $this->mailGenerator->generateBaseEmail($person, $transactions);
                $this->mailer->message([$person], 'Viakunst Betaalherrinnering', $hmtl);
            }

            return 'success';
        }

        return 'failure: no persons found.';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Send transaction reminder.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function getReminderExampleByPerson(string $id): string
    {
        $person = $this->em->getRepository(Person::class)->findOneBy(['id' => $id]);

        if (null !== $person) {
            $transactions = $this->em->getRepository(Transaction::class)->findBy([
                'person' => $person,
                'status' => Transaction::OUTSTANDING,
            ]);
            $hmtl = $this->mailGenerator->generateBaseEmail($person, $transactions);

            return $hmtl;
        }

        return 'failure: no person found.';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Send transaction reminder.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function sendTransactionReminder(string $id): string
    {
        $dbtransaction = $this->em->getRepository(Transaction::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransaction) {
            // Implement?
            return 'success';
        }

        return "failure: transaction with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete mail.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function deleteMail(string $id): string
    {
        $dbmail = $this->em->getRepository(Mail::class)->findOneBy(['id' => $id]);
        if (null !== $dbmail) {
            $this->em->remove($dbmail);
            $this->em->flush();

            return 'success';
        }

        return "failure: mail with id {$id} was not found";
    }
}
