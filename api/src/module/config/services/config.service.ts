import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { IEnvConfig } from './interfaces';

export class ConfigService {
  private readonly envConfig: IEnvConfig | undefined;

  constructor() {
    const config = dotenv.config().parsed || process.env;
    this.envConfig = this.validateInput(config);
  }

  get(key: string) {
    return this.envConfig && this.envConfig[key];
  }

  private validateInput(
    envConfig: dotenv.DotenvConfigOutput,
  ): dotenv.DotenvConfigOutput {
    const envVarsSchema: Joi.ObjectSchema = Joi.object()
      .keys({
        NODE_ENV: Joi.string()
          .valid(['development', 'production', 'test'])
          .default('development'),
        PORT: Joi.number().default(3400),
        DATABASE_URL: Joi.string()
          .uri()
          .required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      })
      .required();

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
