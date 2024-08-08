"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSummarySerializer = void 0;
const dream_1 = require("@rvohealth/dream");
class CommentSummarySerializer extends dream_1.DreamSerializer {
}
exports.CommentSummarySerializer = CommentSummarySerializer;
__decorate([
    (0, dream_1.Attribute)('string')
], CommentSummarySerializer.prototype, "id", void 0);
class CommentSerializer extends CommentSummarySerializer {
}
exports.default = CommentSerializer;
__decorate([
    (0, dream_1.RendersOne)()
], CommentSerializer.prototype, "post", void 0);
__decorate([
    (0, dream_1.Attribute)('string')
], CommentSerializer.prototype, "body", void 0);
__decorate([
    (0, dream_1.Attribute)('number')
], CommentSerializer.prototype, "numLikes", void 0);
