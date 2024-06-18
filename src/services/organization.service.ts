import { OrganizationRepository } from '@/repositories/organization.repository';
import { OrganizationDTO, organizationFindOptionsDTO } from '@/DTO/organization.DTO';
import { IOrganization } from '@/interfaces/Hierarchy/IOrganization.interface';
import { validate } from 'class-validator';
import { ErrorWithStatus } from '@/interfaces/customErrors';
export class OrganizationService {
    private organizationRepo: OrganizationRepository = new OrganizationRepository;

    constructor() { }

    async createOrganizationEntry(data: OrganizationDTO): Promise<IOrganization | string> {
        const validationResult = await validate(data);
        if (validationResult.length > 0) {
            return validationResult[0].constraints?.[Object.keys(validationResult[0].constraints)[0]] || 'Validation failed.';
        }
        const newRecord = this.organizationRepo.create(data);
        return await this.organizationRepo.save(newRecord);
    }

    getOrganizationById = async (id: string) => {
        return await this.organizationRepo.getOrganizationById(id);
    };

    getAllOrganizations = async () => {
        return await this.organizationRepo.getAllOrganizations()
    }

    getAllOrganizationsQuery = async (options: organizationFindOptionsDTO) => {
        return await this.organizationRepo.getAllOrganizationsQuery(options)
    }

    async updateOrganization(data: OrganizationDTO): Promise<boolean> {
        try {
            return !!(await this.organizationRepo.update(data.id, data))
        }
        catch (e) {
            throw new ErrorWithStatus('unknown server error', 500)
        }
    }
}