<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Class FrontendControllerTest.
 *
 * @covers \App\Controller\FrontendController
 */
class FrontendControllerTest extends WebTestCase
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
        $this->client->request('GET', '/');
        self::assertEquals(200, $this->client->getResponse()->getStatusCode());
    }
}
