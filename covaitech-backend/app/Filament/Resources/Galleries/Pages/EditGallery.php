<?php

namespace App\Filament\Resources\Galleries\Pages;

use App\Filament\Resources\Galleries\GalleryResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditGallery extends EditRecord
{
    protected static string $resource = GalleryResource::class;

    protected function getSaveFormAction(): \Filament\Actions\Action
    {
        return parent::getSaveFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Gallery Item Update')
            ->modalDescription('Please confirm that you want to save changes to this gallery item. Changes will instantly go live on the website.')
            ->modalSubmitActionLabel('Yes, Save Changes')
            ->modalCancelActionLabel('Cancel');
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->requiresConfirmation()
                ->modalHeading('Warning: Confirm Gallery Item Deletion')
                ->modalDescription('Are you absolutely sure you want to delete this gallery item? This action will permanently remove it from both the dashboard database and the live website.')
                ->modalSubmitActionLabel('Yes, Delete Item')
                ->modalCancelActionLabel('Cancel'),
        ];
    }
}
