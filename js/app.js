// =========================================================
// JDJ SAN JUAN 2026
// FRONTEND - APP.JS V2
// =========================================================


// =========================================================
// 1. CONFIGURACIÓN
// =========================================================

const URL_API =
    "https://script.google.com/macros/s/AKfycbzCXQd3o8y943wLaOzEEJZCxcGnHzU2mRmaVlKmmklMTVLN9UOvUkNWgEEe3ZTwBc0kvg/exec";


// =========================================================
// 2. PANTALLAS
// =========================================================

const pantallaInicio =
    document.getElementById("pantalla-inicio");

const pantallaRegistro =
    document.getElementById("pantalla-registro");

const pantallaAsignacion =
    document.getElementById("pantalla-asignacion");

const pantallaLoginEncargado =
    document.getElementById("pantalla-login-encargado");

const pantallaEncargado =
    document.getElementById("pantalla-encargado");

const pantallaDashboard =
    document.getElementById("pantalla-dashboard");

const pantallaItinerario =
    document.getElementById("pantalla-itinerario");

const pantallaAyuda =
    document.getElementById("pantalla-ayuda");


// =========================================================
// 3. SPLASH Y LOADER GLOBAL
// =========================================================

const splashJDJ =
    document.getElementById("splash-jdj");

const loaderGlobal =
    document.getElementById("loader-global");

const loaderTitulo =
    document.getElementById("loader-titulo");

const loaderMensaje =
    document.getElementById("loader-mensaje");


// =========================================================
// 4. ELEMENTOS DE INICIO
// =========================================================

const btnRegistrar =
    document.getElementById("btn-registrar");

const btnEncargado =
    document.getElementById("btn-encargado");

const btnItinerario =
    document.getElementById("btn-itinerario");

const btnAyuda =
    document.getElementById("btn-ayuda");


// =========================================================
// 5. ELEMENTOS DE REGISTRO
// =========================================================

const btnVolverRegistro =
    document.getElementById("btn-volver-registro");

const formRegistro =
    document.getElementById("form-registro");

const nombrePiloto =
    document.getElementById("nombre-piloto");

const tipoVehiculo =
    document.getElementById("tipo-vehiculo");

const btnContinuarRegistro =
    document.getElementById("btn-continuar-registro");


// =========================================================
// 6. ELEMENTOS DE ASIGNACIÓN
// =========================================================

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

const btnGoogleMaps =
    document.getElementById("btn-maps");

const btnWaze =
    document.getElementById("btn-waze");


// =========================================================
// 7. ELEMENTOS DEL LOGIN
// =========================================================

const formLoginEncargado =
    document.getElementById("form-login-encargado");

const usuarioEncargado =
    document.getElementById("usuario-encargado");

const pinEncargado =
    document.getElementById("pin-encargado");

const mensajeLogin =
    document.getElementById("mensaje-login");

const btnVolverLogin =
    document.getElementById("btn-volver-login");


// =========================================================
// 8. ELEMENTOS DEL CONTROL DE INGRESO
// =========================================================

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

const btnVolverInicio =
    document.getElementById("btn-volver-inicio");


// =========================================================
// 9. ELEMENTOS DEL DASHBOARD
// =========================================================

const btnDashboard =
    document.getElementById("btn-dashboard");

const btnActualizarDashboard =
    document.getElementById("btn-actualizar-dashboard");

const btnVolverEncargado =
    document.getElementById("btn-volver-encargado");

const dashCapacidad =
    document.getElementById("dash-capacidad");

const dashAsignados =
    document.getElementById("dash-asignados");

const dashIngresados =
    document.getElementById("dash-ingresados");

const dashDisponibles =
    document.getElementById("dash-disponibles");

const dashPorcentajeGeneral =
    document.getElementById("dash-porcentaje-general");

const dashBarraGeneralProgreso =
    document.getElementById("dash-barra-general-progreso");

const dashEspaciosGeneral =
    document.getElementById("dash-espacios-general");

const dashTotalParqueos =
    document.getElementById("dash-total-parqueos");

const listaParqueosDashboard =
    document.getElementById("lista-parqueos-dashboard");


// =========================================================
// 10. ELEMENTOS DEL ITINERARIO
// =========================================================

const btnVolverItinerario =
    document.getElementById("btn-volver-itinerario");

const itinerarioDiaSemana =
    document.getElementById("itinerario-dia-semana");

const itinerarioDia =
    document.getElementById("itinerario-dia");

const itinerarioMes =
    document.getElementById("itinerario-mes");

const itinerarioTotal =
    document.getElementById("itinerario-total");

const listaItinerario =
    document.getElementById("lista-itinerario");


// =========================================================
// 11. ELEMENTOS DE AYUDA
// =========================================================

const btnWhatsAppAyuda =
    document.getElementById("btn-whatsapp-ayuda");

const btnVolverAyuda =
    document.getElementById("btn-volver-ayuda");


// =========================================================
// 12. VARIABLES DEL SISTEMA
// =========================================================

let escanerQR = null;
let escanerActivo = false;

let codigoSeleccionado = "";

let latitudParqueo = null;
let longitudParqueo = null;


// =========================================================
// 13. FUNCIONES GENERALES
// =========================================================

