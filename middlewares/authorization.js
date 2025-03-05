const authorization = async (req, res, next) => {
  try {
    if (req.session.role !== "admin") {
      const message = "You have no access";
      res.redirect(`/login?error=${message}`);
    } else {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = authorization;
