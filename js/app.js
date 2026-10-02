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


// Botones principales
const btnRegistrar =
    document.getElementById("btn-registrar");

const btnEncargado =
    document.getElementById("btn-encargado");

const btnVolverInicio =
    document.getElementById("btn-volver-inicio");


// Formulario
const formRegistro =
    document.getElementById("form-registro");

const nombrePiloto =
    document.getElementById("nombre-piloto");

const tipoVehiculo =
    document.getElementById("tipo-vehiculo");


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


// ========================================
// 3. VARIABLES DEL ESCÁNER
// ========================================

let escanerQR = null;

let escanerActivo = false;

const URL_API =
    "https://script.google.com/macros/s/AKfycbzCXQd3o8y943wLaOzEEJZCxcGnHzU2mRmaVlKmmklMTVLN9UOvUkNWgEEe3ZTwBc0kvg/exec";


async function probarAPI() {

    try {

        const respuesta =
            await fetch(
                URL_API +
                "?accion=buscar&codigo=JDJ-LO1N59"
            );

        const datos =
            await respuesta.json();

        console.log(
            "PRUEBA API:",
            datos
        );

        alert(
            "API conectada: " +
            datos.nombre
        );

    } catch (error) {

        console.error(
            "ERROR API:",
            error
        );

        alert(
            "Error conectando API: " +
            error
        );
    }
}


probarAPI();


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

        pantallaEncargado.style.display =
            "block";
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

function codigoDetectado(
    textoQR
) {

    const codigo =
        String(textoQR)
            .trim()
            .toUpperCase();


    console.log(
        "QR detectado:",
        codigo
    );


    // Validar que sea un QR del sistema
    if (
        codigo.startsWith("JDJ-") === false
    ) {

        mensajeEscaner.textContent =
            "Este QR no pertenece al sistema JDJ.";

        return;
    }


    // Colocar código automáticamente
    codigoBusqueda.value =
        codigo;


    mensajeEscaner.textContent =
        "Código detectado: " +
        codigo;


    // Detener cámara
    detenerEscaner();


    // POR AHORA NO BUSCAMOS EN SHEETS
    // Solo comprobamos que el QR se lea

    alert(
        "QR detectado correctamente: " +
        codigo
    );
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

// Temporalmente no conectamos con Google.
// Solo evitamos que la página se recargue.

formRegistro.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        alert(
            "El registro se conectará nuevamente después de probar la cámara."
        );
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


        alert(
            "Código ingresado: " +
            codigo
        );
    }
);