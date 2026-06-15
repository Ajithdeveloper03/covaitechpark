<?php

namespace App\Filament\Resources\HeroSlides\Pages;

use App\Filament\Resources\HeroSlides\HeroSlideResource;
use Filament\Resources\Pages\CreateRecord;

class CreateHeroSlide extends CreateRecord
{
    protected static string $resource = HeroSlideResource::class;

    protected function getCreateFormAction(): \Filament\Actions\Action
    {
        return parent::getCreateFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Hero Slide Creation')
            ->modalDescription('Please confirm that you want to upload and add this new slide to the homepage carousel.')
            ->modalSubmitActionLabel('Yes, Create Slide')
            ->modalCancelActionLabel('Cancel');
    }
}
