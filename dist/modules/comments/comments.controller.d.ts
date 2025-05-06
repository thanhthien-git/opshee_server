import { CommentsService } from './comments.service';
import { PostCommentDto } from './dtos/create-comment.dto';
import { DeleteResult } from 'mongoose';
export declare class CommentsController {
    private commentService;
    constructor(commentService: CommentsService);
    create(dto: PostCommentDto, req: any): Promise<import("./shema/comment.schema").IComment>;
    remove(id: string): Promise<DeleteResult>;
}
