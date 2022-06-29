<?php

namespace App\GraphQL\Input;

use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @GQL\Input
 */
class TransactionGroupType
{
    // Everything public as this is just a datacarrier.

    /**
     * @GQL\Field(type="String!")
     */
    public string $title;

    /**
     * @GQL\Field(type="String!")
     */
    public string $description;

    /**
     * @GQL\Field(type="DateTimeScalar!")
     */
    public \DateTime $date;

    /**
     * @GQL\Field(type="String!")
     */
    public String $bankAccountId;

    /**
     * @GQL\Field(type="[TransactionTypeInput]")
     * might need to change the type to any below.
     *
     * @var array<TransactionType>
     */
    public $transactions;
}
