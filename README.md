# Node - Robokassa

This is node package for work with robokassa.ru API [robokassa.ru](http://www.robokassa.ru/ru/Doc/Ru/Interface.aspx)

## Installation

```sh
$ npm install @dev-aces/robokassa
```

## Usage:

TypeScript and JavaScript are supported.

### Generate payment url

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

// Then redirect a user to the generated URL.
```

### Backend receive calls from Robokassa (NPM express example):

If `POST` method is selected for the result response in the Robokassa settings (recommended), then the results can be processed with the next Express code:

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

  // const { InvId, OutSum, shp_interface, ...etc } = robokassaResponse;

  if (robokassa.checkPayment(robokassaResponse)) {
    console.log('PAYMENT SUCCESS!');
  } else {
    console.log('PAYMENT NOT SUCCESS!');
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

Some ideas a taken from the old projects [betsol/node-robokassa](https://github.com/betsol/node-robokassa) and [SeNaP/node-robokassa](https://github.com/SeNaP/node-robokassa)

## License

MIT
