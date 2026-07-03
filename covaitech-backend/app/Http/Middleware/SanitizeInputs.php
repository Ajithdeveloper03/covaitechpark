<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

/**
 * SanitizeInputs Middleware
 *
 * Strips HTML tags and trims all string inputs on every request.
 * This prevents XSS injection via stored content and removes
 * accidental markup from user-supplied fields.
 *
 * Note: SQL injection is already prevented by Eloquent's parameterized
 * queries. This middleware adds an additional defense-in-depth layer.
 */
class SanitizeInputs
{
    /**
     * Fields that should NOT be sanitized (e.g., rich-text content arrays, passwords).
     */
    private const SKIP_FIELDS = ['password', 'password_confirmation', 'content', 'schema'];

    /**
     * Suspicious SQL-injection patterns to block outright.
     */
    private const BLOCKED_PATTERNS = [
        '/(\bUNION\b.*\bSELECT\b)/i',
        '/(\bDROP\b.*\bTABLE\b)/i',
        '/(\bDELETE\b.*\bFROM\b)/i',
        '/(\bINSERT\b.*\bINTO\b)/i',
        '/(\bUPDATE\b.*\bSET\b)/i',
        '/(\bEXEC\b|\bEXECUTE\b)/i',
        '/(--\s*$)/m',           // SQL comment injection
        '/(\bOR\b\s+1\s*=\s*1)/i',
        '/(\bAND\b\s+1\s*=\s*1)/i',
        '/(<script[\s\S]*?>[\s\S]*?<\/script>)/i', // Script tag injection
        '/(javascript\s*:)/i',   // JS protocol injection
        '/(on\w+\s*=\s*["\'])/i', // HTML event handler injection
    ];

    public function handle(Request $request, Closure $next)
    {
        $input = $request->all();
        $cleaned = $this->sanitize($input);
        $request->replace($cleaned);

        return $next($request);
    }

    private function sanitize(array $data): array
    {
        $result = [];

        foreach ($data as $key => $value) {
            // Skip protected fields
            if (in_array($key, self::SKIP_FIELDS, true)) {
                $result[$key] = $value;
                continue;
            }

            if (is_array($value)) {
                $result[$key] = $this->sanitize($value);
            } elseif (is_string($value)) {
                // Check for SQL/XSS injection patterns
                foreach (self::BLOCKED_PATTERNS as $pattern) {
                    if (preg_match($pattern, $value)) {
                        abort(400, 'Potentially malicious input detected and rejected.');
                    }
                }

                // Strip HTML tags and trim whitespace
                $result[$key] = trim(strip_tags($value));
            } else {
                $result[$key] = $value;
            }
        }

        return $result;
    }
}
