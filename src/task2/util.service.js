export const getOrderDate = (timestamp) => {
    const orderDate = new Date(timestamp)
    return orderDate.toLocaleDateString('en-GB')
}