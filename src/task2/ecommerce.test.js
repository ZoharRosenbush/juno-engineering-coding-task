
import { allIds } from "../api"
import { fetchAllOrders } from "../task2/ecommerce.js"
import { bucketOrdersByUsers } from "../task2/ecommerce.js"
import { getLast2WeeksOrders } from "../task2/ecommerce.js"
import { bucketOrdersByDate } from "../task2/ecommerce.js"
import { getOrderDate } from "./util.service.js"


test("Ecommerece - fetched all orders", async () => {
    let fetchedOrders = await fetchAllOrders();
    expect(fetchedOrders.length).toBe(allIds.length);
});

test("Ecommerece - bucketed orders by user", async () => {
    const orderMap = await bucketOrdersByUsers()
    let isOrdered;
    for (const key in orderMap) {
        isOrdered = orderMap[key].every((order) => {
            return order.userId === key
        })
    }
    expect(isOrdered).toBeTruthy();
});

test("Ecommerece - filtered orders by limit date", async () => {
    const limitDate = Date.now() - 1209600000
    let isFiltered;

    const filteredOrders = await getLast2WeeksOrders()
    isFiltered = filteredOrders.every((order) => {
        return order.timestamp >= limitDate
    })

    expect(isFiltered).toBeTruthy();
});


test("Ecommerece - bucketed orders by date", async () => {
    const orderMap = await bucketOrdersByDate()
    let isOrdered;
    for (const key in orderMap) {
        isOrdered = orderMap[key].every((order) => {
            const orderDate = getOrderDate(order.timestamp)
            return orderDate === key
        })
    }
    expect(isOrdered).toBeTruthy();
});

