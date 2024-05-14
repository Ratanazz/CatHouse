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
    
    public function show($id)
{
    // Fetch the cat by ID from the database
    $cat = Cat::find($id);

    if (!$cat) {
        // Handle the case where the cat is not found
        return response()->json(['message' => 'Cat not found'], 404);
    }

    // Return the found cat as a JSON response
    return response()->json($cat);
}

public function update(Request $request, Cat $cat) // note the singular 'cat'
{
    $validated = $request->validate([
        'cat_name' => 'required|string|max:255',
        'cat_age_type' =>'required|string',
        'cat_breed' =>'required|string',
        'cat_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'cat_description' =>'nullable|string',
    ]);

    $cat->update($validated);

    return response()->json($cat, 200);
}


public function destroy(Cat $cat)
{
    $cat->delete();

    return response()->json(['message' => 'Cat deleted successfully'], 200);
}
}
