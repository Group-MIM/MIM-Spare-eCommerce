<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Response;

class UsersController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         //dd($request->all());

        if ((!$request->input('name'))
            || (!$request->input('email'))
            || (!$request->input('password'))) {
            $response = Response::json([
                'message' => 'Por favor escriba todos los campos requeridos',
            ], 422);
            return $response;
        }

        $code = $this->generarCodigo(10);
        $email = trim($request->input('email'));

        $para = $email;
        $asunto = "Activa tu cuenta en MIM Spare";

        $cabeceras = "MIME-Version: 1.0" . "\r\n";
        $cabeceras .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $cabeceras .= "From: info@mimspare.com " . "\r\n" . "CC: info@mimspare.com ";

        $mensaje = "<p>Hola " . $request->input('name') . "</p>" .
            "<p>Activa tu cuenta de MIM Spare ingresando <a href='https://api.mimspare.com/public/api/activacion/" . $code . "'>aqui</a></p>";

        mail($para, $asunto, $mensaje, $cabeceras);

        $user = new User;
        $user->name = trim($request->input('name'));
        $user->role = !$request->input('role') ? 'user': $request->input('role');
        $user->active = !$request->input('active') ? 0 : $request->input('active');
        $user->code = $code;
        $user->direccion = "-";
        $user->pais = "-";
        $user->provincia = "-";
        $user->municipio = "-";
        $user->codigo_postal = "-";
        $user->direccion_alt = !$request->input('direccion_alt') ? "-" : $request->input('direccion_alt');
        $user->pais_alt = !$request->input('pais_alt') ? "-" : $request->input('pais_alt');
        $user->provincia_alt = !$request->input('provincia_alt') ? "-" : $request->input('provincia_alt');
        $user->municipio_alt = !$request->input('municipio_alt') ? "-": $request->input('municipio_alt');
        $user->codigo_postal_alt = !$request->input('codigo_postal_alt') ? "-" : $request->input('codigo_postal_alt');
        $user->telefono = !$request->input('telefono') ? "-" : $request->input('telefono');
        $user->avatar = "https://api.mimspare.com/public/img/defaultavatar.png";
        $user->email = trim($request->input('email'));
        $user->password = trim($request->input('password'));

        $user->save();

        $message = 'El usuario ha sido añadido de modo correcto';

        $response = Response::json([
            'message' => $message,
            'data' => $user,
        ], 201);

        return $response;

    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    //Funcion que genera el codigo //
    public function generarCodigo($longitud)
    {
        $key = '';
        $pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
        $max = strlen($pattern) - 1;
        for ($i = 0; $i < $longitud; $i++) {
            $key .= $pattern{mt_rand(0, $max)};
        }

        return $key;
    }

    public function activate($code)
    {
        $users = User::where('code', $code);
        $exist = $users->count();
        $user = $users->first();
        if ($exist == 1 and $user->active == 0) {
            $id = $user->id;
            $user = User::find($id);
            $user->active = 1;
            $user->save();
            $response = Response::json([
                'message' => 'Usuario activado.',
                'data' => $user,
            ], 201);
            return redirect::to('https://www.mimspare.com');

        } else {
            return redirect::to('https://www.mimspare.com');
        }
    }

    public function resetPassword($code)
    {
        $users = User::where('code', $code);
        $exist = $users->count();
        $user = $users->first();
        if ($exist == 1) {
            return redirect::to('https://www.mimspare.com/ca/resetpassword/' . $code);

        } else {
            return redirect::to('https://www.mimspare.com');
        }
    }

    public function getUserByToken($code)
    {
        $users = User::where('code', $code);
        $exist = $users->count();
        $user = $users->first();
        if ($exist == 1) {
            return $user;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if ($id == 0) {
            $user = User::all();
        } else {
            $user = User::where('id', '=', $id)->get();

        }
        return $user;
    }

    public function destroy($id)
    {
        // delete
        $user = User::find($id);

        if (!$user) {
            return Response::json(['error' => 'no se ha encontrado el usuario'], 404);
        }

        $user->delete();

        $message = 'El usuario ha sido eliminado correctamente';

        $response = Response::json(['message' => $message, 'data' => $user]);

        return $response;
    }

    public function editar($id, Request $usuario)
    {
       // dd($usuario->all());
        if (array_key_exists('password', $usuario->all())) {
            $pass = $usuario->all()['password'];

            $arr_repl = array('password' => $pass);
            $user_updated = array_replace($usuario->all(), $arr_repl);

            return User::where('id', $id)->update($user_updated);

        } else {
            return User::where('id', $id)->update($usuario->all());
        }

    }

    public function login($email, $password)
    {
        $user = User::where('email', '=', trim($email))->where('password', '=', trim($password))->get();

        return $user;
    }
}
