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
        Schema::create('statistics', function (Blueprint $table) {
            $table->id();
            $table->integer('year')->unique(); // Tahun data
            $table->string('infographic_image')->nullable(); // Path gambar infografis anggaran
            
            // Data Penduduk
            $table->integer('total_population')->default(0);
            $table->integer('male_population')->default(0);
            $table->integer('female_population')->default(0);
            $table->integer('total_families')->default(0); // KK
            
            // Data RT/RW
            $table->integer('total_rt')->default(0);
            $table->integer('total_rw')->default(0);
            $table->integer('total_dusun')->default(0);
            
            // Data Pendidikan
            $table->integer('tidak_sekolah')->default(0);
            $table->integer('sd_sederajat')->default(0);
            $table->integer('smp_sederajat')->default(0);
            $table->integer('sma_sederajat')->default(0);
            $table->integer('diploma')->default(0);
            $table->integer('sarjana')->default(0);
            
            // Data Pekerjaan
            $table->integer('petani')->default(0);
            $table->integer('pedagang')->default(0);
            $table->integer('pns')->default(0);
            $table->integer('wiraswasta')->default(0);
            $table->integer('lainnya')->default(0);
            
            // Data Agama
            $table->integer('islam')->default(0);
            $table->integer('kristen')->default(0);
            $table->integer('katolik')->default(0);
            $table->integer('hindu')->default(0);
            $table->integer('budha')->default(0);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statistics');
    }
};
