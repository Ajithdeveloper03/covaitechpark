<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'source' => 'nullable|string|in:popup,contact_page'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['ip_address'] = $request->ip();

        $contact = Contact::create($data);

        // Send Email Notification
        try {
            \Illuminate\Support\Facades\Mail::raw(
                "New Contact Form Submission:\n\n" .
                "Name: {$contact->name}\n" .
                "Email: {$contact->email}\n" .
                "Phone: {$contact->phone}\n" .
                "Company: {$contact->company}\n" .
                "Message: {$contact->message}\n" .
                "Source: {$contact->source}",
                function ($mail) use ($contact) {
                    $mail->to('inymartlabs@gmail.com')
                         ->subject('New Contact Inquiry: ' . $contact->name);
                }
            );
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Mail sending failed: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Contact submitted successfully'], 201);
    }
}
