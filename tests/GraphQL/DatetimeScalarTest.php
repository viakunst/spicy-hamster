<?php

namespace Tests\Unit\GraphQL\Types;

use App\GraphQL\Types\DateTimeScalar;
use PHPUnit\Framework\TestCase;

/**
 * Class DateTimeScalarTest.
 *
 * @covers \App\GraphQL\Types\DateTimeScalar
 */
class DateTimeScalarTest extends TestCase
{
    /**
     * @var DateTimeScalar
     */
    protected $dateTimeScalar;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        /* @todo Correctly instantiate tested object to use it. */
        $this->dateTimeScalar = new DateTimeScalar();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->dateTimeScalar);
    }

    public function testSerialize(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testParseValue(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }

    public function testParseLiteral(): void
    {
        /* @todo This test is incomplete. */
        $this::markTestIncomplete();
    }
}
