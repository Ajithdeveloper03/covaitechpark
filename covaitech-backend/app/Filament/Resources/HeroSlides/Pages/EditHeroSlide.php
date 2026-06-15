<?php

namespace App\Filament\Resources\HeroSlides\Pages;

use App\Filament\Resources\HeroSlides\HeroSlideResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditHeroSlide extends EditRecord
{
    protected static string $resource = HeroSlideResource::class;

    protected function getSaveFormAction(): \Filament\Actions\Action
    {
        return parent::getSaveFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Hero Slide Update')
            ->modalDescription('Please confirm that you want to save changes to this hero slide. The changes will go live on the homepage slider instantly.')
            ->modalSubmitActionLabel('Yes, Save Changes')
            ->modalCancelActionLabel('Cancel');
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->requiresConfirmation()
                ->modalHeading('Warning: Confirm Hero Slide Deletion')
                ->modalDescription('Are you absolutely sure you want to delete this hero slide? This action will permanently remove it from both the dashboard database and the live website homepage carousel.')
                ->modalSubmitActionLabel('Yes, Delete Slide')
                ->modalCancelActionLabel('Cancel'),
        ];
    }
}
