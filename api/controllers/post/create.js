import util from 'util';
import path from 'path';

module.exports = {


  friendlyName: 'Create',


  description: 'Create post.',


  inputs: {

    caption: {
      type: 'json',
      required: true,
      description: 'List of captions, in case there should be more than one caption in a post (comment captions).'
    },

    postTime: {
      type: 'number',
      columnType: 'datetime',
      required: true,
      isAfter: new Date(),
      description: 'Scheduled time for this post to be posted on instagram.'
    },

    accountID: {
      type: 'string',
      required: true,
      description: 'The instagram account this post belongs to'
    }

  },


  exits: {

    badRequest: {
      description: 'If one or more fields are missing or does not adhere to the rules above',
      responseType: 'badRequest'
    }

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const req = this.req;
    const userID = await sails.helpers.getUserId(req.user);

    // Start image uploading
    req.file('images').upload({
      dirname: sails.config.custom.baseFileDestination
    }, async (err, uploadedFiles) => {
      
      // If something goes wrong with the file upload
      if (err) return exits.serverError(err);

      // Build image urls for display and download
      const imageUrl = uploadedFiles.map(item => {
        return util.format('%s/uploads/%s', sails.config.custom.baseUrl, path.basename(item.fd));
      });

      // Insert the post to the database and return the inserted data
      const result = await Post.create({ ...inputs, imageUrl, userID })
        .intercept('UsageError', (err) => {
          return exits.badRequest(err);
        })
        .fetch();
      
      return exits.success(result);

    });


  }


};
