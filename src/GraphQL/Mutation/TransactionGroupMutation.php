<?php

namespace App\GraphQL\Mutation;

use App\Entity\BankAccount\BankAccount;
use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use App\Entity\Transaction\TransactionGroup;
use App\GraphQL\Input\TransactionGroupType;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The person mutation operations.")
 */
class TransactionGroupMutation extends AbstractMutation
{
    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Create transactionGroup.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function createTransactionGroup(TransactionGroupType $transactionGroupTypeInput): string
    {
        $dbBankAccount = $this->em->getRepository(BankAccount::class)->findOneBy(['id' => $transactionGroupTypeInput->bankAccountId]);
        if (null === $dbBankAccount) {
            return 'failure';
        }

        $dbTransactionGroup = new TransactionGroup();
        $dbTransactionGroup->setTitle($transactionGroupTypeInput->title);
        $dbTransactionGroup->setDescription($transactionGroupTypeInput->description);
        $dbTransactionGroup->setDate($transactionGroupTypeInput->date);
        $dbTransactionGroup->setBankAccount($dbBankAccount);

        // Check validation errors. and flush transaction group.
        $msg = $this->validate($dbTransactionGroup);
        if (null !== $msg) {
            return $msg;
        }

        $transactionTypeInputs = $transactionGroupTypeInput->transactions;
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
            $dbTransactionGroup->addTransaction($dbTransaction);

            $this->em->persist($dbTransaction);
        }

        $this->em->persist($dbTransactionGroup);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Update transactionGroup.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function updateTransactionGroup(string $id, TransactionGroup $transactionGroup): string
    {
        $dbtransactionGroup = $this->em->getRepository(TransactionGroup::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransactionGroup) {
            $dbtransactionGroup->cloneFrom($transactionGroup);

            // Check validation errors.
            $msg = $this->validate($dbtransactionGroup);
            if (null !== $msg) {
                return $msg;
            }

            $this->em->persist($dbtransactionGroup);
            $this->em->flush();

            return 'success';
        }

        return "failure: transactionGroup with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete transactionGroup.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function deleteTransactionGroup(string $id): string
    {
        $dbtransactionGroup = $this->em->getRepository(TransactionGroup::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransactionGroup) {
            $this->em->remove($dbtransactionGroup);
            $this->em->flush();

            return 'success';
        }

        return "failure: transactionGroup with id {$id} was not found";
    }
}
