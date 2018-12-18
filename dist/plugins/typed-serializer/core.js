"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cerialize_1 = require("cerialize");
/**
 * 内建静态类型序列化工具类
 * @description
 * @author Big Mogician
 * @export
 * @class TypedSerializerCreator
 * @implements {IStaticTypedResolver}
 */
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
//# sourceMappingURL=core.js.map