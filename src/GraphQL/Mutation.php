<?php

namespace App\GraphQL;

use App\Entity\Mail\Mail;
use App\Entity\Person\Person;
use App\Entity\Statement\Statement;
use App\Entity\Transaction\Transaction;
use App\Entity\Transaction\TransactionGroup;
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
     * @GQL\Field(type="String!")
     * @GQL\Description("Create statement.")
     * @GQL\Access("isAuthenticated()")
     */
    public function createStatement(Statement $statement): string
    {
        $dbstatement = new statement();
        $dbstatement->cloneFrom($statement);

        // Check validation errors.
        $msg = $this->validate($dbstatement);
        if (null !== $msg) {
            return $msg;
        }

        $this->em->persist($dbstatement);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Update statement.")
     * @GQL\Access("isAuthenticated()")
     */
    public function updateStatement(string $id, Statement $statement): string
    {
        $dbstatement = $this->em->getRepository(Statement::class)->findOneBy(['id' => $id]);
        if (null !== $dbstatement) {
            $dbstatement->cloneFrom($statement);

            // Check validation errors.
            $msg = $this->validate($dbstatement);
            if (null !== $msg) {
                return $msg;
            }

            $this->em->persist($dbstatement);
            $this->em->flush();

            return 'success';
        }

        return "failure: statement with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete statement.")
     * @GQL\Access("isAuthenticated()")
     */
    public function deleteStatement(string $id): string
    {
        $dbstatement = $this->em->getRepository(Statement::class)->findOneBy(['id' => $id]);
        if (null !== $dbstatement) {
            $this->em->remove($dbstatement);
            $this->em->flush();

            return 'success';
        }

        return "failure: statement with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Create transaction.")
     * @GQL\Access("isAuthenticated()")
     */
    public function createTransaction(Transaction $transaction): string
    {
        $dbtransaction = new Transaction();
        $dbtransaction->cloneFrom($transaction);

        // Check validation errors.
        $msg = $this->validate($dbtransaction);
        if (null !== $msg) {
            return $msg;
        }

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
     * @GQL\Description("Delete transaction.")
     * @GQL\Access("isAuthenticated()")
     */
    public function sendTransactionReminder(string $id): string
    {
        $dbtransaction = $this->em->getRepository(Transaction::class)->findOneBy(['id' => $id]);
        if (null !== $dbtransaction) {
            // TO-DO email stuff.

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
