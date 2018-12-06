"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cerialize_1 = require("cerialize");
exports.Extends = cerialize_1.inheritSerialization;
const utils_1 = require("../utils");
class TypedSerializerCreator {
    ToJSON(obj, options) {
        if (options === undefined)
            options = { format: false };
        return JSON.stringify(cerialize_1.Serialize(obj, options.type), null, options.format ? "  " : 0);
    }
    FromJSON(json, type) {
        return !type ?
            cerialize_1.Deserialize(JSON.parse(json)) :
            cerialize_1.GenericDeserialize(JSON.parse(json), type);
    }
    ToObject(obj, options) {
        if (options === undefined)
            options = { format: false };
        return cerialize_1.Serialize(obj, options.type);
    }
    FromObject(json, type) {
        return !type ?
            cerialize_1.Deserialize(json) :
            cerialize_1.GenericDeserialize(json, type);
    }
}
exports.TypedSerializerCreator = TypedSerializerCreator;
/** Bonbons built-in static type contract serialization tool (based on cerialize) */
exports.TypedSerializer = new TypedSerializerCreator();
function SerializeDefine(...args) {
    return function serialize_define(target, propKey, descriptor) {
        const type = utils_1.getPropertyType(target, propKey);
        const [r1, r2] = args;
        if (!r1) {
            cerialize_1.serializeAs(propKey)(target, propKey, descriptor);
        }
        else if (typeof r1 !== "string") {
            cerialize_1.serializeAs(r1, propKey)(target, propKey, descriptor);
        }
        else if (!r2) {
            cerialize_1.serializeAs(r1)(target, propKey, descriptor);
        }
        else {
            cerialize_1.serializeAs(r2 || type, r1)(target, propKey, descriptor);
        }
    };
}
exports.Serialize = SerializeDefine;
function DeserializeDefine(...args) {
    return function deserialize_define(target, propKey, descriptor) {
        const type = utils_1.getPropertyType(target, propKey);
        const [r1, r2] = args;
        if (!r1) {
            cerialize_1.deserializeAs(type || String, propKey)(target, propKey, descriptor);
        }
        else if (typeof r1 !== "string") {
            cerialize_1.deserializeAs(r1, propKey)(target, propKey, descriptor);
        }
        else if (!r2) {
            cerialize_1.deserializeAs(type || String, r1)(target, propKey, descriptor);
        }
        else {
            cerialize_1.deserializeAs(r2 || type || String, r1)(target, propKey, descriptor);
        }
    };
}
exports.Deserialize = DeserializeDefine;
//# sourceMappingURL=typed-serializer.js.map