function ocultarPantallas() {

    const pantallas = [
        pantallaInicio,
        pantallaRegistro,
        pantallaAsignacion,
        pantallaLoginEncargado,
        pantallaEncargado,
        pantallaDashboard,
        pantallaItinerario,
        pantallaAyuda
    ];

    pantallas.forEach(function (pantalla) {

        if (pantalla) {
            pantalla.style.display = "none";
        }

    });
}


function mostrarPantalla(pantalla, tipoDisplay = "block") {

    ocultarPantallas();

    if (pantalla) {
        pantalla.style.display = tipoDisplay;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function mostrarInicio() {

    detenerEscaner();

    mostrarPantalla(
        pantallaInicio,
        "flex"
    );
}


function escaparHTML(texto) {

    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function formatearTipoVehiculo(tipo) {

    const tipoNormalizado =
        String(tipo ?? "")
            .trim()
            .toLowerCase();

    switch (tipoNormalizado) {

        case "microbus":
            return "Microbús";

        case "liviano":
            return "Vehículo liviano";

        case "motocicleta":
            return "Motocicleta";

        case "bus":
            return "Bus";

        default:
            return tipoNormalizado || "Sin especificar";
    }
}


// =========================================================
// 14. LOADER GLOBAL
// =========================================================

function mostrarLoader(
    titulo = "Cargando...",
    mensaje = "Espera un momento"
) {

    if (!loaderGlobal) {
        return;
    }

    if (loaderTitulo) {
        loaderTitulo.textContent = titulo;
    }

    if (loaderMensaje) {
        loaderMensaje.textContent = mensaje;
    }

    loaderGlobal.classList.add("activo");

    loaderGlobal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "loader-activo"
    );
}


function ocultarLoader() {

    if (!loaderGlobal) {
        return;
    }

    loaderGlobal.classList.remove("activo");

    loaderGlobal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "loader-activo"
    );
}


// =========================================================
// 15. CAMBIAR TEXTO SIN DESTRUIR ICONOS
// =========================================================

function cambiarTextoBoton(
    boton,
    texto
) {

    if (!boton) {
        return;
    }

    const candidatos = [
        ".btn-texto",
        ".control-boton-texto",
        ".control-confirmar-texto",
        ".dashboard-nav-texto"
    ];

    for (const selector of candidatos) {

        const elemento =
            boton.querySelector(selector);

        if (elemento) {

            elemento.textContent = texto;

            return;
        }
    }

    /*
     * Si el botón contiene SVG u otros elementos,
     * NO usamos textContent sobre el botón completo,
     * porque destruiríamos el icono.
     */

    const spans =
        boton.querySelectorAll("span");

    if (spans.length > 0) {

        for (const span of spans) {

            if (
                !span.querySelector("svg") &&
                !span.classList.contains("mini-loader")
            ) {

                span.textContent = texto;

                return;
            }
        }
    }

    /*
     * Solo se usa textContent directamente si
     * el botón no tiene estructura interna.
     */

    if (!boton.querySelector("svg")) {
        boton.textContent = texto;
    }
}


// =========================================================
// 16. ESTADO DE BOTONES
// =========================================================

function bloquearBoton(
    boton,
    bloqueado = true
) {

    if (!boton) {
        return;
    }

    boton.disabled = bloqueado;

    if (bloqueado) {

        boton.classList.add(
            "boton-cargando"
        );

        boton.setAttribute(
            "aria-busy",
            "true"
        );

    } else {

        boton.classList.remove(
            "boton-cargando"
        );

        boton.removeAttribute(
            "aria-busy"
        );
    }
}


// =========================================================
// 17. SPLASH INICIAL
// =========================================================

function iniciarSplash() {

    if (!splashJDJ) {
        mostrarInicio();
        return;
    }

    splashJDJ.setAttribute(
        "aria-hidden",
        "false"
    );

    splashJDJ.classList.add(
        "splash-visible"
    );

    setTimeout(function () {

        splashJDJ.classList.add(
            "splash-saliendo"
        );

        setTimeout(function () {

            splashJDJ.classList.remove(
                "splash-visible",
                "splash-saliendo"
            );

            splashJDJ.setAttribute(
                "aria-hidden",
                "true"
            );

        }, 450);

    }, 1100);
}


// =========================================================
// 18. NAVEGACIÓN DESDE INICIO
// =========================================================

if (btnRegistrar) {

    btnRegistrar.addEventListener(
        "click",
        function () {

            mostrarPantalla(
                pantallaRegistro
            );

            setTimeout(function () {

                if (nombrePiloto) {
                    nombrePiloto.focus();
                }

            }, 300);
        }
    );
}


if (btnEncargado) {

    btnEncargado.addEventListener(
        "click",
        function () {

            if (formLoginEncargado) {
                formLoginEncargado.reset();
            }

            if (mensajeLogin) {
                mensajeLogin.textContent = "";
            }

            mostrarPantalla(
                pantallaLoginEncargado
            );

            setTimeout(function () {

                if (usuarioEncargado) {
                    usuarioEncargado.focus();
                }

            }, 300);
        }
    );
}


if (btnVolverRegistro) {

    btnVolverRegistro.addEventListener(
        "click",
        mostrarInicio
    );
}


// =========================================================
// 19. ITINERARIO
// =========================================================

if (btnItinerario) {

    btnItinerario.addEventListener(
        "click",
        function () {

            mostrarPantalla(
                pantallaItinerario
            );

            cargarItinerario();
        }
    );
}


if (btnVolverItinerario) {

    btnVolverItinerario.addEventListener(
        "click",
        mostrarInicio
    );
}


// =========================================================
// 20. AYUDA
// =========================================================

if (btnAyuda) {

    btnAyuda.addEventListener(
        "click",
        function () {

            mostrarPantalla(
                pantallaAyuda
            );
        }
    );
}


if (btnVolverAyuda) {

    btnVolverAyuda.addEventListener(
        "click",
        mostrarInicio
    );
}


// =========================================================
// 21. WHATSAPP
// =========================================================

if (btnWhatsAppAyuda) {

    btnWhatsAppAyuda.addEventListener(
        "click",
        function () {

            const numeroWhatsApp =
                "50241151019";

            const mensajeWhatsApp =
                "Hola, voy para la JDJ SAN JUAN 26 necesito ayuda";

            const urlWhatsApp =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(
                    mensajeWhatsApp
                );

            window.open(
                urlWhatsApp,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );
}


// =========================================================
// 22. LOGIN DEL ENCARGADO
// =========================================================

if (formLoginEncargado) {

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

            const botonSubmit =
                formLoginEncargado.querySelector(
                    'button[type="submit"]'
                );

            try {

                mensajeLogin.textContent =
                    "";

                bloquearBoton(
                    botonSubmit,
                    true
                );

                mostrarLoader(
                    "Verificando acceso",
                    "Estamos validando tus datos..."
                );

                const respuesta =
                    await fetch(
                        URL_API +
                        "?accion=login" +
                        "&usuario=" +
                        encodeURIComponent(usuario) +
                        "&pin=" +
                        encodeURIComponent(pin)
                    );

                if (!respuesta.ok) {
                    throw new Error(
                        "Error HTTP " +
                        respuesta.status
                    );
                }

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

                formLoginEncargado.reset();

                mensajeLogin.textContent =
                    "";

                limpiarControlIngreso();

                mostrarPantalla(
                    pantallaEncargado
                );

            } catch (error) {

                console.error(
                    "Error en login:",
                    error
                );

                mensajeLogin.textContent =
                    "No fue posible verificar el acceso.";

            } finally {

                ocultarLoader();

                bloquearBoton(
                    botonSubmit,
                    false
                );
            }
        }
    );
}


// =========================================================
// 23. VOLVER DESDE LOGIN
// =========================================================

if (btnVolverLogin) {

    btnVolverLogin.addEventListener(
        "click",
        function () {

            formLoginEncargado.reset();

            mensajeLogin.textContent =
                "";

            mostrarInicio();
        }
    );
}


// =========================================================
// 24. VOLVER DESDE CONTROL
// =========================================================

if (btnVolverInicio) {

    btnVolverInicio.addEventListener(
        "click",
        function () {

            detenerEscaner();

            limpiarControlIngreso();

            mostrarInicio();
        }
    );
}


// =========================================================
// 25. LIMPIAR CONTROL DE INGRESO
// =========================================================

function limpiarControlIngreso() {

    codigoSeleccionado = "";

    if (codigoBusqueda) {
        codigoBusqueda.value = "";
    }

    if (mensajeEscaner) {
        mensajeEscaner.textContent = "";
    }

    if (resultadoBusqueda) {
        resultadoBusqueda.style.display =
            "none";
    }

    if (encargadoNombre) {
        encargadoNombre.textContent = "-";
    }

    if (encargadoTipo) {
        encargadoTipo.textContent = "-";
    }

    if (encargadoCodigoParqueo) {
        encargadoCodigoParqueo.textContent =
            "-";
    }

    if (encargadoNombreParqueo) {
        encargadoNombreParqueo.textContent =
            "-";
    }

    if (encargadoEstado) {
        encargadoEstado.textContent = "-";
    }

    if (btnConfirmarIngreso) {

        btnConfirmarIngreso.disabled =
            true;

        cambiarTextoBoton(
            btnConfirmarIngreso,
            "CONFIRMAR INGRESO"
        );
    }
}


// =========================================================
// 26. ACTIVAR / DESACTIVAR CÁMARA
// =========================================================

if (btnEscanearQR) {

    btnEscanearQR.addEventListener(
        "click",
        function () {

            if (escanerActivo) {

                detenerEscaner();

                return;
            }

            iniciarEscaner();
        }
    );
}


function iniciarEscaner() {

    if (
        !lectorQR ||
        typeof Html5Qrcode === "undefined"
    ) {

        if (mensajeEscaner) {

            mensajeEscaner.textContent =
                "El lector QR no está disponible.";
        }

        return;
    }

    lectorQR.style.display =
        "block";

    mensajeEscaner.textContent =
        "Solicitando acceso a la cámara...";

    cambiarTextoBoton(
        btnEscanearQR,
        "CERRAR CÁMARA"
    );

    btnEscanearQR.classList.add(
        "camara-activa"
    );

    escanerQR =
        new Html5Qrcode(
            "lector-qr"
        );

    const configuracion = {

        fps: 10,

        qrbox: {
            width: 220,
            height: 220
        }
    };

    escanerQR
        .start(
            {
                facingMode:
                    "environment"
            },

            configuracion,

            codigoDetectado,

            function () {
                // Se ignoran los intentos
                // donde todavía no hay QR.
            }
        )
        .then(function () {

            escanerActivo = true;

            mensajeEscaner.textContent =
                "Cámara activa. Apunta al código QR.";
        })
        .catch(function (error) {

            console.error(
                "Error al abrir cámara:",
                error
            );

            mensajeEscaner.textContent =
                "No fue posible abrir la cámara. Revisa los permisos.";

            cambiarTextoBoton(
                btnEscanearQR,
                "ESCANEAR CÓDIGO QR"
            );

            btnEscanearQR.classList.remove(
                "camara-activa"
            );

            lectorQR.style.display =
                "none";

            escanerQR = null;
            escanerActivo = false;
        });
}


// =========================================================
// 27. DETENER CÁMARA
// =========================================================

function detenerEscaner() {

    if (!btnEscanearQR || !lectorQR) {
        return;
    }

    cambiarTextoBoton(
        btnEscanearQR,
        "ESCANEAR CÓDIGO QR"
    );

    btnEscanearQR.classList.remove(
        "camara-activa"
    );

    if (
        escanerQR === null ||
        escanerActivo === false
    ) {

        lectorQR.style.display =
            "none";

        return;
    }

    const lectorActual =
        escanerQR;

    escanerActivo = false;
    escanerQR = null;

    lectorActual
        .stop()
        .then(function () {

            try {
                lectorActual.clear();
            } catch (error) {
                console.warn(
                    "No fue necesario limpiar el lector.",
                    error
                );
            }

            lectorQR.style.display =
                "none";
        })
        .catch(function (error) {

            console.error(
                "Error al detener cámara:",
                error
            );

            lectorQR.style.display =
                "none";
        });
}


// =========================================================
// 28. QR DETECTADO
// =========================================================

function codigoDetectado(textoQR) {

    const codigo =
        String(textoQR)
            .trim()
            .toUpperCase();

    console.log(
        "QR detectado:",
        codigo
    );

    if (
        !codigo.startsWith("JDJ-")
    ) {

        mensajeEscaner.textContent =
            "Este QR no pertenece al sistema JDJ.";

        return;
    }

    codigoBusqueda.value =
        codigo;

    mensajeEscaner.textContent =
        "Código detectado correctamente ✓";

    detenerEscaner();

    setTimeout(function () {

        buscarVehiculo(codigo);

    }, 350);
}


// =========================================================
// 29. BÚSQUEDA MANUAL
// =========================================================

if (btnBuscarCodigo) {

    btnBuscarCodigo.addEventListener(
        "click",
        function () {

            const codigo =
                codigoBusqueda.value
                    .trim()
                    .toUpperCase();

            if (codigo === "") {

                mensajeEscaner.textContent =
                    "Ingresa un código JDJ.";

                codigoBusqueda.focus();

                return;
            }

            buscarVehiculo(codigo);
        }
    );
}


if (codigoBusqueda) {

    codigoBusqueda.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter"
            ) {
                return;
            }

            event.preventDefault();

            btnBuscarCodigo.click();
        }
    );

    codigoBusqueda.addEventListener(
        "input",
        function () {

            codigoBusqueda.value =
                codigoBusqueda.value
                    .toUpperCase();
        }
    );
}


