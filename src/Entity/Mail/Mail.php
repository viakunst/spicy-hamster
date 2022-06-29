<?php

namespace App\Entity\Mail;

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
     */
    private string $id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Mail\Recipient", mappedBy="mail")
     * @GQL\Field(type="[Recipient]")
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
     * @ORM\Column(type="string", length=255)
     * @GQL\Field(type="String!")
     */
    private string $sendBy;

    /**
     * @ORM\Column(type="datetime")
     * @GQL\Field(type="DateTimeScalar!")
     */
    private DateTime $sendAt;

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("The subject identifier of the statement.")
     */
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

    public function getSendBy(): ?string
    {
        return $this->sendBy;
    }

    public function setSendBy(string $sendBy): self
    {
        $this->sendBy = $sendBy;

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

    public function getSendAt(): ?\DateTimeInterface
    {
        return $this->sendAt;
    }

    public function setSendAt(DateTime $sendAt): self
    {
        $this->sendAt = $sendAt;

        return $this;
    }
}
