<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Finder\Finder;
use App\Entity\Member;

    // As fixture:load purge the table user first
    // and user is a reserved word for postgresql
    // but Doctrine don't protect reserved word in DELETE query
    // User fixture is made with UserConrtoller.php in addUser method
    // Sooo finaly User is Member fck !

class MemberFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $finder = new Finder();
        $finder->files()->name('members.json')->in('../datas/');
        foreach ($finder as $file) {
            $membersJson = $file->getContents();
        }
        $membersArray = json_decode($membersJson, true);
        foreach($membersArray as $member) {
            $memberEntity = new member();
            $memberCreatedAt = new \DateTime();
            $memberLastLogin = new \DateTime();
            
            $memberEntity->setEmail($member['email'])
                       ->setName($member['name'])
                       ->setPassword($member['password'])
                       ->setRank((int)$member['grade'])
                       ->setCreatedAt($memberCreatedAt->setTimestamp($member['created_at']))
                       ->setLastLogin($memberLastLogin->setTimestamp($member['last_login']));
            $manager->persist($memberEntity);
        }
        $manager->flush();
    }
}
