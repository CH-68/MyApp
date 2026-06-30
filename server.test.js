import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.js';

test('GET /health returns a healthy status payload', async () => {
  const server = createServer();
  server.listen(0);

  await new Promise((resolve) => server.once('listening', resolve));

  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 0;

  const response = await fetch(`http://127.0.0.1:${port}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { status: 'ok' });

  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});
