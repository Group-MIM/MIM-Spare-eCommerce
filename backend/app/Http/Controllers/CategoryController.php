<?php

namespace App\Http\Controllers;

use App\Category;
use App\CategoryHome;
use Illuminate\Http\Request;
use Response;

class CategoryController extends Controller
{
   
   
    public function index()
    {
        $category = Category::orderBy('id', 'asc')->get();

        if (!$category) {
            return Response::json(['error' => ['message' => 'No se ha encontrado la categoria']], 404);
        }

        return Response::json($category, 200);
    }

    public function saveCategoryHome($category_num, $category_id)
    {
        $categoryhome = CategoryHome::find($category_num);

        if (!$categoryhome) {
            $categoryhome = new CategoryHome();

        }

        $categoryhome->id_category = $category_id;
        $categoryhome->save();
        return Response::json($categoryhome, 200);

    }

    public function getCategoryHome($id)
    {

        $category_id = CategoryHome::find($id);

        if (!$category_id) {
            return Response::json(['error' => ['message' => 'No se ha encontrado la categoria']], 404);
        }

        $idfind = $category_id->id_category;
        $category = Category::find($idfind);

        return Response::json($category, 200);
    }

}
