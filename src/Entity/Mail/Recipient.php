<?php

namespace App\Entity\Mail;

use App\Entity\Person\Person;
use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @ORM\Entity
 * @GQL\Type
 * @GQL\Description("Recipients of the e-mails.")
 */
class Recipient
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Person\Person")
     * @ORM\JoinColumn(name="person_id", referencedColumnName="id")
     * @GQL\Field(type="Person")
     *
     * @var Person|null
     */
    private $person;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Mail\Mail", inversedBy="recipients")
     * @ORM\JoinColumn(name="mail", referencedColumnName="id")
     * @GQL\Field(type="Mail")
     *
     * @var Mail|null
     */
    private $mail;

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The subject identifier of the statement.")
     */
    public function getId(): ?string
    {
        return $this->id;
    }

    public function getPerson(): ?Person
    {
        return $this->person;
    }

    public function setPerson(?Person $person): self
    {
        $this->person = $person;

        return $this;
    }

    public function getMail(): ?Mail
    {
        return $this->mail;
    }

    public function setMail(?Mail $mail): self
    {
        $this->mail = $mail;

        return $this;
    }
}
