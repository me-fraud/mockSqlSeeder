import { BuildingRepository } from "@/repositories/building.repository";
import { OrganizationRepository } from "@/repositories/organization.repository";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

export type repoTypes = OrganizationRepository | BuildingRepository ;
interface IsNotChangableProperty{
    dto: string,
    key: string
}
export function IsNotChangable(property: IsNotChangableProperty, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: NotChangableConstraint,
        });
    };
}

export function ArraySize(length: Number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [length],
            validator: ArraySizeConstraint,
        });
    };
}

@ValidatorConstraint({ async: true })
export class NotChangableConstraint implements ValidatorConstraintInterface {
    async validate(entityId: string, args: ValidationArguments) {
        const id = (args.object as { id: string }).id;
        const [property] = args.constraints
        let key = property.key
        let repo: repoTypes;
        switch (property.dto) {
            case 'buildingDTO':
                repo = new BuildingRepository();
                break
            default: 
                return true
        }
        if (!id) {
            return true
        }
        const entity = await repo.findOne({
            where: {
                id
            }
        })
        if (!entity) {
            return true
        }
        return checkId(entity, key, entityId)
    }
}


@ValidatorConstraint({ async: true })
export class ArraySizeConstraint implements ValidatorConstraintInterface {
    async validate(arr: any, args: ValidationArguments) {
        if (Array.isArray(arr)) {
            const [length] = args.constraints
            return arr.length === length ? true : false
        }
        return false
    };
}

export const checkId = <T extends object>(entity: T, key: string, newValue: string) => {
    const value = entity[key as keyof typeof entity]
    if (value === newValue) {
        return true
    }
    return false
}
