<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FrontendController extends AbstractController
{
    /**
     * @Route("/{route}", requirements={"route"=".*"})
     */
    public function indexAction(): Response
    {
        return $this->render('base.html.twig');
    }
}
