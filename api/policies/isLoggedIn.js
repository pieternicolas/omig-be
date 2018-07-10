module.exports = async (req, res, proceed) => {

  // Check if user is authenticated through Passport.js
  if (req.isAuthenticated()) {
    return proceed();
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.forbidden();

};
