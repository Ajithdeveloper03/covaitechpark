<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: '',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Apply input sanitization to all API requests (XSS + SQL injection defense)
        $middleware->api(prepend: [
            \App\Http\Middleware\SanitizeInputs::class,
        ]);

        // Prevent session fixation — regenerate session ID after login
        // (Sanctum handles this via token rotation — see AuthController)

        // Trust proxies if behind a load-balancer / Nginx reverse proxy
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
