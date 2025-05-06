"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CommentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CommentsService = CommentsService_1 = class CommentsService {
    constructor(commentModel) {
        this.commentModel = commentModel;
        this.logger = new common_1.Logger(CommentsService_1.name);
    }
    async post(dto, userId) {
        try {
            const { content, point, productId } = dto;
            const comment = {
                userId: userId,
                content: content,
                point: point,
                productId: productId,
                createAt: new Date(),
            };
            return await this.commentModel.insertOne(comment);
        }
        catch (err) {
            this.logger.error(`Error while posting comment : ${err}`);
            throw new common_1.BadRequestException(err);
        }
    }
    async getUserComment(productId, userId) {
        return await this.commentModel.findOne({
            productId: new mongoose_2.Types.ObjectId(productId),
            userId: userId,
        });
    }
    async getCommentByProduct(productId, page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const [comments, total] = await Promise.all([
                this.commentModel
                    .find({ productId: new mongoose_2.Types.ObjectId(productId) })
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 }),
                this.commentModel.countDocuments({
                    productId: new mongoose_2.Types.ObjectId(productId),
                }),
            ]);
            return {
                data: comments,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            };
        }
        catch (err) {
            this.logger.error(`Error while fetching product comments : ${productId}`);
            throw new common_1.BadRequestException(err);
        }
    }
    async canDelete(commentId, userId) {
        const comment = await this.commentModel.findOne({
            _id: commentId,
            userId: userId,
        });
        return !!comment;
    }
    async delete(commentId) {
        try {
            return await this.commentModel.deleteOne({
                _id: new mongoose_2.Types.ObjectId(commentId),
            });
        }
        catch (err) {
            this.logger.error(`Error while deleting commentId: ${commentId}`);
            throw new common_1.BadRequestException(err);
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = CommentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentsService);
