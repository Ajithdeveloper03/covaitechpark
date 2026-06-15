<?php

namespace App\Filament\Resources\Blogs\Pages;

use App\Filament\Resources\Blogs\BlogResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBlog extends CreateRecord
{
    protected static string $resource = BlogResource::class;

    protected function getCreateFormAction(): \Filament\Actions\Action
    {
        return parent::getCreateFormAction()
            ->requiresConfirmation()
            ->modalHeading('Confirm Blog Post Creation')
            ->modalDescription('Please confirm that you have checked the content and want to publish this new blog post to the live website.')
            ->modalSubmitActionLabel('Yes, Create Post')
            ->modalCancelActionLabel('Cancel');
    }
}
