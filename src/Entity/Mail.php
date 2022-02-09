<?php

namespace App\Entity;

use App\Repository\MailRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MailRepository::class)
 */
class Mail
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=LokaalPersoon::class, inversedBy="mails")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Persoon;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Titel;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Inhoud;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Verzender;

    /**
     * @ORM\Column(type="datetime")
     */
    private $ZendTijd;

    /**
     * @ORM\OneToMany(targetEntity=Ontvanger::class, mappedBy="Mail")
     */
    private $ontvangers;

    public function __construct()
    {
        $this->ontvangers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPersoon(): ?LokaalPersoon
    {
        return $this->Persoon;
    }

    public function setPersoon(?LokaalPersoon $Persoon): self
    {
        $this->Persoon = $Persoon;

        return $this;
    }

    public function getTitel(): ?string
    {
        return $this->Titel;
    }

    public function setTitel(string $Titel): self
    {
        $this->Titel = $Titel;

        return $this;
    }

    public function getInhoud(): ?string
    {
        return $this->Inhoud;
    }

    public function setInhoud(string $Inhoud): self
    {
        $this->Inhoud = $Inhoud;

        return $this;
    }

    public function getVerzender(): ?string
    {
        return $this->Verzender;
    }

    public function setVerzender(string $Verzender): self
    {
        $this->Verzender = $Verzender;

        return $this;
    }

    public function getZendTijd(): ?\DateTimeInterface
    {
        return $this->ZendTijd;
    }

    public function setZendTijd(\DateTimeInterface $ZendTijd): self
    {
        $this->ZendTijd = $ZendTijd;

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
            $ontvanger->setMail($this);
        }

        return $this;
    }

    public function removeOntvanger(Ontvanger $ontvanger): self
    {
        if ($this->ontvangers->removeElement($ontvanger)) {
            // set the owning side to null (unless already changed)
            if ($ontvanger->getMail() === $this) {
                $ontvanger->setMail(null);
            }
        }

        return $this;
    }
}
