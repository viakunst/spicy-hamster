<?php

namespace App\GraphQL;

use App\GraphQL\Mutation\BankAccountMutation;
use App\GraphQL\Mutation\EmailMutation;
use App\GraphQL\Mutation\PersonMutation;
use App\GraphQL\Mutation\StatementMutation;
use App\GraphQL\Mutation\TransactionGroupMutation;
use App\GraphQL\Mutation\TransactionMutation;
use App\Service\CognitoService;
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
    protected $em;

    /**
     * @var ValidatorInterface
     */
    protected $validator;

    /**
     * @var CognitoService
     */
    protected $cognito;

    protected PersonMutation $persons;
    protected StatementMutation $statements;
    protected TransactionMutation $transactions;
    protected TransactionGroupMutation $transactionGroups;
    protected EmailMutation $emails;
    protected BankAccountMutation $bankAccounts;

    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator,
    CognitoService $cognito, PersonMutation $persons, EmailMutation $emails, BankAccountMutation $bankAccounts,
    StatementMutation $statements, TransactionMutation $transactions, TransactionGroupMutation $transactionGroups)
    {
        $this->em = $em;
        $this->validator = $validator;
        $this->cognito = $cognito;
        $this->persons = $persons;
        $this->statements = $statements;
        $this->transactions = $transactions;
        $this->transactionGroups = $transactionGroups;
        $this->bankAccounts = $bankAccounts;
        $this->emails = $emails;
    }

    /**
     * @GQL\Field(type="PersonMutation")
     * @GQL\Description("All persons mutations.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return PersonMutation
     */
    public function personMutation()
    {
        return $this->persons;
    }

    /**
     * @GQL\Field(type="EmailMutation")
     * @GQL\Description("All email mutations.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return EmailMutation
     */
    public function emailMutation()
    {
        return $this->emails;
    }

    /**
     * @GQL\Field(type="BankAccountMutation")
     * @GQL\Description("All bank account mutations.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return BankAccountMutation
     */
    public function bankAccountMutation()
    {
        return $this->bankAccounts;
    }

    /**
     * @GQL\Field(type="StatementMutation")
     * @GQL\Description("All transactions stored in the database.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return StatementMutation
     */
    public function statementMutation()
    {
        return $this->statements;
    }

    /**
     * @GQL\Field(type="TransactionMutation")
     * @GQL\Description("All transactions stored in the database.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return TransactionMutation
     */
    public function transactionMutation()
    {
        return $this->transactions;
    }

    /**
     * @GQL\Field(type="TransactionGroupMutation")
     * @GQL\Description("All transactions stored in the database.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return TransactionGroupMutation
     */
    public function transactionGroupMutation()
    {
        return $this->transactionGroups;
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Imports persons from the identity provider.")
     * @GQL\Access("isAuthenticated()")
     */
    public function importPerson(string $token): string
    {
        return $this->cognito->importAllPersons($token);
    }
}
