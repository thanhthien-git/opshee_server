import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';
import { CommentDocument, IComment, Comment } from './shema/comment.schema';
import { PostCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async post(dto: PostCommentDto, userId: number): Promise<IComment> {
    try {
      const { content, point, productId } = dto;
      const comment: IComment = {
        userId: userId,
        content: content,
        point: point,
        productId: productId,
        createAt: new Date(),
      };
      return await this.commentModel.insertOne(comment);
    } catch (err) {
      this.logger.error(`Error while posting comment : ${err}`);
      throw new BadRequestException(err);
    }
  }

  async getUserComment(productId: string, userId): Promise<IComment> {
    return await this.commentModel.findOne({
      productId: new Types.ObjectId(productId),
      userId: userId,
    });
  }

  async getCommentByProduct(productId: string, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const [comments, total] = await Promise.all([
        this.commentModel
          .find({ productId: new Types.ObjectId(productId) })
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        this.commentModel.countDocuments({
          productId: new Types.ObjectId(productId),
        }),
      ]);
      return {
        data: comments,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      };
    } catch (err) {
      this.logger.error(`Error while fetching product comments : ${productId}`);
      throw new BadRequestException(err);
    }
  }

  async canDelete(commentId: string, userId: string): Promise<boolean> {
    const comment = await this.commentModel.findOne({
      _id: commentId,
      userId: userId,
    });
    return !!comment;
  }

  async delete(commentId: string): Promise<DeleteResult> {
    try {
      return await this.commentModel.deleteOne({
        _id: new Types.ObjectId(commentId),
      });
    } catch (err) {
      this.logger.error(`Error while deleting commentId: ${commentId}`);
      throw new BadRequestException(err);
    }
  }
}
