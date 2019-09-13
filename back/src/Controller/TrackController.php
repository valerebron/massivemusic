<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Finder\Finder;
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
        $tracksArray = $this->loopTracks($repo->findOneByIdYt($idYt));
        return $this->json($tracksArray);
    }

    /**
     * @Route("/tracks/invalidate/{idYt}", name="tracks/invalidate")
     */
    public function trackInvalidate(TrackRepository $repo, $idYt, ObjectManager $manager)
    {
        $track = $repo->findOneByIdYt($idYt);
        $track->setInvalid(true);
        $manager->flush();
        return $this->json(['invalidated' => $idYt]);
    }

    /**
     * @Route("/tracks/style/{idStyle}", name="tracks_style")
     */
    public function trackByStyle(TrackRepository $repo, $idStyle)
    {
        $tracksArray = $this->loopTracks($repo->findByStyle($idStyle));
        return $this->json($tracksArray);
    }

    /**
     * @Route("/tracks/{keyword}", name="tracks_search")
     * @Route("/tracks/style/{idStyle}/{keyword}", name="search_style_search")
     */
    public function trackByKeyword(TrackRepository $repo, $keyword = '', $idStyle = '')
    {
        $tracksArray = $this->loopTracks($repo->findByKeyword($keyword, $idStyle));
        return $this->json($tracksArray);
    }

    // /**
    //  * @Route("/tracks/add", name="add_tracks")
    //  */
    // public function add(TrackRepository $repo, ObjectManager $manager)
    // {
    //     $finder = new Finder();
    //     $finder->files()->name('tracks2.json')->in('../');
    //     foreach ($finder as $file) {
    //         $tracksJson = $file->getContents();
    //     }
    //     $tracksArray = json_decode($tracksJson, true);
    //     $styleRepo = $this->getDoctrine()->getRepository(Style::class);
    //     $memberRepo = $this->getDoctrine()->getRepository(Member::class);

    //     foreach($tracksArray as $track) {
    //         $trackEntity = new Track();
    //         $trackCreatedAt = new \DateTime();
    //         $style = $styleRepo->find($track['style']);
    //         $member = $memberRepo->find($track['user']);

    //         $trackEntity->setIdYt($track['id_yt'])
    //                 ->setTitle(str_replace('&amp;', '&', $track['title']))
    //                 ->setArtist(str_replace('&amp;', '&', $track['artist']))
    //                 ->setStyle($style)
    //                 ->setCreatedAt($trackCreatedAt->setTimestamp($track['timestamp']))
    //                 ->setInvalid((int)$track['invalid'])
    //                 ->setDuration((int)$track['duration'])
    //                 ->setMember($member)
    //                 ->setPlayCount((int)$track['play_count']);
    //         $manager->persist($trackEntity);
    //     }

    //     $manager->flush();
    //     return $this->json([count($tracksArray), ' track(s) added, yeah !']);
    //     // return $this->json($tracksArray);
    // }

}
