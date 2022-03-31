<?php

namespace App\Tests;

use App\Entity\Person\Person;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PersonFixture extends Fixture
{
    public const PERSON_ADRESS_REFERENCE = 'localhost';

    public function load(ObjectManager $manager): void
    {
        $location = new Person();
        $location->setAddress('@localhost');

        $manager->persist($location);
        $this->addReference(self::PERSON_ADRESS_REFERENCE, $location);

        $manager->flush();
    }
}
