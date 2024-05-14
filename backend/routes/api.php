<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CatController;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Sanctum;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cats/{cat}', [CatController::class, 'show'])->name('cats.show');
Route::resource('cats', CatController::class);

Route::group(['middleware' => 'api'], function () {
    Route::get('/sanctum/csrf-cookie', function () {
        return Cookie::response('XSRF-TOKEN', csrf_token(), config('session.cookie'));
    });
});
// Protected routes that require authentication using Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    
    // Define resourceful routes for CatController
    
});
