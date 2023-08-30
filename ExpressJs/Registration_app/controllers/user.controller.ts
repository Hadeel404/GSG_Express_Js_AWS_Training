import { NSUser } from "../@types/user.types.js";
import { User } from "../db/entities/User.entity.js";
import dataSource from "../db/dataSource.js";

const insertUser = (payload: NSUser.Item) => {
  return dataSource.manager.transaction(async transaction => {
    const newU = new User();
    newU.fullName = payload.fullName || '';
    newU.userName = payload.userName || '';
    newU.password = payload.password || '';
    await transaction.save(newU);
  });
}

export { insertUser }