<?php

namespace App\Mail;

use App\Entity\Mail\Mail;
use App\Entity\Mail\Recipient;
use App\Entity\Person\Person;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailService
{
    private MailerInterface $mailer;

    private EntityManagerInterface $em;

    private ParameterBagInterface $params;

    public function __construct(MailerInterface $mailer, EntityManagerInterface $em, ParameterBagInterface $params)
    {
        $this->mailer = $mailer;
        $this->em = $em;
        $this->params = $params;
    }

    /**
     * @param Person[] $to
     */
    public function message($to, string $title, string $body): void
    {
        $title = ($_ENV['ORG_NAME'] ?? $this->params->get('env(ORG_NAME)')).' - '.$title;
        $from = $_ENV['DEFAULT_FROM'];
        $body_plain = html_entity_decode(strip_tags($body));

        $addresses = [];
        foreach ($to as $person) {
            if (is_null($person->getEmail())) {
                continue;
            }

            if ('' == trim($person->getName() ?? $person->getUsername() ?? '')) {
                $addresses[] = $person->getEmail();
            }
        }

        $email = (new Email())
            ->from($from)
            ->to(...$addresses)
            ->subject($title)
            ->html($body)
            ->text($body_plain)
        ;

        $content = json_encode([
            'html' => $body,
            'plain' => $body_plain,
        ]);
        if (false != $content) {
            $msgEntity = new Mail();
            $msgEntity
                ->setSender($from)
                ->setPerson(null)
                ->setTitle($title)
                ->setContent($content)
                ->setSentAt(new \DateTime())
            ;
            $this->em->persist($msgEntity);

            foreach ($to as $person) {
                $recipient = new Recipient();
                $recipient
                    ->setPerson($person)
                    ->setMail($msgEntity)
                ;

                $this->em->persist($recipient);
            }

            $this->em->flush();

            $this->mailer->send($email);
        }
    }
}
