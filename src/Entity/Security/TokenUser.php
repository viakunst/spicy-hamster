<?php

namespace App\Entity\Security;

use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @GQL\Type
 * @GQL\Description("Current user info.")
 * @ORM\Entity(repositoryClass=AwsUserRepository::class)
 */
class TokenUser implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String")
     * @GQL\Description("Access Token")
     */
    private $token;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String")
     * @GQL\Description("Email")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @GQL\Field(type="[String]")
     * @GQL\Description("Roles of user")
     */
    private $roles = [];

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
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
     * The public representation of the user (e.g. a username, an email address, etc.).
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->token;
    }

    public function getUsername(): string
    {
        return (string) $this->token;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     *
     * @return string|null
     */
    public function getPassword()
    {
        // We dont use passwords, but they are required by the interface.
        return null;
    }

    public function setPassword(string $password): self
    {
        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}
