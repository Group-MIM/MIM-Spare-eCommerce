<?php

namespace App\Http\Controllers;

use App\Order;
use App\User;
use Illuminate\Http\Request;
use Response;

class OrdersController extends Controller
{
    public function guardarCarro($complete, $user_id, Request $products)
    {
        //  dd($products);
        if ($user_id == null || $products == null) {
            $response = Response::json([
                'message' => 'Ha habido un problema al añadir los productos al carro',
            ], 422);
            return $response;
        }

        $price = 0;
        for ($i = 0; $i < count($products->all()); $i++) {
            $price += $products->all()[$i]['priceAmount'];
        }

        $order = new Order();
        $order->client_id = $user_id;
        $order->cart = json_encode($products->all());
        $order->price = $price;
        $order->complete = $complete;
        $order->nombre = "-";
        $order->direccion = "-";
        $order->provincia = "-";
        $order->municipio = "-";
        $order->codigo_postal = "-";
        $order->direccion_alt = "-";
        $order->provincia_alt = "-";
        $order->municipio_alt = "-";
        $order->codigo_postal_alt = "-";
        $order->email = "-";
        $order->telefono = "-";
        $order->products_table = "-";
        $order->estado = 0;
        $order->transportista = "-";
        $order->precio_envio = 0;
        $order->enviar_direccion_alternativa = 0;
        

        $order_check = Order::where('client_id', '=', $user_id)
            ->where('complete', '=', 0)
            ->first();

        if ($order_check == null) {
            $order->save();
        } else {
            Order::where('client_id', '=', $user_id)
                ->where('complete', '=', 0)
                ->delete();
            $order->save();
        }

        $message = 'El producto ha sido añadido de modo correcto';

        $response = Response::json([
            'message' => $message,
            'data' => $order,
        ], 201);

        return $response;
    }

    public function guardarDatosCliente($user_id, Request $request)
    {
      

        $order_old = Order::where('client_id', '=', $user_id)
        ->where('complete', '=', 1)
        ->orderBy('updated_at', 'desc')
        ->first();

        $order = new Order();
        $order->client_id = $order_old->client_id;
        $order->cart = $order_old->cart;
        $order->price = $order_old->price;
        $order->complete = $order_old->complete;
        $order->estado = 0;
        $order->transportista = "-";
        $order->nombre = $request->all()[0];
        $order->direccion = $request->all()[1];
        $order->provincia = $request->all()[2];
        $order->municipio = $request->all()[3];
        $order->codigo_postal = $request->all()[4];
        $order->email = $request->all()[5];
        $order->telefono = $request->all()[6];
        $order->products_table = $request->all()[7];
        $order->enviar_direccion_alternativa = 1;//$request->all()[8];
        $order->direccion_alt = $request->all()[9];
        $order->provincia_alt = $request->all()[10];
        $order->municipio_alt = $request->all()[11];
        $order->codigo_postal_alt = $request->all()[12];
        $order->precio_envio = $request->all()[13];
        

        $order_old->delete();
        $order->save();

        $message = 'El producto ha sido actualizado de modo correcto';

        $response = Response::json([
            'message' => $message,
            'data' => $order,
        ], 201);

        return $response;
        
       
    }

    public function getProducts($complete, Request $request)
    {

        $user_id = $request->all()[0];

        $usuario = User::where("id", "=", $user_id)->get();
     //   dd($usuario[0]);
        if ($usuario[0]->role != 'user') {
            $products = Order::where('complete', '=', $complete)
                ->orderBy('estado', 'asc')
                ->get();

            if (!$products) {
                return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
            }

            $message = 'OK';

            $response = Response::json([
                $products,
            ], 201);

            return $response;
        } else {
            $products = Order::where('client_id', '=', $user_id)
                ->orderBy('estado', 'asc')
                ->where('complete', '=', $complete)
                ->get();

            if (!$products) {
                return Response::json(['error' => ['message' => 'No se ha encontrado el producto']], 404);
            }

            $message = 'OK';

            $response = Response::json([
                $products,
            ], 201);

            return $response;
        }

    }

    public function getInvoiceData($id_invoice)
    {
        $invoice = Order::where('id', '=', $id_invoice)->get();

        if (!$invoice) {
            return Response::json(['error' => ['message' => 'No se ha encontrado la factura']], 404);
        }

        return Response::json($invoice, 200);
    }

    public function cambiarEstado($id, $estado)
    {
        $pedido = Order::where('id', '=', $id)->first();

        if (!$pedido) {
            return Response::json(['error' => ['message' => 'No se ha encontrado el pedido']], 404);
        }

        $pedido->estado = $estado;
        $pedido->save();

        return Response::json($pedido, 200);

    }

}
