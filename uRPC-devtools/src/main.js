const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const { rpcService } = require('./RpcService.js');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/v1/methods/keys', async (_, res) => {
  const keys = await rpcService.listKeys();
  res.send(keys);
});
app.get('/api/v1/methods', async (req, res) => {
  const methods = await rpcService.list(req.query);
  res.send(methods);
});
app.get('/api/v1/methods/:methodKey', async (req, res) => {
  const method = await rpcService.details(req.params.methodKey);
  res.send(method);
});

app.post('/api/v1/rpc', async (req, res) => {
  const response = await rpcService.handle(req.body);
  res.send(response);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
