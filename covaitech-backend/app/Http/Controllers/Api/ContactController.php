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

        $mailError = null;
        // Send Email Notification
        try {
            $bodyLines = [
                "==================================================",
                "  NEW ENQUIRY — COVAI TECH PARK",
                "==================================================\n",
                "MESSAGE:",
                "--------------------------------------------------",
                $contact->message . "\n",
                "--------------------------------------------------",
                "Name     : {$contact->name}",
            ];

            if (!empty($contact->email)) {
                $bodyLines[] = "Email    : {$contact->email}";
            }
            if (!empty($contact->phone)) {
                $bodyLines[] = "Phone    : {$contact->phone}";
            }
            if (!empty($contact->company)) {
                $bodyLines[] = "Company  : {$contact->company}";
            }
            if (!empty($contact->source)) {
                $bodyLines[] = "Source   : {$contact->source}";
            }

            $body = implode("\n", $bodyLines);

            Mail::raw($body, function ($mail) use ($contact) {
                $mail->from(env('MAIL_FROM_ADDRESS', 'info@covaitechpark.com'), env('MAIL_FROM_NAME', 'CovaiTechPark'))
                     ->to('info@covaitechpark.com')
                     ->replyTo($contact->email ?: 'info@covaitechpark.com', $contact->name)
                     ->subject('[CovaiTechPark] New Enquiry: ' . $contact->name);
            });
        } catch (\Exception $e) {
            Log::error('Mail sending failed: ' . $e->getMessage());
            $mailError = $e->getMessage();
        }

        if ($mailError) {
            return response()->json([
                'message' => 'Contact saved in database, but mail sending failed.',
                'error' => $mailError
            ], 500);
        }

        return response()->json(['message' => 'Contact submitted successfully'], 201);
    }
}
