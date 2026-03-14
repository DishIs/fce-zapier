// test/authentication.test.js
const zapier  = require('zapier-platform-core');
const App     = require('../index');

zapier.tools.env.inject();
const appTester = zapier.createAppTester(App);

describe('authentication', () => {
  it('should authenticate with a valid API key', async () => {
    const bundle = {
      authData: { apiKey: process.env.API_KEY },
    };
    const result = await appTester(App.authentication.test, bundle);
    expect(result).toBeDefined();
    expect(result.plan).toBeDefined();
  });

  it('should fail with an invalid API key', async () => {
    const bundle = {
      authData: { apiKey: 'fce_invalid_key_for_testing' },
    };
    await expect(
      appTester(App.authentication.test, bundle),
    ).rejects.toThrow();
  });
});
