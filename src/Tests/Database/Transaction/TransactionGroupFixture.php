<?php

namespace App\Tests;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TransactionGroupFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $manager->flush();
    }
}
