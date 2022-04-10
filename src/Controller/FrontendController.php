<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FrontendController extends AbstractController
{
    /**
     * @Route("/{route}", requirements={"route"=".*"}, priority=99)
     */
    public function indexAction(): Response
    {
        return $this->render('base.html.twig');
    }
}
