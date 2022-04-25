<?php

namespace App\Security;

use App\Entity\Security\TokenUser;

interface TokenUserServiceInterface
{
    public function isAuthorized(TokenUser $user): bool;

    public function populateRoles(TokenUser $user): void;

    public function populateUser(TokenUser $user): void;
}
