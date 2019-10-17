<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\TrackRepository;
use App\Repository\StyleRepository;
use App\Repository\MemberRepository;
use App\Entity\Track;
use App\Entity\Style;
use App\Entity\Member;

class TrackController extends AbstractController
{
    public function loopTracks($tracks) {
        $tracksArray = array();
        foreach($tracks as $key=>$track) {
            $tracksArray[$key] = [
                'id_yt'      => $track->getIdYt(),
                'title'     => $track->getTitle(),
                'artist'    => $track->getArtist(),
                'style_id'   => $track->getStyle()->getId(),
                'member_id'  => $track->getMember()->getId(),
                'createdAt' => $track->getCreatedAt()->getTimestamp(),
                'duration'  => $track->getDuration(),
                'invalid'   => $track->getInvalid(),
                'playCount' => $track->getPlayCount()
            ];
        }
        return $tracksArray;
    }

    /**
     * @Route("/tracks", name="all_tracks")
     */
    public function index(TrackRepository $repo)
    {
        header("Access-Control-Allow-Origin: *");
        $tracksArray = $this->loopTracks($repo->findByInvalid(false));
        return $this->json($tracksArray);
    }

    /**
     * @Route("/tracks/single/{idYt}", name="tracks/idYt")
     */
    public function trackByIdYt(TrackRepository $repo, $idYt)
    {
        header("Access-Control-Allow-Origin: *");
        $tracksArray = $this->loopTracks($repo->findOneByIdYt($idYt));
        return $this->json($tracksArray);
    }

    /**
     * @Route("/tracks/invalidate/{idYt}", name="tracks/invalidate")
     */
    public function trackInvalidate(TrackRepository $repo, $idYt, ObjectManager $manager)
    {
        if($_SERVER['HTTP_ORIGIN'] == 'https://massivemusic.fr') {
            header("Access-Control-Allow-Origin: *");
            $track = $repo->findOneByIdYt($idYt);
            $track->setInvalid(true);
            $manager->flush();
            return $this->json([$track->getIdYt(), $track->getTitle()]);
        }
        else {
            return $this->json(['kill all humans']);
        }
    }

    /**
     * @Route("/tracks/style/{idStyle}", name="tracks/style")
     */
    public function trackByStyle(TrackRepository $repo, $idStyle)
    {
        header("Access-Control-Allow-Origin: *");
        $tracksArray = $this->loopTracks($repo->findByStyle($idStyle));
        return $this->json($tracksArray);
    }

    /**
     * @Route("/tracks/add", name="tracks/add")
     */
    public function trackAdd(TrackRepository $repo, ObjectManager $manager, Request $request)
    {
        // header("Access-Control-Allow-Origin: *");
        // $track = json_decode("{test: 'wow'}", true);
        // $styleRepo = $this->getDoctrine()->getRepository(Style::class);
        // $memberRepo = $this->getDoctrine()->getRepository(Member::class);

        // $trackEntity = new Track();
        // $trackCreatedAt = new \DateTime();
        // $style = $styleRepo->find($track['style']);
        // $member = $memberRepo->find($track['user']);

        // $trackEntity->setIdYt($track['id_yt'])
        //         ->setTitle(str_replace('&amp;', '&', $track['title']))
        //         ->setArtist(str_replace('&amp;', '&', $track['artist']))
        //         ->setStyle($style)
        //         ->setCreatedAt($trackCreatedAt->setTimestamp($track['timestamp']))
        //         ->setInvalid((int)$track['invalid'])
        //         ->setDuration((int)$track['duration'])
        //         ->setMember($member)
        //         ->setPlayCount((int)$track['play_count']);
        // $manager->persist($trackEntity);

        // $manager->flush();
        return $this->json(['$_POST', $_POST]);
        // return $this->json('track added, yeah !');
    }
}
