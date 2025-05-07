import { DeleteResult, Model, Types } from 'mongoose';
import { CommentDocument, IComment, Comment } from './shema/comment.schema';
import { PostCommentDto } from './dtos/create-comment.dto';
export declare class CommentsService {
    private commentModel;
    private readonly logger;
    constructor(commentModel: Model<CommentDocument>);
    post(dto: PostCommentDto, userId: number): Promise<IComment>;
    getUserComment(productId: string, userId: any): Promise<IComment>;
    getCommentByProduct(productId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Comment> & Comment & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }> & import("mongoose").Document<unknown, {}, Comment> & Comment & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        currentPage: number;
        totalPages: number;
        totalItems: number;
    }>;
    canDelete(commentId: string, userId: string): Promise<boolean>;
    delete(commentId: string): Promise<DeleteResult>;
}
