import Joi from 'joi';

export const ordersValidateSchema = Joi.object({
    status: Joi.boolean().required(),
    diningOptions: Joi.string().required(),
    orderNumber: Joi.string().required(),
    totalPrice: Joi.number().required().min(50),
    paymentMethod: Joi.string().required().min(3),
    tipAmount: Joi.number().positive(),
    tableTitle: Joi.string().min(3),
    dishes: Joi.array().items(
        Joi.object({
            dish_id: Joi.string().required(),
            amount: Joi.number().required().integer().positive(),
        })
    ),
    additionalFood: Joi.array().items(
        Joi.object({
            food_id: Joi.string().required(),
            amount: Joi.number().required().integer().positive(),
        })
    ),
    deliveryDetails: Joi.object({
        phone: Joi.string().required().min(10),
        name: Joi.string().required().min(2),
        addresses: Joi.string().required().min(10),
        email: Joi.string().email(),
    }),
    email: Joi.string().email(),
    notes: Joi.string().min(5),
});
