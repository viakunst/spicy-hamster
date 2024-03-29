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
use App\Security\TokenUser;
use App\Service\CognitoService;
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

    /**
     * @var CognitoService
     */
    protected $cognito;

    public function __construct(EntityManagerInterface $em, Security $security, CognitoService $cognito)
    {
        $this->em = $em;
        $this->security = $security;
        $this->cognito = $cognito;
    }

    /**
     * @GQL\Field(type="[Person]")
     * @GQL\Description("All persons stored in the database.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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

        $admin = $this->em->getRepository(Person::class)->findOneBy(['role' => 'admin']);

        if (is_null($admin) || 'admin' == $admin->getId()) {
            // No admin in system. make current user admin.

            if (($user instanceof TokenUser) && !is_null($user->getSub())) {
                $person = $this->em->getRepository(Person::class)->findOneBy(['sub' => $user->getSub()]);
                if (is_null($person)) {
                    return ['noAdmin'];
                }

                $person->setRole('admin');
                $this->em->persist($person);
                $this->em->flush();

                return $user->getRoles();
            }
        }

        return $user->getRoles();
    }

    /**
     * @GQL\Field(type="[Transaction]")
     * @GQL\Description("All persons with outstanding transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Transaction[]
     */
    public function getOwnTransactions()
    {
        $user = $this->security->getUser();
        if (is_null($user)) {
            return [];
        }
        if (!($user instanceof TokenUser)) {
            return [];
        }
        if (is_null($user->getSub())) {
            return [];
        }

        $person = $this->em->getRepository(Person::class)->findOneBy(['sub' => $user->getSub()]);
        if (is_null($person)) {
            return [];
        }

        return $this->em->getRepository(Transaction::class)->findBy(['person' => $person->getId()]);
    }

    /**
     * @GQL\Field(type="[Transaction]")
     * @GQL\Description("Own transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Transaction[]
     */
    public function getOwnOutstandingTransactions()
    {
        $user = $this->security->getUser();
        if (is_null($user)) {
            return [];
        }
        if (!($user instanceof TokenUser)) {
            return [];
        }
        if (is_null($user->getSub())) {
            return [];
        }

        $person = $this->em->getRepository(Person::class)->findOneBy(['sub' => $user->getSub()]);
        if (is_null($person)) {
            return [];
        }

        return $this->em->getRepository(Transaction::class)->findBy(['person' => $person->getId(), 'status' => 'Openstaand']);
    }

    /**
     * @GQL\Field(type="[Transaction]")
     * @GQL\Description("Owns transactions.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Transaction[]
     */
    public function getOwnPaidTransactions()
    {
        $user = $this->security->getUser();
        if (is_null($user)) {
            return [];
        }
        if (!($user instanceof TokenUser)) {
            return [];
        }
        if (is_null($user->getSub())) {
            return [];
        }

        $person = $this->em->getRepository(Person::class)->findOneBy(['sub' => $user->getSub()]);
        if (is_null($person)) {
            return [];
        }

        return $this->em->getRepository(Transaction::class)->findBy(['person' => $person->getId(), 'status' => 'Voldaan']);
    }

    /**
     * @GQL\Field(type="[Person]")
     * @GQL\Description("All persons with outstanding transactions.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
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
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     *
     * @return TransactionGroup[]
     */
    public function transactionGroups()
    {
        return $this->em->getRepository(TransactionGroup::class)->findAll();
    }
}
