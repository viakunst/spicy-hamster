<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CMoney extends AbstractController
{
    /**
    * @Route("/geld")
    **/
    public function geldform(): Response
    {
        return $this->render('geld.html.twig', [

        ]);
    }
}