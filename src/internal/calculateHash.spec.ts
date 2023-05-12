import { calculateHash } from './calculateHash';

describe('#calculateHash', () => {
  it('should return correct result for md5 hash', () => {
    const result = calculateHash('md5', 'TEST');
    expect(result).toEqual('033bd94b1168d7e4f0d644c3c95e35bf');
  });
});
