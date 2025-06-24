window.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  const mostrar = url.searchParams.get("encuesta") === "1";

  const modal = document.getElementById("modal-encuesta");
  if (!modal || !mostrar) return;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  const paso1 = document.getElementById("paso1");
  const paso2 = document.getElementById("paso2");

  const btnAceptar = document.getElementById("btnAceptar");
  const btnRechazar = document.getElementById("btnRechazar");
  const closeBtn = document.getElementById("cerrarEncuesta");
  const cancelarBtn = document.getElementById("cancelarForm");
  const form = document.getElementById("formEncuesta");

  const cerrarModal = () => {
    modal.remove();
    url.searchParams.delete("encuesta");
    history.replaceState({}, "", url.pathname);
  };

  btnRechazar?.addEventListener("click", cerrarModal);
  closeBtn?.addEventListener("click", cerrarModal);
  cancelarBtn?.addEventListener("click", cerrarModal);

  btnAceptar?.addEventListener("click", () => {
    paso1.style.display = "none";
    paso2.classList.remove("hidden");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get("nombre");
    const servicio = data.get("servicio");
    const estrellas = parseInt(data.get("estrellas") || "5");
    const texto = data.get("texto");
    const archivo = data.get("foto");

    const reader = new FileReader();
    reader.onload = () => {
      const prev = JSON.parse(localStorage.getItem("reseñasExtra") || "[]");
      prev.push({ nombre, servicio, estrellas, texto, foto: reader.result });
      localStorage.setItem("reseñasExtra", JSON.stringify(prev));
      alert("¡Gracias por tu reseña!");
      cerrarModal();
      window.location.href = "#opiniones";
      window.location.reload();
    };

    if (archivo && archivo.size > 0) {
      reader.readAsDataURL(archivo);
    } else {
      reader.onload();
    }
  });
});
