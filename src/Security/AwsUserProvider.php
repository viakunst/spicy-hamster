<?php

namespace App\Security;

use App\Entity\Security\AwsUser;
use App\Providers\Aws\RemoteUserServiceInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class AwsUserProvider implements UserProviderInterface
{
    public const ADMIN_ACCESS = 'admin';
    public const USER_ACCESS = 'user';
    public const NO_ACCESS = 'none';

    private RemoteUserServiceInterface $awsService;

    public function __construct(RemoteUserServiceInterface $rum)
    {
        $this->awsService = $rum;
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        $user = new AwsUser($identifier);

        $this->awsService->populateUser($user);

        return $user;
    }

    public function refreshUser(UserInterface $user)
    {
    }

    /**
     * Whether this provider supports the given user class.
     *
     * @return bool
     */
    public function supportsClass(string $class)
    {
        if ('App\Entity\Security\AwsUser' == $class) {
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
