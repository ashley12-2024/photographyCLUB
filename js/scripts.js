const firebaseConfig = {
  apiKey: "AIzaSyBKtI-8K2e29pGnZRFpemv8VPiD5nHT7kY",
  authDomain: "photography-club-631eb.firebaseapp.com",
  projectId: "photography-club-631eb",
  storageBucket: "photography-club-631eb.firebasestorage.app",
  messagingSenderId: "679774079412",
  appId: "1:679774079412:web:6996dc2cbf72c32f9a8ae1",
  measurementId: "G-8M6HB97DZ3"
};
// Referencia a la colección de comentarios
const comentariosRef = db.collection("comentarios");

// Seleccionar el formulario
const formulario = document.getElementById("comentario-form");

// Escuchar el evento "submit" del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar que la página se recargue

  // Obtener los valores de los campos
  const nombre = document.getElementById("nombre").value;
  const comentario = document.getElementById("comentario").value;

  // Guardar el comentario en Firebase
  comentariosRef.add({
    nombre: nombre,
    comentario: comentario,
    fecha: new Date()
  })
  .then(() => {
    alert("¡Comentario guardado con éxito!");
    formulario.reset(); // Limpiar el formulario
    mostrarComentarios(); // Actualizar los comentarios en la página
  })
  .catch((error) => {
    console.error("Error al guardar el comentario: ", error);
  });
});
// Mostrar los comentarios guardados
function mostrarComentarios() {
  const listaComentarios = document.getElementById("lista-comentarios");
  listaComentarios.innerHTML = ""; // Limpiar la lista

  comentariosRef.orderBy("fecha", "desc").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.nombre}: ${data.comentario}`;
        listaComentarios.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los comentarios: ", error);
    });
}

// Cargar los comentarios al abrir la página
mostrarComentarios();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Simular comentarios
const commentButtons = document.querySelectorAll('.photo button');
commentButtons.forEach(button => {
    button.addEventListener('click', () => {
        const textarea = button.previousElementSibling;
        if (textarea.value) {
            alert(`Comentario enviado: ${textarea.value}`);
            textarea.value = '';
        } else {
            alert('Por favor, escribe un comentario antes de enviar.');
        }
    });
});

// Simular subida de fotos
const uploadForm = document.querySelector('.upload-form form');
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = uploadForm.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
        alert(`Foto "${fileInput.files[0].name}" subida con éxito.`);
        fileInput.value = ''; // Limpiar el input
    } else {
        alert('Por favor, selecciona una foto para subir.');
    }
});

}
