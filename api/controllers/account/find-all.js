module.exports = {


  friendlyName: 'Find all accounts to a single user ID',


  description: 'Get all instagram accounts linked to the user ID',


  inputs: {

    posts: {
      type: 'boolean',
      description: 'Returns the account with or without the linked posts',
      defaultsTo: true
    },

    postTime: {
      type: 'string',
      description: 'Sort posts by their postTime',
      defaultsTo: 'asc'
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // If the posts param is set to true, get all linked posts.
    // Otherwise get only the needed data for the account
    let fetchedRecords;
    if (inputs.posts) {
      fetchedRecords = await Account.find({ userID })
        .populate('posts', {
          sort: `postTime ${inputs.postTime}`
        });
    } else {
      fetchedRecords = await Account.find({ userID });
    };

    return exits.success(fetchedRecords);

  }


};
