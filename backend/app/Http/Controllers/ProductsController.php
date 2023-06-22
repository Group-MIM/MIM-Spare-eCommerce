<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductHome;
use Illuminate\Http\Request;
use Response;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::orderBy('priority', 'asc')->get();

        if (!$product) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($product, 200);
    }

    public function indexByCategory($category)
    {
        $product = Product::where('category', '=', $category)->orderBy('priority', 'asc')->get();

        if (!$product) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($product, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ((!$request->input('madeIn'))
            || (!$request->input('title'))
            || (!$request->input('imageLink'))
            || (!$request->input('price'))
            || (!$request->input('description'))
            || (!$request->input('category'))
            || (!$request->input('iva'))
            || (!$request->input('price_sin_iva'))) {

            $response = Response::json([
                'message' => 'Por favor escriba todos los campos requeridos',
            ], 422);
            return $response;
        }

        $product = new Product;
        $product->title = $request->input('title');
        $product->description = $request->input('description');
        $product->imageLink = $request->input('imageLink');
        $product->price = $request->input('price');
        $product->category = $request->input('category');
        $product->madeIn = $request->input('madeIn');
        $product->quantity = $request->input('quantity');
        $product->iva = $request->input('iva');
        $product->price_sin_iva = $request->input('price_sin_iva');
        $product->medida = $request->input('medida');
        $product->priority = $request->input('priority');
        $product->tech_sheet = $request->input('tech_sheet');
        $product->codigo_articulo = $request->input('codigo_articulo');

        $product->save();

        $message = 'El producto ha sido añadido de modo correcto';

        $response = Response::json([
            'message' => $message,
            'data' => $product,
        ], 201);

        return $response;
    }

    public function saveProductHome($product_num, $product_id)
    {
        $producthome = ProductHome::find($product_num);

        if (!$producthome) {
            $producthome = new ProductHome();

        }

        $producthome->id_prod = $product_id;
        $producthome->save();
        return Response::json($producthome, 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($product, 200);
    }

    public function getProductHome($id)
    {

        $product_id = ProductHome::find($id);

        if (!$product_id) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        $idfind = $product_id->id_prod;
        $producto = Product::find($idfind);

        return Response::json($producto, 200);
    }

    public function showByName($search)
    {
        $product = Product::where('title', '=', $search)->get();

        if (!$product) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($product, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // print_r($request->input('imageLink'));
        if ((!$request->input('madeIn'))
            || (!$request->input('title'))
            || (!$request->input('imageLink'))
            || (!$request->input('price'))
            || (!$request->input('description'))
            || (!$request->input('category'))
            || (!$request->input('iva'))
            || (!$request->input('price_sin_iva'))) {
            $response = Response::json([
                'message' => 'Por favor escriba todos los campos requeridos',
            ], 422);
            return $response;
        }

        $product = Product::find($request->input('id'));

        if (!$product) {
            return Response::json(['error' => 'no se ha encontrado el producto'], 404);
        }

        $product->title = $request->input('title');
        $product->description = $request->input('description');
        $product->imageLink = $request->input('imageLink');
        $product->price = $request->input('price');
        $product->category = $request->input('category');
        $product->madeIn = $request->input('madeIn');
        $product->quantity = $request->input('quantity');
        $product->iva = $request->input('iva');
        $product->price_sin_iva = $request->input('price_sin_iva');
        $product->medida = $request->input('medida');
        $product->priority = $request->input('priority');
        $product->tech_sheet = $request->input('tech_sheet');
        $product->codigo_articulo = $request->input('codigo_articulo');

        $product->save();

        $message = 'El producto ha sido actualizado correctamente';

        $response = Response::json(['message' => $message, 'data' => $product]);

        return $response;
    }

    public function restarStock($id, $quantity)
    {
        $producto = Product::where('id', '=', $id)->first();

        if (!$producto) {
            return Response::json(['error' => 'no se ha encontrado el producto'], 404);
        }

        $quantity_producto = $producto->quantity;

        $quantity_total = intval($quantity_producto) - intval($quantity);

        if (intval($quantity_total) < 0) {
            $quantity_total = 0;
        }

        $producto->quantity = $quantity_total;

        $producto->save();

        $message = 'El stock ha sido actualizado correctamente';

        $response = Response::json(['message' => $message, 'data' => $producto]);

        return $response;

    }

    public function updateStock($id, $quantity)
    {
        $producto = Product::where('id', '=', $id)->first();

        if (!$producto) {
            return Response::json(['error' => 'no se ha encontrado el producto'], 404);
        }

        $producto->quantity = $quantity;

        $producto->save();

        $message = 'El stock ha sido actualizado correctamente';

        $response = Response::json(['message' => $message, 'data' => $producto]);

        return $response;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // delete
        $product = Product::find($id);

        if (!$product) {
            return Response::json(['error' => 'no se ha encontrado el producto'], 404);
        }

        $product->delete();

        $message = 'El producto ha sido eliminado correctamente';

        $response = Response::json(['message' => $message, 'data' => $product]);

        return $response;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexWhere(Request $filtro)
    {


            $arr_precio = $filtro->all()['precio'] != 'null' ? $filtro->all()['precio'] : [];
            $arr_origen = $filtro->all()['origen'] != 'null' ? $filtro->all()['origen'] : [];
            $arr_categoria = $filtro->all()['categoria'] != 'null' ? $filtro->all()['categoria'] : [];
            $precios_aux = [];
            $precios = [];

            foreach ($arr_precio as $rango_precios) {
                $precio = explode("-", str_replace(" ", "", str_replace("€", "", $rango_precios)));
                array_push($precios_aux, $precio[0]);
                array_push($precios_aux, $precio[1]);
                sort($precios_aux, 1);

            }
            $precios = [current($precios_aux), end($precios_aux)];

            $query = Product::query();
            if (count($arr_precio) > 0) {
                $query->whereBetween('price', [intval($precios[0]), intval($precios[1])]);

            }

            if (count($arr_origen) > 0) {
                $query->where(function ($query) use ($arr_origen) {
                    for ($i = 0; $i < count($arr_origen); $i++) {
                        $query->orWhere('madeIn', '=', $arr_origen[$i]);
                    }
                });
            }

            if (count($arr_categoria) > 0) {
                $query->where(function ($query) use ($arr_categoria) {
                    for ($i = 0; $i < count($arr_categoria); $i++) {
                        $query->orWhere('category', '=', $arr_categoria[$i]);
                    }
                });
            }

            $products = $query->get();


        if (!$products) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($products, 200);

    }

    public function indexSorted($sortBy, $price, $category, $madein)
    {

        if ($price !== "null") {
            $rango_precios = explode("-", $price);

            $preciomin = $rango_precios[0];
            $preciomax = $rango_precios[1];
        }

        if ($madein == 'null' && $price == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->get();

            } else {
                $product = Product::all();

            }

        } else if ($category == 'null' && $madein == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->get();

            } else {
                $product = Product::whereBetween('price', [$preciomin, $preciomax])
                    ->get();

            }

        } else if ($category == 'null' && $price == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else {
                $product = Product::where('madeIn', '=', $madein)
                    ->get();

            }

        } else if ($madein == 'null' && $price == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->where('category', '=', $category)
                    ->get();

            } else {
                $product = Product::where('category', '=', $category)
                    ->get();

            }

        } else if ($category == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('madeIn', '=', $madein)
                    ->get();

            } else {
                $product = Product::whereBetween('price', [$preciomin, $preciomax])
                    ->where('madeIn', '=', $madein)
                    ->get();

            }

        } else if ($madein == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else {
                $product = Product::whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            }

        } else if ($price == 'null') {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->where('madeIn', '=', $madein)
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->where('madeIn', '=', $madein)
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->where('madeIn', '=', $madein)
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->where('madeIn', '=', $madein)
                    ->where('category', '=', $category)
                    ->get();

            } else {
                $product = Product::where('madeIn', '=', $madein)
                    ->where('category', '=', $category)
                    ->get();

            }

        } else {
            if ($sortBy == "priceAsc") {
                $product = Product::orderBy('price')
                    ->where('madeIn', '=', $madein)
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "priceDesc") {
                $product = Product::orderByDesc('price')
                    ->where('madeIn', '=', $madein)
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "madeIn") {
                $product = Product::orderBy('madeIn')
                    ->where('madeIn', '=', $madein)
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else if ($sortBy == "category") {
                $product = Product::orderBy('category')
                    ->where('madeIn', '=', $madein)
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            } else {
                $product = Product::where('madeIn', '=', $madein)
                    ->whereBetween('price', [$preciomin, $preciomax])
                    ->where('category', '=', $category)
                    ->get();

            }

        }

        if (!$product) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($product, 200);

    }

    public function indexSearch($search)
    {
        if ($search == 'empty') {
            $product = Product::all();

        } else {
            $product = Product::where('title', 'like', "%$search%")->get();

        }

        if (!$product) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
        }

        return Response::json($product, 200);
    }
}
