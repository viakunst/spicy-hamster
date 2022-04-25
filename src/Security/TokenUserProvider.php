<?php

namespace App\Security;

use App\Entity\Security\TokenUser;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class TokenUserProvider implements UserProviderInterface
{
    private TokenUserServiceInterface $tokenUserService;

    public function __construct(TokenUserServiceInterface $tokenUserService)
    {
        $this->tokenUserService = $tokenUserService;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        $user = new TokenUser($identifier);

        $this->tokenUserService->populateUser($user);
        $this->tokenUserService->populateRoles($user);
        // var_dump($user);

        return $user;
    }

    public function refreshUser(UserInterface $user)
    {
        return $user;
    }

    /**
     * Whether this provider supports the given user class.
     *
     * @return bool
     */
    public function supportsClass(string $class)
    {
        if ('App\Entity\Security\TokenUser' == $class) {
            return true;
        }

        return false;
    }

    /**
     * @return UserInterface
     *
     * @throws UserNotFoundException
     *
     * @deprecated since Symfony 5.3, use loadUserByIdentifier() instead
     */
    public function loadUserByUsername(string $username)
    {
    }
}
