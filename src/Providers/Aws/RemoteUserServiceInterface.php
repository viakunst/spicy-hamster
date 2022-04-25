<?php

namespace App\Providers\Aws;

use App\Entity\Security\AwsUser;

interface RemoteUserServiceInterface
{
    public function isAuthorized(AwsUser $user): bool;

    public function populateRoles(AwsUser $user): void;

    public function populateUser(AwsUser $user): void;
}
