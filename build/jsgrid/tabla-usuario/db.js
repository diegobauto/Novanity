(function () {
  const usuariosRef = firestoreDb.collection("usuarios");
  var db = {
    loadData: function (filter) {
      const promise = jQuery.Deferred();
      usuariosRef.onSnapshot((data) => {
        let lasFilas = [];

        data.forEach((row) => {
          lasFilas.push({
            id: row.id,
            ...row.data(),
          });
        });

        lasFilas = lasFilas.filter((client) => {
          return (
            (!filter.Nombre || client.Nombre.indexOf(filter.Nombre) > -1) &&
            (!filter.Correo || client.Correo.indexOf(filter.Correo) > -1) &&
            (!filter.Estado || client.Estado === filter.Estado) &&
            (!filter.Rol || client.Rol === filter.Rol)
          );
        });

        promise.resolve(lasFilas);
      });

      return promise;
    },

    insertItem: function (insertingClient) {
      const promise = jQuery.Deferred();
      const nuevo = usuariosRef.doc();
      nuevo.set(insertingClient).then(() => {
        promise.resolve();
      });
      return promise;
    },

    updateItem: function (updatingClient) {
      const promise = jQuery.Deferred();
      usuariosRef
        .doc(updatingClient.id)
        .set(updatingClient)
        .then(() => {
          promise.resolve();
        });
      return promise;
    },

    deleteItem: function (deletingClient) {
      const promise = jQuery.Deferred();
      usuariosRef
        .doc(deletingClient.id)
        .delete()
        .then(() => {
          promise.resolve();
        });
      return promise;
    },
  };

  window.db = db;

  db.roles = [
    { Name: "", Id: 0 },
    { Name: "Vendedor", Id: 1 },
    { Name: "Administrador", Id: 2 },
  ];

  db.estado = [
    { Name: "", Id: 0 },
    { Name: "Activo", Id: 1 },
    { Name: "Inactivo", Id: 2 },
  ];
})();
