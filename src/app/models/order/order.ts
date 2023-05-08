export interface Order{
    id:string;
    customerId:string;
    menus:any[];
    restaurantId:string;
    firstName:string;
    lastName:string
    orderDescription:string;
    orderStatus:string;
    estimatedTime:string;
    restaurantName:string;
    address:string;
    orderDate:string;
}