////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";
import {getOrderDate} from "./util.service.js"

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.

    let prefetchOrders = ids.map((id) => {
        return fetchOrderById(id)
    });

    return Promise.all(prefetchOrders);

};

export const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    const allOrders = await fetchAllOrders()
    allOrders.forEach((order) => {
        ordersByUsers[order.userId] = !ordersByUsers[order.userId] ?
            [order] : [order, ...ordersByUsers[order.userId]]
    })
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    return ordersByUsers;
};

export const getLast2WeeksOrders = async () => {
    const limitDate = Date.now() - 1209600000
    const allOrders = await fetchAllOrders()
    const lastTwoWeeksOrders = allOrders.filter((order) => order.timestamp >= limitDate)
    return lastTwoWeeksOrders
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
};

export const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    const recentOrders = await getLast2WeeksOrders()
    recentOrders.forEach((order) => {
        const orderDate = getOrderDate(order.timestamp)
        ordersByDate[orderDate] = !ordersByDate[orderDate] ?
            [order] : [order, ...ordersByDate[orderDate]]
    })
    console.log('by date', ordersByDate);
    return ordersByDate;



    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
};



fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// .then(console.log);

getLast2WeeksOrders();
// .then(console.log);

bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
