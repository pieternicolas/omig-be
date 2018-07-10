module.exports = {


  friendlyName: 'Update',


  description: 'Update user profile.',


  inputs: {

    username: {
      type: 'string',
      unique: true,
      maxLength: 50,
      example: 'bananatictac12'
    },

    password: {
      type: 'string',
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


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // Check if the username has already been used
    const conflictingUser = await User.findOne({ username: inputs.username });
    if (conflictingUser) return exits.duplicateUsername({ message: 'Username is already used.' });

    // Update the aforementioned user and fetch the new info
    const updatedUser = await User.update({ id: userID })
      .set(inputs)
      .intercept('UsageError', (err)=> {
        return exits.badRequest(err);
      })
      .fetch();

    return exits.success(updatedUser);

  }


};
