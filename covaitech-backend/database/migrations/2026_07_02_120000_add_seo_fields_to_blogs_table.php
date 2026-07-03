<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add SEO meta fields to blogs table.
     */
    public function up(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('meta_title', 70)->nullable()->after('schema');
            $table->string('meta_description', 160)->nullable()->after('meta_title');
            $table->string('meta_keywords', 255)->nullable()->after('meta_description');
            $table->string('og_image')->nullable()->after('meta_keywords');       // Open Graph image
            $table->string('canonical_url')->nullable()->after('og_image');       // Canonical URL override
            $table->string('focus_keyword', 100)->nullable()->after('canonical_url'); // Primary focus keyword
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description', 'meta_keywords', 'og_image', 'canonical_url', 'focus_keyword']);
        });
    }
};
