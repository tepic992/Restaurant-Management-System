import { Customers } from "./customers";
import { Employees } from "./employees";

export class Orders {

    orderId!: number;
    orderDate!: Date;
    orderType!: string;
    customer!: Customers;
    employee!: Employees;
}
