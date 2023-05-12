import { createHash } from 'crypto';

export const calculateHash = (hashAlgorithm: string, value: string) => {
  const hash = createHash(hashAlgorithm);

  hash.update(value);

  return hash.digest('hex');
};
