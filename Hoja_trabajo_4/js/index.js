
function mostrarTabla(num) {
    // Ocultar todos los contenedores
    document.getElementById("contenedor1").style.display = "none";
    document.getElementById("contenedor2").style.display = "none";
    document.getElementById("contenedor3").style.display = "none";

    // Mostrar el contenedor seleccionado
    document.getElementById("contenedor" + num).style.display = "block";
}

// Mostrar la primera tabla por defecto
mostrarTabla(1);

// Lista de comentarios
const comentarios = [
    "El itinerario estuvo muy bien organizado, todo puntual.",
    "Me encantó la comida en el restaurante, ¡deliciosa!",
    "La guía fue muy amable y conocedora de la historia.",
    "Hubo un pequeño retraso en el vuelo, pero se solucionó rápido.",
    "El hotel tenía una vista increíble.",
    "Me gustó mucho el paseo por el parque, muy relajante.",
    "Excelente experiencia, repetiría sin dudarlo.",
    "La conferencia fue muy productiva y bien organizada.",
    "El transporte fue cómodo y rápido.",
    "La atención del personal fue de primera calidad."
];

// Función para mostrar 3 comentarios aleatorios
function mostrarComentarios() {
    const lista = document.getElementById("listaComentarios");
    lista.innerHTML = ""; // limpiar antes de agregar nuevos

    let seleccionados = [];
    while (seleccionados.length < 3) {
        let idx = Math.floor(Math.random() * comentarios.length);
        if (!seleccionados.includes(idx)) {
            seleccionados.push(idx);
        }
    }

    seleccionados.forEach(i => {
        let div = document.createElement("div");
        div.className = "comentario";
        div.textContent = comentarios[i];
        lista.appendChild(div);
    });
}

// Mostrar comentarios al cargar la página
mostrarComentarios();

///*********************************/

function enviarFormulario() {

    const nombre = document.getElementById("nombre").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    console.log(nombre + "-" + fecha + "-" + email + "-" + mensaje)

    if (!nombre || !fecha || !email || !mensaje) {
        alert("Completa todos los campos.");
        return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Ingresa un correo válido.");
        return;
    }

    const modal = new bootstrap.Modal(document.getElementById("confirmacionModal"));
    modal.show();

    document.getElementById("contactoForm").reset();
}

