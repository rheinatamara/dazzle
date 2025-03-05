const authentication = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      const message = "please login first";
      res.redirect(`/login?error=${message}`);
    } else {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = authentication;
