<?php

namespace App\Entity\Transaction;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @ORM\Entity
 * @GQL\Type
 * @GQL\Input
 * @GQL\Description("Grouped transaction from the organisation.")
 */
class TransactionGroup
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\Column(type="integer")
     * @GQL\Field(type="Int!")
     */
    private int $amount;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $title;

    /**
     * @ORM\Column(type="text")
     * @GQL\Field(type="String!")
     */
    private string $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private \DateTime $date;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $IBAN;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="TransactionGroup")
     *
     * @var Collection<int,Transaction>
     */
    private $transactions;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The subject identifier of the transaction group.")
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

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getIBAN(): ?string
    {
        return $this->IBAN;
    }

    public function setIBAN(string $IBAN): self
    {
        $this->IBAN = $IBAN;

        return $this;
    }

    /**
     * @GQL\Field(type="[Transaction]")
     *
     * @return Collection<int,Transaction>
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions[] = $transaction;
            $transaction->setTransactionGroup($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getTransactionGroup() === $this) {
                // $transaction->setTransactionGroup(null);
            }
        }

        return $this;
    }
}