// =========================================================
// 30. BUSCAR VEHÍCULO
// =========================================================

async function buscarVehiculo(codigo) {

    codigoSeleccionado = "";

    resultadoBusqueda.style.display =
        "none";

    btnConfirmarIngreso.disabled =
        true;

    cambiarTextoBoton(
        btnConfirmarIngreso,
        "CONFIRMAR INGRESO"
    );

    try {

        bloquearBoton(
            btnBuscarCodigo,
            true
        );

        mensajeEscaner.textContent =
            "Buscando vehículo...";

        mostrarLoader(
            "Buscando registro",
            "Estamos consultando el código " +
            codigo
        );

        const respuesta =
            await fetch(
                URL_API +
                "?accion=buscar" +
                "&codigo=" +
                encodeURIComponent(codigo)
            );

        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP " +
                respuesta.status
            );
        }

        const datos =
            await respuesta.json();

        console.log(
            "Vehículo encontrado:",
            datos
        );

        if (
            datos.encontrado !== true
        ) {

            mensajeEscaner.textContent =
                datos.mensaje ||
                "No se encontró el vehículo.";

            return;
        }

        if (
            datos.estado ===
            "ASIGNADO"
        ) {

            codigoSeleccionado =
                datos.codigo;

            btnConfirmarIngreso.disabled =
                false;

            cambiarTextoBoton(
                btnConfirmarIngreso,
                "CONFIRMAR INGRESO"
            );

        } else if (
            datos.estado ===
            "INGRESADO"
        ) {

            codigoSeleccionado =
                "";

            btnConfirmarIngreso.disabled =
                true;

            cambiarTextoBoton(
                btnConfirmarIngreso,
                "VEHÍCULO YA INGRESADO"
            );

        } else {

            codigoSeleccionado =
                "";

            btnConfirmarIngreso.disabled =
                true;

            cambiarTextoBoton(
                btnConfirmarIngreso,
                "NO DISPONIBLE"
            );
        }

        encargadoNombre.textContent =
            datos.nombre || "-";

        encargadoTipo.textContent =
            formatearTipoVehiculo(
                datos.tipoVehiculo
            );

        encargadoCodigoParqueo.textContent =
            datos.codigoParqueo || "-";

        encargadoNombreParqueo.textContent =
            datos.nombreParqueo || "-";

        encargadoEstado.textContent =
            datos.estado || "-";

        resultadoBusqueda.style.display =
            "block";

        mensajeEscaner.textContent =
            "Vehículo encontrado ✓";

        resultadoBusqueda.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    } catch (error) {

        console.error(
            "Error buscando vehículo:",
            error
        );

        mensajeEscaner.textContent =
            "No fue posible consultar el vehículo.";

    } finally {

        ocultarLoader();

        bloquearBoton(
            btnBuscarCodigo,
            false
        );
    }
}


