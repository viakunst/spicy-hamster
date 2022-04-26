<?php

namespace App\Tests\Entity;

use App\Entity\Person\Person;
use App\Tests\AuthWebTestCase;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Class FixtureTest. Test if fixtures work.
 */
class FixtureTest extends AuthWebTestCase
{
    private EntityManagerInterface $em;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->em = $this->client->getContainer()->get(EntityManagerInterface::class);
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        $this->em->close();
        parent::tearDown();
    }

    public function testPersonFixture(): void
    {
        $person1 = $this->em->getRepository(Person::class)->findOneBy(['id' => 'id1']);
        $this::assertNotNull($person1);
        $this::assertEquals('person@hotmail.com', $person1->getEmail());
    }
}
