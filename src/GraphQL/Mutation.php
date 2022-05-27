<?php

namespace App\GraphQL;

use App\Entity\Mail\Mail;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The root of all mutation operations.")
 */
class Mutation
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
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete mail.")
     * @GQL\Access("isAuthenticated()")
     */
    public function deletemail(string $id): string
    {
        $dbmail = $this->em->getRepository(Mail::class)->findOneBy(['id' => $id]);
        if (null !== $dbmail) {
            $this->em->remove($dbmail);
            $this->em->flush();

            return 'success';
        }

        return "failure: mail with id {$id} was not found";
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
