// ========================================
// JDJ SAN JUAN 2026
// FRONTEND - APP.JS
// ========================================


// ========================================
// 1. ELEMENTOS DEL HTML
// ========================================

// Pantallas
const pantallaInicio =
    document.getElementById("pantalla-inicio");

const pantallaRegistro =
    document.getElementById("pantalla-registro");

const pantallaAsignacion =
    document.getElementById("pantalla-asignacion");

const pantallaEncargado =
    document.getElementById("pantalla-encargado");

    const pantallaLoginEncargado =
    document.getElementById(
        "pantalla-login-encargado"
    );


// Botones principales
const btnRegistrar =
    document.getElementById("btn-registrar");

const btnEncargado =
    document.getElementById("btn-encargado");

const btnVolverInicio =
    document.getElementById("btn-volver-inicio");

// Elementos del login de encargado
const formLoginEncargado =
    document.getElementById(
        "form-login-encargado"
    );

const usuarioEncargado =
    document.getElementById(
        "usuario-encargado"
    );

const pinEncargado =
    document.getElementById(
        "pin-encargado"
    );

const mensajeLogin =
    document.getElementById(
        "mensaje-login"
    );

const btnVolverLogin =
    document.getElementById(
        "btn-volver-login"
    );


// Formulario
const formRegistro =
    document.getElementById("form-registro");

const nombrePiloto =
    document.getElementById("nombre-piloto");

const tipoVehiculo =
    document.getElementById("tipo-vehiculo");

// Elementos de la asignación
const codigoIngreso =
    document.getElementById("codigo-ingreso");

const qrCodigo =
    document.getElementById("qr-codigo");

const tipoAsignado =
    document.getElementById("tipo-asignado");

const codigoParqueo =
    document.getElementById("codigo-parqueo");

const nombreParqueo =
    document.getElementById("nombre-parqueo");

// Botones de navegación
const btnGoogleMaps =
    document.getElementById("btn-maps");

const btnWaze =
    document.getElementById("btn-waze");


// ========================================
// 2. ELEMENTOS DEL ENCARGADO
// ========================================

const btnEscanearQR =
    document.getElementById("btn-escanear-qr");

const lectorQR =
    document.getElementById("lector-qr");

const mensajeEscaner =
    document.getElementById("mensaje-escaner");

const codigoBusqueda =
    document.getElementById("codigo-busqueda");

const btnBuscarCodigo =
    document.getElementById("btn-buscar-codigo");

const resultadoBusqueda =
    document.getElementById("resultado-busqueda");

const encargadoNombre =
    document.getElementById("encargado-nombre");

const encargadoTipo =
    document.getElementById("encargado-tipo");

const encargadoCodigoParqueo =
    document.getElementById("encargado-codigo-parqueo");

const encargadoNombreParqueo =
    document.getElementById("encargado-nombre-parqueo");

const encargadoEstado =
    document.getElementById("encargado-estado");

const btnConfirmarIngreso =
    document.getElementById("btn-confirmar-ingreso");


// ========================================
// 3. VARIABLES DEL ESCÁNER
// ========================================

let escanerQR = null;

let escanerActivo = false;

let codigoSeleccionado = "";

let latitudParqueo = null;
let longitudParqueo = null;

const URL_API =
    "https://script.google.com/macros/s/AKfycbzCXQd3o8y943wLaOzEEJZCxcGnHzU2mRmaVlKmmklMTVLN9UOvUkNWgEEe3ZTwBc0kvg/exec";

// ========================================
// 4. IR A REGISTRO
// ========================================

btnRegistrar.addEventListener(
    "click",
    function () {

        pantallaInicio.style.display =
            "none";

        pantallaRegistro.style.display =
            "block";
    }
);


// ========================================
// 5. IR A ACCESO ENCARGADO
// ========================================

btnEncargado.addEventListener(
    "click",
    function () {

        pantallaInicio.style.display =
            "none";

        pantallaLoginEncargado.style.display =
            "block";

        mensajeLogin.textContent =
            "";

        formLoginEncargado.reset();

    }
);

// ========================================
// LOGIN DEL ENCARGADO
// ========================================

