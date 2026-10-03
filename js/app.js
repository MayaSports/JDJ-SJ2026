// =========================================================
// JDJ SAN JUAN 2026
// FRONTEND - APP.JS
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


// =========================================================
// 3. ELEMENTOS DE INICIO
// =========================================================

const btnRegistrar =
    document.getElementById("btn-registrar");

const btnEncargado =
    document.getElementById("btn-encargado");


// =========================================================
// 4. ELEMENTOS DE REGISTRO
// =========================================================

const formRegistro =
    document.getElementById("form-registro");

const nombrePiloto =
    document.getElementById("nombre-piloto");

const tipoVehiculo =
    document.getElementById("tipo-vehiculo");


// =========================================================
// 5. ELEMENTOS DE ASIGNACIÓN
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
// 6. ELEMENTOS DEL LOGIN
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
// 7. ELEMENTOS DEL CONTROL DE INGRESO
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
// 8. ELEMENTOS DEL DASHBOARD
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
// 9. VARIABLES DEL SISTEMA
// =========================================================

let escanerQR = null;
let escanerActivo = false;

let codigoSeleccionado = "";

let latitudParqueo = null;
let longitudParqueo = null;


// =========================================================
// 10. FUNCIONES GENERALES
// =========================================================

function ocultarPantallas() {

    pantallaInicio.style.display = "none";
    pantallaRegistro.style.display = "none";
    pantallaAsignacion.style.display = "none";
    pantallaLoginEncargado.style.display = "none";
    pantallaEncargado.style.display = "none";
    pantallaDashboard.style.display = "none";
}


function mostrarInicio() {

    ocultarPantallas();

    pantallaInicio.style.display = "flex";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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
// 11. NAVEGACIÓN DESDE INICIO
// =========================================================

btnRegistrar.addEventListener(
    "click",
    function () {

        ocultarPantallas();

        pantallaRegistro.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


btnEncargado.addEventListener(
    "click",
    function () {

        ocultarPantallas();

        formLoginEncargado.reset();

        mensajeLogin.textContent = "";

        pantallaLoginEncargado.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


// =========================================================
// 12. LOGIN DEL ENCARGADO
// =========================================================

formLoginEncargado.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const usuario =
            usuarioEncargado.value.trim();

        const pin =
            pinEncargado.value.trim();


        if (usuario === "" || pin === "") {

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


            // Acceso correcto

            formLoginEncargado.reset();

            mensajeLogin.textContent = "";

            ocultarPantallas();

            pantallaEncargado.style.display =
                "block";


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

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


// =========================================================
// 13. VOLVER DESDE LOGIN
// =========================================================

btnVolverLogin.addEventListener(
    "click",
    function () {

        formLoginEncargado.reset();

        mensajeLogin.textContent = "";

        mostrarInicio();
    }
);


// =========================================================
// 14. VOLVER DESDE CONTROL
// =========================================================

btnVolverInicio.addEventListener(
    "click",
    function () {

        detenerEscaner();

        limpiarControlIngreso();

        mostrarInicio();
    }
);


// =========================================================
// 15. LIMPIAR CONTROL DE INGRESO
// =========================================================

function limpiarControlIngreso() {

    codigoSeleccionado = "";

    codigoBusqueda.value = "";

    mensajeEscaner.textContent = "";

    resultadoBusqueda.style.display =
        "none";

    encargadoNombre.textContent = "-";
    encargadoTipo.textContent = "-";
    encargadoCodigoParqueo.textContent = "-";
    encargadoNombreParqueo.textContent = "-";
    encargadoEstado.textContent = "-";

    btnConfirmarIngreso.disabled = true;

    btnConfirmarIngreso.textContent =
        "CONFIRMAR INGRESO";
}


// =========================================================
// 16. ACTIVAR / DESACTIVAR CÁMARA
// =========================================================

btnEscanearQR.addEventListener(
    "click",
    function () {

        if (escanerActivo === true) {

            detenerEscaner();

            return;
        }


        iniciarEscaner();
    }
);


function iniciarEscaner() {

    lectorQR.style.display = "block";

    mensajeEscaner.textContent =
        "Solicitando acceso a la cámara...";

    btnEscanearQR.textContent =
        "CERRAR CÁMARA";


    escanerQR =
        new Html5Qrcode("lector-qr");


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
                facingMode: "environment"
            },
            configuracion,
            codigoDetectado,
            function () {
                // Se ignoran los intentos
                // donde aún no se detecta un QR.
            }
        )
        .then(
            function () {

                escanerActivo = true;

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
                    "No fue posible abrir la cámara.";


                btnEscanearQR.textContent =
                    "ESCANEAR CÓDIGO QR";


                lectorQR.style.display =
                    "none";


                escanerQR = null;
                escanerActivo = false;
            }
        );
}


// =========================================================
// 17. DETENER CÁMARA
// =========================================================

function detenerEscaner() {

    if (
        escanerQR === null ||
        escanerActivo === false
    ) {

        lectorQR.style.display =
            "none";

        btnEscanearQR.textContent =
            "ESCANEAR CÓDIGO QR";

        return;
    }


    escanerQR
        .stop()
        .then(
            function () {

                escanerQR.clear();

                escanerQR = null;
                escanerActivo = false;

                lectorQR.style.display =
                    "none";

                btnEscanearQR.textContent =
                    "ESCANEAR CÓDIGO QR";
            }
        )
        .catch(
            function (error) {

                console.error(
                    "Error al detener cámara:",
                    error
                );

                escanerQR = null;
                escanerActivo = false;

                lectorQR.style.display =
                    "none";

                btnEscanearQR.textContent =
                    "ESCANEAR CÓDIGO QR";
            }
        );
}


// =========================================================
// 18. QR DETECTADO
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


    if (!codigo.startsWith("JDJ-")) {

        mensajeEscaner.textContent =
            "Este QR no pertenece al sistema JDJ.";

        return;
    }


    codigoBusqueda.value =
        codigo;


    mensajeEscaner.textContent =
        "Código detectado correctamente ✓";


    detenerEscaner();


    setTimeout(
        function () {

            buscarVehiculo(codigo);

        },
        500
    );
}


// =========================================================
// 19. BÚSQUEDA MANUAL
// =========================================================

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


// Permitir buscar presionando Enter

codigoBusqueda.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        btnBuscarCodigo.click();
    }
);


// =========================================================
// 20. BUSCAR VEHÍCULO
// =========================================================

async function buscarVehiculo(codigo) {

    codigoSeleccionado = "";

    resultadoBusqueda.style.display =
        "none";


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
                "?accion=buscar" +
                "&codigo=" +
                encodeURIComponent(codigo)
            );


        const datos =
            await respuesta.json();


        console.log(
            "Vehículo encontrado:",
            datos
        );


        if (datos.encontrado !== true) {

            mensajeEscaner.textContent =
                datos.mensaje ||
                "No se encontró el vehículo.";

            return;
        }


        // -----------------------------------------
        // Revisar estado
        // -----------------------------------------

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


        // -----------------------------------------
        // Mostrar datos del vehículo
        // -----------------------------------------

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

    } catch (error) {

        console.error(
            "Error buscando vehículo:",
            error
        );


        mensajeEscaner.textContent =
            "No fue posible consultar el vehículo.";
    }
}


