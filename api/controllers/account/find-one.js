module.exports = {


  friendlyName: 'Find one account with the details',


  description: 'Get one account details according to the post ID, with optional linked posts included',


  inputs: {

    accountID: {
      type: 'string',
      required: true,
      description: 'The account ID used to find aforementioned account in the database'
    },

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

    notFound: {
      description: 'If there is no accounts found with the combination of id and user ID',
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // If the posts param is set to true, get all linked posts.
    // Otherwise get only the needed data for the account
    let fetchedRecord;
    if (inputs.posts) {
      fetchedRecord = await Account.find({ userID, id: inputs.accountID })
        .populate('posts', {
          sort: `postTime ${inputs.postTime}`
        });
    } else {
      fetchedRecord = await Account.find({ userID, id: inputs.accountID });
    };

    if (!fetchedRecord) return exits.notFound();
    return exits.success(fetchedRecord);

  }


};
