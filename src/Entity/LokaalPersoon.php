<?php

namespace App\Entity;

use App\Repository\LokaalPersoonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LokaalPersoonRepository::class)
 */
class LokaalPersoon
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Naam;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Mail_adres;

    /**
     * @ORM\OneToMany(targetEntity=Transactie::class, mappedBy="LokaalPersoon")
     */
    private $transacties;

    /**
     * @ORM\OneToMany(targetEntity=Ontvanger::class, mappedBy="LokaalPersoon")
     */
    private $ontvangers;

    /**
     * @ORM\OneToMany(targetEntity=Mail::class, mappedBy="Persoon")
     */
    private $mails;

    public function __construct()
    {
        $this->transacties = new ArrayCollection();
        $this->ontvangers = new ArrayCollection();
        $this->mails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNaam(): ?string
    {
        return $this->Naam;
    }

    public function setNaam(string $Naam): self
    {
        $this->Naam = $Naam;

        return $this;
    }

    public function getMailAdres(): ?string
    {
        return $this->Mail_adres;
    }

    public function setMailAdres(string $Mail_adres): self
    {
        $this->Mail_adres = $Mail_adres;

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
            $transacty->setLokaalPersoon($this);
        }

        return $this;
    }

    public function removeTransacty(Transactie $transacty): self
    {
        if ($this->transacties->removeElement($transacty)) {
            // set the owning side to null (unless already changed)
            if ($transacty->getLokaalPersoon() === $this) {
                $transacty->setLokaalPersoon(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Ontvanger[]
     */
    public function getOntvangers(): Collection
    {
        return $this->ontvangers;
    }

    public function addOntvanger(Ontvanger $ontvanger): self
    {
        if (!$this->ontvangers->contains($ontvanger)) {
            $this->ontvangers[] = $ontvanger;
            $ontvanger->setLokaalPersoon($this);
        }

        return $this;
    }

    public function removeOntvanger(Ontvanger $ontvanger): self
    {
        if ($this->ontvangers->removeElement($ontvanger)) {
            // set the owning side to null (unless already changed)
            if ($ontvanger->getLokaalPersoon() === $this) {
                $ontvanger->setLokaalPersoon(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Mail[]
     */
    public function getMails(): Collection
    {
        return $this->mails;
    }

    public function addMail(Mail $mail): self
    {
        if (!$this->mails->contains($mail)) {
            $this->mails[] = $mail;
            $mail->setPersoon($this);
        }

        return $this;
    }

    public function removeMail(Mail $mail): self
    {
        if ($this->mails->removeElement($mail)) {
            // set the owning side to null (unless already changed)
            if ($mail->getPersoon() === $this) {
                $mail->setPersoon(null);
            }
        }

        return $this;
    }
}
