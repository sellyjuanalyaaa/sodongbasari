<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('village_infos', function (Blueprint $table) {
            $table->string('head_of_village_name')->nullable()->after('logo_path');
            $table->string('head_of_village_photo')->nullable()->after('head_of_village_name');
            $table->text('welcome_message')->nullable()->after('head_of_village_photo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('village_infos', function (Blueprint $table) {
            $table->dropColumn(['head_of_village_name', 'head_of_village_photo', 'welcome_message']);
        });
    }
};
