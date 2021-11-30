(function () {
  const usuariosRef = firestoreDb.collection("productos");
  var db = {
    loadData: function (filter) {
      const promise = jQuery.Deferred();
      usuariosRef.orderBy("Codigo").onSnapshot((data) => {
        let lasFilas = [];

        data.forEach((row) => {
          lasFilas.push({
            id: row.id,
            ...row.data(),
          });
        });

        lasFilas = lasFilas.filter((client) => {
          return (
            (!filter.Codigo || client.Codigo.indexOf(filter.Codigo) > -1) &&
            (!filter.Nombre || client.Nombre.indexOf(filter.Nombre) > -1) &&
            (filter.Stock === undefined || client.Stock === filter.Stock) &&
            (filter.Precio === undefined || client.Precio === filter.Precio) &&
            (!filter.Estado || client.Estado === filter.Estado)
          );
        });

        promise.resolve(lasFilas);
      });

      return promise;
    },

    insertItem: function (insertingClient) {
      insertingClient.Codigo = new Date().getTime();
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
  db.estado = [
    { Name: "", Id: 0 },
    { Name: "disponible", Id: 1 },
    { Name: "no disponible", Id: 2 },
  ];
})();
