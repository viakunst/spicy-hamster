<?php

namespace App\Entity\Transaction;

use App\Entity\Person\Person;
use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @GQL\Type(name="Transaction")
 * @GQL\Input
 * @GQL\Description("Indiviual Transactions from the organisation.")
 * @ORM\Entity
 * @ORM\Table(name="`Transaction`")
 */
class Transaction
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Person\Person")
     * @ORM\JoinColumn(name="person_id", referencedColumnName="id")
     */
    private ?Person $person;

    /**
     * @ORM\ManyToOne(targetEntity=TransactionGroup::class, inversedBy="transactions")
     * @ORM\JoinColumn(name="transaction_group_id", nullable=false)
     *
     * @var TransactionGroup
     */
    private $transactionGroup;

    /**
     * @ORM\Column(type="integer")
     * @GQL\Field(type="Int!")
     */
    private int $amount;

    /**
     * @ORM\Column(type="integer")
     * @GQL\Field(type="Int!")
     */
    private int $timesReminded;

    /**
     * @ORM\Column(type="string")
     * @GQL\Field(type="String!")
     */
    private string $status;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @GQL\Description("Comment on transaction.")
     * @GQL\Field(type="String")
     */
    private ?string $comment;

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The subject identifier of the person.")
     */
    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @GQL\Field(type="Person")
     */
    public function getPerson(): ?Person
    {
        return $this->person;
    }

    public function setPerson(Person $person): self
    {
        $this->person = $person;

        return $this;
    }

    /**
     * @GQL\Field(type="TransactionGroup")
     */
    public function getTransactionGroup(): ?TransactionGroup
    {
        return $this->transactionGroup;
    }

    public function setTransactionGroup(TransactionGroup $transactionGroup): self
    {
        $this->transactionGroup = $transactionGroup;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getTimesReminded(): ?int
    {
        return $this->timesReminded;
    }

    public function setTimesReminded(int $timesReminded): self
    {
        $this->timesReminded = $timesReminded;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function cloneFrom(Transaction $transaction): void
    {
        if (null !== $transaction->getAmount()) {
            $this->amount = $transaction->getAmount();
        }
        if (null !== $transaction->getTimesReminded()) {
            $this->timesReminded = $transaction->getTimesReminded();
        }
        if (null !== $transaction->getStatus()) {
            $this->status = $transaction->getStatus();
        }
        if (null !== $transaction->getComment()) {
            $this->comment = $transaction->getComment();
        }
    }
}
