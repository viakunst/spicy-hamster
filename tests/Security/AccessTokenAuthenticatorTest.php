<?php

namespace App\Tests\Security;

use App\Security\AccessTokenAuthenticator;
use Exception;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\NullToken;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;

/**
 * Class AccessTokenAuthenticatorTest.
 *
 * @covers \App\Security\AccessTokenAuthenticator
 */
class AccessTokenAuthenticatorTest extends TestCase
{
    /**
     * @var AccessTokenAuthenticator
     */
    protected $auth;

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->auth = new AccessTokenAuthenticator();
    }

    /**
     * {@inheritdoc}
     */
    protected function tearDown(): void
    {
        parent::tearDown();

        unset($this->auth);
    }

    public function testSupports(): void
    {
        $req = new Request();
        $req->headers->set('Authorization', 'Bearer a39109hf83nv');
        $this::assertTrue($this->auth->supports($req));

        $req2 = new Request();
        $req2->headers->set('wrong header', 'Bearer a39109hf83nv');
        $this::assertFalse($this->auth->supports($req2));
    }

    public function testAuthenticate(): void
    {
        // Correct header.
        $req = new Request();
        $req->headers->set('Authorization', 'Bearer a39109hf83nv');

        $passport = $this->auth->authenticate($req);
        $badges = $passport->getBadges();
        $this::assertCount(1, $badges);

        $badge = array_values($badges)[0];
        if ($badge instanceof UserBadge) {
            $this::assertSame('a39109hf83nv', $badge->getUserIdentifier());
        }

        // Bad header, which should result in a exception.
        $req2 = new Request();
        $req2->headers->set('wrong header', 'Bearer a39109hf83nv');
        try {
            $this->auth->authenticate($req);
        } catch (Exception $e) {
            $this::assertTrue($e instanceof CustomUserMessageAuthenticationException);
        }
    }

    public function testOnAuthenticationSuccess(): void
    {
        $req = new Request();
        $token = new NullToken();
        $this::assertNull($this->auth->onAuthenticationSuccess($req, $token, 'wall'));
    }

    public function testOnAuthenticationFailure(): void
    {
        $req = new Request();
        $exp = new AuthenticationException('message', 1);
        $response = $this->auth->onAuthenticationFailure($req, $exp);
        $msg = strtr($exp->getMessageKey(), $exp->getMessageData());
        $expected = "{\"message\":\"$msg\"}";
        $this::assertTrue($response instanceof Response);
        $this::assertSame(401, $response->getStatusCode());
        $this::assertSame($expected, $response->getContent());
    }
}
