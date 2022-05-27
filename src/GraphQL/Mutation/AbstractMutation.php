<?php

namespace App\GraphQL\Mutation;

use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AbstractMutation implements MutationInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var ValidatorInterface
     */
    protected $validator;

    public function __construct(EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->validator = $validator;
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
