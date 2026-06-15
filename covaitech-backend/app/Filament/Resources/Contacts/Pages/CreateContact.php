<?php

namespace App\Filament\Resources\Contacts\Pages;

use App\Filament\Resources\Contacts\ContactResource;
use Filament\Resources\Pages\CreateRecord;

class CreateContact extends CreateRecord
{
    protected static string $resource = ContactResource::class;

    protected function getCreateFormAction(): \Filament\Actions\Action
    {
        return parent::getCreateFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Contact Submission Creation')
            ->modalDescription('Please confirm that you want to manually create this contact submission record in the database.')
            ->modalSubmitActionLabel('Yes, Create Submission')
            ->modalCancelActionLabel('Cancel');
    }
}
