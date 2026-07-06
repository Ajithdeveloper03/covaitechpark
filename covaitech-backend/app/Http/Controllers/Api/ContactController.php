<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Custom Honeypot to trap bots
        if ($request->filled('bot_field')) {
            return response()->json(['message' => 'Contact submitted successfully'], 201);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'source' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['ip_address'] = $request->ip();

        $contact = Contact::create($data);

        // Send Email Notification
        try {
            $body =
                "==================================================\n" .
                "  NEW ENQUIRY — COVAI TECH PARK\n" .
                "==================================================\n\n" .
                "Name     : {$contact->name}\n" .
                "Email    : " . ($contact->email    ?: 'Not provided') . "\n" .
                "Phone    : " . ($contact->phone    ?: 'Not provided') . "\n" .
                "Company  : " . ($contact->company  ?: 'Not provided') . "\n" .
                "Source   : " . ($contact->source   ?: 'website')      . "\n" .
                "Received : " . now()->format('d M Y, h:i A T')        . "\n\n" .
                "--------------------------------------------------\n" .
                "MESSAGE:\n" .
                "--------------------------------------------------\n" .
                $contact->message . "\n\n" .
                "==================================================\n" .
                "Automated notification from covaitechpark.com\n" .
                "==================================================\n";

            Mail::raw($body, function ($mail) use ($contact) {
                $mail->from(env('MAIL_FROM_ADDRESS', 'inymart@gmail.com'), env('MAIL_FROM_NAME', 'CovaiTechPark'))
                     ->to(['inymart@gmail.com', 'info@covaitechpark.com'])
                     ->replyTo($contact->email ?: 'inymart@gmail.com', $contact->name)
                     ->subject('[CovaiTechPark] New Enquiry: ' . $contact->name);
            });
        } catch (\Exception $e) {
            Log::error('Mail sending failed: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Contact submitted successfully'], 201);
    }
}
