module.exports = {


  friendlyName: 'Create account',


  description: 'Create an instagram related account on the user.',


  inputs: {

    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 50,
      description: 'Instagram account username',
      example: 'bananatictac12'
    },

    name: {
      type: 'string',
      maxLength: 100,
      description: 'Instagram account name (not required, only for frontend purposes)',
      example: 'Account jual kacang'
    },

    description: {
      type: 'string',
      description: 'Account description for frontend purposes only',
      example: 'Ini account yg buat jualan kacang'
    },

  },


  exits: {

    badRequest: {
      description: 'If one or more fields are missing or does not adhere to the rules above',
      responseType: 'badRequest'
    },

    duplicateUsername: {
      description: 'If the username already exists on the database',
      responseType: 'duplicate'
    }

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // Insert the post to the database and return the inserted data
    const createdRecord = await Account.create({ ...inputs, userID })
      .intercept('E_UNIQUE', (err)=> {
        return exits.duplicateUsername(err);
      })
      .intercept('UsageError', (err)=> {
        return exits.badRequest(err);
      })
      .fetch();

    return exits.success(createdRecord);

  }


};
