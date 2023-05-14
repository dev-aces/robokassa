import { IRobokassaResponse, RobokassaUserParameterKey } from '../types';
import { calculateHash } from './calculateHash';

type IResponseArgument = Pick<IRobokassaResponse, 'InvId' | 'OutSum'> &
  Record<RobokassaUserParameterKey, string>;

export const buildExpectedReceivingSignatureString = ({
  password2,
  response,
}: {
  password2: string;
  response: IResponseArgument;
}) => {
  const userParameters = Object.entries(response).filter(([key]) =>
    key?.toLowerCase().startsWith('shp_'),
  );

  const signatureUserParams =
    userParameters.map(([key, value]) => `${key}=${value?.toString() ?? ''}`) ??
    [];
  // Порядок параметров важен, сортируем по алфавиту
  signatureUserParams.sort((a, b) => a.localeCompare(b));

  const signatureValues = [
    response.OutSum,
    response.InvId,
    password2,
    ...signatureUserParams,
  ].filter((value) => value !== undefined);

  return signatureValues.join(':');
};

export const calculateReceivingSignatureValue = ({
  hashAlgorithm,
  password2,
  response,
}: {
  hashAlgorithm: string;
  password2: string;
  response: IResponseArgument;
}) => {
  const expectedString = buildExpectedReceivingSignatureString({
    password2,
    response,
  });

  return calculateHash(hashAlgorithm, expectedString);
};
