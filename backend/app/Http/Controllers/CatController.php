<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use Illuminate\Http\Request;

class CatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cats = Cat::all();
        
        return response()->json($cats);
        }

    public function store(Request $request)
    {
        $validated = $request-> validate([
            'cat_name' => 'required|string|max:255',
            'cat_age_type' =>'required|string',
            'cat_breed' =>'required|string',
            'cat_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'cat_description' =>'nullable|string',
        ]);
        $cats = Cat::create($validated);
        return  response()->json($cats, 201);
    }
    
    public function show(Cat $cats)
    {
    return response()->json($cats);
    }

    public function update (Request $request, Cat $cats)
    {
        $validated = $request->validate([
            'cat_name' => 'required|string|max:255',
            'cat_age_type' =>'required|string',
            'cat_breed' =>'required|string',
            'cat_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'cat_description' =>'nullable|string',
        ]);
        $cats->update($validated);
        return response()->json($cats, 200);
    }


    public function destroy(Cat $cats)
    {
        $cats->delete();
        return response()->json(null, 204);
    }
}
