<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Finder\Finder;
use App\Entity\Track;

class TrackFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $finder = new Finder();
        $finder->files()->name('tracks.json')->in('../datas/');
        foreach ($finder as $file) {
            $tracksJson = $file->getContents();
        }
        $tracksArray = json_decode($tracksJson, true);
        foreach($tracksArray as $track) {
            $trackEntity = new Track();
            $trackCreatedAt = new \DateTime();

            $trackEntity->setIdYt($track['id_yt'])
                        ->setTitle(str_replace('&amp;', '&', $track['title']))
                        ->setArtist(str_replace('&amp;', '&', $track['artist']))
                        ->setDuration((int)$track['duration'])
                        ->setPlayCount((int)$track['play_count'])
                        ->setInvalid((int)$track['invalid'])
                        ->setCreatedAt($trackCreatedAt->setTimestamp($track['timestamp']))
                        ->setStyle((int)$track['style'])
                        ->setMember((int)$track['user']);

            $manager->persist($trackEntity);
        }
        $manager->flush();
    }
}
