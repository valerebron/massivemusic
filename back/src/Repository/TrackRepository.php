<?php

namespace App\Repository;

use App\Entity\Track;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Track|null find($id, $lockMode = null, $lockVersion = null)
 * @method Track|null findOneBy(array $criteria, array $orderBy = null)
 * @method Track[]    findAll()
 * @method Track[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrackRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Track::class);
    }

        // SELECT * FROM "track" WHERE ("title" ILIKE '%soul tied%' OR "artist" ILIKE '%soul tied%')
        // findByKeyword

    /**
     * @return Track[] Returns an array of Track objects
     */
    public function findByKeyword($keyword, $idStyle)
    {
        $queryBuilder = $this->createQueryBuilder('track');
        $queryBuilder

            // search in title and artist
            ->orWhere('LOWER(track.title) LIKE :searchterm')
            ->orWhere('LOWER(track.artist) LIKE :searchterm')
            ->andWhere('track.invalid = false')
            ->setParameter('searchterm', '%'.$keyword.'%')
            ->orderBy('track.createdAt', 'desc');

            // style filter
            if($idStyle != '') {
                $queryBuilder
                    ->innerJoin('App\Entity\Style', 'style', \Doctrine\ORM\Query\Expr\Join::WITH, 'style = track.style')
                    ->andWhere('style.id = :idstyle')
                    ->setParameter('idstyle', $idStyle);
            }

        return $queryBuilder->getQuery()->getResult();
    }

    // /**
    //  * @return Track[] Returns an array of Track objects
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
    public function findOneBySomeField($value): ?Track
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
