<?php

namespace App\Tests;

use App\Entity\Statement\Statement;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class StatementFixture extends Fixture
{
    public const STATEMENT_COMMENT_REFERENCE = 'localhost';

    public function load(ObjectManager $manager): void
    {
        $statement = new Statement();
        $statement->setComment('@localhost');

        $manager->persist($statement);
        $this->addReference(self::STATEMENT_COMMENT_REFERENCE, $statement);

        $manager->flush();
    }
}
