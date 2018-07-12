module.exports = {


  friendlyName: 'Find the account and the account details',


  description: 'Get the user details with optional everything linked to the account',


  inputs: {

    allData: {
      type: 'boolean',
      description: 'If the user requests to get everything that is linked to their account',
      defaulsTo: false
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // If the allData param is set to true, get all linked data.
    // Otherwise get only the needed data for the user
    let fetchedRecords
    if (inputs.allData) {
      fetchedRecords = await User.find({ id: userID })
        .populate('posts')
        .populate('accounts');
    } else {
      fetchedRecords = await User.find({ id: userID })
    };

    return exits.success(fetchedRecords);

  }


};
