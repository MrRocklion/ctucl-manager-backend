import { Entity,Generated, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class ChargingPoint {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column('float')
  lat: number;

  @Column('float')
  lon: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  ruc: string;

  @Column()
  ci: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  device_id: string;

  @Column({ nullable: true })
  user: string;

  @Column()
  business_name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  imei: string;

  @Column()
  address: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({default:true})
  is_active: boolean;
}
