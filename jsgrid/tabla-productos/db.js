(function () {
  var db = {
    loadData: function (filter) {
      return $.grep(this.clients, function (client) {
        return (
          (!filter.Codigo || client.Codigo.indexOf(filter.Codigo) > -1) &&
          (!filter.Nombre || client.Nombre.indexOf(filter.Nombre) > -1) &&
          (filter.Stock === undefined || client.Stock === filter.Stock) &&
          (filter.Precio === undefined || client.Precio === filter.Precio)
        );
      });
    },

    insertItem: function (insertingClient) {
      this.clients.push(insertingClient);
    },

    updateItem: function (updatingClient) {},

    deleteItem: function (deletingClient) {
      var clientIndex = $.inArray(deletingClient, this.clients);
      this.clients.splice(clientIndex, 1);
    },
  };

  window.db = db;

  db.clients = [
    {
      Codigo: "0000001",
      Nombre: "Pan tradicional ",
      Stock: 100,
      Precio: 2000,
    },
    {
      Codigo: "0000002",
      Nombre: "Pan integral ",
      Stock: 300,
      Precio: 2500,
    },
    {
      Codigo: "0000003",
      Nombre: "Pan de otros cereales  ",
      Stock: 250,
      Precio: 3000,
    },
    {
      Codigo: "0000004",
      Nombre: "Pan de semillas  ",
      Stock: 300,
      Precio: 4000,
    },
    {
      Codigo: "0000005",
      Nombre: "Pan relleno ",
      Stock: 100,
      Precio: 3000,
    },
    {
      Codigo: "0000006",
      Nombre: "Pan francés / Pan de Viena",
      Stock: 200,
      Precio: 2000,
    },
    {
      Codigo: "0000007",
      Nombre: "Pan enriquecido",
      Stock: 150,
      Precio: 2000,
    },
    {
      Codigo: "0000008",
      Nombre: "Pan tostado",
      Stock: 100,
      Precio: 3000,
    },
    {
      Codigo: "0000009",
      Nombre: "Torta de chocolate",
      Stock: 50,
      Precio: 15000,
    },
    {
      Codigo: "0000010",
      Nombre: "Torta de arequipe",
      Stock: 55,
      Precio: 15000,
    },
    {
      Codigo: "0000011",
      Nombre: "Torta fria",
      Stock: 57,
      Precio: 15000,
    },
    {
      Codigo: "0000012",
      Nombre: "Torta tres leches",
      Stock: 30,
      Precio: 15000,
    },
    {
      Codigo: "0000013",
      Nombre: "Genovesa",
      Stock: 40,
      Precio: 15000,
    },
    {
      Codigo: "0000014",
      Nombre: "Torta de vino",
      Stock: 61,
      Precio: 11000,
    },
    {
      Codigo: "0000015",
      Nombre: "Torta de vainilla",
      Stock: 30,
      Precio: 10000,
    },
    {
      Codigo: "0000016",
      Nombre: "Galletas decoradas",
      Stock: 50,
      Precio: 4000,
    },
    {
      Codigo: "0000017",
      Nombre: "Mil hojas",
      Stock: 70,
      Precio: 4000,
    },
  ];
})();
