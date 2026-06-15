<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-[#f37021]/10 text-[#f37021]">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-base font-bold text-slate-900 dark:text-white" style="font-style: normal !important;">Recent Activity Log</h3>
                    <p class="text-xs text-slate-400 font-normal" style="font-style: normal !important;">Live updates from across the site</p>
                </div>
            </div>
        </x-slot>

        <div class="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            @forelse($activities as $activity)
                <div class="py-3 flex items-center justify-between gap-4">
                    <div class="flex items-start gap-3 min-w-0">
                        <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0
                            {{ $activity['type'] === 'Blog Post' ? 'bg-[#f37021]/10 text-[#f37021]' : '' }}
                            {{ $activity['type'] === 'Gallery Item' ? 'bg-indigo-500/10 text-indigo-500' : '' }}
                            {{ $activity['type'] === 'Hero Slide' ? 'bg-sky-500/10 text-sky-500' : '' }}
                            {{ $activity['type'] === 'Form Submission' ? 'bg-emerald-500/10 text-emerald-500' : '' }}
                        ">
                            {{ $activity['type'] }}
                        </span>
                        <div class="min-w-0">
                            <a href="{{ $activity['url'] }}" class="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#f37021] dark:hover:text-[#f37021] transition-colors truncate block" style="font-style: normal !important;">
                                {{ $activity['title'] }}
                            </a>
                            <span class="text-xs text-slate-400 font-normal" style="font-style: normal !important;">{{ $activity['action'] }}</span>
                        </div>
                    </div>
                    <span class="text-xs text-slate-400 font-normal shrink-0" style="font-style: normal !important;">
                        {{ $activity['time']->diffForHumans() }}
                    </span>
                </div>
            @empty
                <p class="py-4 text-center text-sm text-slate-400 font-normal" style="font-style: normal !important;">No recent activity logs available.</p>
            @endforelse
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
