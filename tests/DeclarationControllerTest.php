<?php

namespace App\Tests\Functional\Controller\Activity;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Class DeclarationControllerTest.
 *
 * @covers \App\Controller\DeclarationController
 */
class DeclarationControllerTest extends WebTestCase
{
    /**
     * @var \Symfony\Bundle\FrameworkBundle\KernelBrowser
     */
    protected $client;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->client = static::createClient();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->client);
    }

    public function testIndexAction(): void
    {
        // Arrange
        $this->client->request('GET', '/geef/geld');
        self::assertEquals(500, $this->client->getResponse()->getStatusCode());
    }
}
