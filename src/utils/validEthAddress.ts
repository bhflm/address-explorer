import { isAddress } from 'viem';

export function isValidEthAddress(address: string): boolean {
  const isValid = isAddress(address);
 return isValid;
};
