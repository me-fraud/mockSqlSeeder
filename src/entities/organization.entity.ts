import { IOrganization } from '@/interfaces/Hierarchy/IOrganization.interface';
import { booleanToBitTransformer } from '@/utils/booleanToBIT';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EOrganization implements IOrganization {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  legalAddress!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({
    type: 'bit',
    default: 1,
    transformer: booleanToBitTransformer
  })
  isActive!: boolean;
}