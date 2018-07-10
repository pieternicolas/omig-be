module.exports = {


  friendlyName: 'Delete',


  description: 'Delete (soft delete) the user.',


  inputs: {

  },


  exits: {

    badRequest: {
      description: 'Random errors',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // Destroy the user from the database
    await User.destroy({ id: userID })
      .intercept('UsageError', (err)=> {
        return exits.badRequest(err);
      });

    return exits.success();

  }


};
