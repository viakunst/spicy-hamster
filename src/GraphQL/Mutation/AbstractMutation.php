<?php

namespace App\GraphQL\Mutation;

use App\Mail\MailService;
use App\Mail\TransactionMailGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AbstractMutation implements MutationInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /** @var LoggerInterface */
    protected $logger;

    /**
     * @var ValidatorInterface
     */
    protected $validator;

    /**
     * @var MailService
     */
    protected $mailer;

    /**
     * @var TransactionMailGenerator
     */
    protected $mailGenerator;

    public function __construct(LoggerInterface $logger, EntityManagerInterface $em, ValidatorInterface $validator, MailService $mailer, TransactionMailGenerator $mailGenerator)
    {
        $this->logger = $logger;
        $this->em = $em;
        $this->validator = $validator;
        $this->mailer = $mailer;
        $this->mailGenerator = $mailGenerator;
    }

    /**
     * @return string|null
     */
    protected function validate(object $object)
    {
        $errors = $this->validator->validate($object);

        if (count($errors) > 0) {
            $msg = 'failure: on validation.';
            foreach ($errors as $err) {
                $msg = $msg."\n error: {$err->getMessage()}";
            }

            return $msg;
        }

        return null;
    }
}
