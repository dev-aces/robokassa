import { Robokassa } from './Robokassa';

describe('#Robokassa', () => {
  it('can be initialized with default values', () => {
    const result = new Robokassa({
      merchantLogin: 'my_merchant_login',
      password1: 'my_password1',
      password2: 'my_password2',
    });
    expect(result.options).toEqual({
      merchantLogin: 'my_merchant_login',
      password1: 'my_password1',
      password2: 'my_password2',
      hashAlgorithm: 'md5',
      url: 'https://auth.robokassa.ru/Merchant/Index.aspx',
      isTest: false,
    });
  });

  it('can be initialized with custom values', () => {
    const result = new Robokassa({
      merchantLogin: 'my_merchant_login',
      password1: 'my_password1',
      password2: 'my_password2',
      hashAlgorithm: 'sha256',
      isTest: true,
      url: 'https://test.robokassa.ru/CUSTOM_URL',
    });
    expect(result.options).toEqual({
      merchantLogin: 'my_merchant_login',
      password1: 'my_password1',
      password2: 'my_password2',
      hashAlgorithm: 'sha256',
      url: 'https://test.robokassa.ru/CUSTOM_URL',
      isTest: true,
    });
  });

  describe(' ', () => {
    let robokassa: Robokassa;

    beforeEach(() => {
      robokassa = new Robokassa({
        merchantLogin: 'my_merchant_login',
        password1: 'my_password1',
        password2: 'my_password2',
      });
    });

    describe('#generatePaymentUrl', () => {
      it('should generate url with minimum parameters', () => {
        const result = robokassa.generatePaymentUrl({
          description: 'Товар 1',
          invId: 42,
          outSum: '100.00',
        });
        expect(result).toEqual(
          'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=my_merchant_login&Description=%D0%A2%D0%BE%D0%B2%D0%B0%D1%80%201&InvId=42&OutSum=100.00&SignatureValue=7642fdc174d0aabe022d992afd59f276',
        );
      });

      it('should generate url with IsTest=1', () => {
        const testRobokassa = new Robokassa({
          merchantLogin: 'my_merchant_login',
          password1: 'my_password1',
          password2: 'my_password2',
          isTest: true,
        });
        const result = testRobokassa.generatePaymentUrl({
          description: 'Товар 1',
          invId: 42,
          outSum: '100.00',
        });
        expect(result).toEqual(
          'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=my_merchant_login&IsTest=1&Description=%D0%A2%D0%BE%D0%B2%D0%B0%D1%80%201&InvId=42&OutSum=100.00&SignatureValue=7642fdc174d0aabe022d992afd59f276',
        );
      });

      it('should generate url without IsTest', () => {
        const testRobokassa = new Robokassa({
          merchantLogin: 'my_merchant_login',
          password1: 'my_password1',
          password2: 'my_password2',
          isTest: false,
        });
        const result = testRobokassa.generatePaymentUrl({
          description: 'Товар 1',
          invId: 42,
          outSum: '100.00',
        });
        expect(result).toEqual(
          'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=my_merchant_login&Description=%D0%A2%D0%BE%D0%B2%D0%B0%D1%80%201&InvId=42&OutSum=100.00&SignatureValue=7642fdc174d0aabe022d992afd59f276',
        );
      });

      it('should format outSum to fixed string when number type is passed', () => {
        const testRobokassa = new Robokassa({
          merchantLogin: 'my_merchant_login',
          password1: 'my_password1',
          password2: 'my_password2',
        });
        const result = testRobokassa.generatePaymentUrl({
          description: 'Товар 1',
          invId: 42,
          outSum: 100,
        });
        expect(result).toEqual(
          'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=my_merchant_login&Description=%D0%A2%D0%BE%D0%B2%D0%B0%D1%80%201&InvId=42&OutSum=100.00&SignatureValue=7642fdc174d0aabe022d992afd59f276',
        );
      });

      it('should pass InvId=0 when invId is not specified', () => {
        const testRobokassa = new Robokassa({
          merchantLogin: 'my_merchant_login',
          password1: 'my_password1',
          password2: 'my_password2',
        });
        const result = testRobokassa.generatePaymentUrl({
          description: 'Товар 1',
          outSum: '100.00',
        });
        expect(result).toEqual(
          'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=my_merchant_login&Description=%D0%A2%D0%BE%D0%B2%D0%B0%D1%80%201&OutSum=100.00&InvId=0&SignatureValue=cd9e54da801539e5bb4d6d371f6fef3f',
        );
      });

      it('should generate url with maximum parameters', () => {
        const result = robokassa.generatePaymentUrl({
          description: 'Услуги по разработке',
          invId: 42,
          outSum: '100.00',
          culture: 'en',
          email: 'test@tes.com',
          encoding: 'utf-8',
          expirationDate: '2010-02-11T16:07:11.6973153+03:00',
          incCurrLabel: 'RUR',
          outSumCurrency: 'USD',
          receipt: {
            sno: 'patent',
            items: [
              {
                name: 'Товар 1',
                quantity: 1,
                sum: 100,
                tax: 'vat20',
                cost: 100,
                nomenclature_code: '1234567890',
                payment_method: 'full_prepayment',
                payment_object: 'service',
              },
            ],
          },
          userIp: '192.164.1.1',
          userParameters: {
            Shp_user_id: '123',
          },
        });
        expect(result).toEqual(
          'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=my_merchant_login&Description=%D0%A3%D1%81%D0%BB%D1%83%D0%B3%D0%B8%20%D0%BF%D0%BE%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B5&InvId=42&OutSum=100.00&Culture=en&Email=test%40tes.com&Encoding=utf-8&ExpirationDate=2010-02-11T16%3A07%3A11.6973153%2B03%3A00&IncCurrLabel=RUR&OutSumCurrency=USD&UserIp=192.164.1.1&Receipt=%257B%2522sno%2522%253A%2522patent%2522%252C%2522items%2522%253A%255B%257B%2522name%2522%253A%2522%25D0%25A2%25D0%25BE%25D0%25B2%25D0%25B0%25D1%2580%25201%2522%252C%2522quantity%2522%253A1%252C%2522sum%2522%253A100%252C%2522tax%2522%253A%2522vat20%2522%252C%2522cost%2522%253A100%252C%2522nomenclature_code%2522%253A%25221234567890%2522%252C%2522payment_method%2522%253A%2522full_prepayment%2522%252C%2522payment_object%2522%253A%2522service%2522%257D%255D%257D&Shp_user_id=123&SignatureValue=f8a27db4aa842194bf43b236ede4dd07',
        );
      });
    });

    describe('#checkPayment', () => {
      it('should return true for a valid SignatureValue', () => {
        const result = robokassa.checkPayment({
          InvId: 84,
          OutSum: '200.00',
          SignatureValue: '95286fdc8024655ceb9034539bac1180',
          shp_interface: 'link',
          Fee: '0.00',
          IncCurrLabel: 'RUR',
          PaymentMethod: 'full_payment',
        });
        expect(result).toEqual(true);
      });

      it('should return false for an invalid SignatureValue', () => {
        const result = robokassa.checkPayment({
          InvId: 84,
          OutSum: '200.00',
          SignatureValue: 'invalid0signature0value',
          shp_interface: 'link',
          Fee: '0.00',
          IncCurrLabel: 'RUR',
          PaymentMethod: 'full_payment',
        });
        expect(result).toEqual(false);
      });
    });
  });
});
