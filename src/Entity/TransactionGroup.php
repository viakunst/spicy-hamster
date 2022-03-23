<?php

namespace App\Entity;

use App\Repository\TransactionGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TransactionGroupRepository::class)
 */
class TransactionGroup
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2)
     */
    private $Bedrag;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $activiteit_naam;

    /**
     * @ORM\Column(type="datetime")
     */
    private $Datum;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="TransactionGroup")
     */
    private $transactions;

    public function __construct()
    {
        $this->transacties = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBedrag(): ?string
    {
        return $this->Bedrag;
    }

    public function setBedrag(string $Bedrag): self
    {
        $this->Bedrag = $Bedrag;

        return $this;
    }

    public function getActiviteitNaam(): ?string
    {
        return $this->activiteit_naam;
    }

    public function setActiviteitNaam(string $activiteit_naam): self
    {
        $this->activiteit_naam = $activiteit_naam;

        return $this;
    }

    public function getDatum(): ?\DateTimeInterface
    {
        return $this->Datum;
    }

    public function setDatum(\DateTimeInterface $Datum): self
    {
        $this->Datum = $Datum;

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransacty(Transaction $transacty): self
    {
        if (!$this->transactions->contains($transacty)) {
            $this->transactions[] = $transacty;
            $transacty->setTransactionGroup($this);
        }

        return $this;
    }

    public function removeTransacty(Transaction $transacty): self
    {
        if ($this->transactions->removeElement($transacty)) {
            // set the owning side to null (unless already changed)
            if ($transacty->getTransactionGroup() === $this) {
                $transacty->setTransactionGroup(null);
            }
        }

        return $this;
    }
}
