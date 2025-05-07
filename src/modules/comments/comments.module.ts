import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './shema/comment.schema';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { IsPuschargedGuard } from './guards/is-buyed.guard';
import { IsOwnerComment } from './guards/is-owner-comment.guard';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    OrdersModule
  ],
  providers: [CommentsService, IsPuschargedGuard, IsOwnerComment],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
