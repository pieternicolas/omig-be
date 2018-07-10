module.exports = {


  friendlyName: 'Get user id',


  description: 'Automatically get the user ID from the session cookie',


  inputs: {

    passportCookie: {
      type: 'ref',
      required: true,
      description: 'The passport session cookie on the request object'
    }

  },


  exits: {

    noUserIdFound: {
      description: 'No valid user ID was found in the session cookie',
      responseType: 'notFound'
    }

  },


  fn: async (inputs, exits) => {

    // Get user id.
    const userId = inputs.passportCookie.id;
    if (!userId) return exits.noUserIdFound();

    // Send back the result through the success exit.
    return exits.success(userId);

  }


};

