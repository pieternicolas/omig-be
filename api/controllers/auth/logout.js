module.exports = {


  friendlyName: 'Logout',


  description: 'Logout method for users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const req = this.req;

    req.logout();

    return exits.success({ message: 'Logout successful' });

  }


};
