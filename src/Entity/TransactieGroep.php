<?php

namespace App\Entity;

use App\Repository\TransactieGroepRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TransactieGroepRepository::class)
 */
class TransactieGroep
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
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
     * @ORM\OneToMany(targetEntity=Transactie::class, mappedBy="TransactieGroep")
     */
    private $transacties;

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
     * @return Collection|Transactie[]
     */
    public function getTransacties(): Collection
    {
        return $this->transacties;
    }

    public function addTransacty(Transactie $transacty): self
    {
        if (!$this->transacties->contains($transacty)) {
            $this->transacties[] = $transacty;
            $transacty->setTransactieGroep($this);
        }

        return $this;
    }

    public function removeTransacty(Transactie $transacty): self
    {
        if ($this->transacties->removeElement($transacty)) {
            // set the owning side to null (unless already changed)
            if ($transacty->getTransactieGroep() === $this) {
                $transacty->setTransactieGroep(null);
            }
        }

        return $this;
    }
}
