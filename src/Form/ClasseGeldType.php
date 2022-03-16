<?php

namespace App\Form;

use App\Entity\Declaration;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Vich\UploaderBundle\Form\Type\VichImageType;

class ClasseGeldType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('naam')
            ->add('IBAN')
            ->add('mail')
            ->add('geld')
            ->add('item')
            ->add('reason')
            ->add('commissie')
            ->add('imageFile', VichImageType::class)
            ->add('opmerking')
            ->add('akkoord')
            ->add('Stuur', SubmitType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Declaration::class,
        ]);
    }
}