// =========================================================
// 21. CONFIRMAR INGRESO
// =========================================================

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
                    "?accion=confirmar" +
                    "&codigo=" +
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

                return;
            }


            // -----------------------------------------
            // Ingreso confirmado
            // -----------------------------------------

            encargadoEstado.textContent =
                datos.estado || "INGRESADO";


            mensajeEscaner.textContent =
                "✓ Ingreso confirmado correctamente";


            btnConfirmarIngreso.disabled =
                true;


            btnConfirmarIngreso.textContent =
                "INGRESO CONFIRMADO";


            // Ya no se puede volver a confirmar
            // el mismo vehículo sin una nueva búsqueda.

            codigoSeleccionado = "";


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


// =========================================================
// 22. REGISTRO DE VEHÍCULO
// =========================================================

formRegistro.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const nombre =
            nombrePiloto.value.trim();

        const tipo =
            tipoVehiculo.value.trim();


        if (nombre === "") {

            alert(
                "Ingresa el nombre del piloto."
            );

            return;
        }


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


            mostrarAsignacion(datos);

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


// =========================================================
// 23. MOSTRAR ASIGNACIÓN
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


    // Guardar coordenadas

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


    formRegistro.reset();


    ocultarPantallas();

    pantallaAsignacion.style.display =
        "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================================
// 24. GOOGLE MAPS
// =========================================================

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


        const destino =
            latitudParqueo +
            "," +
            longitudParqueo;


        const urlMaps =
            "https://www.google.com/maps/dir/?api=1" +
            "&destination=" +
            encodeURIComponent(destino);


        window.open(
            urlMaps,
            "_blank",
            "noopener,noreferrer"
        );
    }
);


// =========================================================
// 25. WAZE
// =========================================================

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


        const destino =
            latitudParqueo +
            "," +
            longitudParqueo;


        const urlWaze =
            "https://www.waze.com/ul?ll=" +
            encodeURIComponent(destino) +
            "&navigate=yes";


        window.open(
            urlWaze,
            "_blank",
            "noopener,noreferrer"
        );
    }
);


