<?php

namespace App\Entity;

use App\Repository\OntvangerRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=OntvangerRepository::class)
 */
class Ontvanger
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=lokaalpersoon::class, inversedBy="ontvangers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $LokaalPersoon;

    /**
     * @ORM\ManyToOne(targetEntity=Mail::class, inversedBy="ontvangers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $Mail;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLokaalPersoon(): ?lokaalpersoon
    {
        return $this->LokaalPersoon;
    }

    public function setLokaalPersoon(?lokaalpersoon $LokaalPersoon): self
    {
        $this->LokaalPersoon = $LokaalPersoon;

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
