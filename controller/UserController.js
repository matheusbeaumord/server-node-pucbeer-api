// POST USER Criaçao usuario
const UserService = require('../service/UserService');

const create = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const { newUser } = await UserService.create(name, email, role, password);
  
    return res.status(201).send(newUser);  
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUserName = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;
  try {
    const message = await UserService.updateUserName(name, authorization);
    return res.status(201).send({ message });  
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email: emailBody, password } = req.body;
  try {
    const { 
      token, 
      message, 
      email, 
      name, 
      role } = await UserService.login(emailBody, password);
      return res.status(200).send({ token, message, email, name, role });
  } catch (error) {
    return res.status(401).json({ error: error.message });    
  }
};

module.exports = { create, login, updateUserName };
