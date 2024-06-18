import { OrganizationDTO, organizationFindOptionsDTO } from "@/DTO/organization.DTO";
import { OrganizationService } from "@/services/organization.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";

export class OrganizationController {
    private service: OrganizationService = new OrganizationService();
    constructor() { }

    createOrganizationEntry: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            req.body.id = undefined
            const newOrganization = plainToInstance(OrganizationDTO, req.body)
            const DTOerr = await validate(newOrganization)
            if (DTOerr.length > 0) throw DTOerr;
            const result = await this.service.createOrganizationEntry(newOrganization)
            if (result) {
                res.status(201).send({
                    success: true,
                });
            } else {
                res.status(500).send({
                    success: false,
                    message: "unknown internal server error",
                });
            }
        } catch (err) {
            next(err);
        }
    };

    getOrganizationById: RequestHandler = async (req, res, next): Promise<void> => {
        const { id } = req.params;
        
        try {
            const organization = await this.service.getOrganizationById(id);
            if (organization) {
                res.status(200).send({
                    success: true,
                    payload: organization,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Organization not found',
                });
            }
        } catch (err) {
            next(err);
        }
    };

    getAllOrganizations: RequestHandler = async (req, res, next) => {
        try {
            const searchParams = plainToInstance(organizationFindOptionsDTO, req.query)
            const DTOerr = await validate(searchParams)
            if (DTOerr && DTOerr.length > 0) throw DTOerr
            const organizations = await this.service.getAllOrganizationsQuery(searchParams)
            res.status(200).send({
                success: true,
                payload: organizations
            });
        } catch (err) {
            next(err);
        }
    }
}