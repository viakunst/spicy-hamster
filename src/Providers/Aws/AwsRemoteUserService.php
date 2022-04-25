<?php

namespace App\Providers\Aws;

use App\Entity\Security\AwsUser;

/**
 * This class fills in the gaps in the userclass.
 */
class AwsRemoteUserService implements RemoteUserServiceInterface
{
    public function isAuthorized(AwsUser $user): bool
    {
        return false;
    }

    public function populateRoles(AwsUser $user): void
    {
        if ('adminToken' == $user->getToken()) {
            $user->setRoles(['ROLE_USER', 'ROLE_ADMIN']);
        }

        if ('userToken' == $user->getToken()) {
            $user->setRoles(['ROLE_USER']);
        }
    }

    public function populateUser(AwsUser $user): void
    {
        $user->setEmail('mail@user.com');
    }
}