// =========================================================
// 31. CONFIRMAR INGRESO
// =========================================================

if (btnConfirmarIngreso) {

    btnConfirmarIngreso.addEventListener(
        "click",
        async function () {

            if (
                codigoSeleccionado === ""
            ) {

                mensajeEscaner.textContent =
                    "Primero debes buscar un vehículo.";

                return;
            }

            const codigoAConfirmar =
                codigoSeleccionado;

            try {

                btnConfirmarIngreso.disabled =
                    true;

                cambiarTextoBoton(
                    btnConfirmarIngreso,
                    "CONFIRMANDO..."
                );

                mostrarLoader(
                    "Confirmando ingreso",
                    "Estamos registrando la llegada del vehículo..."
                );

                const respuesta =
                    await fetch(
                        URL_API +
                        "?accion=confirmar" +
                        "&codigo=" +
                        encodeURIComponent(
                            codigoAConfirmar
                        )
                    );

                if (!respuesta.ok) {

                    throw new Error(
                        "Error HTTP " +
                        respuesta.status
                    );
                }

                const datos =
                    await respuesta.json();

                console.log(
                    "Confirmar ingreso:",
                    datos
                );

                if (
                    datos.exito !== true
                ) {

                    mensajeEscaner.textContent =
                        datos.mensaje ||
                        "No se pudo confirmar el ingreso.";

                    btnConfirmarIngreso.disabled =
                        false;

                    cambiarTextoBoton(
                        btnConfirmarIngreso,
                        "CONFIRMAR INGRESO"
                    );

                    return;
                }

                encargadoEstado.textContent =
                    datos.estado ||
                    "INGRESADO";

                mensajeEscaner.textContent =
                    "✓ Ingreso confirmado correctamente";

                btnConfirmarIngreso.disabled =
                    true;

                cambiarTextoBoton(
                    btnConfirmarIngreso,
                    "INGRESO CONFIRMADO"
                );

                codigoSeleccionado =
                    "";

            } catch (error) {

                console.error(
                    "Error al confirmar ingreso:",
                    error
                );

                mensajeEscaner.textContent =
                    "No fue posible confirmar el ingreso.";

                btnConfirmarIngreso.disabled =
                    false;

                cambiarTextoBoton(
                    btnConfirmarIngreso,
                    "CONFIRMAR INGRESO"
                );

            } finally {

                ocultarLoader();
            }
        }
    );
}


