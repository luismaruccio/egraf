import User from '../model/User';

class UserDao {
    async getById(id) {
        try {
            const response = await User.findOne({
                where: {
                    id: id
                }
            });
            if (response === null)
                throw new Error('User not found by id');
            return response.dataValues;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
    
    async insertUser(user)
    {
            const operationResponse = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                level: user.level,
                company: user.company,
            })

            const createdUser = {
                name: operationResponse.name,
                email: operationResponse.email,
                level: operationResponse.level,
                company: operationResponse.company
              }
          
            return createdUser;
    }

    async getAll() {
        try {
            const response = await User.findAll({
                where: {
                    enable: 1
                },
                attributes: ['id', 'name', 'email', 'level', 'company', 'enable']
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, user)
    {
        console.log(user.password);
        const affectedRows = await User.update(
            {
                name: user.name,
                email: user.email,
                password: user.password,
                level: user.level,
                company: user.company,
            },
            {
                where: {id},
            }
        );
        
        return affectedRows;

    }

    async falseDelete(id)
    {
        const affectedRows = await User.update(
            {
                enable: false,
            },
            {
                where: {id},
            }
        );

        return affectedRows;
    }

    async getByEmail(email) {
        try {
            const response = await User.findOne({
                where: {
                    email: email,
                    enable: 1
                },
                attributes: ['id', 'name', 'level', 'password', 'company']
            });
            return response;
        } catch (error) {
            console.log(error);
        }

    }
}

export default new UserDao();