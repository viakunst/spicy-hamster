<?php

namespace App\Entity\BankAccount;

use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @ORM\Entity
 * @ORM\Table(name="`BankAccount`")
 * @GQL\Type
 * @GQL\Input
 * @GQL\Description("Bank account and information")
 */
class BankAccount
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $manager;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $IBAN;

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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getManager(): ?string
    {
        return $this->manager;
    }

    public function setManager(string $manager): self
    {
        $this->manager = $manager;

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

    public function cloneFrom(BankAccount $bankAccount): void
    {
        if (null !== $bankAccount->getName()) {
            $this->name = $bankAccount->getName();
        }
        if (null !== $bankAccount->getManager()) {
            $this->manager = $bankAccount->getManager();
        }
        if (null !== $bankAccount->getIBAN()) {
            $this->IBAN = $bankAccount->getIBAN();
        }
    }
}
