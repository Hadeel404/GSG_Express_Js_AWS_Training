import { NSUser } from "../@types/user.js";
import { User } from "../db/entities/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { In } from "typeorm";

import dataSource from "../db/dataSource.js";
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { Profile } from "../db/entities/Profile.js";

const insertUser = (payload: NSUser.Item) => {
  return dataSource.manager.transaction(async transaction => {
    const role = await Role.findOneBy({ name: payload.type });
    const newUser = User.create({
      ...payload,
      //role: role as Role
    });

    await transaction.save(newUser);
    
    const profile = Profile.create({
      firstName: payload.firstName || '',
      lastName : payload.lastName || '',
      dateOfBirth: payload.dateOfBirth || new Date('') 
    })
    //profile.user = newUser;
    // profile.firstName = payload.firstName || '';
    // profile.lastName = payload.lastName || '';
    // profile.dateOfBirth = payload.dateOfBirth || new Date('') ;
    await transaction.save(profile);
  });
}

const login = async (email: string, password: string) => {
  try {
    const user = await User.findOneBy({
      email
    });

    const passwordMatching = await bcrypt.compare(password, user?.password || '');

    if (user && passwordMatching) {
      const token = jwt.sign(
        {
          email: user.email,
          fullName: user.userName
        },
        process.env.SECRET_KEY || '',
        {
          expiresIn: "30m"
        }
      );

      return token;
    } else {
      throw ("Invalid Username or password!");
    }
  } catch (error) {
    throw ("Invalid Username or password!");
  }
}

const insertRole = async (payload: NSUser.Role) => {
  try {
    const role = new Role();
    role.name = payload.name;
    role.permissions = await Permission.findBy({
      id: In(payload.permissions)
    });
    await role.save();
    return role;
  } catch (error) {
    throw ("Something went wrong");
  }
}

const insertPermission = async (payload: NSUser.Permission) => {
  try {
    const permission = Permission.create({
      name: payload.name
    });
    await permission.save();
    return permission;
  } catch (error) {
    console.log(error);
    throw ("Something went wrong");
  }
}

const getRoles = () => {
  return Role.find();
}

export {
  insertUser,
  login,
  insertRole,
  insertPermission,
  getRoles
}