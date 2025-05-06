import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommentsService } from '../comments.service';
import { ROLE } from 'src/constants/role';

@Injectable()
export class IsOwnerComment implements CanActivate {
  constructor(private commentService: CommentsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId, role } = request;

    if (role === ROLE.ADMIN) return true;

    const commentId = request.body.commentId;
    const canDelete = await this.commentService.canDelete(commentId, userId);
    return canDelete;
  }
}
