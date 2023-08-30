import { DataSource } from 'typeorm';
import { User } from './entities/User.entity.js';

// import { Todo } from './entity/Todo.js';
// import { User } from './entity/User.js';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'gsg_reg',
  entities: [User],
  synchronize: true,
  logging: true
});

//dataSource.initialize = () => {
dataSource.initialize().then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
})
//}

export default  dataSource ;