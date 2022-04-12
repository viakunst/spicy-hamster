<?php

namespace App\GraphQL;

use App\Entity\Person\Person;
use Doctrine\ORM\EntityManagerInterface;
use Overblog\GraphQLBundle\Annotation as GQL;

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

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @GQL\Field(type="[Person]")
     * @GQL\Description("All persons stored in the database.")
     * @GQL\Access("isAuthenticated()")
     *
     * @return Person[]
     */
    public function persons()
    {
        return $this->em->getRepository(Person::class)->findAll();
    }
}
