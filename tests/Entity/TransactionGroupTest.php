<?php

namespace App\Tests\Entity;

use App\Entity\BankAccount\BankAccount;
use App\Entity\Transaction\TransactionGroup;
use DateTime;
use Doctrine\Common\Collections\Collection;
use PHPUnit\Framework\TestCase;
use ReflectionClass;

/**
 * Class TransactionGroupTest.
 *
 * @covers \App\Entity\Transaction\TransactionGroup
 */
class TransactionGroupTest extends TestCase
{
    /**
     * @var TransactionGroup
     */
    protected $transactionGroup;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->transactionGroup = new TransactionGroup();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->transactionGroup);
    }

    public function testGetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $property->setValue($this->transactionGroup, $expected);
        $this::assertSame($expected, $this->transactionGroup->getId());
    }

    public function testSetId(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('id');
        $property->setAccessible(true);
        $this->transactionGroup->setId($expected);
        $this::assertSame($expected, $property->getValue($this->transactionGroup));
    }

    public function testGetTitle(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('title');
        $property->setAccessible(true);
        $property->setValue($this->transactionGroup, $expected);
        $this::assertSame($expected, $this->transactionGroup->getTitle());
    }

    public function testSetTitle(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('title');
        $property->setAccessible(true);
        $this->transactionGroup->setTitle($expected);
        $this::assertSame($expected, $property->getValue($this->transactionGroup));
    }

    public function testGetDescription(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('description');
        $property->setAccessible(true);
        $property->setValue($this->transactionGroup, $expected);
        $this::assertSame($expected, $this->transactionGroup->getDescription());
    }

    public function testSetDesctiption(): void
    {
        $expected = '42';
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('description');
        $property->setAccessible(true);
        $this->transactionGroup->setDescription($expected);
        $this::assertSame($expected, $property->getValue($this->transactionGroup));
    }

    public function testGetDate(): void
    {
        $expected = $this->createMock(DateTime::class);
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('date');
        $property->setAccessible(true);
        $property->setValue($this->transactionGroup, $expected);
        $this::assertSame($expected, $this->transactionGroup->getDate());
    }

    public function testSetDate(): void
    {
        $expected = $this->createMock(DateTime::class);
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('date');
        $property->setAccessible(true);
        $this->transactionGroup->setDate($expected);
        $this::assertSame($expected, $property->getValue($this->transactionGroup));
    }

    public function testGetBankAccount(): void
    {
        $expected = $this->createMock(BankAccount::class);
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('bankAccount');
        $property->setAccessible(true);
        $property->setValue($this->transactionGroup, $expected);
        $this::assertSame($expected, $this->transactionGroup->getBankAccount());
    }

    public function testSetBankAccount(): void
    {
        $expected = $this->createMock(BankAccount::class);
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('bankAccount');
        $property->setAccessible(true);
        $this->transactionGroup->setBankAccount($expected);
        $this::assertSame($expected, $property->getValue($this->transactionGroup));
    }

    public function testGetTransactions(): void
    {
        $expected = $this->createMock(Collection::class);
        $property = (new ReflectionClass(TransactionGroup::class))
            ->getProperty('transactions');
        $property->setAccessible(true);
        $property->setValue($this->transactionGroup, $expected);
        $this::assertSame($expected, $this->transactionGroup->getTransactions());
    }

    public function testAddTransaction(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testRemoveTransaction(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }
}
