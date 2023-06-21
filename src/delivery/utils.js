export const getDeliveryDATA = [
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
            orderNumber: '$ordersData.orderNumber',
            description: '$ordersData.description',
            dishes: '$ordersData.dishes',
        },
    },
    {
        $lookup: {
            from: 'users',
            localField: 'courier',
            foreignField: '_id',
            as: 'courierData',
        },
    },
    {
        $unwind: '$courierData',
    },
    {
        $addFields: {
            courier: {
                firstName: '$courierData.firstName',
                secondName: '$courierData.secondName',
            },
        },
    },
    {
        $project: {
            _id: 0,
            ordersData: 0,
            courierData: 0,
            dishes: {
                _id: 0,
            },
        },
    },
];
