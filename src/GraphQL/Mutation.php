<?php

namespace App\GraphQL;

use App\Entity\Mail\Mail;
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
    protected transactionGroupMutation $transactionGroups;

    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator,
    CognitoService $cognito, PersonMutation $persons,
    StatementMutation $statements, TransactionMutation $transactions, transactionGroupMutation $transactionGroups)
    {
        $this->em = $em;
        $this->validator = $validator;
        $this->cognito = $cognito;
        $this->persons = $persons;
        $this->statements = $statements;
        $this->transactions = $transactions;
        $this->transactionGroups = $transactionGroups;
    }

    /**
     * @GQL\Field(type="PersonMutation")
     * @GQL\Description("All transactions stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return PersonMutation
     */
    public function personMutation()
    {
        return $this->persons;
    }

    /**
     * @GQL\Field(type="StatementMutation")
     * @GQL\Description("All transactions stored in the database.")
     * @GQL\Access("isAuthenticated()")
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
     * @GQL\Access("isAuthenticated()")
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
     * @GQL\Access("isAuthenticated()")
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
        return $this->cognito->listAllUser($token);
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete mail.")
     * @GQL\Access("isAuthenticated()")
     */
    public function deletemail(string $id): string
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
