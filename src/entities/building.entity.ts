import { IBuilding } from '@/interfaces/Hierarchy/IBuilding.interface';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EOrganization } from './organization.entity';
import { booleanToBitTransformer } from '@/utils/booleanToBIT';



@Entity()
export class EBuilding implements IBuilding {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column({
    type: 'bit',
    default: 1,
    transformer: booleanToBitTransformer
  })
  isActive!: boolean;

  @ManyToOne(() => EOrganization)
  @JoinColumn({ name: 'organizationId' })
  organization!: EOrganization;

  @Column()
  organizationId!: string;
}
