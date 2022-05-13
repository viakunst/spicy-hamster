<?php

namespace App\Tests\Entity;

use App\Entity\Admin;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

/**
 * Class AdminTest.
 *
 * @covers \App\Entity\Admin
 */
class AdminTest extends TestCase
{
    /**
     * @var Admin
     */
    protected $admin;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = new Admin();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->admin);
    }

    public function testGetOidc(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Admin::class))
            ->getProperty('oidc');
        $property->setAccessible(true);
        $property->setValue($this->admin, $expected);
        $this::assertSame($expected, $this->admin->getOidc());
    }

    public function testSetOidc(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Admin::class))
            ->getProperty('oidc');
        $property->setAccessible(true);
        $this->admin->setOidc($expected);
        $this::assertSame($expected, $property->getValue($this->admin));
    }
}