formLoginEncargado.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const usuario =
            usuarioEncargado.value.trim();

        const pin =
            pinEncargado.value.trim();


        if (
            usuario === "" ||
            pin === ""
        ) {

            mensajeLogin.textContent =
                "Ingresa tu usuario y PIN.";

            return;
        }


        try {

            mensajeLogin.textContent =
                "Verificando acceso...";


            const respuesta =
                await fetch(
                    URL_API +
                    "?accion=login" +
                    "&usuario=" +
                    encodeURIComponent(usuario) +
                    "&pin=" +
                    encodeURIComponent(pin)
                );


            const datos =
                await respuesta.json();


            console.log(
                "Login encargado:",
                datos
            );


            if (datos.exito !== true) {

                mensajeLogin.textContent =
                    datos.mensaje ||
                    "Usuario o PIN incorrecto.";

                return;
            }


            // ACCESO CORRECTO
            mensajeLogin.textContent =
                "";


            formLoginEncargado.reset();


            pantallaLoginEncargado.style.display =
                "none";


            pantallaEncargado.style.display =
                "block";


        } catch (error) {

            console.error(
                "Error en login:",
                error
            );


            mensajeLogin.textContent =
                "No fue posible verificar el acceso.";

        }

    }
);

btnVolverLogin.addEventListener(
    "click",
    function () {

        formLoginEncargado.reset();

        mensajeLogin.textContent =
            "";

        pantallaLoginEncargado.style.display =
            "none";

        pantallaInicio.style.display =
            "flex";

    }
);


// ========================================
// 6. VOLVER AL INICIO
// ========================================

btnVolverInicio.addEventListener(
    "click",
    function () {

        detenerEscaner();

        pantallaEncargado.style.display =
            "none";

        pantallaInicio.style.display =
            "flex";
    }
);


// ========================================
// 7. ACTIVAR CÁMARA
// ========================================

btnEscanearQR.addEventListener(
    "click",
    function () {

        // Si ya está activa, la cerramos
        if (escanerActivo === true) {

            detenerEscaner();

            return;
        }


        // Mostrar espacio de cámara
        lectorQR.style.display =
            "block";


        mensajeEscaner.textContent =
            "Solicitando acceso a la cámara...";


        btnEscanearQR.textContent =
            "CERRAR CÁMARA";


        // Crear lector QR
        escanerQR =
            new Html5Qrcode(
                "lector-qr"
            );


        // Configuración sencilla
        const configuracion = {

            fps: 10,

            qrbox: {
                width: 220,
                height: 220
            }
        };


        // Iniciar cámara
        escanerQR.start(

            {
                facingMode:
                    "environment"
            },

            configuracion,

            codigoDetectado,

            function () {
                // Se ignoran los intentos
                // donde todavía no encuentra QR
            }

        )
        .then(
            function () {

                escanerActivo =
                    true;

                mensajeEscaner.textContent =
                    "Cámara activa. Apunta al código QR.";
            }
        )
        .catch(
            function (error) {

                console.error(
                    "Error al abrir cámara:",
                    error
                );

                mensajeEscaner.textContent =
                    "ERROR: " +
                    String(error);

                btnEscanearQR.textContent =
                    "ESCANEAR CÓDIGO QR";

                lectorQR.style.display =
                    "none";

                escanerQR =
                    null;

                escanerActivo =
                    false;
            }
        );
    }
);


// ========================================
// 8. QR DETECTADO
// ========================================

function codigoDetectado(textoQR) {

    const codigo =
        String(textoQR)
            .trim()
            .toUpperCase();

    console.log(
        "QR detectado:",
        codigo
    );


    // Validar que sea código JDJ
    if (
        codigo.startsWith("JDJ-") === false
    ) {

        mensajeEscaner.textContent =
            "Este QR no pertenece al sistema JDJ.";

        return;
    }


    // Colocar código en el campo
    codigoBusqueda.value =
        codigo;


    mensajeEscaner.textContent =
        "Código detectado correctamente ✓";


    // Cerrar cámara
    detenerEscaner();


    // Buscar automáticamente
    setTimeout(
        function () {

            buscarVehiculo(codigo);

        },
        500
    );
}

