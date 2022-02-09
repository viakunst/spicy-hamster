<?php

namespace App\Repository;

use App\Entity\TransactieGroep;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TransactieGroep|null find($id, $lockMode = null, $lockVersion = null)
 * @method TransactieGroep|null findOneBy(array $criteria, array $orderBy = null)
 * @method TransactieGroep[]    findAll()
 * @method TransactieGroep[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactieGroepRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TransactieGroep::class);
    }

    // /**
    //  * @return TransactieGroep[] Returns an array of TransactieGroep objects
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
    public function findOneBySomeField($value): ?TransactieGroep
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
