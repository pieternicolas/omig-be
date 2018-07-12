module.exports = {


  friendlyName: 'Check session',


  description: 'Only to check if the user session is still valid or not.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
