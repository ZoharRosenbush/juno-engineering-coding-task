////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";
import {getOrderDate} from "./util.service.js"

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = () => {
    const ids = allIds;

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
  
    return ordersByUsers;
};

export const getLast2WeeksOrders = async () => {

    const limitDate = Date.now() - 1209600000
    const allOrders = await fetchAllOrders()
    const lastTwoWeeksOrders = allOrders.filter((order) => order.timestamp >= limitDate)
    return lastTwoWeeksOrders
  
};

export const bucketOrdersByDate = async () => {
 
    let ordersByDate = {};
    const recentOrders = await getLast2WeeksOrders()
    recentOrders.forEach((order) => {
        const orderDate = getOrderDate(order.timestamp)
        ordersByDate[orderDate] = !ordersByDate[orderDate] ?
            [order] : [order, ...ordersByDate[orderDate]]
    })
    return ordersByDate;
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
