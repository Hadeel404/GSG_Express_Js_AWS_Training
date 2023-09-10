import { Role } from "../db/entities/Role.js";

export namespace NSUser {
 
  export enum Type {
    admin = 'admin',
    user = 'user',
    editor = 'editor',
  }

  export interface Item {
    id: number;
    userName: string;
    email: string;
    password: string;
    type: Type;
    createdAt: Date;
    firstName? : string;
    lastName?: string;
    dateOfBirth?: Date;
  }

  export interface Role {
    id: number;
    name: string;
    permissions: number[];
  }
  
  export interface Permission {
    id: number;
    name: string;
  }
}