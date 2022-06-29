<?php

namespace App\GraphQL\Input;

use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @GQL\Input
 */
class TransactionType
{
    public const PAID = 'Voldaan';
    public const OUTSTANDING = 'Openstaand';

    // Everything public as this is just a datacarrier.

    /**
     * @GQL\Field(type="String!")
     */
    public string $personId;

    /**
     * @GQL\Field(type="Int!")
     */
    public int $amount;

    /**
     * @GQL\Field(type="Int!")
     */
    public int $timesReminded;

    /**
     * @GQL\Field(type="String!")
     */
    public string $status;

    /**
     * @GQL\Field(type="String")
     */
    public ?string $comment;
}