// =========================================================
// 32. REGISTRO DE VEHÍCULO
// =========================================================

if (formRegistro) {

    formRegistro.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const nombre =
                nombrePiloto.value.trim();

            const tipo =
                tipoVehiculo.value.trim();

            if (nombre === "") {

                nombrePiloto.focus();

                return;
            }

            if (tipo === "") {

                tipoVehiculo.focus();

                return;
            }

            try {

                bloquearBoton(
                    btnContinuarRegistro,
                    true
                );

                mostrarLoader(
                    "Buscando tu parqueo",
                    "Estamos encontrando el mejor espacio para tu vehículo..."
                );

                const respuesta =
                    await fetch(
                        URL_API +
                        "?accion=registrar" +
                        "&nombre=" +
                        encodeURIComponent(nombre) +
                        "&tipo=" +
                        encodeURIComponent(tipo)
                    );

                if (!respuesta.ok) {

                    throw new Error(
                        "Error HTTP " +
                        respuesta.status
                    );
                }

                const datos =
                    await respuesta.json();

                console.log(
                    "Registro:",
                    datos
                );

                if (
                    datos.exito !== true
                ) {

                    alert(
                        datos.mensaje ||
                        "No se pudo realizar el registro."
                    );

                    return;
                }

                mostrarAsignacion(
                    datos
                );

            } catch (error) {

                console.error(
                    "Error registrando vehículo:",
                    error
                );

                alert(
                    "No fue posible realizar el registro. Intenta nuevamente."
                );

            } finally {

                ocultarLoader();

                bloquearBoton(
                    btnContinuarRegistro,
                    false
                );
            }
        }
    );
}


// =========================================================
// 33. MOSTRAR ASIGNACIÓN
// =========================================================

function mostrarAsignacion(datos) {

    codigoIngreso.textContent =
        datos.codigo;

    tipoAsignado.textContent =
        formatearTipoVehiculo(
            datos.tipoVehiculo
        ).toUpperCase();

    codigoParqueo.textContent =
        datos.codigoParqueo;

    nombreParqueo.textContent =
        datos.nombreParqueo;

    latitudParqueo =
        datos.latitud;

    longitudParqueo =
        datos.longitud;

    qrCodigo.innerHTML =
        "";

    if (
        typeof QRCode !==
        "undefined"
    ) {

        new QRCode(
            qrCodigo,
            {
                text: datos.codigo,
                width: 220,
                height: 220,
                correctLevel:
                    QRCode.CorrectLevel.H
            }
        );

    } else {

        qrCodigo.textContent =
            datos.codigo;
    }

    formRegistro.reset();

    mostrarPantalla(
        pantallaAsignacion
    );
}


