import { Expose } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IsBuildingExist, IsBuildingNameUnique } from "./validators/buildingsValidators";
import { IsOrganizationExist } from "./validators/organizationsValidators";
import { IsNotChangable } from "./validators/generalValidators";
import { IBuilding } from "@/interfaces/Hierarchy/IBuilding.interface";


export class BuildingDTO implements IBuilding{
  @Expose()
  @IsOptional()
  id!: string;

  @Expose()
  @IsNotEmpty({message: "organization Id must be specified" })
  @IsString({message: "organization must have string type id" })
  @IsUUID(undefined, { message: 'malformed UUID' })
  @IsOrganizationExist({ message: 'Organization with Id provided is not registered' })
  @IsNotChangable({dto: 'buildingDTO', key: 'organizationId'}, { message: 'Organization Id can not be changed' })
  organizationId!: string;

  @Expose()
  @IsNotEmpty({ message: "Building name must be specified"})
  @IsString({ message: "Building name must be of string type"})
  @IsBuildingNameUnique({ message: 'Building name must be unique within the organization.' })
  name!: string;

  @IsNotEmpty({ message: "Building address must be specified"})
  @IsString({ message: "Building address must be of string type"})
  @Expose()
  address!: string;

  @IsBoolean({ message: 'Activation status should be boolean' })
  @IsOptional()
  isActive!: boolean;
}

export class buildingFindOptionsDTO {
  @Expose()
  @IsOptional()
  @IsOrganizationExist({ message: 'Organization with Id provided in search params is not registered' })
  organizationId?: string

  @Expose()
  @IsOptional()
  @IsString({ each: true, message: "buildings must have string type id" })
  @IsArray({ message: "buildings field must contain an array of building UUIDs" })
  @IsBuildingExist({ each: true, message: "Some of the specified buildings in search params are not registered" })
  buildings?: string[]
}

