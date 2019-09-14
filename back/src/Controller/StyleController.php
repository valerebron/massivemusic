<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use App\Repository\StyleRepository;

class StyleController extends AbstractController
{
    public function loopStyles($styles) {
        $stylesArray = array();
        foreach($styles as $key=>$style) {
            $stylesArray[$key] = [
                'id'   => $style->getId(),
                'name' => $style->getName(),
                'slug' => $style->getUrl()
            ];
        }
        return $stylesArray;
    }

    /**
     * @Route("/styles", name="styles")
     */
    public function index(StyleRepository $repo)
    {
        header("Access-Control-Allow-Origin: *");
        $stylesArray = $this->loopStyles($repo->findAll());
        return $this->json($stylesArray);
    }

    /**
     * @Route("/styles/{id}", name="style")
     */
    public function styleById(StyleRepository $repo, $id)
    {
        header("Access-Control-Allow-Origin: *");
        $stylesArray = $this->loopStyles($repo->findById($id));
        return $this->json($stylesArray);
    }
}
