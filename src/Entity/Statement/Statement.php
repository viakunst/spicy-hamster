<?php

namespace App\Entity\Statement;

use App\Repository\Statement\StatementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass=StatementRepository::class)
 * @Vich\Uploadable
 */
class Statement
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     */
    private string $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $IBAN;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $mail;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $item;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $reason;

    /**
     * @ORM\Column(type="simple_array")
     *
     * @var string[]
     */
    private $group = [];

    /**
     * @ORM\Column(type="text")
     */
    private string $comment;

    /**
     * @ORM\Column(type="text")
     */
    private string $feedback;

    /**
     * @ORM\Column(type="string")
     */
    private string $status;

    /**
     * @ORM\Column(type="integer")
     */
    private int $amount;

    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     *
     * @Vich\UploadableField(mapping="products", fileNameProperty="imageName", size="imageSize")
     *
     * @var File|null
     */
    private $imageFile;

    /**
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string|null
     */
    private $imageName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     *
     * @var int|null
     */
    private $imageSize;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     *
     * @var \DateTimeInterface|null
     */
    private $updatedAt;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIBAN(): ?string
    {
        return $this->IBAN;
    }

    public function setIBAN(string $IBAN): self
    {
        $this->IBAN = $IBAN;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getItem(): ?string
    {
        return $this->item;
    }

    public function setItem(string $item): self
    {
        $this->item = $item;

        return $this;
    }

    public function getReason(): ?string
    {
        return $this->reason;
    }

    public function setReason(string $reason): self
    {
        $this->reason = $reason;

        return $this;
    }

    /**
     * @return string[]
     */
    public function getGroup()
    {
        return $this->group;
    }

    /**
     * @param string[] $group
     */
    public function setGroup($group): self
    {
        $this->group = $group;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getFeedback(): ?string
    {
        return $this->feedback;
    }

    public function setFeedback(string $feedback): self
    {
        $this->feedback = $feedback;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageSize(?int $imageSize): void
    {
        $this->imageSize = $imageSize;
    }

    public function getImageSize(): ?int
    {
        return $this->imageSize;
    }
}
