<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

try {
    Mail::raw("Test email", function($message) {
        $message->to('inymartlabs@gmail.com')
                ->subject('Test Email');
    });
    echo "Mail sent successfully.\n";
} catch (\Exception $e) {
    echo "Mail sending failed: " . $e->getMessage() . "\n";
}
