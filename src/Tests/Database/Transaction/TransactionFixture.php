<?php

namespace App\Tests;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class TransactionFixture extends Fixture implements DependentFixtureInterface
{
    public const ACTIVITY_REFERENCE = 'activity-';

    public function load(ObjectManager $manager): void
    {
        $persons = $this->getReference(PersonFixture::PERSON_ADRESS_REFERENCE);
        $activityCount = 0;

        $activity = self::generate([$persons])->return();
        foreach ($activity as $object) {
            $this->setReference($this::ACTIVITY_REFERENCE.$activityCount, $object);
            $manager->persist($object);
            ++$activityCount;
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            PersonFixture::class,
        ];
    }

    public static function generate(array $persons): TestData
    {
    }
}
