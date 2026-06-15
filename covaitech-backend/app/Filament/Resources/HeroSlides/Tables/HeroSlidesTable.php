<?php

namespace App\Filament\Resources\HeroSlides\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HeroSlidesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable(),
                TextColumn::make('subtitle')
                    ->searchable(),
                ImageColumn::make('image'),
                TextColumn::make('label')
                    ->searchable(),
                TextColumn::make('meta')
                    ->searchable(),
                TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
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
                    ->modalHeading('Warning: Confirm Hero Slide Deletion')
                    ->modalDescription('Are you absolutely sure you want to delete this hero slide? This action will permanently remove it from both the dashboard database and the live website homepage carousel.')
                    ->modalSubmitActionLabel('Yes, Delete Slide')
                    ->modalCancelActionLabel('Cancel'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->requiresConfirmation()
                        ->modalHeading('Warning: Confirm Bulk Slide Deletion')
                        ->modalDescription('Are you absolutely sure you want to delete the selected hero slides? This action will permanently remove them from both the database and the live website.')
                        ->modalSubmitActionLabel('Yes, Delete Selected')
                        ->modalCancelActionLabel('Cancel'),
                ]),
            ]);
    }
}