// =========================================================
// 34. GOOGLE MAPS
// =========================================================

if (btnGoogleMaps) {

    btnGoogleMaps.addEventListener(
        "click",
        function () {

            if (
                latitudParqueo === null ||
                longitudParqueo === null ||
                latitudParqueo === "" ||
                longitudParqueo === ""
            ) {

                alert(
                    "No se encontró la ubicación del parqueo."
                );

                return;
            }

            const destino =
                latitudParqueo +
                "," +
                longitudParqueo;

            const urlMaps =
                "https://www.google.com/maps/dir/?api=1" +
                "&destination=" +
                encodeURIComponent(
                    destino
                );

            window.open(
                urlMaps,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );
}


// =========================================================
// 35. WAZE
// =========================================================

if (btnWaze) {

    btnWaze.addEventListener(
        "click",
        function () {

            if (
                latitudParqueo === null ||
                longitudParqueo === null ||
                latitudParqueo === "" ||
                longitudParqueo === ""
            ) {

                alert(
                    "No se encontró la ubicación del parqueo."
                );

                return;
            }

            const destino =
                latitudParqueo +
                "," +
                longitudParqueo;

            const urlWaze =
                "https://www.waze.com/ul?ll=" +
                encodeURIComponent(
                    destino
                ) +
                "&navigate=yes";

            window.open(
                urlWaze,
                "_blank",
                "noopener,noreferrer"
            );
        }
    );
}


// =========================================================
// 36. ABRIR DASHBOARD
// =========================================================

if (btnDashboard) {

    btnDashboard.addEventListener(
        "click",
        function () {

            detenerEscaner();

            mostrarPantalla(
                pantallaDashboard
            );

            cargarDashboard(
                true
            );
        }
    );
}


// =========================================================
// 37. CARGAR DASHBOARD
// =========================================================

async function cargarDashboard(
    usarLoaderGlobal = false
) {

    try {

        listaParqueosDashboard.innerHTML = `
            <div class="dashboard-cargando">
                <span
                    class="mini-loader"
                    aria-hidden="true"
                ></span>

                <p>
                    Cargando información...
                </p>
            </div>
        `;

        if (usarLoaderGlobal) {

            mostrarLoader(
                "Actualizando parqueos",
                "Consultando la disponibilidad en tiempo real..."
            );
        }

        const respuesta =
            await fetch(
                URL_API +
                "?accion=dashboard"
            );

        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP " +
                respuesta.status
            );
        }

        const datos =
            await respuesta.json();

        console.log(
            "Dashboard:",
            datos
        );

        if (
            datos.exito !== true
        ) {

            listaParqueosDashboard.innerHTML = `
                <p class="dashboard-cargando">
                    No fue posible cargar el dashboard.
                </p>
            `;

            return;
        }

        actualizarResumenDashboard(
            datos
        );

        mostrarParqueosDashboard(
            datos.parqueos
        );

    } catch (error) {

        console.error(
            "Error cargando dashboard:",
            error
        );

        listaParqueosDashboard.innerHTML = `
            <p class="dashboard-cargando">
                No fue posible cargar la información.
            </p>
        `;

    } finally {

        if (usarLoaderGlobal) {
            ocultarLoader();
        }
    }
}


// =========================================================
// 38. RESUMEN DEL DASHBOARD
// =========================================================

function actualizarResumenDashboard(
    datos
) {

    const resumen =
        datos.resumen || {};

    const capacidad =
        Number(
            resumen.capacidad
        ) || 0;

    const asignados =
        Number(
            resumen.asignados
        ) || 0;

    const ingresados =
        Number(
            resumen.ingresados
        ) || 0;

    const disponibles =
        Number(
            resumen.disponibles
        ) || 0;

    /*
     * IMPORTANTE:
     * Un espacio ya está comprometido tanto si
     * está ASIGNADO como si ya está INGRESADO.
     */

    const ocupados =
        asignados +
        ingresados;

    let porcentaje =
        0;

    if (capacidad > 0) {

        porcentaje =
            Math.round(
                (
                    ocupados /
                    capacidad
                ) * 100
            );
    }

    porcentaje =
        Math.max(
            0,
            Math.min(
                porcentaje,
                100
            )
        );

    dashCapacidad.textContent =
        capacidad;

    dashAsignados.textContent =
        asignados;

    dashIngresados.textContent =
        ingresados;

    dashDisponibles.textContent =
        disponibles;

    dashPorcentajeGeneral.textContent =
        porcentaje + "%";

    dashBarraGeneralProgreso.style.width =
        porcentaje + "%";

    dashEspaciosGeneral.textContent =
        ocupados +
        " de " +
        capacidad +
        " espacios";

    dashTotalParqueos.textContent =
        Array.isArray(
            datos.parqueos
        )
            ? datos.parqueos.length
            : 0;
}


// =========================================================
// 39. MOSTRAR PARQUEOS
// =========================================================

function mostrarParqueosDashboard(
    parqueos
) {

    listaParqueosDashboard.innerHTML =
        "";

    if (
        !Array.isArray(parqueos) ||
        parqueos.length === 0
    ) {

        listaParqueosDashboard.innerHTML = `
            <p class="dashboard-cargando">
                No hay parqueos activos.
            </p>
        `;

        return;
    }

    parqueos.forEach(
        function (parqueo) {

            crearTarjetaParqueo(
                parqueo
            );
        }
    );
}


// =========================================================
// 40. CREAR TARJETA DE PARQUEO
// =========================================================

