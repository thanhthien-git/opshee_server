import { AddToCartDto } from './dtos/add-to-cart.dto';
import { CartService } from './cart.service';
import { UpdateCartItemDto } from './dtos/update-cart.dto';
import { RemoveCartItemDto } from './dtos/remove-cart-item.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<import("./entities/cart.entity").CartEntity>;
    addToCart(dto: AddToCartDto, req: any): Promise<import("@nestjs/common").HttpStatus>;
    updateCartItem(dto: UpdateCartItemDto): Promise<import("typeorm").UpdateResult>;
    removeCartItem(dto: RemoveCartItemDto): Promise<import("@nestjs/common").HttpStatus>;
}
