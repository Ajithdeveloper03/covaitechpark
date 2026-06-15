<?php

namespace App\Filament\Widgets;

use App\Models\Blog;
use App\Models\Contact;
use App\Models\Gallery;
use App\Models\HeroSlide;
use Filament\Widgets\Widget;

class RecentActivityWidget extends Widget
{
    protected string $view = 'filament.widgets.recent-activity-widget';

    protected static ?int $sort = 1;

    protected int | string | array $columnSpan = 'full';

    public function getViewData(): array
    {
        $activities = collect()
            ->concat(
                Blog::latest('updated_at')->take(5)->get()->map(fn ($item) => [
                    'type' => 'Blog Post',
                    'title' => $item->title,
                    'action' => 'Updated / Saved',
                    'time' => $item->updated_at,
                    'url' => route('filament.admin.resources.blogs.edit', ['record' => $item->id]),
                ])
            )
            ->concat(
                Gallery::latest('updated_at')->take(5)->get()->map(fn ($item) => [
                    'type' => 'Gallery Item',
                    'title' => $item->title,
                    'action' => 'Updated / Saved',
                    'time' => $item->updated_at,
                    'url' => route('filament.admin.resources.galleries.edit', ['record' => $item->id]),
                ])
            )
            ->concat(
                HeroSlide::latest('updated_at')->take(5)->get()->map(fn ($item) => [
                    'type' => 'Hero Slide',
                    'title' => $item->title,
                    'action' => 'Updated / Saved',
                    'time' => $item->updated_at,
                    'url' => route('filament.admin.resources.hero-slides.edit', ['record' => $item->id]),
                ])
            )
            ->concat(
                Contact::latest('created_at')->take(5)->get()->map(fn ($item) => [
                    'type' => 'Form Submission',
                    'title' => "Inquiry from {$item->name} ({$item->email})",
                    'action' => 'Received submission',
                    'time' => $item->created_at,
                    'url' => route('filament.admin.resources.contacts.edit', ['record' => $item->id]),
                ])
            )
            ->sortByDesc('time')
            ->take(8);

        return [
            'activities' => $activities,
        ];
    }
}
