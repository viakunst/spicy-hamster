<?php

namespace App\GraphQL;

use App\Entity\Person\Person;
use App\Entity\Security\AwsUser;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation as GQL;
use Symfony\Component\Security\Core\Security;

/**
 * @GQL\Type
 * @GQL\Description("The root of all query operations.")
 */
class Query
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Security
     */
    private $sec;

    public function __construct(EntityManagerInterface $em, Security $sec)
    {
        $this->em = $em;
        $this->sec = $sec;
    }

    // @GQL\Access("isAuthenticated()")

    /**
     * @GQL\Field(type="[Person]")
     * @GQL\Description("All persons stored in the database.")
     *
     * @GQL\Access("hasRole('ROLE_USER')")
     *
     * @return Person[]
     */
    public function persons()
    {
        return $this->em->getRepository(Person::class)->findAll();
    }

    /**
     * @GQL\Field(type="AwsUser")
     * @GQL\Description("The currently authenticated user.")
     */
    public function user(): ?AwsUser
    {
        return $this->sec->getUser();
    }
}
