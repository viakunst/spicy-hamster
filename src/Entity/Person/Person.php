<?php

namespace App\Entity\Person;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Person
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private string $sub;

    /**
     * @ORM\Column(type="string", length=180)
     */
    private string $email;

    /**
     * @ORM\Column(type="string", length=180)
     */
    private string $givenName;

    /**
     * @ORM\Column(type="string", length=180)
     */
    private string $familyName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $address;

    public function getId(): ?string
    {
        return $this->id;
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The subject identifier of the person.")
     */
    public function getSub(): ?string
    {
        return $this->sub;
    }

    public function setSub(string $sub): self
    {
        $this->sub = $sub;

        return $this;
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The e-mail address of the person.")
     */
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
     * @GQL\Description("The subject identifier of the person.")
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
     * @GQL\Field(type="String!")
     * @GQL\Description("The given name of the person.")
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
     * @GQL\Field(type="String!")
     * @GQL\Description("The family name of the person.")
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
     * @GQL\Field(type="String!")
     * @GQL\Description("The address of the person.")
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
}
