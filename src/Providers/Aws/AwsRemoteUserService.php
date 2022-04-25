<?php

namespace App\Providers\Aws;

use App\Entity\Security\TokenUser;
use App\Security\TokenUserServiceInterface;

/**
 * This class fills in the gaps in the userclass.
 */
class AwsRemoteUserService implements TokenUserServiceInterface
{
    public function isAuthorized(TokenUser $user): bool
    {
        return false;
    }

    public function populateRoles(TokenUser $user): void
    {
        if ('adminToken' == $user->getToken()) {
            $user->setRoles(['ROLE_USER', 'ROLE_ADMIN']);
        }

        if ('userToken' == $user->getToken()) {
            $user->setRoles(['ROLE_USER']);
        }
    }

    public function populateUser(TokenUser $user): void
    {
        $user->setEmail('mail@user.com');
    }
}
