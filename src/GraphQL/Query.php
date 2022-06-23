<?php

namespace App\GraphQL;

use App\Entity\BankAccount\BankAccount;
use App\Entity\Mail\Mail;
use App\Entity\Mail\Recipient;
use App\Entity\Person\Person;
use App\Entity\Statement\Statement;
use App\Entity\Transaction\Transaction;
use App\Entity\Transaction\TransactionGroup;
use App\GraphQL\Types\PersonTransactions;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Security\Core\Security;

/**
 * @GQL\Type
 * @GQL\Description("The root of all query operations.")
 */
class Query
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Security
     */
    private $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    /**
     * @GQL\Field(type="[Person]")
     * @GQL\Description("All persons stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Person[]
     */
    public function persons()
    {
        return $this->em->getRepository(Person::class)->findAll();
    }

    /**
     * @GQL\Field(type="[String]")
     * @GQL\Description("All persons with outstanding transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return string[]
     */
    public function getOwnRoles()
    {
        $user = $this->security->getUser();
        if (is_null($user)) {
            return ['notFound'];
        }

        return $user->getRoles();
    }

    /**
     * @GQL\Field(type="[Person]")
     * @GQL\Description("All persons with outstanding transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Person[]
     */
    public function getAllPersonsWithOutstandingTransactions()
    {
        $persons = $this->em->getRepository(Person::class)->findAll();
        $outstanding_persons = [];

        foreach ($persons as $person) {
            $transactions = $this->em->getRepository(Transaction::class)->findBy([
                'person' => $person,
                'status' => Transaction::OUTSTANDING,
            ]);

            if (0 != count($transactions)) {
                array_push($outstanding_persons, $person);
            }
        }

        return $outstanding_persons;
    }

    /**
     * @GQL\Field(type="[PersonTransactions]")
     * @GQL\Description("All persons with outstanding transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return PersonTransactions[]
     */
    public function getAllOutstandingTransactionsCoupledWithPerson()
    {
        $persons = $this->em->getRepository(Person::class)->findAll();
        $outstanding_person_transactions_array = [];

        foreach ($persons as $person) {
            $transactions = $this->em->getRepository(Transaction::class)->findBy([
                'person' => $person,
                'status' => Transaction::OUTSTANDING,
            ]);

            if (0 != count($transactions)) {
                $outstanding_person_transactions = new PersonTransactions($person, $transactions);

                array_push($outstanding_person_transactions_array, $outstanding_person_transactions);
            }
        }

        return $outstanding_person_transactions_array;
    }

    /**
     * @GQL\Field(type="[PersonTransactions]")
     * @GQL\Description("All persons with outstanding transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return PersonTransactions[]
     */
    public function getAllTransactionsCoupledWithPerson()
    {
        $persons = $this->em->getRepository(Person::class)->findAll();
        $person_transactions_array = [];

        foreach ($persons as $person) {
            $transactions = $this->em->getRepository(Transaction::class)->findBy([
                'person' => $person,
            ]);

            if (0 != count($transactions)) {
                $person_transactions = new PersonTransactions($person, $transactions);

                array_push($person_transactions_array, $person_transactions);
            }
        }

        return $person_transactions_array;
    }

    /**
     * @GQL\Field(type="[Statement]")
     * @GQL\Description("All statements stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Statement[]
     */
    public function statements()
    {
        return $this->em->getRepository(Statement::class)->findAll();
    }

    /**
     * @GQL\Field(type="[Mail]")
     * @GQL\Description("All e-mails stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Mail[]
     */
    public function mails()
    {
        return $this->em->getRepository(Mail::class)->findAll();
    }

    /**
     * @GQL\Field(type="[Recipient]")
     * @GQL\Description("All recipients stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Recipient[]
     */
    public function recipients()
    {
        return $this->em->getRepository(Recipient::class)->findAll();
    }

    /**
     * @GQL\Field(type="[BankAccount]")
     * @GQL\Description("All bank accounts stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return BankAccount[]
     */
    public function bankAccounts()
    {
        return $this->em->getRepository(BankAccount::class)->findAll();
    }

    /**
     * @GQL\Field(type="[Transaction]")
     * @GQL\Description("All transactions stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Transaction[]
     */
    public function transactions()
    {
        return $this->em->getRepository(Transaction::class)->findAll();
    }

    /**
     * @GQL\Field(type="[TransactionGroup]")
     * @GQL\Description("All transactionGroups stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return TransactionGroup[]
     */
    public function transactionGroups()
    {
        return $this->em->getRepository(TransactionGroup::class)->findAll();
    }
}
