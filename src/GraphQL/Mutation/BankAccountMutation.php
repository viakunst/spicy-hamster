<?php

namespace App\GraphQL\Mutation;

use App\Entity\BankAccount\BankAccount;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The bankaccount mutation operations.")
 */
class BankAccountMutation extends AbstractMutation
{
    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Create bankaccount.")
     * @GQL\Access("isAuthenticated()")
     */
    public function createBankAccount(BankAccount $bankaccount): string
    {
        $dbbankaccount = new bankaccount();
        $dbbankaccount->cloneFrom($bankaccount);

        // Check validation errors.
        $msg = $this->validate($dbbankaccount);
        if (null !== $msg) {
            return $msg;
        }

        $this->em->persist($dbbankaccount);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Update bankaccount.")
     * @GQL\Access("isAuthenticated()")
     */
    public function updateBankAccount(string $id, BankAccount $bankaccount): string
    {
        $dbbankaccount = $this->em->getRepository(BankAccount::class)->findOneBy(['id' => $id]);
        if (null !== $dbbankaccount) {
            $dbbankaccount->cloneFrom($bankaccount);

            // Check validation errors.
            $msg = $this->validate($dbbankaccount);
            if (null !== $msg) {
                return $msg;
            }

            $this->em->persist($dbbankaccount);
            $this->em->flush();

            return 'success';
        }

        return "failure: bankaccount with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete bankaccount.")
     * @GQL\Access("isAuthenticated()")
     */
    public function deleteBankAccount(string $id): string
    {
        $dbbankaccount = $this->em->getRepository(BankAccount::class)->findOneBy(['id' => $id]);
        if (null !== $dbbankaccount) {
            $this->em->remove($dbbankaccount);
            $this->em->flush();

            return 'success';
        }

        return "failure: bankaccount with id {$id} was not found";
    }
}
