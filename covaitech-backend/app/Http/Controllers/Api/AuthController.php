<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Maximum failed login attempts before lockout.
     */
    private const MAX_ATTEMPTS = 5;

    /**
     * Lockout duration in minutes.
     */
    private const LOCKOUT_MINUTES = 15;

    /**
     * Login — with brute-force protection and attempt tracking.
     */
    public function login(Request $request)
    {
        // ── 1. Validate input types (no raw SQL ever reaches DB) ──────────────
        $request->validate([
            'email'    => 'required|email|max:255',
            'password' => 'required|string|min:6|max:128',
        ]);

        $ip   = $request->ip();
        $email = strtolower(trim($request->email));
        $lockKey = "login_lockout:{$ip}";
        $attemptsKey = "login_attempts:{$ip}";

        // ── 2. Check IP lockout ───────────────────────────────────────────────
        if (Cache::has($lockKey)) {
            $remaining = Cache::get($lockKey . '_expires', self::LOCKOUT_MINUTES);
            throw ValidationException::withMessages([
                'email' => ["Too many failed attempts. Your IP is locked for {$remaining} minutes."],
            ]);
        }

        // ── 3. Fetch user using Eloquent (parameterized query — no SQL injection) ──
        $user = User::where('email', $email)->first();

        // ── 4. Verify credentials ─────────────────────────────────────────────
        if (! $user || ! Hash::check($request->password, $user->password)) {
            // Track failed attempts
            $attempts = Cache::get($attemptsKey, 0) + 1;
            Cache::put($attemptsKey, $attempts, now()->addMinutes(self::LOCKOUT_MINUTES));

            // Lock after MAX_ATTEMPTS
            if ($attempts >= self::MAX_ATTEMPTS) {
                Cache::put($lockKey, true, now()->addMinutes(self::LOCKOUT_MINUTES));
                Cache::put($lockKey . '_expires', self::LOCKOUT_MINUTES, now()->addMinutes(self::LOCKOUT_MINUTES));
                Log::warning("Admin login locked for IP: {$ip} after {$attempts} failed attempts.");

                throw ValidationException::withMessages([
                    'email' => ['Too many failed attempts. Your IP has been locked for ' . self::LOCKOUT_MINUTES . ' minutes.'],
                ]);
            }

            $remaining = self::MAX_ATTEMPTS - $attempts;
            throw ValidationException::withMessages([
                'email' => ["Invalid credentials. {$remaining} attempt(s) remaining before lockout."],
            ]);
        }

        // ── 5. Clear failed attempts on success ───────────────────────────────
        Cache::forget($attemptsKey);
        Cache::forget($lockKey);
        Cache::forget($lockKey . '_expires');

        // ── 6. Delete old tokens (prevent token accumulation) ─────────────────
        $user->tokens()->delete();

        // ── 7. Issue fresh Sanctum token ─────────────────────────────────────
        $token = $user->createToken('admin-token', ['admin'], now()->addHours(8))->plainTextToken;

        Log::info("Admin login success for user ID {$user->id} from IP: {$ip}");

        return response()->json([
            'user'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
            'token' => $token,
        ]);
    }

    /**
     * Logout — revoke current token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        Log::info("Admin logout for user ID {$request->user()->id}");

        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Me — return authenticated user info.
     */
    public function me(Request $request)
    {
        return response()->json([
            'id'    => $request->user()->id,
            'name'  => $request->user()->name,
            'email' => $request->user()->email,
        ]);
    }
}
