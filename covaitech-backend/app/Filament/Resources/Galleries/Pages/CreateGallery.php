<?php

namespace App\Filament\Resources\Galleries\Pages;

use App\Filament\Resources\Galleries\GalleryResource;
use Filament\Resources\Pages\CreateRecord;

class CreateGallery extends CreateRecord
{
    protected static string $resource = GalleryResource::class;

    protected function getCreateFormAction(): \Filament\Actions\Action
    {
        return parent::getCreateFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Gallery Item Creation')
            ->modalDescription('Please confirm that you want to upload and add this new gallery item to the live website.')
            ->modalSubmitActionLabel('Yes, Create Item')
            ->modalCancelActionLabel('Cancel');
    }
}
