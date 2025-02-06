import * as Joi from 'joi';

export const configValidationSchema = Joi.object<EnvConfig>({
  PORT: Joi.number().default(3000), // Si no se define, toma 3000 por defecto
  JWT_SECRET: Joi.string().required().messages({
    'any.required': 'JWT_SECRET es un campo obligatorio',
  }),
  JWT_EXPIRATION: Joi.string().default('7d').messages({
    'any.required': 'JWT_EXPIRATION es un campo obligatorio',
    'string.base': 'JWT_EXPIRATION debe ser una cadena de texto',
  }), // Valor por defecto si no se define
  DB_HOST: Joi.string().required().messages({
    'any.required': 'DATABASE_URL es un campo obligatorio',
  }),
});