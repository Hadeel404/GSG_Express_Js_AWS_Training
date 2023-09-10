import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, length: 45 })
  firstName: string;

  @Column({ nullable: false, length:45 })
  lastName: string;

  @Column({ nullable: false, type: 'timestamp' })
  dateOfBirth: Date;

  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
} 

// @ManyToOne(
  //   () => CompanyProfile,
  //   companyProfile => companyProfile.jobs,
  //   {
  //     cascade: true,
  //     onDelete: 'SET NULL',
  //     onUpdate: 'CASCADE'
  //   }
  // )
  // company: string;
  
  // @OneToMany(() => Application, app => app.job)
  // applications: Application[]