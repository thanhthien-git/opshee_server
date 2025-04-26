import { AddToCartDto } from './dtos/add-to-cart.dto';
export declare class CartController {
    getCart(req: any): Promise<string>;
    addToCart(dto: AddToCartDto, req: any): Promise<string>;
}
