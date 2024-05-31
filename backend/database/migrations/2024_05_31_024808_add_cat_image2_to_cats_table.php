<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCatImage2ToCatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('cats', function (Blueprint $table) {
            $table->text('cat_image2')->nullable()->after('cat_image');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('cats', function (Blueprint $table) {
            $table->dropColumn('cat_image2');
        });
    }
}
