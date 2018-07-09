module.exports = async (req, res) => {

  try {

    const createdRecord = await User.create(req.body).fetch();
    return res.json(createdRecord);

  } catch(err) {

    return res.json(err.cause);

  };

};