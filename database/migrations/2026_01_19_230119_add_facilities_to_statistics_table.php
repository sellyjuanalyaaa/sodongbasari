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
            // Tempat Ibadah
            $table->integer('masjid')->default(0)->after('budha');
            $table->integer('mushola')->default(0)->after('masjid');
            $table->integer('gereja')->default(0)->after('mushola');
            $table->integer('pura')->default(0)->after('gereja');
            $table->integer('vihara')->default(0)->after('pura');
            
            // Fasilitas Kesehatan
            $table->integer('puskesmas')->default(0)->after('vihara');
            $table->integer('posyandu')->default(0)->after('puskesmas');
            $table->integer('klinik')->default(0)->after('posyandu');
            
            // Fasilitas Olahraga
            $table->integer('lapangan_sepakbola')->default(0)->after('klinik');
            $table->integer('lapangan_voli')->default(0)->after('lapangan_sepakbola');
            $table->integer('lapangan_badminton')->default(0)->after('lapangan_voli');
            $table->integer('gor')->default(0)->after('lapangan_badminton');
            
            // Wisata
            $table->integer('pantai')->default(0)->after('gor');
            $table->integer('taman')->default(0)->after('pantai');
            $table->integer('cagar_budaya')->default(0)->after('taman');
            $table->integer('wisata_alam')->default(0)->after('cagar_budaya');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('statistics', function (Blueprint $table) {
            $table->dropColumn([
                'masjid',
                'mushola',
                'gereja',
                'pura',
                'vihara',
                'puskesmas',
                'posyandu',
                'klinik',
                'lapangan_sepakbola',
                'lapangan_voli',
                'lapangan_badminton',
                'gor',
                'pantai',
                'taman',
                'cagar_budaya',
                'wisata_alam',
            ]);
        });
    }
};
