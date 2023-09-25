import express from 'express';
import { NSUser } from "../@types/user.js";
import { User } from "../db/entities/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { In } from "typeorm";

import dataSource from "../db/dataSource.js";
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { Profile } from "../db/entities/Profile.js";

const insertUser = async (payload: NSUser.Item) => {
  try{
    const role = await Role.findOneBy({ name: payload.type });
    const newUser = User.create({
      ...payload,
      //role: role as Role
    });
    const profile = Profile.create({
      firstName: payload.firstName || '',
      lastName : payload.lastName || '',
      dateOfBirth: payload.dateOfBirth || new Date('') 
    })
    return dataSource.manager.transaction(async transaction => {
      await transaction.save(newUser);
      await transaction.save(profile);
    }).then(() => {
      return newUser;
    }).catch(error => {
      console.log(error);
      throw ("Something went wrong creating a user");
      });
    
  }catch(error){
    console.log(error);
    throw ("Something went wrong creating a user");
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
    console.log(error);
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

// const assignRole = async (req: express.Request, res: express.Response)=>{
//   try{
//     let userId = req.params.id;
//     if(userId){
//       console.log(userId);
//     }else{
//       console.log("no id")
//     }
//     return userId;

//   }catch(error){
//     console.log(error);
//     throw("something went wrong assigning role to user")
//   }
// }

const assignRole = async (req: express.Request, res: express.Response)=>{
    try {
      let userId= req.params.id;
      //console.log(userId);
      const user = await User.findOne({
          where: {
            id: parseInt(userId) //parseInt( req.params +'')
          },
      })
      const role = await Role.findOne({
        where: {
          name: req.body.roleName
        },
      })
      //role.id = req.body?.role
      if (user) {
        if(role){
          // ({
          //   ...user,
          //   roles : [role]
          //   //role: role as Role
          // });
          user.roles = [role]
          await user.save()
        }else{
          console.log("no role found")
        }}else{
          console.log("user not found")
        }
      return user;

    } catch (error) {
      console.log(error);
      throw ("Something went wrong");
    }

  }

  const getUser = async (req: express.Request, res:express.Response)=>{
    try{
      let userId= req.params.id;
      const user = await User.findOne({
        where:{
          id: parseInt(userId)
        }
      })
      return user;
    }catch(error){
      console.log(error);
      throw("sth went wrong! try again")
    }
  }

const getRoles = () => {
  return Role.find();
}

export {
  insertUser,
  insertRole,
  insertPermission,
  assignRole,
  getUser,
  getRoles
}