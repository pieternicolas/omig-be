import bcrypt from 'bcrypt-nodejs';
/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 50,
      description: 'Username of the user to login',
      example: 'bananatictac12'
    },

    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    fullName: {
      type: 'string',
      description: 'Full name of current user',
      example: 'Nicolas Pieter'
    },

    accounts: {
      collection: 'account',
      via: 'userID'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  customToJSON: function() {
    // Return a shallow copy of this record with the password removed.
    return _.pick(this, ['id', 'username', 'fullName', 'createdAt', 'updatedAt']);
  },

  beforeCreate: (values, cb) => {
    // Hash password
    // Generate the salt with 5 rounds
    bcrypt.genSalt(5, (saltErr, salt) => {
      if (saltErr) return cb(err);

      // Hash the password after salt creation
      bcrypt.hash(values.password, salt, null, (err, hash) => {
        if (err) return cb(err);

        //Delete the passwords so that they are not stored in the DB
        delete values.password;

        // Replace password value with hashed password
        values.password = hash;

        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
      });
    });
  },

  afterCreate: (values, cb) => {
    // Delete any resemblance of personal identity
    delete values.password;
    cb();
  },

  beforeUpdate: (values, cb) => {
    // Hash password
    // If the user does not update their password, continue automatically
    if (!values.password) return cb();

    // Generate the salt with 5 rounds
    bcrypt.genSalt(5, (saltErr, salt) => {
      if (saltErr) return cb(err);

      // Hash the password after salt creation
      bcrypt.hash(values.password, salt, null, (err, hash) => {
        if (err) return cb(err);

        //Delete the passwords so that they are not stored in the DB
        delete values.password;

        // Replace password value with hashed password
        values.password = hash;

        //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        cb();
      });
    });
  },

  afterUpdate: (values, cb) => {
    // Delete any resemblance of personal identity
    delete values.password;
    cb();
  },

};

