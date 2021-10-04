(function () {
  var db = {
    loadData: function (filter) {
      return $.grep(this.clients, function (client) {
        return (
          (!filter.Nombre || client.Nombre.indexOf(filter.Nombre) > -1) &&
          (!filter.Correo || client.Correo.indexOf(filter.Correo) > -1) &&
          (!filter.Estado || client.Estado === filter.Estado) &&
          (!filter.Rol || client.Rol === filter.Rol)
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

  db.clients = [
    {
      Nombre: "Otto Clay",
      Correo: "otto-clay@gmail.com",
      Rol: 2,
      Estado: 1,
    },
    {
      Nombre: "Connor Johnston",
      Correo: "connor-johnston@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Lacey Hess",
      Correo: "lacey-hess@gmail.com",
      Rol: 1,
      Estado: 2,
    },
    {
      Nombre: "Timothy Henson",
      Correo: "timothy-henson@gmail.com",
      Rol: 2,
      Estado: 1,
    },
    {
      Nombre: "Ramona Benton",
      Correo: "ramona-benton@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Ezra Tillman",
      Correo: "ezra-tillman@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Dante Carter",
      Correo: "dante-carter@gmail.com",
      Rol: 2,
      Estado: 2,
    },
    {
      Nombre: "Christopher Mcclure",
      Correo: "christopher-mcclure@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Ruby Rocha",
      Correo: "ruby-rocha@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Imelda Hardin",
      Correo: "imelda-hardin@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Jonah Johns",
      Correo: "jonah-johns@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Herman Rosa",
      Correo: "herman-rosa@gmail.com",
      Rol: 2,
      Estado: 1,
    },
    {
      Nombre: "Arthur Gay",
      Correo: "arthur-gay@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Xena Wilkerson",
      Correo: "xena-wilkerson@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Lilah Atkins",
      Correo: "lilah-atkins@gmail.com",
      Rol: 1,
      Estado: 2,
    },
    {
      Nombre: "Malik Shepard",
      Correo: "malik-shepard@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Keely Silva",
      Correo: "keely-silva@gmail.com",
      Rol: 1,
      Estado: 1,
    },
    {
      Nombre: "Hunter Pate",
      Correo: "hunter-pate@gmail.com",
      Rol: 1,
      Estado: 1,
    },
  ];
})();
