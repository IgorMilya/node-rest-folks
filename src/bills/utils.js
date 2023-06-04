export const getBillsDATA = [
    {
        $lookup: {
            from: 'orders',
            localField: 'orderID',
            foreignField: '_id',
            as: 'ordersData',
        },
    },
    {
        $unwind: '$ordersData',
    },
    {
        $addFields: {
            id: '$_id',
            orderType: '$ordersData.orderType',
            orderNumber: '$ordersData.orderNumber',
            table: '$ordersData.table',
            description: '$ordersData.description',
            user: '$ordersData.user',
            dishes: '$ordersData.dishes',
        },
    },
    {
        $project: {
            _id: 0,
            ordersData: 0,
            dishes: {
                _id: 0,
            },
        },
    },
];
