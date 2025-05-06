import { CanActivate, ExecutionContext } from '@nestjs/common';
import { CommentsService } from '../comments.service';
export declare class IsOwnerComment implements CanActivate {
    private commentService;
    constructor(commentService: CommentsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
