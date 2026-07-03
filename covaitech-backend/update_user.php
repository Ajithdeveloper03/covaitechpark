<?php
require __DIR__."/vendor/autoload.php";
$app = require_once __DIR__."/bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$u = \App\Models\User::first();
if ($u) {
    $u->email = "info@covaitechpark.com";
    $u->password = \Hash::make("CovaiTechPark@2026");
    $u->save();
    echo "User updated\n";
} else {
    echo "No user found\n";
}
