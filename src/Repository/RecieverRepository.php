<?php

namespace App\Repository;

use App\Entity\Reciever;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Reciever|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reciever|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reciever[]    findAll()
 * @method Reciever[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecieverRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reciever::class);
    }

    // /**
    //  * @return Reciever[] Returns an array of Reciever objects
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
    public function findOneBySomeField($value): ?Reciever
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
