<?php

namespace App\Tests\Entity;

use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use App\Entity\Transaction\TransactionGroup;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

/**
 * Class TransactionTest.
 *
 * @covers \App\Entity\Transaction\Transaction
 */
class TransactionTest extends TestCase
{
    /**
     * @var Transaction
     */
    protected $transaction;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        /* @todo Correctly instantiate tested object to use it. */
        $this->transaction = new Transaction();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->transaction);
    }

    public function testGetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $property->setValue($this->transaction, $expected);
        $this::assertSame($expected, $this->transaction->getId());
    }

    public function testSetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $this->transaction->setId($expected);
        $this::assertSame($expected, $property->getValue($this->transaction));
    }

    public function testGetPerson(): void
    {
        $expected = $this->createMock(Person::class);
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('person');
        $property->setAccessible(true);
        $property->setValue($this->transaction, $expected);
        $this::assertSame($expected, $this->transaction->getPerson());
    }

    public function testSetPerson(): void
    {
        $expected = $this->createMock(Person::class);
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('person');
        $property->setAccessible(true);
        $this->transaction->setPerson($expected);
        $this::assertSame($expected, $property->getValue($this->transaction));
    }

    public function testGetTransactionGroup(): void
    {
        $expected = $this->createMock(TransactionGroup::class);
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('transactionGroup');
        $property->setAccessible(true);
        $property->setValue($this->transaction, $expected);
        $this::assertSame($expected, $this->transaction->getTransactionGroup());
    }

    public function testSetTransactionGroup(): void
    {
        $expected = $this->createMock(TransactionGroup::class);
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('transactionGroup');
        $property->setAccessible(true);
        $this->transaction->setTransactionGroup($expected);
        $this::assertSame($expected, $property->getValue($this->transaction));
    }

    public function testGetStatus(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('status');
        $property->setAccessible(true);
        $property->setValue($this->transaction, $expected);
        $this::assertSame($expected, $this->transaction->getStatus());
    }

    public function testSetStatus(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('status');
        $property->setAccessible(true);
        $this->transaction->setStatus($expected);
        $this::assertSame($expected, $property->getValue($this->transaction));
    }

    public function testGetComment(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('comment');
        $property->setAccessible(true);
        $property->setValue($this->transaction, $expected);
        $this::assertSame($expected, $this->transaction->getComment());
    }

    public function testSetComment(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('comment');
        $property->setAccessible(true);
        $this->transaction->setComment($expected);
        $this::assertSame($expected, $property->getValue($this->transaction));
    }

    public function testGetAmount(): void
    {
        $expected = 42;
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('amount');
        $property->setAccessible(true);
        $property->setValue($this->transaction, $expected);
        $this::assertSame($expected, $this->transaction->getAmount());
    }

    public function testSetAmount(): void
    {
        $expected = 42;
        $property = (new ReflectionClass(Transaction::class))
            ->getProperty('amount');
        $property->setAccessible(true);
        $this->transaction->setAmount($expected);
        $this::assertSame($expected, $property->getValue($this->transaction));
    }
}
