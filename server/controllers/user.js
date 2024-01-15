const bcrypt = require('bcrypt');
const {User} = require('./../models/db');
const create = async (req, res) => {

  const { email, password } = req.body;
  const user = await User.findByPk(email);
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hash,
    });
    req.session.uid = newUser.email;
    console.log(req.session.uid)
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }

};

const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await User.findByPk(email);
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    req.session.uid = user.email;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }

};

const profile = async (req, res) => {

  try {
    const { email, firstName, lastName } = req.user;
    // CALL comments controller to fetch comments
    const user = { firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: 'User not found' });
  }

};

const logout = (req, res) => {

  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.status(200).send({ message: 'Logout successful' });
    }
  });

};

module.exports = { create, login, profile, logout };