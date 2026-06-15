<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    private $defaults = [
        'coimbatore_address' => 'Covai Tech Park, 4th South Cross St, Kovai Thirunagar, Nehru Nagar East, Coimbatore- 641 014.',
        'coimbatore_phone_display' => '+91 93607 80768',
        'coimbatore_phone_raw' => '+919360780768',
        'trichy_address' => '2nd Floor, Old No. C-63, New No. C-50, Bloom Plaza, 6th Cross North East Extension, Near to Isha Yoga Center, Thillai Nagar, Tiruchirappalli, Tamil Nadu, 620018',
        'trichy_phone_display' => '+91 968 899 2210',
        'trichy_phone_raw' => '+919688992210',
        'email' => 'info@covaitechpark.com',
        'whatsapp_url' => 'https://wa.me/919360780768',
        'facebook_url' => 'https://facebook.com/covaitechpark',
        'twitter_url' => 'https://twitter.com/covaitechpark',
        'instagram_url' => 'https://instagram.com/covaitechpark',
        'linkedin_url' => 'https://linkedin.com/company/covaitechpark',
        'youtube_url' => 'https://youtube.com/covaitechpark',
        'coimbatore_map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.143641267597!2d77.031952!3d11.027815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857a2bd66f649%3A0xc48c0827ea8061e8!2sCovai%20Tech%20Park!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
        'coimbatore_map_link' => 'https://maps.app.goo.gl/T4HnE2Wn8nSjLptN8',
        'trichy_map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9172089270634!2d78.6881744!3d10.8176587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ad5c0a373%3A0x63cd735d4fa36829!2sBloom%20Plaza!5e0!3m2!1sen!2sin!4v1718100000000!5m2!1sen!2sin',
        'trichy_map_link' => 'https://maps.google.com/?q=Bloom+Plaza+Trichy',
    ];

    public function index()
    {
        return response()->json($this->defaults);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array'
        ]);

        foreach ($validated['settings'] as $key => $value) {
            if (array_key_exists($key, $this->defaults)) {
                Setting::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }

        return response()->json([
            'message' => 'Settings updated successfully!',
            'settings' => $this->index()->original
        ]);
    }
}
