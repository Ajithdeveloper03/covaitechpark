<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->colors([
                'primary' => Color::hex('#f37021'),
                'gray' => Color::Slate,
            ])
            ->font('Outfit')
            ->brandLogo(asset('covai-tech-park-logo.png'))
            ->darkModeBrandLogo(asset('covai-tech-park-logo-white.png'))
            ->brandLogoHeight('2.5rem')
            ->brandName('CovaiTech Park')
            ->renderHook(
                'panels::head.end',
                fn () => new \Illuminate\Support\HtmlString("
                    <style>
                        /* Strictly disable italic texts */
                        * {
                            font-style: normal !important;
                        }
                        /* Dark Navy and Orange Brand Login Screen Styling */
                        .fi-simple-layout {
                            background-color: #060d17 !important;
                            background-image: radial-gradient(circle at top, rgba(243, 112, 33, 0.12), transparent 70%) !important;
                        }
                        .fi-simple-card {
                            border: 1px solid rgba(255, 255, 255, 0.08) !important;
                            background-color: rgba(15, 23, 42, 0.65) !important;
                            backdrop-filter: blur(16px) !important;
                            -webkit-backdrop-filter: blur(16px) !important;
                            border-radius: 24px !important;
                            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                        }
                        .fi-simple-card input {
                            background-color: rgba(255, 255, 255, 0.04) !important;
                            border: 1px solid rgba(255, 255, 255, 0.1) !important;
                            color: #ffffff !important;
                            border-radius: 12px !important;
                        }
                        .fi-simple-card input:focus {
                            border-color: #f37021 !important;
                            box-shadow: 0 0 0 2px rgba(243, 112, 33, 0.25) !important;
                        }
                        .fi-simple-card label {
                            color: rgba(255, 255, 255, 0.85) !important;
                        }
                        .fi-simple-card h1, .fi-simple-card p, .fi-simple-card a {
                            color: #ffffff !important;
                        }
                        .fi-simple-card button[type=\"submit\"] {
                            background-color: #f37021 !important;
                            font-weight: 700 !important;
                            border-radius: 12px !important;
                            text-transform: uppercase !important;
                            letter-spacing: 0.08em !important;
                            transition: all 0.3s ease !important;
                        }
                        .fi-simple-card button[type=\"submit\"]:hover {
                            background-color: #d55c14 !important;
                            transform: translateY(-1px) !important;
                            box-shadow: 0 4px 12px rgba(243, 112, 33, 0.25) !important;
                        }
                        /* Sidebar Branding */
                        .fi-sidebar {
                            background-color: #060d17 !important;
                            border-right: 1px solid rgba(255, 255, 255, 0.05) !important;
                        }
                        .fi-sidebar-header {
                            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                        }
                        .fi-sidebar nav a {
                            color: rgba(255, 255, 255, 0.7) !important;
                        }
                        .fi-sidebar nav a:hover {
                            background-color: rgba(255, 255, 255, 0.04) !important;
                            color: #ffffff !important;
                        }
                        .fi-sidebar nav .fi-active {
                            background-color: rgba(243, 112, 33, 0.12) !important;
                            color: #f37021 !important;
                            border-left: 3px solid #f37021 !important;
                        }
                        /* Premium visual uploads & forms */
                        .fi-fo-file-upload {
                            border-radius: 16px !important;
                        }
                        .fi-fo-file-upload-preview {
                            border: 2px dashed rgba(243, 112, 33, 0.3) !important;
                            border-radius: 16px !important;
                            overflow: hidden !important;
                        }
                        /* Hide global search bar completely */
                        .fi-global-search {
                            display: none !important;
                        }
                    </style>
                ")
            )
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                AccountWidget::class,
                \App\Filament\Widgets\RecentActivityWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
