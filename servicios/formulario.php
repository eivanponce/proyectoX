<?php
	$completo = $_POST['contacto'];
	if($completo == "true"){
		$nombre = $_POST['f_nombre'];
		$apellidos = $_POST['f_apellidos'];
		$email = $_POST['f_email'];
		$telefono = $_POST['f_telefono'];
		$observaciones = $_POST['f_observaciones'];

		$asunto = "Solicitud de contacto web";
		$menaje = "Nombre completo: ".$nombre." ".$apellidos."Email: ".$email."Telefono: ".$telefono."Mensaje:".$observaciones;
	}else {
		$dato = $_POST['f_numeroOemail'];	

		$asunto = "Solicitud de cita previa";
		$menaje = "Email: ".$dato." Llamar o contactar lo antes posible";
	}
	$cabeceras = 'From: servidorContacto@sotorodriguezabogados.es' . "\r\n" .'Reply-To: softolont@gmail.com' . "\r\n" .'X-Mailer: PHP/' . phpversion();
	if(mail("info@sotorodriguezabogados.es",$asunto,$menaje,$cabeceras)){
		echo "Se ha enviado su solicitud correctamente.Le responderemos lo antes posible";
	} else {
		echo "No pudo enviarse sus datos, intentelo en otro momento.";
	}
?>