<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use App\Repository\MemberRepository;

class MemberController extends AbstractController
{
    public function loopMembers($members) {
        $membersArray = array();
        foreach($members as $key=>$member) {
            $membersArray[$key] = [
                'id'         => $member->getId(),
                'email'      => $member->getEmail(),
                'name'       => $member->getName(),
                'password'   => $member->getPassword(),
                'rank'       => $member->getRank(),
                'createdAt'  => $member->getCreatedAt()->getTimestamp(),
                'lastLogin'  => $member->getLastLogin()->getTimestamp()
            ];
        }
        return $membersArray;
    }

    /**
     * @Route("/members", name="members")
     */
    public function index(MemberRepository $repo)
    {
        $membersArray = $this->loopMembers($repo->findAll());
        return $this->json($membersArray);
    }

    /**
     * @Route("/members/{id}", name="member")
     */
    public function memberById(MemberRepository $repo, $id)
    {
        $membersArray = $this->loopMembers($repo->findById($id));
        return $this->json($membersArray);
    }
}
