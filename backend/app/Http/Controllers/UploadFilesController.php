<?php

namespace App\Http\Controllers;

class UploadFilesController extends Controller
{
    public function store()
    {
        $file = file_get_contents($_FILES['myfile']['tmp_name']);
        file_put_contents("img/" . $_FILES['myfile']['name'], $file);

    }
}
