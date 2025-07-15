function loadCliente(id) {
  const db = firebase.database();
  db.ref('clientes/' + id).once('value')
    .then(snapshot => {
      const data = snapshot.val();
      if (!data) {
        document.getElementById('content').innerHTML = `<p>Cliente no encontrado.</p>`;
        return;
      }

      document.getElementById('content').innerHTML = `
        <div class="card">
          <header class="card-header">
            <span>ID Socios</span>
            <span>Inicio</span>
          </header>

          <div class="card-body">
            <img src="https://clubrotariosansalvador.org/wp-content/uploads/2021/06/Logo-Club-Rotario-San-Salvador.jpg" alt="Logo Rotary" class="logo" />
            <h1>Rotary</h1>
            <h2>Club Rotario San Salvador<br>Maquilishuat</h2>

            <div class="info">
              <p><strong>Socio ${data.nombre}</strong></p>
              <p>Distrito ${data.distrito}</p>
              <p>Club # ${data.club}</p>
              <p>Correo ${data.correo}</p>
              <p>Celular ${data.telefono}</p>
            </div>

            <a href="#" id="add-contact" class="btn-contacto">Agregar contacto</a>
          </div>

          <footer class="card-footer">
            Desarrollado por <a href="https://www.instagram.com/eworks.tec/" target="_blank">eworks.tec</a>
          </footer>
        </div>
      `;

      // Generar vCard y descargarla
      const btn = document.getElementById('add-contact');
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const vcardData = `
BEGIN:VCARD
VERSION:3.0
FN:${data.nombre}
TEL;TYPE=CELL:${data.telefono}
EMAIL:${data.correo}
ORG:Rotary Club San Salvador Maquilishuat
NOTE:Socio #${data.socio}
END:VCARD
        `.trim();

        const blob = new Blob([vcardData], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.nombre.replace(/\s+/g, "_")}.vcf`;
        a.click();

        URL.revokeObjectURL(url);
      });
    });
}

function handleRoute() {
  const hash = window.location.hash.substring(1); // quita el #
  if (hash) {
    loadCliente(hash);
  } else {
    document.getElementById('content').innerHTML = `<p>Agrega un ID de cliente en la URL.</p>`;
  }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
