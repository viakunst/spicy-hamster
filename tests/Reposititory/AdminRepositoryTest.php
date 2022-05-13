<?php

namespace App\Tests\Repository;

use App\Entity\Admin;
use App\Repository\AdminRepository;
use App\Tests\AuthWebTestCase;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * Class AdminRepositoryTest.
 *
 * @covers \App\Repository\AdminRepository
 */
class AdminRepositoryTest extends AuthWebTestCase
{
    private ManagerRegistry $reg;
    private EntityManagerInterface $em;

    /**
     * @var AdminRepository
     */
    protected $repo;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->reg = $this->client->getContainer()->get(ManagerRegistry::class);
        $this->em = $this->client->getContainer()->get(EntityManagerInterface::class);
        $this->repo = new AdminRepository($this->reg);
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->reg);
        unset($this->repo);
        unset($this->em);
    }

    public function testAdd(): void
    {
        $admin2 = new Admin();
        $admin2->setOidc('admin2oidc');

        $this->repo->add($admin2);
        $found = $this->em->getRepository(Admin::class)->find('admin2oidc');
        $this::assertNotNull($found);
    }

    public function testRemove(): void
    {
        $admin2 = new Admin();
        $admin2->setOidc('admin2oidc');

        $this->repo->add($admin2);
        $found = $this->em->getRepository(Admin::class)->find('admin2oidc');
        $this::assertNotNull($found);

        $this->repo->remove($admin2);
        $found = $this->em->getRepository(Admin::class)->find('admin2oidc');
        $this::assertNull($found);
    }
}
