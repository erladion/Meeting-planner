var CLIENT_ID = Meteor.settings.public.client_id;
var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;

Meteor.methods({
    addUser: function(id_token){
        var client = new auth.OAuth2(CLIENT_ID, '','');
        client.verifyIdToken(
            id_token,
            CLIENT_ID,
            Meteor.bindEnvironment(function(e, login){
                var payload = login.getPayload();
                var userid = payload['sub'];
                var email = payload['email'];

                Meteor.call('users.add', email, userid, function(){
                    console.log("hello");
                    console.log("email: " + email + " userid: " + userid);
                });
            }),
        );
    },
});
