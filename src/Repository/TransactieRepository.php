<?php

namespace App\Repository;

use App\Entity\Transactie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Transactie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Transactie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Transactie[]    findAll()
 * @method Transactie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Transactie::class);
    }

    // /**
    //  * @return Transactie[] Returns an array of Transactie objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Transactie
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
