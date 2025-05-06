import { HydratedDocument, Types } from 'mongoose';
export declare class Comment {
    _id?: Types.ObjectId;
    userId: number;
    productId: Types.ObjectId;
    point: number;
    content: string;
    createAt: Date;
}
export type CommentDocument = HydratedDocument<Comment>;
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, import("mongoose").Document<unknown, any, Comment> & Comment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Comment>> & import("mongoose").FlatRecord<Comment> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
export interface IComment {
    _id?: Types.ObjectId;
    userId: number;
    productId: Types.ObjectId;
    point: number;
    content: string;
    createAt: Date;
}
