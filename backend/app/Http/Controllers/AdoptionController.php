<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cat;
use App\Models\AdoptionRequest;

class AdoptionController extends Controller
{
    public function adopt(Request $request)
    {
    // Find the cat record based on the provided data
    $cat = Cat::where('cat_name', $request->cat_name)
        ->where('cat_age_type', $request->cat_age_type)
        ->where('cat_breed', $request->cat_breed)
        ->where('cat_description', $request->cat_description)
        ->where('cat_image', $request->cat_image)
        ->first();

    // Create a new adoption request record and associate it with the cat
    $adoptionRequest = $cat->adoptionRequests()->create([
        'status' => 'pending',
    ]);

    // Return a success response
    return response()->json([
        'message' => 'Adoption request submitted successfully',
    ], 200);
    }
    public function index()
        {
            $adoptionRequests = AdoptionRequest::with('cat')->get();
             return response()->json($adoptionRequests);
         }

    public function update(Request $request, $id)
        {
    $adoptionRequest = AdoptionRequest::findOrFail($id);

    if ($request->status === 'approved') {
        $adoptionRequest->status = 'approved';
    } elseif ($request->status === 'declined') {
        $adoptionRequest->status = 'declined';
    }

    $adoptionRequest->save();

    return response()->json(['message' => 'Adoption request status updated successfully.']);
        }
}