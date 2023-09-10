import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";
import { Profile } from "./Profile.js";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, nullable: false })
  userName: string;

  @Column({ nullable: false })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ['user','admin', 'editor'],
    default: 'user'
  })
  type: 'user' | 'admin'| 'editor';

  // @ManyToOne(() => Role, role => role.users, { cascade: true, eager: true, nullable: true })
  // @JoinColumn()
  // role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}