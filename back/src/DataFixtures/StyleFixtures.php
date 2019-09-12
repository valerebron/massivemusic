<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Finder\Finder;
use App\Entity\Style;

class StyleFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $finder = new Finder();
        $finder->files()->name('styles.json')->in('../datas/');
        foreach ($finder as $file) {
            $stylesJson = $file->getContents();
        }
        $stylesArray = json_decode($stylesJson, true);
        foreach($stylesArray as $style) {
            $styleEntity = new style();
            $styleEntity->setName($style['value'])
                        ->setUrl($style['url']);
            $manager->persist($styleEntity);
        }
        $manager->flush();
    }
}
