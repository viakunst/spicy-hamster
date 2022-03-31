<?php

namespace App\Tests;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;
use Liip\TestFixturesBundle\Services\DatabaseToolCollection;
use Liip\TestFixturesBundle\Services\DatabaseTools\AbstractDatabaseTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Extends the WebTestCase class with support for logging in and fixtures.
 */
class AuthWebTestCase extends WebTestCase
{
    /** @var AbstractDatabaseTool */
    protected $databaseTool;

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
        $this->client->followRedirects(true);

        if (null != static::getContainer()->get(DatabaseToolCollection::class)) {
            $this->databaseTool = static::getContainer()->get(DatabaseToolCollection::class)->get();
        }

        // Get all database tables
        $em = static::getContainer()->get(EntityManagerInterface::class);
        $cmf = $em->getMetadataFactory();
        $classes = $cmf->getAllMetadata();

        // Write all tables to database
        $schema = new SchemaTool($em);
        $schema->createSchema($classes);
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->client);
    }
}
