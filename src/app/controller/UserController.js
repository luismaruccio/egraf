import UserDao from '../dao/UserDao';

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

    return res.json(result)
              .status(status);    
  }

  async update(req,res) {
    const {id, name, email, password, level, company} = req.body;

    const unmodifiedUser = await UserDao.getById(id);    
    
    if (unmodifiedUser instanceof Error)
    {
      const result = {
        msg: unmodifiedUser.message,
      }

      return res.json(result).status(500);
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

    return res.json(result)
              .status(status); 
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

    return res.json(result)
              .status(status);
  }
  
}

export default new UserController();