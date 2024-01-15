
const User = require('./../models/user');


const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const user = await User.findOne({ where: { email: uid } });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;