async function buscarVehiculo(codigo) {

    // Limpiar cualquier vehículo anterior
    codigoSeleccionado = "";

    resultadoBusqueda.style.display =
        "none";

    // Mientras buscamos, no se puede confirmar
    btnConfirmarIngreso.disabled =
        true;

    btnConfirmarIngreso.textContent =
        "CONFIRMAR INGRESO";


    try {

        mensajeEscaner.textContent =
            "Buscando vehículo...";


        const respuesta =
            await fetch(
                URL_API +
                "?accion=buscar&codigo=" +
                encodeURIComponent(codigo)
            );


        const datos =
            await respuesta.json();


        console.log(
            "Vehículo encontrado:",
            datos
        );


        // No encontrado
        if (
            datos.encontrado !== true
        ) {

            mensajeEscaner.textContent =
                datos.mensaje ||
                "No se encontró el vehículo.";

            return;
        }

// ========================================
// REVISAR ESTADO DEL VEHÍCULO
// ========================================

if (datos.estado === "ASIGNADO") {

    codigoSeleccionado =
        datos.codigo;

    btnConfirmarIngreso.disabled =
        false;

    btnConfirmarIngreso.textContent =
        "CONFIRMAR INGRESO";

} else if (datos.estado === "INGRESADO") {

    codigoSeleccionado = "";

    btnConfirmarIngreso.disabled =
        true;

    btnConfirmarIngreso.textContent =
        "VEHÍCULO YA INGRESADO";

} else {

    codigoSeleccionado = "";

    btnConfirmarIngreso.disabled =
        true;

    btnConfirmarIngreso.textContent =
        "NO DISPONIBLE";
}

        encargadoTipo.textContent =
            datos.tipoVehiculo.toUpperCase();

        encargadoCodigoParqueo.textContent =
            datos.codigoParqueo;

        encargadoNombreParqueo.textContent =
            datos.nombreParqueo;

        encargadoEstado.textContent =
            datos.estado;


        // Mostrar tarjeta
        resultadoBusqueda.style.display =
            "block";


        mensajeEscaner.textContent =
            "Vehículo encontrado ✓";


    } catch (error) {

        console.error(
            "Error buscando vehículo:",
            error
        );

        mensajeEscaner.textContent =
            "No fue posible consultar el vehículo.";
    }
}

// ========================================
// 9. DETENER CÁMARA
// ========================================

function detenerEscaner() {

    if (
        escanerQR !== null &&
        escanerActivo === true
    ) {

        escanerQR
            .stop()
            .then(
                function () {

                    escanerQR.clear();

                    escanerQR =
                        null;

                    escanerActivo =
                        false;

                    lectorQR.style.display =
                        "none";

                    btnEscanearQR.textContent =
                        "📷 ESCANEAR CÓDIGO QR";

                    mensajeEscaner.textContent =
                        "";
                }
            )
            .catch(
                function (error) {

                    console.error(
                        "Error al detener cámara:",
                        error
                    );
                }
            );
    }
}


// ========================================
// 10. FORMULARIO
// ========================================

formRegistro.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const nombre =
            nombrePiloto.value.trim();

        const tipo =
            tipoVehiculo.value.trim();

        // Validar nombre
        if (nombre === "") {

            alert(
                "Ingresa el nombre del piloto."
            );

            return;
        }

        // Validar vehículo
        if (tipo === "") {

            alert(
                "Selecciona un tipo de vehículo."
            );

            return;
        }

        try {

            const respuesta =
                await fetch(
                    URL_API +
                    "?accion=registrar" +
                    "&nombre=" +
                    encodeURIComponent(nombre) +
                    "&tipo=" +
                    encodeURIComponent(tipo)
                );

            const datos =
                await respuesta.json();

            console.log(
                "Registro:",
                datos
            );

            if (datos.exito !== true) {

                alert(
                    datos.mensaje ||
                    "No se pudo realizar el registro."
                );

                return;
            }

           // ========================================
// MOSTRAR ASIGNACIÓN
// ========================================

// Colocar datos
codigoIngreso.textContent =
    datos.codigo;

tipoAsignado.textContent =
    datos.tipoVehiculo.toUpperCase();

codigoParqueo.textContent =
    datos.codigoParqueo;

nombreParqueo.textContent =
    datos.nombreParqueo;

// Guardar ubicación del parqueo asignado
latitudParqueo =
    datos.latitud;

longitudParqueo =
    datos.longitud;


// Limpiar QR anterior
qrCodigo.innerHTML = "";


// Generar QR real
new QRCode(
    qrCodigo,
    {
        text: datos.codigo,
        width: 220,
        height: 220
    }
);


// Limpiar formulario
formRegistro.reset();


// Ocultar registro
pantallaRegistro.style.display =
    "none";


// Mostrar asignación
pantallaAsignacion.style.display =
    "block";

           

        } catch (error) {

            console.error(
                "Error registrando vehículo:",
                error
            );

            alert(
                "No fue posible realizar el registro."
            );
        }
    }
);

