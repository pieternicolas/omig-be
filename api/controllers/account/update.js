module.exports = {


  friendlyName: 'Update account',


  description: 'Update the account contents.',


  inputs: {

    accountID: {
      type: 'string',
      required: true,
      description: 'The account ID used to find aforementioned account in the database'
    },

    username: {
      type: 'string',
      required: true,
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

    notFound: {
      description: 'If there is no accounts found with the combination of id and user ID',
      responseType: 'notFound'
    }

  },


  fn: async function (inputs, exits) {

    // Get the user ID from the cookie
    const userID = await sails.helpers.getUserId(this.req.user);

    // Check if the post actually exists or belongs to the user
    const doesAccountExist = await Account.findOne({ userID, id: inputs.accountID });
    if (!doesAccountExist) return exits.notFound();

    // Update the aforementioned account and fetch the new info
    const updatedAccount = await Account.update({ id: inputs.accountID })
      .set(inputs)
      .intercept('UsageError', (err) => {
        return exits.badRequest(err);
      })
      .fetch();

    return exits.success(updatedAccount);

  }


};
