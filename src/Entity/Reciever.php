<?php

namespace App\Entity;

use App\Repository\RecieverRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RecieverRepository::class)
 */
class Reciever
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
     * @ORM\ManyToOne(targetEntity=Mail::class, inversedBy="Recievers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Mail;

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

    public function getMail(): ?Mail
    {
        return $this->Mail;
    }

    public function setMail(?Mail $Mail): self
    {
        $this->Mail = $Mail;

        return $this;
    }
}
