<?php

namespace App\Repository;

use App\Entity\LokaalPersoon;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LokaalPersoon|null find($id, $lockMode = null, $lockVersion = null)
 * @method LokaalPersoon|null findOneBy(array $criteria, array $orderBy = null)
 * @method LokaalPersoon[]    findAll()
 * @method LokaalPersoon[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LokaalPersoonRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LokaalPersoon::class);
    }

    // /**
    //  * @return LokaalPersoon[] Returns an array of LokaalPersoon objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LokaalPersoon
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
