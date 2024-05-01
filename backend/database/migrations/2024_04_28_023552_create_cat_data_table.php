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
        Schema::create('cat_data', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('cat_name');  
            $table->string('cat_age_type');  
            $table->string('cat_breed')->nullable();  
            $table->text('cat_image')->nullable();  
            $table->text('cat_description')->nullable();  

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_data');
    }
};
