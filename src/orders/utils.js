import { DishesDAL } from '../dishes/DishesDAL.js';

export const findAdditionalFields = async order => {
    const { dishes } = order;
    const totalDishInfo = await Promise.all(
        dishes.map(async item => {
            const { title, price, picture } = await DishesDAL.findByID(item.dishID);
            const dishTotalPrice = item.amount * price;
            return { ...item, dishTotalPrice, title, price, picture };
        })
    );

    return totalDishInfo;
};
