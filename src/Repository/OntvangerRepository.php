<?php

namespace App\Repository;

use App\Entity\Ontvanger;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Ontvanger|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ontvanger|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ontvanger[]    findAll()
 * @method Ontvanger[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OntvangerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ontvanger::class);
    }

    // /**
    //  * @return Ontvanger[] Returns an array of Ontvanger objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Ontvanger
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
