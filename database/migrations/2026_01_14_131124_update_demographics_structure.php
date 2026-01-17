<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('demographics');
        
        Schema::create('demographics', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->integer('total_male')->default(0);
            $table->integer('total_female')->default(0);
            $table->integer('total_families')->default(0);
            $table->integer('mutation_in')->default(0);
            $table->integer('mutation_out')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demographics');
    }
};
