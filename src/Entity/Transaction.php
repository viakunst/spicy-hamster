<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TransactionRepository::class)
 */
class Transaction
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Account;

    /**
     * @ORM\ManyToOne(targetEntity=TransactionGroup::class, inversedBy="transactions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $TransactionGroup;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Voltooid;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Opmerking;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAccount(): ?string
    {
        return $this->Account;
    }

    public function setAccount(string $Account): self
    {
        $this->Account = $Account;

        return $this;
    }

    public function getTransactionGroup(): ?TransactionGroup
    {
        return $this->TransactionGroup;
    }

    public function setTransactionGroup(?TransactionGroup $TransactionGroup): self
    {
        $this->TransactionGroup = $TransactionGroup;

        return $this;
    }

    public function getVoltooid(): ?bool
    {
        return $this->Voltooid;
    }

    public function setVoltooid(bool $Voltooid): self
    {
        $this->Voltooid = $Voltooid;

        return $this;
    }

    public function getOpmerking(): ?string
    {
        return $this->Opmerking;
    }

    public function setOpmerking(?string $Opmerking): self
    {
        $this->Opmerking = $Opmerking;

        return $this;
    }
}
