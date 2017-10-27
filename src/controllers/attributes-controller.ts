import { Router, Request, Response, NextFunction } from 'express';
import { Config } from '../app-configs';
import { attributeService } from '../services/attribute-service';
import { IAttribute } from '../interfaces/attribute';

export class AttributesController {
    public async getAttrubutes(req: Request, res: Response, next: NextFunction) {
        const list = await attributeService.getAttributes();
        res.status(200).send(list);
    }

    public async getAttrubute(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({});
    }

    public async insertAttribute(req: Request, res: Response, next: NextFunction) {
        const message = req.body;
        let attribute: IAttribute = {
            name: message.name,
            type: message.type
        };
        const item = await attributeService.saveAttribute(attribute);
        res.status(201).send(item);
    }

    public async updateAttribute(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({});
    }
}

function getRouter(): Router {
    let router = Router();
    let controller = new AttributesController();

    router.get("/", controller.getAttrubutes);
    router.post("/", controller.insertAttribute);
    router.get("/:id", controller.getAttrubute);
    router.put("/:id", controller.updateAttribute);

    return router;
}

export let attributesRouter = getRouter();