import Joi from 'joi';

// Define the product validation schema using Joi
export const productValidationSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).label('Title'),
  // imageUrl: Joi.string().uri().required().label('Image URL'),
  imageUrl: Joi.string().required().label('Image URL'),
  price: Joi.number().greater(0).required().label('Price'),
  description: Joi.string().required().min(1).max(500).label('Description'),
});
