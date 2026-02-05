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
        Schema::create('electoral_rolls', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->integer('male_voters')->default(0);
            $table->integer('female_voters')->default(0);
            $table->integer('total_voters')->default(0);
            $table->string('election_type'); // Pilpres, Pileg, Pilkada, dll
            $table->timestamps();

            // Index untuk performa query
            $table->index('year');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('electoral_rolls');
    }
};
