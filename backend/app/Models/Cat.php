<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Intervention\Image\Facades\Image;
class Cat extends Model
{
    protected $fillable=[
            'cat_name',
            'cat_age_type' ,
            'cat_breed' ,
            'cat_image' ,
            'cat_image2' ,
            
            'cat_description' ,
    ];
    public function adoptionRequests()
    {
        return $this->hasMany(AdoptionRequest::class);
    }
    
}
