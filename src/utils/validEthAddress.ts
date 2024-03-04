import { isAddress as isValidEthAddress } from "viem";

export const isValidAddress = (address: string): boolean => isValidEthAddress(address);
