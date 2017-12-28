const path = require('path');
global.basePath = path.normalize(`${__dirname}/../../`);

/**
 * Parses .env files to retrieve config variables
 */
require('dotenv-safe').load({ path: `${basePath}/.env.test`, sample: `${basePath}/.env_example` });

/**
 * Require Application (start app)
 */
const app = require(`${basePath}/app`);

const { DbService } = require(`${basePath}/app/services`);

/**
 * Run All Tests
 */
describe('Main Test Runner', () => {
  before(async () => {
    await DbService.dropDatabase();
  });

  it('Should Run All Tests', async () => {
    require('./main')(app);
  });

  after(async () => {
    await DbService.dropDatabase();
  });
});
