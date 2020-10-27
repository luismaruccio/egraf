import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                level: Sequelize.INTEGER,
                company: Sequelize.INTEGER,
                enable: Sequelize.INTEGER,
            },
            {
                sequelize
            }
        );

        this.beforeBulkUpdate(async function(user, options) {
            console.log(user.attributes);
            if (user.attributes.password) {
                user.attributes.password = await bcrypt.hash(user.attributes.password, 8);                
                }
            }
        );

        this.beforeSave(async function(user, options) {
            console.log(user);
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 8);                
                }
            }
        );          

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }

    
}

export default User;