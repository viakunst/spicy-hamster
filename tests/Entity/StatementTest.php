<?php

namespace App\Tests\Entity;

use App\Entity\Statement\Statement;
use PHPUnit\Framework\TestCase;
use ReflectionClass;
use Symfony\Component\HttpFoundation\File\File;

/**
 * Class StatementTest.
 *
 * @covers \App\Entity\Statement\Statement
 */
class StatementTest extends TestCase
{
    /**
     * @var Statement
     */
    protected $statement;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        /* @todo Correctly instantiate tested object to use it. */
        $this->statement = new Statement();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->statement);
    }

    public function testGetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getId());
    }

    public function testSetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $this->statement->setId($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('name');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getName());
    }

    public function testSetName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('name');
        $property->setAccessible(true);
        $this->statement->setName($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetIBAN(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testSetIBAN(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testGetMail(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('mail');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getMail());
    }

    public function testSetMail(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('mail');
        $property->setAccessible(true);
        $this->statement->setMail($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetItem(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('item');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getItem());
    }

    public function testSetItem(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('item');
        $property->setAccessible(true);
        $this->statement->setItem($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetReason(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('reason');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getReason());
    }

    public function testSetReason(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('reason');
        $property->setAccessible(true);
        $this->statement->setReason($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetGroups(): void
    {
        $expected = [];
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('group');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getGroups());
    }

    public function testSetGroups(): void
    {
        $expected = [];
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('group');
        $property->setAccessible(true);
        $this->statement->setGroups($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetComment(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('comment');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getComment());
    }

    public function testSetComment(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('comment');
        $property->setAccessible(true);
        $this->statement->setComment($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetFeedback(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('feedback');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getFeedback());
    }

    public function testSetFeedback(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('feedback');
        $property->setAccessible(true);
        $this->statement->setFeedback($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetStatus(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('status');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getStatus());
    }

    public function testSetStatus(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('status');
        $property->setAccessible(true);
        $this->statement->setStatus($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetAmount(): void
    {
        $expected = 42;
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('amount');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getAmount());
    }

    public function testSetAmount(): void
    {
        $expected = 42;
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('amount');
        $property->setAccessible(true);
        $this->statement->setAmount($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testSetImageFile(): void
    {
        $expected = $this->createMock(File::class);
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('imageFile');
        $property->setAccessible(true);
        $this->statement->setImageFile($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetImageFile(): void
    {
        $expected = $this->createMock(File::class);
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('imageFile');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getImageFile());
    }

    public function testSetImageName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('imageName');
        $property->setAccessible(true);
        $this->statement->setImageName($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetImageName(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('imageName');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getImageName());
    }

    public function testSetImageSize(): void
    {
        $expected = 42;
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('imageSize');
        $property->setAccessible(true);
        $this->statement->setImageSize($expected);
        $this::assertSame($expected, $property->getValue($this->statement));
    }

    public function testGetImageSize(): void
    {
        $expected = 42;
        $property = (new ReflectionClass(Statement::class))
            ->getProperty('imageSize');
        $property->setAccessible(true);
        $property->setValue($this->statement, $expected);
        $this::assertSame($expected, $this->statement->getImageSize());
    }
}
