import { BuildingDTO, buildingFindOptionsDTO } from "@/DTO/building.DTO";
import { BuildingService } from "@/services/building.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";

export class BuildingController {
    private service: BuildingService = new BuildingService();
    constructor() { }

    createBuildingEntry: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            req.body.id = undefined
            const newBuild = plainToInstance(BuildingDTO, req.body);
            const DTOerr = await validate(newBuild);
            if (DTOerr.length > 0) throw DTOerr;
            const result = await this.service.createBuildingEntry(newBuild);
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

    getBuildingById: RequestHandler = async (req, res, next): Promise<void> => {
        const { id } = req.params;
        try {
            const building = await this.service.getBuildingById(id);
            if (building) {
                res.status(200).send({
                    success: true,
                    payload: building,
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Building not found',
                });
            }
        } catch (err) {
            next(err);
        }
    };

    getAllBuildings: RequestHandler = async (req, res, next) => {
        try {
            const searchParams = plainToInstance(buildingFindOptionsDTO, req.query)
            const DTOerr = await validate(searchParams)
            if (DTOerr && DTOerr.length > 0) throw DTOerr
            const buildings = await this.service.getAllBuildingsQuery(searchParams);
            res.status(200).json({
                success: true,
                payload: buildings,
            });
        } catch (err) {
            next(err);
        }
    }
}