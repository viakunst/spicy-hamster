<?php

namespace App\GraphQL\Types;

use App\Entity\Person\Person;
use App\Entity\Transaction\Transaction;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @GQL\type(name="PersonTransactions")
 */
class PersonTransactions
{
    /**
     * @GQL\Field(type="Person!")
     */
    public Person $person;

    /**
     * @GQL\Field(type="[Transaction]")
     *
     * @var array<Transaction>
     */
    public $transactions;

    /**
     * @param Transaction[] $transactions
     */
    public function __construct(Person $person, $transactions)
    {
        $this->person = $person;
        $this->transactions = $transactions;
    }
}
