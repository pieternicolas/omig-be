module.exports = {


  friendlyName: 'Delete post',


  description: 'Delete the post from the database.',


  inputs: {

    postID: {
      type: 'string',
      required: true,
      description: 'The post ID used to find aforementioned post in the database'
    }

  },


  exits: {

    badRequest: {
      description: 'Random errors',
      responseType: 'badRequest'
    },

    notFound: {
      description: 'If there is no posts found with the combination of id and user ID',
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // Check if the post actually exists or belongs to the user
    const doesPostExist = await Post.findOne({ userID, id: inputs.postID });
    if (!doesPostExist) return exits.notFound();

    // Destroy the post from the database
    await User.destroy({ userID, id: inputs.postID })
      .intercept('UsageError', (err)=> {
        return exits.badRequest(err);
      });

    return exits.success();

  }


};
