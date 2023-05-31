<?php
	$llamame = $_POST['llamame'];
	if($llamame == "true"){
		$dato = $_POST['contactar_float_tlf'];	

		$asunto = "Hay una persona solicitando que se le llame";
		$menaje = "Hay una persona solicitando que se le llame.Telefono: ".$dato." Llamar lo antes posible";
			
		$cabeceras = 'From: servidorContacto@sotorodriguezabogados.es' . "\r\n" .'Reply-To: softolont@gmail.com' . "\r\n" .'X-Mailer: PHP/' . phpversion();

		if(mail("info@sotorodriguezabogados.es",$asunto,$menaje,$cabeceras)){
			echo "Se ha enviado su solicitud correctamente.Le responderemos lo antes posible";
		} else {
			echo "No pudo enviarse sus datos, intentelo en otro momento.";
		}
	}
?>