<?php

namespace App\GraphQL\Types;

use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * @GQL\Scalar(name="DateTimeScalar")
 */
class DateTimeScalar
{
    /**
     * @return string
     */
    public static function serialize(\DateTime $value)
    {
        return $value->format(\DateTime::RFC3339);
    }

    /**
     * @param string $value
     *
     * @return \DateTime
     */
    public static function parseValue($value)
    {
        return new \DateTime($value);
    }

    /**
     * @return \DateTime
     */
    public static function parseLiteral(CustomScalarNode $valueNode)
    {
        return new \DateTime($valueNode->value);
    }
}
