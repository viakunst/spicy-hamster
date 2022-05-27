<?php

namespace App\GraphQL\Mutation;

use App\Entity\Transaction\TransactionGroup;
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
     * @GQL\Access("isAuthenticated()")
     */
    public function createTransactionGroup(TransactionGroup $transactionGroup): string
    {
        $dbtransactionGroup = new TransactionGroup();
        $dbtransactionGroup->cloneFrom($transactionGroup);

        // Check validation errors.
        $msg = $this->validate($dbtransactionGroup);
        if (null !== $msg) {
            return $msg;
        }

        $this->em->persist($dbtransactionGroup);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Update transactionGroup.")
     * @GQL\Access("isAuthenticated()")
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
     * @GQL\Access("isAuthenticated()")
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
