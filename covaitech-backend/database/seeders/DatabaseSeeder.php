<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ── Admin User ──
        User::updateOrCreate(
            ['email' => 'admin@covaitech.com'],
            [
                'name'     => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );

        // ─────────────────────────────────────────────────────────────────
        // 1. BLOGS
        // Images must exist in /public — only use confirmed existing files
        // ─────────────────────────────────────────────────────────────────
        $blogs = [
            [
                'title'        => 'The Future of Managed Coworking Spaces in Coimbatore',
                'slug'         => 'future-of-coworking-spaces-in-coimbatore',
                'category'     => 'Coworking Insights',
                'excerpt'      => 'How hybrid models, premium modular cabins, and smart tech parks are reshaping the corporate ecosystem in Coimbatore\'s thriving tech corridors.',
                'image'        => 'workspace-lounge.png',
                'is_published' => true,
                'published_at' => now()->subDays(10),
                'bullets'      => json_encode([
                    ['text' => 'Hybrid work models driving demand for flexible office solutions'],
                    ['text' => 'Premium cabin-style offices replacing traditional open floors'],
                    ['text' => 'Smart tech integrations — IoT booking, digital access, AI cooling'],
                    ['text' => 'Coimbatore emerging as Tier-2 IT hub with aggressive infrastructure growth'],
                    ['text' => 'CovaiTech Park leading the managed coworking revolution locally'],
                ]),
                'faqs'         => json_encode([
                    ['question' => 'What is a managed coworking space?', 'answer' => 'A managed coworking space is a fully serviced office environment where all operational aspects — housekeeping, internet, utilities, reception, and maintenance — are handled by the management, letting businesses focus purely on their work.'],
                    ['question' => 'How does CovaiTech Park differ from traditional coworking?', 'answer' => 'CovaiTech Park offers premium soundproof private cabins, dedicated meeting rooms, 24/7 access, and institutional-grade infrastructure — far beyond typical hot-desk coworking models.'],
                    ['question' => 'Is Coimbatore a good location for startups?', 'answer' => 'Yes. Coimbatore has a rapidly growing tech ecosystem, lower cost of living, improving infrastructure, and strong talent availability from premier engineering colleges.'],
                ]),
                'content'      => json_encode([
                    [
                        'heading' => 'The Hybrid Work Revolution',
                        'text'    => 'The pandemic permanently changed how organizations think about office space. Hybrid work models that blend remote and in-office productivity have become the new standard, and businesses are now seeking flexible, scalable workspace solutions that can adapt to fluctuating headcounts without long-term lease commitments.',
                        'img'     => 'workspace-lounge.png',
                    ],
                    [
                        'heading' => 'Premium Infrastructure Over Hot Desks',
                        'text'    => 'Modern enterprises are not satisfied with basic hot-desk arrangements. They demand premium soundproofed private cabins with dedicated internet, climate control, ergonomic furniture, and institutional-grade security — all managed end-to-end. CovaiTech Park\'s cabin model delivers exactly this at a fraction of traditional office costs.',
                        'img'     => 'workspace-cabin.png',
                    ],
                    [
                        'heading' => 'Smart Technology Integration',
                        'text'    => 'IoT-enabled smart booking systems, digital access cards, AI-driven air conditioning, and high-bandwidth dedicated fiber internet are no longer luxuries — they are baseline expectations for forward-thinking organizations moving into managed coworking environments in 2026.',
                        'img'     => 'workspace-meeting.png',
                    ],
                    [
                        'heading' => 'Coimbatore\'s Rise as a Tier-2 IT Hub',
                        'text'    => 'With aggressive infrastructure investment, improving air connectivity, and a growing talent pool from institutions like PSG, KGISL, and Amrita, Coimbatore is rapidly becoming the preferred destination for tech companies expanding operations outside of Chennai and Bengaluru.',
                        'img'     => 'workspace-cafe.png',
                    ],
                ]),
            ],
            [
                'title'        => 'Maximizing Productivity in Soundproof Private Office Cabins',
                'slug'         => 'maximizing-productivity-in-private-office-cabins',
                'category'     => 'Workspace Tips',
                'excerpt'      => 'A deep dive into UX-driven workspace ergonomics, acoustic privacy, and how dedicated cabin structures accelerate business output.',
                'image'        => 'workspace-cabin.png',
                'is_published' => true,
                'published_at' => now()->subDays(17),
                'bullets'      => json_encode([
                    ['text' => 'Acoustic isolation reduces cognitive interruption by up to 40%'],
                    ['text' => 'Ergonomic furniture linked to fewer sick days and higher retention'],
                    ['text' => 'Individual climate control boosts comfort and focus scores'],
                    ['text' => 'Zero operational overhead lets teams focus on delivery'],
                    ['text' => 'Private cabins support NDA-sensitive and regulated industry workflows'],
                ]),
                'faqs'         => json_encode([
                    ['question' => 'What makes private cabins better for productivity?', 'answer' => 'Private cabins eliminate the visual and auditory distractions of open offices. Acoustic isolation is proven to significantly reduce context-switching, enabling deep work and improved output quality.'],
                    ['question' => 'Are cabins suitable for regulated industries?', 'answer' => 'Yes. Private, secure cabins are ideal for legal, finance, healthcare, and IT compliance teams that handle sensitive data and require physical privacy and access control.'],
                    ['question' => 'Does CovaiTech Park offer custom cabin configurations?', 'answer' => 'Absolutely. Our team works with each enterprise client to configure cabin sizes, power points, network setup, and furniture to match specific workflow requirements.'],
                ]),
                'content'      => json_encode([
                    [
                        'heading' => 'The Need for Acoustic Privacy',
                        'text'    => 'Acoustic privacy is the single biggest productivity differentiator in modern workspace design. While hot desks are fantastic for networking and collaboration, deep focused work requires distraction-free isolation — especially for engineering, legal, or finance teams dealing with sensitive tasks that demand complete concentration.',
                        'img'     => 'workspace-cabin.png',
                    ],
                    [
                        'heading' => 'Engineering Isolation',
                        'text'    => 'Dedicated soundproof private cabins are engineered to address this need. By dampening sound waves and visually isolating the team, private offices allow software development or critical analysis to occur with zero interruptions, leading to faster sprint deliveries and measurably lower error rates.',
                        'img'     => 'workspace-meeting.png',
                    ],
                    [
                        'heading' => 'Customizable Environments',
                        'text'    => 'Every cabin suite at CovaiTech Park is fully customized with ergonomic seating, modular storage, and individual smart air conditioning units. Teams can set their own workspace environment parameters according to their workflows.',
                        'img'     => 'workspace-event.png',
                    ],
                    [
                        'heading' => 'Operational Zero-Downtime',
                        'text'    => 'High-speed connectivity, housekeeping, electrical backup, and reception presence are all managed. This ensures zero operational downtime for your staff, keeping momentum intact throughout the work week.',
                        'img'     => 'workspace-lounge.png',
                    ],
                ]),
            ],
            [
                'title'        => 'Why Virtual Offices are Essential for Modern Startups',
                'slug'         => 'why-virtual-offices-are-essential-for-startups',
                'category'     => 'Business Growth',
                'excerpt'      => 'How virtual mailing addresses and professional phone handling help companies register for GST and build credibility remotely.',
                'image'        => 'workspace-meeting.png',
                'is_published' => true,
                'published_at' => now()->subDays(30),
                'bullets'      => json_encode([
                    ['text' => 'Professional business address for GST, banking, and compliance'],
                    ['text' => 'No physical lease commitment — fully variable cost model'],
                    ['text' => 'Access to premium meeting rooms and boardrooms on-demand'],
                    ['text' => 'Mail management, courier receipt, and document scanning included'],
                    ['text' => 'Instant credibility with clients and investors from day one'],
                ]),
                'faqs'         => json_encode([
                    ['question' => 'Can I use a virtual office address for GST registration?', 'answer' => 'Yes. CovaiTech Park provides all necessary documentation — lease agreement, utility bills, and NOC — required for GST registration and business bank account opening.'],
                    ['question' => 'What is included in the virtual office plan?', 'answer' => 'Our virtual office plans include a prestigious commercial address, mail handling, mail scanning, courier management, and access to meeting rooms at hourly rates.'],
                    ['question' => 'Is a virtual office legally recognized?', 'answer' => 'Yes. Virtual office addresses are fully compliant with Indian company law, GST Act, and banking KYC requirements, provided the space provider offers the correct documentation.'],
                ]),
                'content'      => json_encode([
                    [
                        'heading' => 'Capital Efficiency',
                        'text'    => 'Starting a new technology venture is a capital-intensive journey. Spending on physical office leases before validating a product or building a team can severely restrict cash flow runway. A virtual setup minimizes fixed overheads, allowing founders to focus every rupee on product development and customer acquisition.',
                        'img'     => 'workspace-hotdesk.png',
                    ],
                    [
                        'heading' => 'Prestigious Presence',
                        'text'    => 'A virtual office address solves the credibility problem by providing a highly prestigious commercial address in premium hubs — like Nehru Nagar East in Coimbatore or Thillai Nagar in Trichy — at a fraction of the cost, instantly building trust with initial clients and investors.',
                        'img'     => 'workspace-cafe.png',
                    ],
                    [
                        'heading' => 'Compliance Ready',
                        'text'    => 'These plans are fully compliant with government rules for GST registration, company filings, and bank account creation, complete with legal agreements and property documentation required for statutory audits.',
                        'img'     => 'workspace-meeting.png',
                    ],
                    [
                        'heading' => 'On-Demand Infrastructure',
                        'text'    => 'Startups benefit from mailbox management, mail scanning, courier receipt, and the ability to book premium meeting rooms and boardrooms on-demand when client sessions require physical meetings.',
                        'img'     => 'workspace-lounge.png',
                    ],
                ]),
            ],
        ];

        foreach ($blogs as $blog) {
            \App\Models\Blog::firstOrCreate(
                ['slug' => $blog['slug']],
                $blog
            );
        }

        // ─────────────────────────────────────────────────────────────────
        // 2. GALLERY
        // ONLY use images that actually exist in /public
        // Available: workspace-cabin.png, workspace-lounge.png,
        //            workspace-cafe.png, workspace-meeting.png,
        //            workspace-hotdesk.png, workspace-event.png,
        //            amenities-community.png, hero-bg.png,
        //            hero1.jpg, hero13.jpg
        // ─────────────────────────────────────────────────────────────────
        $galleries = [
            ['title' => 'Facilities',     'description' => 'CovaiTech Park — Premium Infrastructure Hub',     'image' => 'hero1.jpg',                'sort_order' => 0,  'is_active' => true],
            ['title' => 'Cabins',         'description' => 'Soundproof Private Office Cabins',                 'image' => 'workspace-cabin.png',      'sort_order' => 1,  'is_active' => true],
            ['title' => 'Lounge',         'description' => 'Premium Lounge & Collaborative Area',              'image' => 'workspace-lounge.png',     'sort_order' => 2,  'is_active' => true],
            ['title' => 'Common Areas',   'description' => 'Breakout Cafe & Refreshment Zone',                 'image' => 'workspace-cafe.png',       'sort_order' => 3,  'is_active' => true],
            ['title' => 'Meeting Rooms',  'description' => 'Smart Fully Equipped Meeting Rooms',               'image' => 'workspace-meeting.png',    'sort_order' => 4,  'is_active' => true],
            ['title' => 'Cabins',         'description' => 'Dedicated Hot-Desk Stations',                      'image' => 'workspace-hotdesk.png',    'sort_order' => 5,  'is_active' => true],
            ['title' => 'Events',         'description' => 'Event & Conference Spaces',                        'image' => 'workspace-event.png',      'sort_order' => 6,  'is_active' => true],
            ['title' => 'Common Areas',   'description' => 'Active Community & Networking Zones',              'image' => 'amenities-community.png',  'sort_order' => 7,  'is_active' => true],
            ['title' => 'Facilities',     'description' => 'CovaiTech Park — Exterior & Overview',             'image' => 'hero-bg.png',              'sort_order' => 8,  'is_active' => true],
            ['title' => 'Meeting Rooms',  'description' => 'Boardroom for Executive Meetings',                 'image' => 'hero13.jpg',               'sort_order' => 9,  'is_active' => true],
            ['title' => 'Lounge',         'description' => 'Relaxation & Break Lounge Area',                   'image' => 'workspace-lounge.png',     'sort_order' => 10, 'is_active' => true],
            ['title' => 'Events',         'description' => 'Corporate Event Hall Setup',                       'image' => 'workspace-event.png',      'sort_order' => 11, 'is_active' => true],
            ['title' => 'Cabins',         'description' => 'Private Office Suite — Interior View',             'image' => 'workspace-cabin.png',      'sort_order' => 12, 'is_active' => true],
            ['title' => 'Common Areas',   'description' => 'Cafe & Team Break Area',                           'image' => 'workspace-cafe.png',       'sort_order' => 13, 'is_active' => true],
            ['title' => 'Meeting Rooms',  'description' => 'Training & Workshop Room',                         'image' => 'workspace-meeting.png',    'sort_order' => 14, 'is_active' => true],
            ['title' => 'Facilities',     'description' => 'High-Speed Connectivity Infrastructure',           'image' => 'hero1.jpg',                'sort_order' => 15, 'is_active' => true],
        ];

        foreach ($galleries as $gallery) {
            \App\Models\Gallery::firstOrCreate(
                ['image' => $gallery['image'], 'title' => $gallery['title'], 'sort_order' => $gallery['sort_order']],
                $gallery
            );
        }
    }
}
