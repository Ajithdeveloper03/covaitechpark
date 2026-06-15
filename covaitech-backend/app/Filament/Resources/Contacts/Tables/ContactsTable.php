<?php

namespace App\Filament\Resources\Contacts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ContactsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('phone')
                    ->searchable(),
                TextColumn::make('company')
                    ->searchable(),
                TextColumn::make('source')
                    ->searchable(),
                TextColumn::make('ip_address')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make()
                    ->requiresConfirmation()
                    ->modalHeading('Warning: Confirm Contact Inquiry Deletion')
                    ->modalDescription('Are you absolutely sure you want to delete this contact submission? This action will permanently remove it from the database.')
                    ->modalSubmitActionLabel('Yes, Delete Inquiry')
                    ->modalCancelActionLabel('Cancel'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->requiresConfirmation()
                        ->modalHeading('Warning: Confirm Bulk Inquiry Deletion')
                        ->modalDescription('Are you absolutely sure you want to delete the selected contact inquiries? This action cannot be undone.')
                        ->modalSubmitActionLabel('Yes, Delete Selected')
                        ->modalCancelActionLabel('Cancel'),
                ]),
            ]);
    }
}
