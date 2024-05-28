<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdoptionRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'cat_id',
        'status',
    ];

    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }
}