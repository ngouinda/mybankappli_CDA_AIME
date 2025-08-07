<?php

namespace App\Form;

use App\Entity\Depenses;
use App\Entity\Categorie;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class DepensesType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('montant', IntegerType::class, [
                'label' => 'Montant'
            ])
            ->add('date', DateTimeType::class, [
                'label' => 'Date',
                'widget' => 'single_text'
            ])
            ->add('description', TextType::class, [
                'label' => 'Description'
            ])
            ->add('categorie', ChoiceType::class, [
                'choices' => $options['categories'],
                'label' => 'Catégorie',
                'choice_label' => function (?Categorie $categorie) {
                    return $categorie ? $categorie->getName() : '';
                },
                'placeholder' => 'Choisir une catégorie',
            ])
            ->add('save', SubmitType::class, [
                'label' => 'Ajouter la dépense'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Depenses::class,
            'categories' => [], 
        ]);
    }
}
