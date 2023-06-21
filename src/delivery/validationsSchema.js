import Joi from 'joi';

export const deliveryValidateSchema = Joi.object({
    customerName: Joi.string(),
    courier: Joi.string(),
    status: Joi.string().pattern(/^opened|delivering|rejected|closed$/),
    statusPriority: Joi.number().integer(),
    time: Joi.number(),
    orderID: Joi.string(),
    paymentMethod: Joi.string(),
    address: {
        city: Joi.string(),
        street: Joi.string(),
        house: Joi.string(),
        flat: Joi.string(),
    },
    phoneNumber: Joi.string(),
});
