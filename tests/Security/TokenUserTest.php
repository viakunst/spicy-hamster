<?php

namespace App\Tests\Security;

use App\Security\TokenUser;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

/**
 * Class TokenUserTest.
 *
 * @covers \App\Security\TokenUser
 */
class TokenUserTest extends TestCase
{
    /**
     * @var TokenUser
     */
    protected $user;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->user = new TokenUser();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->user);
    }

    public function testGetToken(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('token');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getToken());
    }

    public function testSetToken(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('token');
        $property->setAccessible(true);
        $this->user->setToken($expected);
        $this::assertSame($expected, $property->getValue($this->user));
    }

    public function testGetSub(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('sub');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getSub());
    }

    public function testSetSub(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('sub');
        $property->setAccessible(true);
        $this->user->setSub($expected);
        $this::assertSame($expected, $property->getValue($this->user));
    }

    public function testGetName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('name');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getName());
    }

    public function testSetName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('name');
        $property->setAccessible(true);
        $this->user->setName($expected);
        $this::assertSame($expected, $property->getValue($this->user));
    }

    public function testGetEmail(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('email');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getEmail());
    }

    public function testSetEmail(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('email');
        $property->setAccessible(true);
        $this->user->setEmail($expected);
        $this::assertSame($expected, $property->getValue($this->user));
    }

    public function testGetUserIdentifier(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('token');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getUserIdentifier());
    }

    public function testGetUsername(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('token');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getUserIdentifier());
    }

    public function testGetRoles(): void
    {
        $expected = ['42', '43'];
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('roles');
        $property->setAccessible(true);
        $property->setValue($this->user, $expected);
        $this::assertSame($expected, $this->user->getRoles());
    }

    public function testSetRoles(): void
    {
        $expected = ['42', '43'];
        $property = (new ReflectionClass(TokenUser::class))
            ->getProperty('roles');
        $property->setAccessible(true);
        $this->user->setRoles($expected);
        $this::assertSame($expected, $property->getValue($this->user));
    }

    public function testGetPassword(): void
    {
        $this::assertNull($this->user->getPassword());
    }

    public function testGetSalt(): void
    {
        $this::assertNull($this->user->getSalt());
    }

    public function testEraseCredentials(): void
    {
        $this::markTestIncomplete();
    }
}
