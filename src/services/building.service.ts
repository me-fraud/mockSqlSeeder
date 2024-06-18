import { BuildingRepository } from '@/repositories/building.repository';
import { BuildingDTO, buildingFindOptionsDTO } from "@/DTO/building.DTO";
import { IBuilding } from '@/interfaces/Hierarchy/IBuilding.interface';
import { validate } from 'class-validator';
import { ErrorWithStatus } from '@/interfaces/customErrors';

export class BuildingService {
    private buildingRepo: BuildingRepository = new BuildingRepository()
    constructor() { }

    async createBuildingEntry(data: BuildingDTO): Promise<IBuilding | string> {
        const validationResult = await validate(data);
        if (validationResult.length > 0) {
            return validationResult[0].constraints?.[Object.keys(validationResult[0].constraints)[0]] || 'Validation failed.';
        }
        const newRecord = this.buildingRepo.create(data);
        return await this.buildingRepo.save(newRecord);
    }

    getBuildingById = async (id: string) => {
        return await this.buildingRepo.getBuildingById(id);
    };

    getAllBuildings = async () => {
        return await this.buildingRepo.getAllBuildings()
    }

    async updateBuilding(data: BuildingDTO): Promise<boolean> {
        try {
            return !!(await this.buildingRepo.update(data.id, data))
        }
        catch (e) {
            throw new ErrorWithStatus('unknown server error', 500)
        }
    }

    getAllBuildingsQuery = async (options: buildingFindOptionsDTO) => {
        return await this.buildingRepo.getAllBuildingsQuery(options)
    }
}

