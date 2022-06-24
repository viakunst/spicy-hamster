<?php

namespace App\GraphQL\Mutation;

use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use App\Entity\Transaction\TransactionGroup;
use App\GraphQL\Input\TransactionType;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The person mutation operations.")
 */
class TransactionMutation extends AbstractMutation
{
    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Create transactionGroup.")
     * @GQL\Access("isAuthenticated()")
     * @GQL\Arg(name="transactionTypeInputs", type="[TransactionTypeInput]")
     * @GQL\Arg(name="transactionGroupId", type="String!")
     *
     * @param TransactionType[] $transactionTypeInputs
     */
    public function createTransaction($transactionTypeInputs, string $transactionGroupId): string
    {
        $transactionGroup = $this->em->getRepository(TransactionGroup::class)->findOneBy(['id' => $transactionGroupId]);
        if (null === $transactionGroup) {
            return 'failure';
        }

        foreach ($transactionTypeInputs as $inputType) {
            $dbPerson = $this->em->getRepository(Person::class)->findOneBy(['id' => $inputType->personId]);
            if (null === $dbPerson) {
                continue;
            }

            $dbTransaction = new Transaction();
            $dbTransaction->setAmount($inputType->amount);
            $dbTransaction->setTimesReminded($inputType->timesReminded);
            $dbTransaction->setStatus($inputType->status);
            $dbTransaction->setPerson($dbPerson);
            $transactionGroup->addTransaction($dbTransaction);

            $this->em->persist($dbTransaction);
        }

        $this->em->persist($transactionGroup);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Create transaction.")
     * @GQL\Access("isAuthenticated()")
     */
    public function createTransactionWithPerson(Transaction $transaction, string $personId): string
    {
        $dbtransaction = new Transaction();
        $dbtransaction->cloneFrom($transaction);

        // Check validation errors.
        $msg = $this->validate($dbtransaction);
        if (null !== $msg) {
            return $msg;
        }

        $dbperson = $this->em->getRepository(Person::class)->findOneBy(['id' => $personId]);
        if (null === $dbperson) {
            return "failure: person with id {$personId} was not found";
        }

        $dbtransaction->setPerson($dbperson);
        $this->em->persist($dbtransaction);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Update transaction.")
     * @GQL\Access("isAuthenticated()")
     */
    public function updateTransaction(string $id, Transaction $transaction): string
    {
        $dbtransaction = $this->em->getRepository(Transaction::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransaction) {
            $dbtransaction->cloneFrom($transaction);

            // Check validation errors.
            $msg = $this->validate($dbtransaction);
            if (null !== $msg) {
                return $msg;
            }

            $this->em->persist($dbtransaction);
            $this->em->flush();

            return 'success';
        }

        return "failure: transaction with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Switch transaction status.")
     * @GQL\Access("isAuthenticated()")
     */
    public function switchTransactionStatus(string $id): string
    {
        $dbtransaction = $this->em->getRepository(Transaction::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransaction) {
            $currentStatus = $dbtransaction->getStatus();
            $new_status = null;

            if (null === $currentStatus) {
                $new_status = Transaction::OUTSTANDING;
                $dbtransaction->setStatus($new_status);
            }
            if (Transaction::OUTSTANDING === $currentStatus) {
                $new_status = Transaction::PAID;
                $dbtransaction->setStatus($new_status);
            }
            if (Transaction::PAID === $currentStatus) {
                $new_status = Transaction::OUTSTANDING;
                $dbtransaction->setStatus($new_status);
            }

            $this->em->persist($dbtransaction);
            $this->em->flush();

            return 'success';
        }

        return "failure: transaction with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete transaction.")
     * @GQL\Access("isAuthenticated()")
     */
    public function deleteTransaction(string $id): string
    {
        $dbtransaction = $this->em->getRepository(Transaction::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransaction) {
            $this->em->remove($dbtransaction);
            $this->em->flush();

            return 'success';
        }

        return "failure: transaction with id {$id} was not found";
    }
}
