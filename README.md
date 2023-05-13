# Robokassa Node.JS

Пакет Node.JS для [Robokassa](https://docs.robokassa.ru).

Поддерживает JavaScript и TypeScript.

А также весь современный API Робокассы, включая [фискализацию](https://docs.robokassa.ru/fiscalization/?utm_medium=email&utm_source=UniSender&utm_campaign=284292554) через receipt, которую необходимо проводить по закону РФ для всех интернет услуг.

Пакет предназначен только для использования на сервере, пароли должны сохраняться в секрете.

## Установка

```sh
$ npm install @dev-aces/robokassa
```

# Использование

## URL для оплаты

Сгенерируйте URL для оплаты на сервере и перенаправьте на него браузер пользователя.

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
  // Пользовательские параметры должны начинаться с "shp_" | "Shp_" | "SHP_".
  // Они будут переданы на ваш сервер вызовом Робокассы после оплаты.
  userParameters: {
    shp_interface: 'link',
    shp_user_id: 'user_id',
  },

  // фискализация
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

// Остальное аналогично TypeScript примеру.
```

## Webhooks

Если в настройках Робокассы исользуется метод `POST` для отправки рузультатов (рекомендуется), то можно использовать Express.JS для обработки запросов:

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

// Указать данный URL для отправки результатов в настройках Робокассы
app.post('/payment/result', function (req: Request, res: Response) {
  const robokassaResponse = req.body as IRobokassaResponse;

  if (robokassa.checkPayment(robokassaResponse)) {
    console.log('PAYMENT SUCCESS!');

    const { InvId, /* OutSum, shp_interface, ...etc */ } = robokassaResponse;

    // Обязательно вернуть ответ Робокассе в формате `OK[InvId]` при успешной обработке запроса.
    res.send(`OK${InvId}`);
  } else {
    console.log('Processing failed!');
    res.send(`Failure`);
  }
});
```

Опционально можно добавить webhook APIs для оповещения об успешной и неуспешной оплате.

```typescript
app.get('/payment/true', function (req: Request, res: Response) {
  res.render('payment_true');
});

app.get('/payment/false', function (req: Request, res: Response) {
  res.render('payment_false');
});
```

## Внесение изменений

Сделайте fork репозитория, изменения, убедитесь что успешно пройдены тесты и форматирование:

```bash
$ npm install
$ npm run format
$ npm run build
$ npm run test
```

# История

Идея взяты из следующий старых проектов, которые, к сожалению, не поддерживают современный API Робокассы:

- [betsol/node-robokassa](https://github.com/betsol/node-robokassa)
- [SeNaP/-node-robokassa](https://github.com/SeNaP/node-robokassa)

## Лицензия

MIT
