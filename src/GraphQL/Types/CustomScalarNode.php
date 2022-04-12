<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\ValueNode;

class CustomScalarNode extends Node implements ValueNode
{
    /** @var string */
    public $value;
}
