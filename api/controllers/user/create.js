module.exports = {


  friendlyName: 'Create user',


  description: 'Insert new user to database',


  inputs: {

    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 50,
      example: 'bananatictac12'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Not hashed version of password',
      protect: true,
      example: 'plainpassword'
    },

    fullName: {
      type: 'string',
      description: 'Full name of current user',
      example: 'Nicolas Pieter'
    }

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


  fn: async (inputs, exits) => {

    const createdRecord = await User.create(inputs)
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
