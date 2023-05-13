import Joi from 'joi';

export const categoriesValidateSchema = Joi.object({
    title: Joi.string().required().min(3),
    picture: Joi.string().required(),
});

['Pizza', 'Sushi', 'Salad', 'Burgers_and_snacks', 'Soup', 'Hot_meals', 'Desserts', 'Drinks'];
