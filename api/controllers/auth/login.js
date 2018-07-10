import passport from 'passport';

module.exports = {


  friendlyName: 'Login',


  description: 'Login authenticator for users.',


  inputs: {

    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 50,
      example: 'bananatictac12'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Not hashed version of password',
      protect: true,
      example: 'plainpassword'
    },

  },


  exits: {

    notAuthenticated: {
      description: 'If user supplied the wrong password',
      responseType: 'notAuthenticated'
    },

    badRequest: {
      description: 'Unknown error occurs during login',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {

    const req = this.req;
    const res = this.res;

    passport.authenticate('local', (err, user, info) => {
      // If password is incorrect or user is not found in the database
      if ((err) || (!user)) {
        return exits.notAuthenticated({
          message: 'Invalid username and/or password',
          user
        });
      };

      // Attempt to login and set a session id
      req.logIn(user, (err) => {
        if (err) return exits.badRequest(err);

        return exits.success({
          message: info.message,
          user
        });
      });
    })(req, res);

  }


};