function crearTarjetaParqueo(
    parqueo
) {

    const capacidad =
        Number(
            parqueo.capacidad
        ) || 0;

    const asignados =
        Number(
            parqueo.asignados
        ) || 0;

    const ingresados =
        Number(
            parqueo.ingresados
        ) || 0;

    const ocupados =
        asignados +
        ingresados;

    const disponibles =
        Math.max(
            capacidad -
            ocupados,
            0
        );

    let porcentaje =
        0;

    if (capacidad > 0) {

        porcentaje =
            Math.round(
                (
                    ocupados /
                    capacidad
                ) * 100
            );
    }

    porcentaje =
        Math.max(
            0,
            Math.min(
                porcentaje,
                100
            )
        );

    let estado =
        "disponible";

    let textoEstado =
        "Disponible";

    if (disponibles === 0) {

        estado =
            "lleno";

        textoEstado =
            "Lleno";

    } else if (
        porcentaje >= 85
    ) {

        estado =
            "precaucion";

        textoEstado =
            "Poco espacio";
    }

    const tipo =
        formatearTipoVehiculo(
            parqueo.tipoVehiculo
        );

    const nombreSeguro =
        escaparHTML(
            parqueo.nombre
        );

    const codigoSeguro =
        escaparHTML(
            parqueo.codigo
        );

    const tipoSeguro =
        escaparHTML(
            tipo
        );

    const tarjeta =
        document.createElement(
            "article"
        );

    tarjeta.className =
        "dashboard-parqueo " +
        "estado-" +
        estado;

    tarjeta.innerHTML = `

        <div class="dashboard-parqueo-superior">

            <div class="dashboard-parqueo-titulo">

                <div class="dashboard-parqueo-nombre">

                    <span
                        class="dashboard-estado-punto"
                        aria-hidden="true"
                    ></span>

                    <h3>
                        ${nombreSeguro}
                    </h3>

                </div>

                <p>
                    ${codigoSeguro}
                    ·
                    ${tipoSeguro}
                </p>

            </div>


            <div class="dashboard-porcentaje">

                <strong>
                    ${porcentaje}%
                </strong>

                <span>
                    ${textoEstado}
                </span>

            </div>

        </div>


        <div class="dashboard-barra-parqueo">

            <div
                class="dashboard-barra-parqueo-progreso"
                style="width: ${porcentaje}%"
            ></div>

        </div>


        <div class="dashboard-parqueo-estadisticas">

            <div>
                <span>Capacidad</span>
                <strong>${capacidad}</strong>
            </div>

            <div>
                <span>Asignados</span>
                <strong>${asignados}</strong>
            </div>

            <div>
                <span>Ingresados</span>
                <strong>${ingresados}</strong>
            </div>

            <div class="dashboard-libres">
                <span>Libres</span>
                <strong>${disponibles}</strong>
            </div>

        </div>
    `;

    listaParqueosDashboard.appendChild(
        tarjeta
    );
}


// =========================================================
// 41. ACTUALIZAR DASHBOARD
// =========================================================

if (btnActualizarDashboard) {

    btnActualizarDashboard.addEventListener(
        "click",
        async function () {

            bloquearBoton(
                btnActualizarDashboard,
                true
            );

            try {

                await cargarDashboard(
                    true
                );

            } finally {

                bloquearBoton(
                    btnActualizarDashboard,
                    false
                );
            }
        }
    );
}


// =========================================================
// 42. VOLVER DEL DASHBOARD
// =========================================================

if (btnVolverEncargado) {

    btnVolverEncargado.addEventListener(
        "click",
        function () {

            mostrarPantalla(
                pantallaEncargado
            );
        }
    );
}


// =========================================================
// 43. CARGAR ITINERARIO
// =========================================================

async function cargarItinerario() {

    if (!listaItinerario) {
        return;
    }

    listaItinerario.innerHTML = `
        <div class="itinerario-cargando">

            <span
                class="mini-loader"
                aria-hidden="true"
            ></span>

            <p>
                Cargando itinerario...
            </p>

        </div>
    `;

    if (itinerarioTotal) {
        itinerarioTotal.textContent =
            "0";
    }

    try {

        mostrarLoader(
            "Cargando itinerario",
            "Preparando las actividades de JDJ..."
        );

        const respuesta =
            await fetch(
                URL_API +
                "?accion=itinerario"
            );

        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP " +
                respuesta.status
            );
        }

        const datos =
            await respuesta.json();

        console.log(
            "Itinerario:",
            datos
        );

        if (
            datos.exito !== true
        ) {

            mostrarErrorItinerario(
                datos.mensaje ||
                "No fue posible cargar el itinerario."
            );

            return;
        }

        if (
            !Array.isArray(
                datos.actividades
            )
        ) {

            mostrarErrorItinerario(
                "No hay actividades disponibles."
            );

            return;
        }

        const actividades =
            datos.actividades;

        if (
            actividades.length === 0
        ) {

            listaItinerario.innerHTML = `
                <div class="itinerario-vacio">

                    <strong>
                        Aún no hay actividades
                    </strong>

                    <p>
                        El itinerario se publicará próximamente.
                    </p>

                </div>
            `;

            return;
        }

        itinerarioTotal.textContent =
            actividades.length;

        actualizarFechaItinerario(
            actividades
        );

        mostrarActividadesItinerario(
            actividades
        );

    } catch (error) {

        console.error(
            "Error cargando itinerario:",
            error
        );

        mostrarErrorItinerario(
            "No fue posible cargar el itinerario."
        );

    } finally {

        ocultarLoader();
    }
}


