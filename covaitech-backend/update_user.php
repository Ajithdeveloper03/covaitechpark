<?php
/**
 * update_user.php
 * Run this once on the server to fix admin credentials:
 *   php update_user.php
 *
 * Sets email: info@covaitechpark.com
 * Sets password: CovaiTechPark@2026
 */

require __DIR__ . "/vendor/autoload.php";
$app    = require_once __DIR__ . "/bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Find existing user by old OR new email
$user = \App\Models\User::whereIn('email', [
    'admin@covaitech.com',
    'info@covaitechpark.com',
])->first();

if ($user) {
    $user->email    = 'info@covaitechpark.com';
    $user->name     = 'Admin User';
    $user->password = \Illuminate\Support\Facades\Hash::make('CovaiTechPark@2026');
    $user->save();

    // Delete all old tokens so a fresh login is required
    $user->tokens()->delete();

    echo "✅ Admin user updated successfully.\n";
    echo "   Email: info@covaitechpark.com\n";
    echo "   Password: CovaiTechPark@2026\n";
    echo "   All old tokens revoked.\n";
} else {
    // Create fresh admin user if none exists
    $user = \App\Models\User::create([
        'name'     => 'Admin User',
        'email'    => 'info@covaitechpark.com',
        'password' => \Illuminate\Support\Facades\Hash::make('CovaiTechPark@2026'),
    ]);
    echo "✅ Admin user created successfully.\n";
    echo "   Email: info@covaitechpark.com\n";
    echo "   Password: CovaiTechPark@2026\n";
}
