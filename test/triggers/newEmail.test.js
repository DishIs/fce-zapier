// test/triggers/newEmail.test.js
const zapier  = require('zapier-platform-core');
const App     = require('../../index');

zapier.tools.env.inject();
const appTester = zapier.createAppTester(App);

describe('triggers.new_email', () => {
  it('should return fallback messages from inbox', async () => {
    const bundle = {
      authData:  { apiKey: process.env.API_KEY },
      inputData: { inbox: process.env.TEST_INBOX || 'test@ditube.info' },
      // Simulates targetUrl for REST hooks testing
      targetUrl: 'https://hooks.zapier.com/hooks/catch/test/',
    };
    const results = await appTester(
      App.triggers.new_email.operation.perform,
      bundle,
    );
    expect(Array.isArray(results)).toBe(true);
    // May be empty if no emails — that's fine
  });
});
