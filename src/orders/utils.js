export const getOrderDATA = [
    {
        $unwind: '$dishes',
    },
    {
        $lookup: {
            from: 'dishes',
            localField: 'dishes.dishID',
            foreignField: '_id',
            as: 'dishesDetails',
        },
    },
    {
        $addFields: {
            dishes: {
                title: { $arrayElemAt: ['$dishesDetails.title', 0] },
                price: { $arrayElemAt: ['$dishesDetails.price', 0] },
                picture: { $arrayElemAt: ['$dishesDetails.picture', 0] },
            },
        },
    },
    {
        $group: {
            _id: '$_id',
            data: { $first: '$$ROOT' },
            dishes: { $push: '$dishes' },
        },
    },
    {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: ['$data', { dishes: '$dishes' }],
            },
        },
    },
    {
        $addFields: {
            id: '$_id',
        },
    },
    {
        $project: {
            _id: 0,
            dishesDetails: 0,
            dishes: {
                _id: 0,
            },
        },
    },
];
