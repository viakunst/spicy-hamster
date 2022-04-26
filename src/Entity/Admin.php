<?php

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AdminRepository::class)
 */
class Admin
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=255, unique=true)
     *
     * @var string
     */
    private $oidc;

    public function getOidc(): ?string
    {
        return $this->oidc;
    }

    public function setOidc(string $oidc): self
    {
        $this->oidc = $oidc;

        return $this;
    }
}
