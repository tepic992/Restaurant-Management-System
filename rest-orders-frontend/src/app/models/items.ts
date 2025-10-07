import { Foods } from "./foods";
import { Orders } from "./orders";

export class Items {

    itemId!: number;
    quantity!: number;
    food!: Foods;
    order!: Orders;
}
