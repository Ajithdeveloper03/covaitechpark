<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

try {
    Mail::raw("Test from tinker", function($message) {
        $message->to('inymartlabs@gmail.com')
                ->subject('Test Tinker Email');
    });
    echo "Mail sent successfully.\n";
} catch (\Exception $e) {
    echo "Mail sending failed: " . $e->getMessage() . "\n";
}