// ========================================
// 11. BÚSQUEDA MANUAL
// ========================================

// También la conectaremos después.

btnBuscarCodigo.addEventListener(
    "click",
    function () {

        const codigo =
            codigoBusqueda.value
                .trim()
                .toUpperCase();


        if (codigo === "") {

            alert(
                "Ingresa un código."
            );

            return;
        }


        buscarVehiculo(codigo);
    }
);

// ========================================
// 12. CONFIRMAR INGRESO
// ========================================

btnConfirmarIngreso.addEventListener(
    "click",
    async function () {

        if (codigoSeleccionado === "") {

            alert(
                "Primero debes buscar un vehículo."
            );

            return;
        }


        try {

            btnConfirmarIngreso.disabled =
                true;

            btnConfirmarIngreso.textContent =
                "CONFIRMANDO...";


            const respuesta =
                await fetch(
                    URL_API +
                    "?accion=confirmar&codigo=" +
                    encodeURIComponent(
                        codigoSeleccionado
                    )
                );


            const datos =
                await respuesta.json();


            console.log(
                "Confirmar ingreso:",
                datos
            );


            if (datos.exito !== true) {

                alert(
                    datos.mensaje ||
                    "No se pudo confirmar el ingreso."
                );

                btnConfirmarIngreso.disabled =
                    false;

                btnConfirmarIngreso.textContent =
                    "CONFIRMAR INGRESO";

                codigoSeleccionado = "";    

                return;
            }


            // Actualizar estado en pantalla
            encargadoEstado.textContent =
                datos.estado;


            mensajeEscaner.textContent =
                "✓ Ingreso confirmado correctamente";


            btnConfirmarIngreso.textContent =
                "INGRESO CONFIRMADO";


            alert(
                "Ingreso confirmado correctamente."
            );


        } catch (error) {

            console.error(
                "Error al confirmar ingreso:",
                error
            );

            alert(
                "No fue posible confirmar el ingreso."
            );

            btnConfirmarIngreso.disabled =
                false;

            btnConfirmarIngreso.textContent =
                "CONFIRMAR INGRESO";
        }
    }
);

// ========================================
// 13. NAVEGACIÓN AL PARQUEO
// ========================================


// GOOGLE MAPS
btnGoogleMaps.addEventListener(
    "click",
    function () {

        if (
            latitudParqueo === null ||
            longitudParqueo === null
        ) {

            alert(
                "No se encontró la ubicación del parqueo."
            );

            return;
        }

        const urlMaps =
            "https://www.google.com/maps/dir/?api=1" +
            "&destination=" +
            encodeURIComponent(
                latitudParqueo + "," + longitudParqueo
            );

        window.open(
            urlMaps,
            "_blank"
        );
    }
);


// WAZE
btnWaze.addEventListener(
    "click",
    function () {

        if (
            latitudParqueo === null ||
            longitudParqueo === null
        ) {

            alert(
                "No se encontró la ubicación del parqueo."
            );

            return;
        }

        const urlWaze =
            "https://www.waze.com/ul?ll=" +
            encodeURIComponent(
                latitudParqueo + "," + longitudParqueo
            ) +
            "&navigate=yes";

        window.open(
            urlWaze,
            "_blank"
        );
    }
);