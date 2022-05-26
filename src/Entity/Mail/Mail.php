<?php

namespace App\Entity\Mail;

use App\Entity\Person\Person;
use DateTime;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @ORM\Entity
 * @GQL\Type
 * @GQL\Description("Send emails form the server.")
 */
class Mail
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     * @GQL\Field(type="String!")
     */
    private string $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Person\Person")
     * @ORM\JoinColumn(name="person_id", referencedColumnName="id")
     * @GQL\Field(type="Person")
     */
    private ?Person $person;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Mail\Recipient", mappedBy="mail")
     *@GQL\Field(type="[Recipient]")
     *
     * @var Collection<int,Recipient>
     */
    private $recipients;

    /**
     * @ORM\Column(type="string")
     * @GQL\Field(type="String!")
     */
    private string $title;

    /**
     * @ORM\Column(type="text")
     * @GQL\Field(type="String!")
     */
    private string $content;

    /**
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $sender;

    /**
     * @ORM\Column(type="datetime")
     */
    private DateTime $sentAt;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
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

    /**
     * Get price options.
     *
     * @return Collection<int,Recipient>
     */
    public function getRecipients()
    {
        return $this->recipients;
    }

    public function addRecipient(Recipient $recipient): self
    {
        if (!$this->recipients->contains($recipient)) {
            $this->recipients[] = $recipient;
            $recipient->setMail($this);
        }

        return $this;
    }

    public function removeRecipient(Recipient $recipient): self
    {
        if ($this->recipients->contains($recipient)) {
            $this->recipients->removeElement($recipient);
            // set the owning side to null (unless already changed)
            if ($recipient->getMail() === $this) {
                $recipient->setMail(null);
            }
        }

        return $this;
    }

    public function getSender(): ?string
    {
        return $this->sender;
    }

    public function setSender(string $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(DateTime $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }
}
