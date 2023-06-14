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
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userData',
        },
    },
    {
        $unwind: '$userData',
    },
    {
        $addFields: {
            user: {
                firstName: '$userData.firstName',
                secondName: '$userData.secondName',
            },
        },
    },
    {
        $project: {
            _id: 0,
            ordersData: 0,
            userData: 0,
            dishes: {
                _id: 0,
            },
        },
    },
];

export const checkTotalPrice = ({ dishes, totalPrice }) => {
    let calculatedTotalPrice = 0;

    dishes.map(({ price, amount }) => (calculatedTotalPrice += price * amount));

    const calculatedPriceWithTenPercent = Math.round(calculatedTotalPrice * 0.1 + calculatedTotalPrice);

    if (totalPrice !== calculatedPriceWithTenPercent) {
        throw new Error('it isn`t correct totalPrice');
    }
};
