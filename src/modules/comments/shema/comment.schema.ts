import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ collection: 'comments' })
export class Comment {
  @Prop()
  _id?: Types.ObjectId;

  @Prop()
  userId: number;

  @Prop()
  productId: Types.ObjectId;

  @Prop()
  point: number;

  @Prop()
  content: string;

  @Prop()
  createAt: Date;
}
export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);

export interface IComment {
  _id?: Types.ObjectId;
  userId: number;
  productId: Types.ObjectId;
  point: number;
  content: string;
  createAt: Date;
}