// =========================================================
// 44. MOSTRAR ERROR DE ITINERARIO
// =========================================================

function mostrarErrorItinerario(
    mensaje
) {

    if (!listaItinerario) {
        return;
    }

    listaItinerario.innerHTML = `
        <div class="itinerario-vacio">

            <strong>
                No pudimos cargar el itinerario
            </strong>

            <p>
                ${escaparHTML(mensaje)}
            </p>

        </div>
    `;
}


// =========================================================
// 45. ACTUALIZAR FECHA DEL ITINERARIO
// =========================================================

function actualizarFechaItinerario(
    actividades
) {

    if (
        !Array.isArray(actividades) ||
        actividades.length === 0
    ) {
        return;
    }

    const primeraActividad =
        actividades[0];

    const fechaTexto =
        primeraActividad.fecha;

    if (!fechaTexto) {
        return;
    }

    let fecha;

    /*
     * Google Apps Script puede devolver la fecha
     * como ISO o como una cadena de texto.
     */

    if (
        /^\d{4}-\d{2}-\d{2}/.test(
            String(fechaTexto)
        )
    ) {

        const partes =
            String(fechaTexto)
                .substring(0, 10)
                .split("-");

        fecha =
            new Date(
                Number(partes[0]),
                Number(partes[1]) - 1,
                Number(partes[2])
            );

    } else {

        fecha =
            new Date(fechaTexto);
    }

    if (
        Number.isNaN(
            fecha.getTime()
        )
    ) {
        return;
    }

    const dias =
        [
            "DOMINGO",
            "LUNES",
            "MARTES",
            "MIÉRCOLES",
            "JUEVES",
            "VIERNES",
            "SÁBADO"
        ];

    const meses =
        [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE"
        ];

    if (itinerarioDiaSemana) {

        itinerarioDiaSemana.textContent =
            dias[
                fecha.getDay()
            ];
    }

    if (itinerarioDia) {

        itinerarioDia.textContent =
            fecha.getDate();
    }

    if (itinerarioMes) {

        itinerarioMes.textContent =
            meses[
                fecha.getMonth()
            ];
    }
}


// =========================================================
// 46. MOSTRAR ACTIVIDADES DEL ITINERARIO
// =========================================================

function mostrarActividadesItinerario(
    actividades
) {

    listaItinerario.innerHTML =
        "";

    actividades.forEach(
        function (
            actividad,
            indice
        ) {

            const tarjeta =
                crearActividadItinerario(
                    actividad,
                    indice
                );

            listaItinerario.appendChild(
                tarjeta
            );
        }
    );
}


// =========================================================
// 47. CREAR ACTIVIDAD DEL ITINERARIO
// =========================================================

function crearActividadItinerario(
    actividad,
    indice
) {

    const articulo =
        document.createElement(
            "article"
        );

    const colores =
        [
            "azul",
            "verde",
            "amarillo",
            "rojo",
            "naranja"
        ];

    const color =
        colores[
            indice %
            colores.length
        ];

    articulo.className =
        "itinerario-actividad " +
        "itinerario-actividad-" +
        color;

    const hora =
        escaparHTML(
            actividad.hora ||
            "--:--"
        );

    const nombre =
        escaparHTML(
            actividad.actividad ||
            "Actividad"
        );

    const lugar =
        escaparHTML(
            actividad.lugar ||
            "Lugar por confirmar"
        );

    const descripcion =
        escaparHTML(
            actividad.descripcion ||
            ""
        );

    articulo.innerHTML = `

        <div class="itinerario-hora">

            <span>
                ${hora}
            </span>

        </div>


        <div class="itinerario-actividad-contenido">

            <div class="itinerario-actividad-superior">

                <span
                    class="itinerario-punto"
                    aria-hidden="true"
                ></span>

                <h3>
                    ${nombre}
                </h3>

            </div>


            <div class="itinerario-lugar">

                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >

                    <path
                        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z"
                    ></path>

                    <circle
                        cx="12"
                        cy="9"
                        r="2.3"
                    ></circle>

                </svg>

                <span>
                    ${lugar}
                </span>

            </div>


            ${
                descripcion !== ""
                    ? `
                        <p class="itinerario-descripcion">
                            ${descripcion}
                        </p>
                    `
                    : ""
            }

        </div>
    `;

    return articulo;
}


// =========================================================
// 48. INICIALIZACIÓN
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Se garantiza que el loader esté oculto
         * al iniciar la página.
         */

        ocultarLoader();

        /*
         * Todas las pantallas secundarias comienzan
         * ocultas y mostramos el inicio.
         */

        ocultarPantallas();

        if (pantallaInicio) {
            pantallaInicio.style.display =
                "flex";
        }

        /*
         * Estado inicial del panel del encargado.
         */

        if (resultadoBusqueda) {
            resultadoBusqueda.style.display =
                "none";
        }

        if (lectorQR) {
            lectorQR.style.display =
                "none";
        }

        if (btnConfirmarIngreso) {

            btnConfirmarIngreso.disabled =
                true;
        }

        /*
         * Splash de entrada.
         */

        iniciarSplash();

        console.log(
            "JDJ San Juan 2026 - Sistema iniciado V2"
        );
    }
);