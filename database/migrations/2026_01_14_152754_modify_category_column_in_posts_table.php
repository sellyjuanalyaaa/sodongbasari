<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Change category column from ENUM to ARCHAR(255) to support flexible inputs
        DB::statement("ALTER TABLE posts MODIFY COLUMN category VARCHAR(255) NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Re-add ENUM restriction (warning: will fail if non-enum values exist)
        DB::statement("ALTER TABLE posts MODIFY COLUMN category ENUM('news', 'announcement') NOT NULL");
    }
};
