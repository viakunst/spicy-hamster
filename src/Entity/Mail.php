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
     * @ORM\OneToMany(targetEntity=Reciever::class, mappedBy="Mail")
     */
    private $Recievers;

    public function __construct()
    {
        $this->Recievers = new ArrayCollection();
    }

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
     * @return Collection|Reciever[]
     */
    public function getRecievers(): Collection
    {
        return $this->Recievers;
    }

    public function addReciever(Reciever $Reciever): self
    {
        if (!$this->Recievers->contains($Reciever)) {
            $this->Recievers[] = $Reciever;
            $Reciever->setMail($this);
        }

        return $this;
    }

    public function removeReciever(Reciever $Reciever): self
    {
        if ($this->Recievers->removeElement($Reciever)) {
            // set the owning side to null (unless already changed)
            if ($Reciever->getMail() === $this) {
                $Reciever->setMail(null);
            }
        }

        return $this;
    }
}
