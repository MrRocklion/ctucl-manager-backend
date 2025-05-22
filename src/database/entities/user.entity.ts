import { Entity,Generated, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { MqttCommandHistory } from './mqtt-command-history.entity';

export enum AccountType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  USER = 'USER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  register: string;

  @Column({ nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  account_type: AccountType;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @ManyToOne(() => Company, (company) => company.users, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  birthday: Date;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => MqttCommandHistory, (command) => command.user)
  mqttCommands: MqttCommandHistory[];
}
