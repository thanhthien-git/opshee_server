import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IsPuschargedGuard } from './guards/is-buyed.guard';
import { CommentsService } from './comments.service';
import { PostCommentDto } from './dtos/create-comment.dto';
import { IsOwnerComment } from './guards/is-owner-comment.guard';
import { DeleteResult } from 'mongoose';

@UseGuards(IsPuschargedGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post('create')
  async create(@Body() dto: PostCommentDto, @Req() req) {
    return await this.commentService.post(dto, req.userId);
  }

  @UseGuards(IsOwnerComment)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.commentService.delete(id);
  }
}
