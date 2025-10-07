import { Customers } from "./customers";
import { Tables } from "./tables";

export class Booking {

    bookingId!: number;
    bhour!: number;
    bdate!: Date;
    customer!: Customers;
    table!: Tables;
}
