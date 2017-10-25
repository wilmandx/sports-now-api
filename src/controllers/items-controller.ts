import { Router, Request, Response, NextFunction } from 'express';
import { Config } from '../app-configs';
import { attributeService } from '../services/attribute-service';
import { IAttribute } from '../interfaces/attribute';

export class ItemsController {
    public async getItems(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({items: []});
    }

    public async getItem(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({});
    }

    public async insertItem(req: Request, res: Response, next: NextFunction) {
        res.status(201).send({});
    }

    public async updateItem(req: Request, res: Response, next: NextFunction) {
        res.status(200).send({});
    }
}

function getRouter(router: Router): Router {
    let controller = new ItemsController();

    router.get("/", controller.getItems);
    router.post("/", controller.insertItem);
    router.get("/:id", controller.getItem);
    router.put("/:id", controller.updateItem);

    return router;
}

export let itemsRouter = getRouter(Router());