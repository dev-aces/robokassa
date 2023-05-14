import { IRobokassaOrder } from '../types/IRobokassaOrder';
import { calculateHash } from './calculateHash';

export const buildSendingSignatureString = ({
  merchantLogin,
  password1,
  order,
}: {
  merchantLogin: string;
  password1: string;
  order: IRobokassaOrder;
}) => {
  const signatureUserParams =
    Object.entries(order.userParameters ?? {}).map(
      ([key, value]) => `${key}=${value?.toString() ?? ''}`,
    ) ?? [];
  // Порядок параметров важен, сортируем по алфавиту
  signatureUserParams.sort((a, b) => a.localeCompare(b));

  const signatureValues = [
    merchantLogin,
    order.outSum,
    order.invId,
    order.outSumCurrency,
    order.userIp,
    order.receipt ? JSON.stringify(order.receipt) : undefined,
    password1,
    ...signatureUserParams,
  ];

  return signatureValues.filter((value) => value !== undefined).join(':');
};

export const calculateSendingSignatureValue = ({
  hashAlgorithm,
  merchantLogin,
  password1,
  order,
}: {
  hashAlgorithm: string;
  merchantLogin: string;
  password1: string;
  order: IRobokassaOrder;
}) => {
  const signatureString = buildSendingSignatureString({
    merchantLogin,
    password1,
    order,
  });
  return calculateHash(hashAlgorithm, signatureString);
};
