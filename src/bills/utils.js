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
        $addFields: {
            id: '$_id',
            orderType: { $arrayElemAt: ['$ordersData.orderType', 0] },
            orderNumber: { $arrayElemAt: ['$ordersData.orderNumber', 0] },
            table: { $arrayElemAt: ['$ordersData.table', 0] },
            description: { $arrayElemAt: ['$ordersData.description', 0] },
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
