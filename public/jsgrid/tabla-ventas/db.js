(function () {
  const ventasRef = firestoreDb.collection("ventas");
  var db = {
    loadData: function (filter) {
      const promise = jQuery.Deferred();
      ventasRef.orderBy("N_Pedido").onSnapshot((data) => {
        let lasFilas = [];
        window.parent.window.contadorVentas = 0;

        data.forEach((row) => {
          window.parent.window.contadorVentas += 1;
          lasFilas.push({
            id: row.id,
            ...row.data(),
          });
        });
        console.log(window.contadorVentas);

        //lasFilas = lasFilas.reverse().filter((client)

        lasFilas = lasFilas.filter((client) => {
          return (
            (!filter.N_Pedido ||
              client.N_Pedido.indexOf(filter.N_Pedido) > -1) &&
            (!filter.Descripcion ||
              client.Descripcion.indexOf(filter.Descripcion) > -1) &&
            (filter.Precio_Total === undefined ||
              client.Precio_Total === filter.Precio_Total) &&
            (!filter.Vendedor ||
              client.Vendedor.indexOf(filter.Vendedor) > -1) &&
            (!filter.ID_Cliente ||
              client.ID_Cliente.indexOf(filter.ID_Cliente) > -1) &&
            (!filter.Cliente || client.Cliente.indexOf(filter.Cliente) > -1) &&
            (!filter.Estado || client.Estado === filter.Estado) &&
            (!filter.Fecha || client.Fecha.indexOf(filter.Fecha) > -1)
          );
        });

        promise.resolve(lasFilas);
      });

      return promise;
    },

    insertItem: function (insertingClient) {
      insertingClient.N_Pedido = new Date().getTime();
      const promise = jQuery.Deferred();
      const nuevo = ventasRef.doc();
      nuevo.set(insertingClient).then(() => {
        promise.resolve();
      });
      return promise;
    },

    updateItem: function (updatingClient) {
      const promise = jQuery.Deferred();
      ventasRef
        .doc(updatingClient.id)
        .set(updatingClient)
        .then(() => {
          promise.resolve();
        });

      return promise;
    },

    deleteItem: function (deletingClient) {
      const promise = jQuery.Deferred();
      ventasRef
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
    { Name: "en proceso", Id: 1 },
    { Name: "cancelada", Id: 2 },
    { Name: "entregada", Id: 3 },
  ];
})();
