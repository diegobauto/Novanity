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
