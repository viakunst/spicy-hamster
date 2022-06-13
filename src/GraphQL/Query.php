<?php

namespace App\GraphQL;

use App\Entity\BankAccount\BankAccount;
use App\Entity\Mail\Mail;
use App\Entity\Mail\Recipient;
use App\Entity\Person\Person;
use App\Entity\Statement\Statement;
use App\Entity\Transaction\Transaction;
use App\Entity\Transaction\TransactionGroup;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation as GQL;

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

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
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
