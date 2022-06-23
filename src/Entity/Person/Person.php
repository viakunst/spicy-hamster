<?php

namespace App\Entity\Person;

use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @ORM\Entity
 * @GQL\Type
 * @GQL\Input
 * @GQL\Description("A local copy of a person who has registered transactions or statements.")
 */
class Person
{
    public const ADMIN_ROLE = 'admin';
    public const NO_ROLE = 'user';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @GQL\Field(type="String!")
     * @GQL\Description("The AWS subject identifier of the person.")
     */
    private string $sub;

    /**
     * @ORM\Column(type="string", length=180)
     * @GQL\Field(type="String!")
     * @GQL\Description("The e-mail address of the person.")
     */
    private string $email;

    /**
     * @ORM\Column(type="string", length=180)
     * @GQL\Field(type="String!")
     * @GQL\Description("The given name of the person.")
     */
    private string $givenName;

    /**
     * @ORM\Column(type="string", length=180)
     * @GQL\Field(type="String!")
     * @GQL\Description("The family name of the person.")
     */
    private string $familyName;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     * @GQL\Description("The address of the person.")
     */
    private string $address;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     * @GQL\Description("The role of the person.")
     */
    private string $role;

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The subject identifier of the person.")
     */
    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getSub(): ?string
    {
        return $this->sub;
    }

    public function setSub(string $sub): self
    {
        $this->sub = $sub;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): self
    {
        $this->role = $role;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     * Note that this value isn't loaded by doctrine, but is provided
     * by the parent Person instance.
     */
    public function getUsername(): ?string
    {
        return $this->getEmail();
    }

    /**
     * Get name.
     *
     * @GQL\Field(type="String!")
     * @GQL\Description("The full name of the person.")
     *
     * @return string
     */
    public function getName(): ?string
    {
        $name = \trim($this->getGivenName().' '.$this->getFamilyName());

        return '' != $name ? $name : null;
    }

    /**
     * Set name.
     *
     * @param string $name
     */
    public function setName($name): self
    {
        $this->setFamilyName('');
        $this->setGivenName($name);

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getGivenName(): ?string
    {
        return $this->givenName;
    }

    /**
     * Set name.
     */
    public function setGivenName(string $givenName): self
    {
        $this->givenName = $givenName;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getFamilyName(): ?string
    {
        return $this->familyName;
    }

    /**
     * Set name.
     */
    public function setFamilyName(string $familyName): self
    {
        $this->familyName = $familyName;

        return $this;
    }

    /**
     * get adress.
     */
    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function cloneFrom(Person $person): void
    {
        if (null !== $person->getSub()) {
            $this->sub = $person->getSub();
        }
        if (null !== $person->getRole()) {
            $this->role = $person->getRole();
        }
        if (null !== $person->getEmail()) {
            $this->email = $person->getEmail();
        }
        if (null !== $person->getGivenName()) {
            $this->givenName = $person->getGivenName();
        }
        if (null !== $person->getFamilyName()) {
            $this->familyName = $person->getFamilyName();
        }
        if (null !== $person->getAddress()) {
            $this->address = $person->getAddress();
        }
    }
}
