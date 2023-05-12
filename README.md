# Robokassa Node.JS

Node.JS package for [Robokassa API](https://docs.robokassa.ru).

Passwords should be kept as secrets. This package should be used only at the Backend side.

## Installation

```sh
$ npm install @dev-aces/robokassa
```

## Usage

### Payment url

Generate a payment URL and redirect a user to it.

TypeScript:
```typescript
import { Robokassa } = from '@dev-aces/robokassa';

const robokassa = new Robokassa({
  merchantLogin: 'my_merchant_login',
  password1: 'my_password_1',
  password2: 'my_password_2',
});

const url = robokassa.generatePaymentUrl({
  outSum: '10.00',
  description: 'Тестовый продукт',
  userParameters: {
    shp_interface: 'link',
  },
  culture: 'ru',
  encoding: 'utf-8',

  receipt: {
    items: [
      {
        sum: 10,
        name: 'Мой продукт',
        quantity: 1,
        payment_method: 'full_payment',
        payment_object: 'service',
        tax: 'none',
      },
    ],
  },
});

```

JavaScript:
```javascript
const { Robokassa } = require('@dev-aces/robokassa');

// The rest is the same as the TypeScript example.
```

### Calls from Robokassa

If the `POST` method is selected for the result response in the Robokassa settings (recommended), then the results can be processed with the next Express code.

TypeScript:
```typescript
import { Robokassa, IRobokassaResponse } = from '@dev-aces/robokassa';
import express, { Request, Response } from 'express';

const robokassa = new Robokassa({
  merchantLogin: 'my_merchant_login',
  password1: 'my_password_1',
  password2: 'my_password_2',
});

const app = express();

app.post('/payment/result', function (req: Request, res: Response) {
  const robokassaResponse = req.body as IRobokassaResponse;

  if (robokassa.checkPayment(robokassaResponse)) {
    console.log('PAYMENT SUCCESS!');

    // It is required to return `OK[InvId]` response for successful processing.
    const { InvId, /* OutSum, shp_interface, ...etc */ } = robokassaResponse;

    res.send(`OK${InvId}`);
  } else {
    console.log('Processing failed!');
    res.send(`Failure`);
  }
});

express.get('/payment/true', function (req: Request, res: Response) {
  res.render('payment_true');
});

express.get('/payment/false', function (req: Request, res: Response) {
  res.render('payment_false');
});
```

## Contributing

Fork the repository, make changes, ensure that project is tested:

```bash
$ npm install
$ npm run build && npm run test
```

## History

Ideas a taken from the old projects:
- [betsol/node-robokassa](https://github.com/betsol/node-robokassa)
- [SeNaP/-node-robokassa](https://github.com/SeNaP/node-robokassa)

## License

MIT
