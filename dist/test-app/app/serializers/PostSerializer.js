"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSummarySerializer = void 0;
const dream_1 = require("@rvohealth/dream");
class PostSummarySerializer extends dream_1.DreamSerializer {
}
exports.PostSummarySerializer = PostSummarySerializer;
__decorate([
    (0, dream_1.Attribute)('string')
], PostSummarySerializer.prototype, "id", void 0);
class PostSerializer extends PostSummarySerializer {
}
exports.default = PostSerializer;
__decorate([
    (0, dream_1.RendersOne)()
], PostSerializer.prototype, "user", void 0);
__decorate([
    (0, dream_1.Attribute)('string')
], PostSerializer.prototype, "body", void 0);
__decorate([
    (0, dream_1.Attribute)('string')
], PostSerializer.prototype, "title", void 0);
__decorate([
    (0, dream_1.Attribute)('string')
], PostSerializer.prototype, "subtitle", void 0);
