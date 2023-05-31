$(document).ready(function () {
    $("#btn_enviar_formulario").unbind().on("click", function (e) {
        e.preventDefault();

        var f_nombre = $("#f_nombre").val();
        var f_apellidos = $("#f_apellidos").val();
        var f_telefono = $("#f_telefono").val();
        var f_email = $("#f_email").val();
        var f_observaciones = $("#f_observaciones").val();

        if (f_nombre != null && f_nombre.length > 0 && !(/^\s+$/.test(f_nombre)) &&
                f_apellidos != null && f_apellidos.length > 0 && !(/^\s+$/.test(f_apellidos)) &&
                f_telefono != null && f_telefono.length > 0 && !(/^\s+$/.test(f_telefono)) &&
                f_email != null && f_email.length > 0 && !(/^\s+$/.test(f_email)) &&
                f_observaciones != null && f_observaciones.length > 0 && !(/^\s+$/.test(f_observaciones))) {
            $.post("/servicios/formulario.php", { contacto:"true",f_nombre: f_nombre, f_apellidos: f_apellidos, f_telefono: f_telefono, f_email: f_email, f_observaciones: f_observaciones })
                .done(function (data) {
                    if (data.indexOf("No pudo enviarse sus datos, intentelo en otro momento.") >= 0) {
                        $("#msg_contacto").css("background-color", "#F75B5B");
                        $("#msg_contacto").css("color", "white");
                    } else {
                        $("#msg_contacto").css("background-color", "#007A61");
                        $("#msg_contacto").css("color", "black");
                    }
                    $("#msg_contacto").html(data);
                    $("#msg_contacto").fadeIn(400).delay(4000).slideUp(400);
                });
        } else {
            $("#msg_contacto").css("background-color", "#F75B5B");
            $("#msg_contacto").css("color", "white");
            $("#msg_contacto").html("Debe rellenar todos los campos del formulario");
            $("#msg_contacto").fadeIn(400).delay(4000).slideUp(400);
        }
    });
    $("#btn_enviar_cita").unbind().on("click", function (e) {
        e.preventDefault();
        var f_numeroOemail = $("#f_numeroOemail").val();
      
        if (f_numeroOemail != null && f_numeroOemail.length > 0 && !(/^\s+$/.test(f_numeroOemail)) ) {
            $.post("/servicios/formulario.php", { contacto: "false", f_numeroOemail: f_numeroOemail })
                .done(function (data) {
                    if (data.indexOf("No pudo enviarse sus datos, intentelo en otro momento.") >= 0) {
                        $("#msg_cita").css("background-color", "#F75B5B");
                        $("#msg_cita").css("color", "white");
                    } else {
                        $("#msg_cita").css("background-color", "#007A61");
                        $("#msg_cita").css("color", "black");
                    }
                    $("#msg_cita").html(data);
                    $("#msg_cita").fadeIn(400).delay(4000).slideUp(400);
                });
        } else {
            $("#msg_cita").css("background-color", "#F75B5B");
            $("#msg_cita").css("color", "white");
            $("#msg_cita").html("Debe rellenar todos los campos del formulario");
            $("#msg_cita").fadeIn(400).delay(4000).slideUp(400);
        }
    });

    mostrarOcultarElementos();
    cargarEventos();
});
function mostrarOcultarElementos() {
    // div 'Le llamamos'
    if (localStorage.getItem('le_llamamos_cerrado_date') && localStorage.getItem('le_llamamos_cerrado_date') < new Date() ) {
        window.localStorage.removeItem('le_llamamos_cerrado');
        window.localStorage.removeItem('le_llamamos_cerrado_date');
    }
    if (!localStorage.getItem('le_llamamos_cerrado')) {
        $('#contactar_float').removeClass('hidden');
    }
    // div 'cookies'
    if (!localStorage.getItem('cookies_aceptado')) {
        $('#cookies_aviso').removeClass('hidden');
    }
}

function cargarEventos() {
    // botones del 'Le llamamos'
    $('#contactar_float_cerrar').unbind('click').click(function () {
        $('#contactar_float').addClass('hidden');
        localStorage.setItem('le_llamamos_cerrado', true);
        localStorage.setItem('le_llamamos_cerrado_date', new Date());
    });

    $('#contactar_float_btn').unbind().click(function (e) {
        e.preventDefault();
        var contactar_float_tlf = $("#contactar_float_tlf").val();

        if (contactar_float_tlf != null && contactar_float_tlf.length > 0) {
            if (contactar_float_tlf.length == 9 && !isNaN(contactar_float_tlf)) {
                
                $.post("servicios/llamadas.php", {llamame: "true", contactar_float_tlf: contactar_float_tlf })
                    .done(function (data) {
                        var elementosHTML = $("#contactar_float").html();
                        if (data.indexOf("No pudo enviarse sus datos, intentelo en otro momento.") >= 0) {
                            $("#contactar_float").css("background-color", "#F75B5B");
                            $("#contactar_float").css("color", "white");
                        } else {
                            $("#contactar_float").css("background-color", "#007A61");
                            $("#contactar_float").css("color", "black");
                            $('#contactar_float').addClass('hidden');
                            localStorage.setItem('le_llamamos_cerrado', true);
                            localStorage.setItem('le_llamamos_cerrado_date', new Date());
                        }
                        $("#contactar_float").html(data);
                        setTimeout(function () {
                            $("#contactar_float").css("background-color", "#007A61");
                            $("#contactar_float").css("color", "black");
                            $("#contactar_float").html(elementosHTML);
                        }, 3000);
                    });
            } else {
                var elementosHTML = $("#contactar_float").html();
                $("#contactar_float").css("background-color", "#F75B5B");
                $("#contactar_float").css("color", "white");
                $("#contactar_float").html("El número de teléfono no es válido o es demasiado corto");
                setTimeout(function () {
                    $("#contactar_float").css("background-color", "#007A61");
                    $("#contactar_float").css("color", "black");
                    $("#contactar_float").html(elementosHTML);
                }, 3000);

            }
        } else {
            var elementosHTML = $("#contactar_float").html();
            $("#contactar_float").css("background-color", "#F75B5B");
            $("#contactar_float").css("color", "white");
            $("#contactar_float").html("Debe rellenar todos los campos del formulario");
            setTimeout(function () {
                $("#contactar_float").css("background-color", "#007A61");
                $("#contactar_float").css("color", "black");
                $("#contactar_float").html(elementosHTML);
            }, 3000);

        }
    });

    // botones del aviso de cookies
    $('#cookies_aviso_btn_ok').unbind('click').click(function () {
        $('#cookies_aviso').addClass('hidden');
        localStorage.setItem('cookies_aceptado', true);
    });
    $('#cookies_aviso_btn_no').unbind('click').click(function () {
        history.go(-1);
    });
}
