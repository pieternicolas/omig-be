module.exports = {


  friendlyName: 'Find all posts to a single user ID',


  description: 'Get all posts linked to the user ID',


  inputs: {

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

    // Get the posts while sorted according to their postTime
    const fetchedRecords = await Post.find({ userID })
      .sort(`postTime ${inputs.postTime}`);

    return exits.success(fetchedRecords);

  }


};
