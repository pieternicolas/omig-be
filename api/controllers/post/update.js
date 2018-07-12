module.exports = {


  friendlyName: 'Update post',


  description: 'Update the post contents.',


  inputs: {

    postID: {
      type: 'string',
      required: true,
      description: 'The post ID used to find aforementioned post in the database'
    },

    caption: {
      type: 'json',
      description: 'List of captions, in case there should be more than one caption in a post (comment captions).'
    },

    postTime: {
      type: 'number',
      columnType: 'datetime',
      isAfter: new Date(),
      description: 'Scheduled time for this post to be posted on instagram.'
    },

    accountID: {
      type: 'string',
      description: 'The instagram account this post belongs to'
    }

  },


  exits: {

    badRequest: {
      description: 'If one or more fields are missing or does not adhere to the rules above',
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

    // Update the aforementioned post and fetch the new info
    const updatedPost = await Post.update({ id: inputs.postID })
      .set(inputs)
      .intercept('UsageError', (err)=> {
        return exits.badRequest(err);
      })
      .fetch();

    return exits.success(updatedPost );

  }


};
