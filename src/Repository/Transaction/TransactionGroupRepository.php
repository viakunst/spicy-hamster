<?php

namespace App\Repository\Transaction;

use App\Entity\Transaction\TransactionGroup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TransactionGroup>
 *
 * @method TransactionGroup|null find($id, $lockMode = null, $lockVersion = null)
 * @method TransactionGroup|null findOneBy(array $criteria, array $orderBy = null)
 * @method TransactionGroup[]    findAll()
 * @method TransactionGroup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TransactionGroupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TransactionGroup::class);
    }

    // /**
    //  * @return TransactionGroup[] Returns an array of TransactionGroup objects
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
    public function findOneBySomeField($value): ?TransactionGroup
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
