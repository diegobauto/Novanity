(function () {
  const ventasRef = firestoreDb.collection("ventas");
  var db = {
    loadData: function (filter) {
      const promise = jQuery.Deferred();
      ventasRef.orderBy("N_Pedido").onSnapshot((data) => {
        let lasFilas = [];

        data.forEach((row) => {
          lasFilas.push({
            id: row.id,
            ...row.data(),
          });
        });

        //lasFilas = lasFilas.reverse().filter((client)

        lasFilas = lasFilas.filter((client) => {
          return (
            (!filter.N_Pedido ||
              client.N_Pedido.indexOf(filter.N_Pedido) > -1) &&
            (!filter.Descripcion ||
              client.Descripcion.indexOf(filter.Descripcion) > -1) &&
            (filter.Precio_Total === undefined ||
              client.Precio_Total === filter.Precio_Total) &&
            (!filter.Vendedor || client.Vendedor.indexOf(filter.Vendedor) > -1)
          );
        });

        promise.resolve(lasFilas);
      });

      return promise;
    },

    insertItem: function (insertingClient) {
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

  db.clients = [
    {
      N_Pedido: "00000001",
      Descripcion: "Pan tradicional",
      Precio_Total: 10000,
      Vendedor: "Connor Johnston",
    },
    {
      N_Pedido: "00000002",
      Descripcion: "Pan integral, Pan de semillas",
      Precio_Total: 17000,
      Vendedor: "Lacey Hess",
    },
    {
      N_Pedido: "00000003",
      Descripcion: "Pan tradicional, Pan integral",
      Precio_Total: 19000,
      Vendedor: "Lacey Hess",
    },
    {
      N_Pedido: "00000004",
      Descripcion: "Pan tradicional",
      Precio_Total: 11000,
      Vendedor: "Connor Johnston",
    },
    {
      N_Pedido: "00000005",
      Descripcion: "Pan integral, Pan de semillas",
      Precio_Total: 18000,
      Vendedor: "Lacey Hess",
    },
    {
      N_Pedido: "00000006",
      Descripcion: "Pan tradicional",
      Precio_Total: 11000,
      Vendedor: "Connor Johnston",
    },
    {
      N_Pedido: "00000007",
      Descripcion: "Pan tradicional",
      Precio_Total: 9000,
      Vendedor: "Christopher Mcclure",
    },
    {
      N_Pedido: "00000008",
      Descripcion: "Pan tradicional",
      Precio_Total: 12000,
      Vendedor: "Ruby Rocha",
    },
    {
      N_Pedido: "00000009",
      Descripcion: "Pan integral, Pan de semillas",
      Precio_Total: 16000,
      Vendedor: "Imelda Hardin",
    },
    {
      N_Pedido: "00000010",
      Descripcion: "Pan integral, Pan de semillas",
      Precio_Total: 16000,
      Vendedor: "Imelda Hardin",
    },
    {
      N_Pedido: "00000011",
      Descripcion: "Pan tradicional",
      Precio_Total: 11000,
      Vendedor: "Connor Johnston",
    },
    {
      N_Pedido: "00000012",
      Descripcion: "Pan tradicional",
      Precio_Total: 10000,
      Vendedor: "Connor Johnston",
    },
    {
      N_Pedido: "00000013",
      Descripcion: "Pan tradicional",
      Precio_Total: 11000,
      Vendedor: "Connor Johnston",
    },
    {
      N_Pedido: "00000014",
      Descripcion: "Pan integral, Pan de semillas",
      Precio_Total: 16000,
      Vendedor: "Imelda Hardin",
    },
    {
      N_Pedido: "00000015",
      Descripcion: "Pan tradicional, Pan integral",
      Precio_Total: 19000,
      Vendedor: "Lacey Hess",
    },
    {
      N_Pedido: "00000016",
      Descripcion: "Pan tradicional, Pan integral",
      Precio_Total: 19000,
      Vendedor: "Lacey Hess",
    },
  ];
})();
