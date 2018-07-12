module.exports = {


  friendlyName: 'Find one post with the details',


  description: 'Get one post details according to the post ID',


  inputs: {

    postID: {
      type: 'string',
      required: true,
      description: 'The post ID used to find aforementioned post in the database'
    }

  },


  exits: {

    notFound: {
      description: 'If there is no posts found with the combination of id and user ID',
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // Get the post and populate the account linked to the post
    const fetchedRecord = await Post.findOne({ userID, id: inputs.postID })
      .populate('accountID');

    if (!fetchedRecord) return exits.notFound();
    return exits.success(fetchedRecord);

  }


};
