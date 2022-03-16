<?php

namespace App\Controller;

use App\Entity\Declaration;
use App\Form\ClasseGeldType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;

class GeefGeldController extends AbstractController
{
    /**
     * @Route("/geef/geld", name="geef_geld")
     */
    public function new(Request $request, ManagerRegistry $doctrine): Response
    {
        // creates a munnie object and initializes some data for this example
        $munnie = new Declaration();
        $munnie->setNaam('Arnie Geldbaas');
        $munnie->setIBAN('NL12GELD1234567890');
        $munnie->setMail('Pooier@arnieB.vk');
        $munnie->setGeld(420.69);
        $munnie->setItem('Gezond verstand');
        $munnie->setReason("Heeft bestuur nog niet");
        $munnie->setCommissie(['Feestco', 'AcCie maar eigenlijk Aco', 'webco met mooie broek']);
        $munnie->setOpmerking("");
        $munnie->setAkkoord(False);

        $form = $this->createForm(ClasseGeldType::class, $munnie);
        
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            // $form->getData() holds the submitted values
            // but, the original `$task` variable has also been updated
            $task = $form->getData();

            // ... perform some action, such as saving the task to the database
            $entityManager = $doctrine->getManager();

            $entityManager->persist($task);
            $entityManager->flush();
        }
        
        return $this->renderForm('geef_geld/new.html.twig', [
            'form' => $form,
        ]);
    }

    public function index(): Response
    {
        return $this->render('geef_geld/index.html.twig', [
            'controller_name' => 'GeefGeldController',
        ]);
    }
}
