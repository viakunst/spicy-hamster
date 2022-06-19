<?php

namespace App\Mail;

use App\Entity\Mail\Mail;
use App\Entity\Mail\Recipient;
use App\Entity\Person\Person;
use App\Security\TokenUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Security\Core\Security;

class MailService
{
    /**
     * @var MailerInterface
     */
    private $mailer;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Security
     */
    private $security;

    /**
     * @var ParameterBagInterface
     */
    private $params;

    public function __construct(MailerInterface $mailer, EntityManagerInterface $em, Security $security, ParameterBagInterface $params)
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->security = $security;
        $this->params = $params;
    }

    /**
     * @param Person[] $to
     */
    public function message($to, string $title, string $body): void
    {
        if (0 === count($to)) {
            return;
        }

        $title = ($_ENV['ORG_NAME'] ?? $this->params->get('env(ORG_NAME)')).' - '.$title;
        $from = $_ENV['DEFAULT_FROM'];
        $body_plain = html_entity_decode(strip_tags($body));

        $message = new Email();
        $message->subject($title)
            ->from($from)
            ->html($body)
            ->text($body_plain)
        ;

        foreach ($to as $person) {
            if (is_null($person->getEmail())) {
                continue;
            }
            $message->to($person->getEmail());
        }

        $content = json_encode([
            'html' => $body,
            'plain' => $body_plain,
        ]);

        // --- Database email.
        $dbMail = new Mail();
        $dbMail
            ->setSender($from)
            ->setSendBy($this->getUserIdentifier())
            ->setTitle($title)
            ->setSentAt(new \DateTime())
        ;
        if (is_string($content)) {
            $dbMail->setContent($content);
        }

        $this->em->persist($dbMail);

        // --- Database email recipients.
        foreach ($to as $person) {
            $recipient = new Recipient();
            $recipient
                ->setPerson($person)
                ->setMail($dbMail)
            ;

            $this->em->persist($recipient);
        }
        $this->em->flush();

        // $this->mailer->send($message);
    }

    /**
     * @return string
     */
    private function getUserIdentifier()
    {
        $user = $this->security->getUser();
        if (is_null($user)) {
            return 'unknown user sender';
        }

        if ($user instanceof TokenUser) {
            if (is_null($user->getName())) {
                return 'unknown user sender';
            }

            return $user->getName();
        }

        return $user->getUserIdentifier();
    }
}
