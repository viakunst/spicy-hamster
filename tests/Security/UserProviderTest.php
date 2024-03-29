<?php

namespace App\Tests\Security;

use App\Repository\PersonRepository;
use App\Security\TokenUser;
use App\Security\UserProvider;
use App\Tests\AuthWebTestCase;
use Jumbojett\OpenIDConnectClient;

/**
 * Class UserProviderTest.
 *
 * @covers \App\Security\UserProvider
 */
class UserProviderTest extends AuthWebTestCase
{
    /**
     * @var UserProvider
     */
    protected $provider;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();

        $oidcStub = $this->createPartialMock(OpenIDConnectClient::class, ['requestUserInfo']);

        // Spoof the only function that is used by the userprovider.
        $oidcStub->expects($this::any())
            ->method('requestUserInfo')
            ->will(
                $this::returnCallback(function ($arg) use ($oidcStub) {
                    if ('token1' == $oidcStub->getAccessToken()) {
                        return json_decode('{"sub":"1111-2223","name":"admin admin","email":"admin@hotmail.com"}');
                    }
                    if ('token2' == $oidcStub->getAccessToken()) {
                        return json_decode('{"sub":"submock","name":"username","email":"mail@domain.com"}');
                    }

                    return null;
                })
            );

        $repo = $this->client->getContainer()->get(PersonRepository::class);
        $this->provider = new UserProvider($oidcStub, $repo);
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->provider);
    }

    public function testLoadUserByIdentifier(): void
    {
        // Test admin user.
        $user = $this->provider->loadUserByIdentifier('token1');
        $this::assertSame('token1', $user->getUserIdentifier());
        $this::assertSame(['ROLE_ADMIN', 'ROLE_USER'], $user->getRoles());

        if ($user instanceof TokenUser) {
            $this::assertSame('1111-2223', $user->getSub());
            $this::assertSame('admin admin', $user->getName());
            $this::assertSame('admin@hotmail.com', $user->getEmail());
        }

        // Test random user.
        $user2 = $this->provider->loadUserByIdentifier('token2');
        $this::assertSame('token2', $user2->getUserIdentifier());
        $this::assertSame(['ROLE_USER'], $user2->getRoles());

        if ($user2 instanceof TokenUser) {
            $this::assertSame('submock', $user2->getSub());
            $this::assertSame('username', $user2->getName());
            $this::assertSame('mail@domain.com', $user2->getEmail());
        }
    }

    public function testloadUserByUsername(): void
    {
        // Test admin user.
        $user = $this->provider->loadUserByUsername('token1');
        $this::assertSame('token1', $user->getUserIdentifier());
        $this::assertSame(['ROLE_ADMIN', 'ROLE_USER'], $user->getRoles());

        if ($user instanceof TokenUser) {
            $this::assertSame('1111-2223', $user->getSub());
            $this::assertSame('admin admin', $user->getName());
            $this::assertSame('admin@hotmail.com', $user->getEmail());
        }

        // Test random user.
        $user2 = $this->provider->loadUserByUsername('token2');
        $this::assertSame('token2', $user2->getUserIdentifier());
        $this::assertSame(['ROLE_USER'], $user2->getRoles());

        if ($user2 instanceof TokenUser) {
            $this::assertSame('submock', $user2->getSub());
            $this::assertSame('username', $user2->getName());
            $this::assertSame('mail@domain.com', $user2->getEmail());
        }
    }

    public function testRefreshUser(): void
    {
        $user = $this->provider->loadUserByIdentifier('token1');
        $this::assertSame('token1', $user->getUserIdentifier());
        $this::assertSame(['ROLE_ADMIN', 'ROLE_USER'], $user->getRoles());

        if ($user instanceof TokenUser) {
            $this::assertSame('1111-2223', $user->getSub());
            $this::assertSame('admin admin', $user->getName());
            $this::assertSame('admin@hotmail.com', $user->getEmail());

            // Update the token.
            $user->setToken('token2');
        }

        // Refresh the user and verify the refresh.
        $user2 = $this->provider->refreshUser($user);
        $this::assertSame('token2', $user2->getUserIdentifier());
        $this::assertSame(['ROLE_USER'], $user2->getRoles());

        if ($user2 instanceof TokenUser) {
            $this::assertSame('submock', $user2->getSub());
            $this::assertSame('username', $user2->getName());
            $this::assertSame('mail@domain.com', $user2->getEmail());
        }
    }

    public function testSupportsClass(): void
    {
        $this::assertTrue($this->provider->supportsClass(TokenUser::class));
        $this::assertFalse($this->provider->supportsClass(UserProviderTest::class));
    }
}
