ServiceConfiguration.configurations.update({service: 'google'},
    {
    $set:{
          service: 'google',
          clientId: '303238355416-evvupbj3fhekvsi1400ob29jfk93qgp9.apps.googleusercontent.com',
          loginStyle: 'popup',
          secret: '0BislYt0nMEmODFN39YN9SdZ'
        }
    },
    {
        upsert: true
    }
);
