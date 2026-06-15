<?php

namespace App\Filament\Resources\Contacts\Pages;

use App\Filament\Resources\Contacts\ContactResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditContact extends EditRecord
{
    protected static string $resource = ContactResource::class;

    protected function getSaveFormAction(): \Filament\Actions\Action
    {
        return parent::getSaveFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Contact Update')
            ->modalDescription('Please confirm that you want to save changes to this contact record. This will update the database information.')
            ->modalSubmitActionLabel('Yes, Save Changes')
            ->modalCancelActionLabel('Cancel');
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->requiresConfirmation()
                ->modalHeading('Warning: Confirm Contact Deletion')
                ->modalDescription('Are you absolutely sure you want to delete this contact submission? This action will permanently remove it from the database.')
                ->modalSubmitActionLabel('Yes, Delete Record')
                ->modalCancelActionLabel('Cancel'),
        ];
    }
}
