import {WorkinprogressApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {WorkinprogressApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new WorkinprogressApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
