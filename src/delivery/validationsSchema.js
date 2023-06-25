import Joi from 'joi';

export const deliveryValidateSchema = Joi.object({
    status: Joi.string().pattern(/^opened|delivering|rejected|done$/),
    order: Joi.string().required(),
    time: Joi.number().required(),
    clientInfo: Joi.object({
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        paymentMethod: Joi.string().required(),
        email: Joi.string().email(),
        description: Joi.string(),
    }),
    courier: Joi.string(),
    statusPriority: Joi.number().integer(),
    address: {
        city: Joi.string(),
        street: Joi.string().required(),
        apartment: Joi.number().integer().positive(),
    },
});
