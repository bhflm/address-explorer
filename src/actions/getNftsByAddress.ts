"use server";

import { Alchemy, Network, NftFilters } from "alchemy-sdk";

import { OwnedNft } from "../types/ownedNft";
import { formatOwnedNfts } from "../utils/formatNft";
import { isValidEthAddress } from "../utils/validEthAddress";

interface GetNftsResponse {
  nfts: OwnedNft[] | null,
  pageKey: string | null
}

interface AdditionalParams {
  address: string;
  addMetadata: boolean;
  pageSize: number;
  pageKey?: string;
}

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

const alchemy = new Alchemy({
  apiKey: alchemyApiKey,
  network: Network.ETH_MAINNET,
});

const getAddressByEns = async (ens: string): Promise<string | null> => {
  try {
    const address = await alchemy.core.resolveName(ens);
    return address;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while resolving address: ", error);
    return null;
  }
};

export const getNftsByAddress = async (address: string, pageKey?: string): Promise<any | null> => {
  try {
    if (!alchemyApiKey) {
      throw new Error("Missing Alchemy Api Key");
    }

    if (!isValidEthAddress(address)) {
      throw new Error(`Invalid address: ${address}`);
    }

    const options = {
      excludeFilters: [NftFilters.AIRDROPS],
      pageSize: 100,
      ...(pageKey && { pageKey }),
    };

    const data = await alchemy.nft.getNftsForOwner(address, options);

    const response = {
      nfts: data.ownedNfts.length > 0 ? formatOwnedNfts(data.ownedNfts) : [],
      pageKey: data.pageKey ?? null,
    };

    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error: ", err);
    return null;
  }
};