// =========================================================
// 26. ABRIR DASHBOARD
// =========================================================

btnDashboard.addEventListener(
    "click",
    function () {

        detenerEscaner();

        ocultarPantallas();

        pantallaDashboard.style.display =
            "block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        cargarDashboard();
    }
);


// =========================================================
// 27. CARGAR DASHBOARD
// =========================================================

async function cargarDashboard() {

    try {

        listaParqueosDashboard.innerHTML =
            '<p class="dashboard-cargando">' +
            'Cargando información...' +
            '</p>';


        const respuesta =
            await fetch(
                URL_API +
                "?accion=dashboard"
            );


        const datos =
            await respuesta.json();


        console.log(
            "Dashboard:",
            datos
        );


        if (datos.exito !== true) {

            listaParqueosDashboard.innerHTML =
                '<p class="dashboard-cargando">' +
                'No fue posible cargar el dashboard.' +
                '</p>';

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


        listaParqueosDashboard.innerHTML =
            '<p class="dashboard-cargando">' +
            'No fue posible cargar la información.' +
            '</p>';
    }
}


// =========================================================
// 28. RESUMEN DEL DASHBOARD
// =========================================================

function actualizarResumenDashboard(datos) {

    const capacidad =
        Number(datos.resumen.capacidad) || 0;

    const asignados =
        Number(datos.resumen.asignados) || 0;

    const ingresados =
        Number(datos.resumen.ingresados) || 0;

    const disponibles =
        Number(datos.resumen.disponibles) || 0;


    const ocupados =
        asignados + ingresados;


    let porcentaje = 0;


    if (capacidad > 0) {

        porcentaje =
            Math.round(
                (ocupados / capacidad) * 100
            );
    }


    porcentaje =
        Math.max(
            0,
            Math.min(porcentaje, 100)
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
        Array.isArray(datos.parqueos)
            ? datos.parqueos.length
            : 0;
}


// =========================================================
// 29. MOSTRAR PARQUEOS DEL DASHBOARD
// =========================================================

function mostrarParqueosDashboard(parqueos) {

    listaParqueosDashboard.innerHTML = "";


    if (
        !Array.isArray(parqueos) ||
        parqueos.length === 0
    ) {

        listaParqueosDashboard.innerHTML =
            '<p class="dashboard-cargando">' +
            'No hay parqueos activos.' +
            '</p>';

        return;
    }


    for (let i = 0; i < parqueos.length; i++) {

        crearTarjetaParqueo(
            parqueos[i]
        );
    }
}


// =========================================================
// 30. CREAR TARJETA DE PARQUEO
// =========================================================

function crearTarjetaParqueo(parqueo) {

    const capacidad =
        Number(parqueo.capacidad) || 0;

    const asignados =
        Number(parqueo.asignados) || 0;

    const ingresados =
        Number(parqueo.ingresados) || 0;


    const ocupados =
        asignados + ingresados;


    const disponibles =
        Math.max(
            capacidad - ocupados,
            0
        );


    let porcentaje = 0;


    if (capacidad > 0) {

        porcentaje =
            Math.round(
                (ocupados / capacidad) * 100
            );
    }


    porcentaje =
        Math.max(
            0,
            Math.min(porcentaje, 100)
        );


    // -----------------------------------------
    // Estado visual
    // -----------------------------------------

    let estado =
        "disponible";

    let textoEstado =
        "Disponible";


    if (disponibles === 0) {

        estado =
            "lleno";

        textoEstado =
            "Lleno";

    } else if (porcentaje >= 85) {

        estado =
            "precaucion";

        textoEstado =
            "Poco espacio";
    }


    const tipo =
        formatearTipoVehiculo(
            parqueo.tipoVehiculo
        );


    // Datos escapados antes de insertarlos
    // dentro del HTML de la tarjeta.

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
// 31. ACTUALIZAR DASHBOARD
// =========================================================

btnActualizarDashboard.addEventListener(
    "click",
    async function () {

        btnActualizarDashboard.disabled =
            true;


        try {

            await cargarDashboard();

        } finally {

            btnActualizarDashboard.disabled =
                false;
        }
    }
);


// =========================================================
// 32. VOLVER DEL DASHBOARD AL CONTROL
// =========================================================

btnVolverEncargado.addEventListener(
    "click",
    function () {

        ocultarPantallas();

        pantallaEncargado.style.display =
            "block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


// =========================================================
// 33. ESTADO INICIAL
// =========================================================

limpiarControlIngreso();