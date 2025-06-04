import { provideServerRendering, withRoutes } from '@angular/ssr';
import {
  APP_INITIALIZER,
  ApplicationConfig, inject,
  makeStateKey,
  mergeApplicationConfig,
  provideAppInitializer,
  TransferState
} from '@angular/core';
import {appConfig} from './app.config';
import * as dotenv from 'dotenv';
import {serverRoutes} from "./app.routes.server";

// Load environment variables
dotenv.config();

const envStateKey = makeStateKey<{ data: string }>('env');

/**
 * Read the required environment variables from process.env
 * and set them in the transfer state using defined above key.
 * This function is executed as an app initializer.
 */
export function transferStateFactory(transferState: TransferState) {

  return () => {
    const envVars = {
      //ATTENTION! Use ternary operator to check if the environment variable is defined, otherwise it will be set to 'undefined' and the app will not load.
      //(The problem may occur if the .env is not found)
      ATTRIBUTE_ONE: process.env['ATTRIBUTE_ONE'] ? process.env['ATTRIBUTE_ONE'] : '',
      ATTRIBUTE_TWO: process.env['ATTRIBUTE_TWO'] ? process.env['ATTRIBUTE_TWO'] : '',
      //TODO Add more environment variables as needed
    };
    transferState.set<any>(envStateKey, envVars);
  };
}

const serverConfig: ApplicationConfig = {
  providers: [provideAppInitializer(() => {
      const transferState = inject(TransferState);
      return transferStateFactory(transferState)();
    }), provideServerRendering(withRoutes(serverRoutes))]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
