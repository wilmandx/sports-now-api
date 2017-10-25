import { attributeModel, IAttributeModel } from "./../models/attribute";
import { IAttribute } from "./../interfaces/attribute";

class AttributeService {

    public async getAttributes(): Promise<IAttributeModel[]> {
        return attributeModel.find({}).exec();
    }

    public async saveAttribute(attribute: IAttribute): Promise<IAttributeModel> {
        let model = new attributeModel(attribute);
        return model.save();
    }

}

export let attributeService = new AttributeService();