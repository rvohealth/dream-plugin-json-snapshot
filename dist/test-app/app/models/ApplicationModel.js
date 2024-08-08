"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dream_1 = require("@rvohealth/dream");
const dreamconf_1 = __importDefault(require("../conf/dreamconf"));
class ApplicationModel extends dream_1.Dream {
    get dreamconf() {
        return dreamconf_1.default;
    }
}
exports.default = ApplicationModel;
