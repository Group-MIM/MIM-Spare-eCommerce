<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Response;

class MailsController extends Controller
{
    public function sendMail(Request $request)
    {
        $email = trim($request->input('email_contact'));

        $para = "info@mimspare.com";
        $asunto = "Formulario de contacto de MIM Spare";

        $cabeceras = "MIME-Version: 1.0" . "\r\n";
        $cabeceras .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $cabeceras .= "From: info@mimspare.com " . "\r\n" . "CC: " . $email;

        $mensaje = "<p>" . $request->input('mensaje_contact') . "</p><br><hr><br>" .
        "<p><b>Teléfono:</b> " . $request->input('telefono_contact') . "</p>" .
        "<p><b>Email:</b> " . $request->input('email_contact') . "</p>" .
        "<p><b>Nombre:</b> " . $request->input('nombre_contact') . "</p>";

        if (mail($para, $asunto, $mensaje, $cabeceras)) {
            $message = 'Email enviado correctamente';

            $response = Response::json([
                'message' => $message,
                'data' => $mensaje,
            ], 201);

            return $response;
        } else {
            $response = Response::json([
                'message' => 'Ha habido un problema al enviar el mail',
            ], 421);

            return $response;
        }

    }

    public function verifyUser($email)
    {
        $user = User::where('email', '=', $email)->get();
        $code = $user[0]['code'];
        $name = $user[0]['name'];

        $para = $email;
        $asunto = "Activa tu cuenta en MIM Spare";

        $cabeceras = "MIME-Version: 1.0" . "\r\n";
        $cabeceras .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $cabeceras .= "From: info@mimspare.com " . "\r\n" . "CC: info@mimspare.com ";

        $mensaje = "<img src='https://www.mimspare.com/assets/img/logo.png'>" .
            "<p>Hola " . $name . "</p>" .
            "<p>Gracias por registrarte en <b>MIM Spare.</b></p>" .
            "<p>Activa tu cuenta ahora ingresando <a href='https://api.mimspare.com/public/api/activacion/" . $code . "'>aqui</a></p>";

        if (mail($para, $asunto, $mensaje, $cabeceras)) {

            $response = Response::json([
                'message' => 'Email enviado correctamente',
            ], 201);

            return $response;
        } else {
            $response = Response::json([
                'message' => 'Ha habido un problema al enviar el mail',
            ], 421);

            return $response;
        }

    }

    public function resetPass(Request $request)
    {
        $email = trim($request->input('email_reset'));

        $users = User::where('email', $email);

        if ($users->count() == 1) {
            $user = $users->first();
            $code = $user->code;
            $mensaje = "<img src='https://www.mimspare.com/assets/img/logo.png'>" .
            "<p>Has solicitado cambiar tu contraseña de <b>MIM Spare</b>.</p>" .
            "<p>Para hacerlo ingresa <a href='https://api.mimspare.com/public/api/reset/password/" . $code . "'>aqui</a></p>";

            $para = $email;
            $asunto = "Restablecer contraseña de MIM Spare";

            $cabeceras = "MIME-Version: 1.0" . "\r\n";
            $cabeceras .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $cabeceras .= "From: info@mimspare.com " . "\r\n" . "CC: info@mimspare.com ";

            if (mail($para, $asunto, $mensaje, $cabeceras)) {
                $message = 'Email enviado correctamente';

                $response = Response::json([
                    'message' => $message,
                    'data' => $mensaje,
                ], 201);

                return $response;
            } else {
                $response = Response::json([
                    'message' => 'Ha habido un problema al enviar el mail',
                ], 421);

                return $response;
            }

        } else {
            $response = Response::json([
                'message' => 'El usuario no existe.',
            ], 403);

            return $response;
        }

    }

    public function confirmarCompra($email, $importe)
    {

        $mensaje = "<img src='https://www.mimspare.com/assets/img/logo.png'>" .
        "<p>Gracias por comprar en <b>MIM Spare</b>.<br>Puedes ver la factura de esta compra la sección 'Mis Pedidos' de tu zona de usuario.<br><br><a href='www.mimspare.com'>mimspare.com</a><br><br>Si no estás registrado, ponte en contacto con nosotros y te la enviaremos por correo electrónico.'";

        $para = $email;
        $asunto = "Factura de compra de MIM Spare";

        $cabeceras = "MIME-Version: 1.0" . "\r\n";
        $cabeceras .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $cabeceras .= "From: info@mimspare.com " . "\r\n" . "CC: info@mimspare.com ";

        if (mail($para, $asunto, $mensaje, $cabeceras)) {
            $message = 'Email enviado correctamente';

            $response = Response::json([
                'message' => $message,
                'data' => $mensaje,
            ], 201);

            return $response;
        } else {
            $response = Response::json([
                'message' => 'Ha habido un problema al enviar el mail',
            ], 421);

            return $response;
        }

    }

}
