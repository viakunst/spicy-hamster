<?php

namespace App\Repository;

use App\Entity\Bedrag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Bedrag|null find($id, $lockMode = null, $lockVersion = null)
 * @method Bedrag|null findOneBy(array $criteria, array $orderBy = null)
 * @method Bedrag[]    findAll()
 * @method Bedrag[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BedragRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Bedrag::class);
    }

    // /**
    //  * @return Bedrag[] Returns an array of Bedrag objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Bedrag
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
