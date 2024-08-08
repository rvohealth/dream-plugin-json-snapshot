"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSummarySerializer = void 0;
const dream_1 = require("@rvohealth/dream");
class UserSummarySerializer extends dream_1.DreamSerializer {
}
exports.UserSummarySerializer = UserSummarySerializer;
__decorate([
    (0, dream_1.Attribute)('string')
], UserSummarySerializer.prototype, "id", void 0);
class UserSerializer extends UserSummarySerializer {
}
exports.default = UserSerializer;
__decorate([
    (0, dream_1.Attribute)('string')
], UserSerializer.prototype, "email", void 0);
__decorate([
    (0, dream_1.Attribute)('string')
], UserSerializer.prototype, "name", void 0);
__decorate([
    (0, dream_1.Attribute)('number')
], UserSerializer.prototype, "loginCount", void 0);
