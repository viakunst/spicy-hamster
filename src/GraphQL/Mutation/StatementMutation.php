<?php

namespace App\GraphQL\Mutation;

use App\Entity\Statement\Statement;
use Overblog\GraphQLBundle\Annotation as GQL;

/**
 * This classes houses all of the create update and delete functions.
 *
 * @GQL\Type
 * @GQL\Description("The statement mutation operations.")
 */
class StatementMutation extends AbstractMutation
{
    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Create statement.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function createStatement(Statement $statement): string
    {
        $dbstatement = new statement();
        $dbstatement->cloneFrom($statement);

        // Check validation errors.
        $msg = $this->validate($dbstatement);
        if (null !== $msg) {
            return $msg;
        }

        $this->em->persist($dbstatement);
        $this->em->flush();

        return 'succes';
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Update statement.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function updateStatement(string $id, Statement $statement): string
    {
        $dbstatement = $this->em->getRepository(Statement::class)->findOneBy(['id' => $id]);
        if (null !== $dbstatement) {
            $dbstatement->cloneFrom($statement);

            // Check validation errors.
            $msg = $this->validate($dbstatement);
            if (null !== $msg) {
                return $msg;
            }

            $this->em->persist($dbstatement);
            $this->em->flush();

            return 'success';
        }

        return "failure: statement with id {$id} was not found";
    }

    /**
     * @GQL\Field(type="String!")
     * @GQL\Description("Delete statement.")
     * @GQL\Access("hasRole('ROLE_ADMIN')")
     */
    public function deleteStatement(string $id): string
    {
        $dbstatement = $this->em->getRepository(Statement::class)->findOneBy(['id' => $id]);
        if (null !== $dbstatement) {
            $this->em->remove($dbstatement);
            $this->em->flush();

            return 'success';
        }

        return "failure: statement with id {$id} was not found";
    }
}
