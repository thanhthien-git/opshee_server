"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./shema/comment.schema");
const comments_service_1 = require("./comments.service");
const comments_controller_1 = require("./comments.controller");
const is_buyed_guard_1 = require("./guards/is-buyed.guard");
const is_owner_comment_guard_1 = require("./guards/is-owner-comment.guard");
const orders_module_1 = require("../orders/orders.module");
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: comment_schema_1.Comment.name, schema: comment_schema_1.CommentSchema }]),
            orders_module_1.OrdersModule
        ],
        providers: [comments_service_1.CommentsService, is_buyed_guard_1.IsPuschargedGuard, is_owner_comment_guard_1.IsOwnerComment],
        controllers: [comments_controller_1.CommentsController],
        exports: [comments_service_1.CommentsService],
    })
], CommentsModule);
