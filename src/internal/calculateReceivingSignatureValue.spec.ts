import {
  buildExpectedReceivingSignatureString,
  calculateReceivingSignatureValue,
} from './calculateReceivingSignatureValue';

describe('#calculateReceivingSignatureValue', () => {
  describe('#buildExpectedReceivingSignatureString', () => {
    it('should build string WITHOUT user parameters', () => {
      const result = buildExpectedReceivingSignatureString({
        password2: 'my_password2',
        response: {
          InvId: 42,
          OutSum: '100.00',
        },
      });
      expect(result).toEqual('100.00:42:my_password2');
    });

    it('should build string WITH sorted user parameters', () => {
      const result = buildExpectedReceivingSignatureString({
        password2: 'my_password2',
        response: {
          InvId: 84,
          OutSum: '200.00',
          Shp_user_id: '123',
          Shp_email: 'test@test.com',
        },
      });

      expect(result).toEqual(
        '200.00:84:my_password2:Shp_email=test%40test.com:Shp_user_id=123',
      );
    });
  });

  it('should calculate correctly hash for an order WITH sorted user parameters, including receipt', () => {
    const result = calculateReceivingSignatureValue({
      hashAlgorithm: 'md5',
      password2: 'my_password2',
      response: {
        InvId: 84,
        OutSum: '200.00',
        shp_interface: 'link',
      },
    });

    expect(result).toEqual('95286fdc8024655ceb9034539bac1180');
  });
});
