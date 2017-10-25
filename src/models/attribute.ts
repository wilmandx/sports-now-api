import {IAttribute} from './../interfaces/attribute';

import * as mongoose from 'mongoose';

export interface IAttributeModel extends IAttribute, mongoose.Document { }

const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    type: {
        type: String,
        required: true
    }
});

export const attributeModel = mongoose.model<IAttributeModel>("Attribute", schema);
