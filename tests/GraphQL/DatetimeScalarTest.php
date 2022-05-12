<?php

namespace Tests\Unit\GraphQL\Types;

use App\GraphQL\Types\DatetimeScalar;
use PHPUnit\Framework\TestCase;

/**
 * Class DatetimeScalarTest.
 *
 * @covers \App\GraphQL\Types\DatetimeScalar
 */
class DatetimeScalarTest extends TestCase
{
    /**
     * @var DatetimeScalar
     */
    protected $datetimeScalar;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        /* @todo Correctly instantiate tested object to use it. */
        $this->datetimeScalar = new DatetimeScalar();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->datetimeScalar);
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
