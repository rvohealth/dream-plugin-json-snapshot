"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dream_1 = require("@rvohealth/dream");
const PostSerializer_1 = __importStar(require("../../../test-app/app/serializers/PostSerializer"));
const ApplicationModel_1 = __importDefault(require("./ApplicationModel"));
const Comment_1 = __importDefault(require("./Comment"));
const User_1 = __importDefault(require("./User"));
const snapshotable_1 = __importDefault(require("../../../src/snapshotable"));
const hide_from_snapshots_1 = __importDefault(require("../../../src/hide-from-snapshots"));
class Post extends (0, snapshotable_1.default)(ApplicationModel_1.default) {
    get table() {
        return 'posts';
    }
    get serializers() {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            default: (PostSerializer_1.default),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            summary: (PostSerializer_1.PostSummarySerializer),
        };
    }
}
exports.default = Post;
__decorate([
    (0, dream_1.BelongsTo)(() => User_1.default)
], Post.prototype, "user", void 0);
__decorate([
    (0, dream_1.HasMany)(() => Comment_1.default)
], Post.prototype, "comments", void 0);
__decorate([
    (0, hide_from_snapshots_1.default)(),
    (0, dream_1.HasMany)(() => Comment_1.default, { where: { body: null } })
], Post.prototype, "nullComments", void 0);
__decorate([
    (0, dream_1.HasOne)(() => Comment_1.default, { order: { id: 'desc' } })
], Post.prototype, "mostRecentComment", void 0);
__decorate([
    (0, hide_from_snapshots_1.default)(),
    (0, dream_1.HasOne)(() => Comment_1.default, { where: { body: null } })
], Post.prototype, "mostRecentNullComment", void 0);
