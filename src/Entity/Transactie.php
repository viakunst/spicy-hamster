<?php

namespace App\Entity;

use App\Repository\TransactieRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TransactieRepository::class)
 */
class Transactie
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=LokaalPersoon::class, inversedBy="transacties")
     * @ORM\JoinColumn(nullable=false)
     */
    private $LokaalPersoon;

    /**
     * @ORM\ManyToOne(targetEntity=TransactieGroep::class, inversedBy="transacties")
     * @ORM\JoinColumn(nullable=false)
     */
    private $TransactieGroep;

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

    public function getLokaalPersoon(): ?LokaalPersoon
    {
        return $this->LokaalPersoon;
    }

    public function setLokaalPersoon(?LokaalPersoon $LokaalPersoon): self
    {
        $this->LokaalPersoon = $LokaalPersoon;

        return $this;
    }

    public function getTransactieGroep(): ?TransactieGroep
    {
        return $this->TransactieGroep;
    }

    public function setTransactieGroep(?TransactieGroep $TransactieGroep): self
    {
        $this->TransactieGroep = $TransactieGroep;

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
