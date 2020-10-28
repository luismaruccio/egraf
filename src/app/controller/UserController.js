import jwt from 'jsonwebtoken';
import UserDao from '../dao/UserDao';
import User from '../model/User';
import authConfig from '../../config/auth';

class UserController {

  async insert(req,res) {
    const {name, email, password, level, company} = req.body;
    
    const user = {
        name: name,
        email: email,
        password: password,
        level: level,
        company: company
    }

    let result = '';
    let status = 200;

    try {
      result = await UserDao.insertUser(user);
      status = 201;
    }
    catch (err) {
      result = {
        message: err.message
      };
      status = 500;
    }    

    return res.status(status).json(result);    
  }

  async update(req,res) {
    const {id, name, email, password, level, company} = req.body;

    const unmodifiedUser = await UserDao.getById(id);    
    
    if (unmodifiedUser instanceof Error)
    {
      const result = {
        msg: unmodifiedUser.message,
      }

      return res.status(500).json(result);
    }

    const modifiedUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        level: level,
        company: company
    }

    let result = '';
    let status = 200;

    try {
      await UserDao.update(id, modifiedUser);  
      const user = await UserDao.getById(id); 
      result = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        level: user.level,
        company: user.company
    }    
    } catch (err) {
      result = {
        message: err.message
      };
      status = 500;
    }   

    return res.status(status).json(result); 
  }

  async getAll(req,res) {
    const result = await UserDao.getAll();
    return res.json(result);
  }

  async delete(req,res) {
    const {id} = req.body;
    const user = await UserDao.getById(id); 

    if (user instanceof Error)
    {
      const result = {
        msg: user.message,
      }

      return res.json(result).status(500);
    }

    let result = '';
    let status = 200;

    try {
      await UserDao.falseDelete(id);
      result = 'Success';      
    } catch (err) {
      result = {
        message: err.message
      };
      status = 500;
    }   

    return res.status(status)
              .json(result);
  }

  async login(req,res) {
    const {email, password} = req.body;

    var user = await UserDao.getByEmail(email);

    if (!(user instanceof User))
    {
      if(user === null) {
        return res.status(401).json({error: 'User not found.'});
      }
      else {
        return res.status(500).json({error: unmodifiedUser.message});
      }      
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({error: 'The password is wrong.'})
    }

    const {id, name, level, company} = user;

    return res.json({
      user: {
        id,
        name,
        level,
        company
      },
      token: jwt.sign({id}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
    
  }
  
}

export default new UserController();