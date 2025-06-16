import {
  buildSendingSignatureString,
  calculateSendingSignatureValue,
} from './calculateSendingSignatureValue';

describe('#calculateSendingSignatureValue', () => {
  describe('#buildSendingSignatureString', () => {
    it('should build string WITHOUT user parameters', () => {
      const result = buildSendingSignatureString({
        password1: 'my_password1',
        merchantLogin: 'my_merchant_login',
        order: {
          description: 'my_description',
          outSum: '100.00',
          invId: 42,
        },
      });
      expect(result).toEqual('my_merchant_login:100.00:42:my_password1');
    });

    it('should build string WITH additional parameters', () => {
      const result = buildSendingSignatureString({
        password1: 'my_password1',
        merchantLogin: 'my_merchant_login',
        order: {
          description: 'my_description',
          outSum: '100.00',
          resultUrl2: 'my_result_url2',
          successUrl2: 'my_success_url2',
          successUrl2Method: 'GET',
          failUrl2: 'my_fail_url2',
          failUrl2Method: 'GET',
        },
      });

      expect(result).toEqual('my_merchant_login:100.00:my_result_url2:my_success_url2:GET:my_fail_url2:GET:my_password1');
    });

    it('should build string WITH sorted user parameters', () => {
      const result = buildSendingSignatureString({
        password1: 'my_password1',
        merchantLogin: 'my_merchant_login',
        order: {
          description: 'my_description',
          outSum: '200.00',
          invId: 84,
          userParameters: {
            Shp_user_id: '123',
            Shp_email: 'test@test.com',
          },
        },
      });

      expect(result).toEqual(
        'my_merchant_login:200.00:84:my_password1:Shp_email=test@test.com:Shp_user_id=123',
      );
    });

    it('should build string including receipt', () => {
      const result = buildSendingSignatureString({
        password1: 'my_password1',
        merchantLogin: 'my_merchant_login',
        order: {
          description: 'my_description',
          outSum: '200.00',
          invId: 84,
          receipt: {
            items: [
              {
                name: 'test',
                quantity: 1,
                sum: 200,
                tax: 'vat20',
              },
            ],
          },
        },
      });

      expect(result).toEqual(
        'my_merchant_login:200.00:84:{"items":[{"name":"test","quantity":1,"sum":200,"tax":"vat20"}]}:my_password1',
      );
    });
  });

  it('should calculate correctly hash for an order WITH sorted user parameters, including receipt', () => {
    const result = calculateSendingSignatureValue({
      hashAlgorithm: 'md5',
      merchantLogin: 'test-socionom.org',
      password1: 'my_password1',
      order: {
        userParameters: {
          shp_interface: 'link',
        },
        description: 'test2',
        outSum: '200.00',
        invId: 0,
        receipt: {
          items: [
            {
              name: 'test',
              quantity: 1,
              sum: 200,
              payment_method: 'full_payment',
              payment_object: 'service',
              tax: 'vat20',
            },
          ],
        },
      },
    });

    expect(result).toEqual('888f7275e88d20ead0fc62cdf5b69f72');
  });
});
