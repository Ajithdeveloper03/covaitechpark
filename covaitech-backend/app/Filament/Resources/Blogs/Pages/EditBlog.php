<?php

namespace App\Filament\Resources\Blogs\Pages;

use App\Filament\Resources\Blogs\BlogResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBlog extends EditRecord
{
    protected static string $resource = BlogResource::class;

    protected function getSaveFormAction(): \Filament\Actions\Action
    {
        return parent::getSaveFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Blog Post Update')
            ->modalDescription('Please confirm that you want to save these changes. This will instantly update the live blog post on the frontend website.')
            ->modalSubmitActionLabel('Yes, Save Changes')
            ->modalCancelActionLabel('Cancel');
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->requiresConfirmation()
                ->modalHeading('Warning: Confirm Blog Deletion')
                ->modalDescription('Are you absolutely sure you want to delete this blog post? This action will permanently remove it from both the dashboard database and the live website.')
                ->modalSubmitActionLabel('Yes, Delete Post')
                ->modalCancelActionLabel('Cancel'),
        ];
    }
}
