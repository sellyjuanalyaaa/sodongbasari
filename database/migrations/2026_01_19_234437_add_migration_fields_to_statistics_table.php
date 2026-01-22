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
        Schema::table('statistics', function (Blueprint $table) {
            $table->integer('penduduk_datang')->default(0)->after('wisata_alam');
            $table->integer('penduduk_keluar')->default(0)->after('penduduk_datang');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistics', function (Blueprint $table) {
            $table->dropColumn(['penduduk_datang', 'penduduk_keluar']);
        });
    }
};
