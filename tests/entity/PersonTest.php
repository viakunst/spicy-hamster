<?php

namespace Tests\Unit\Entity\Person;

use App\Entity\Person\Person;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

/**
 * Class PersonTest.
 *
 * @covers \App\Entity\Person\Person
 */
class PersonTest extends TestCase
{
    /**
     * @var Person
     */
    protected $person;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        /* @todo Correctly instantiate tested object to use it. */
        $this->person = new Person();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->person);
    }

    public function testGetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $property->setValue($this->person, $expected);
        $this::assertSame($expected, $this->person->getId());
    }

    public function testGetSub(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('sub');
        $property->setAccessible(true);
        $property->setValue($this->person, $expected);
        $this::assertSame($expected, $this->person->getSub());
    }

    public function testSetSub(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('sub');
        $property->setAccessible(true);
        $this->person->setSub($expected);
        $this::assertSame($expected, $property->getValue($this->person));
    }

    public function testGetEmail(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('email');
        $property->setAccessible(true);
        $property->setValue($this->person, $expected);
        $this::assertSame($expected, $this->person->getEmail());
    }

    public function testSetEmail(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('email');
        $property->setAccessible(true);
        $this->person->setEmail($expected);
        $this::assertSame($expected, $property->getValue($this->person));
    }

    public function testGetUsername(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testGetName(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testSetName(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testGetGivenName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('givenName');
        $property->setAccessible(true);
        $property->setValue($this->person, $expected);
        $this::assertSame($expected, $this->person->getGivenName());
    }

    public function testSetGivenName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('givenName');
        $property->setAccessible(true);
        $this->person->setGivenName($expected);
        $this::assertSame($expected, $property->getValue($this->person));
    }

    public function testGetFamilyName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('familyName');
        $property->setAccessible(true);
        $property->setValue($this->person, $expected);
        $this::assertSame($expected, $this->person->getFamilyName());
    }

    public function testSetFamilyName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Person::class))
            ->getProperty('familyName');
        $property->setAccessible(true);
        $this->person->setFamilyName($expected);
        $this::assertSame($expected, $property->getValue($this->person));
    }

    public function testGetAdress(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testSetAdress(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }
}
