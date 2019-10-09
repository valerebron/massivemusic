<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use App\Repository\MemberRepository;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(MemberRepository $repo)
    {
        header("Access-Control-Allow-Origin: *");
        $membersArray = $this->loopMembers($repo->findAll());
        return $this->json('massivemusic API');
    }
}
