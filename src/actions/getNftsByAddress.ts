"use server";

import { Alchemy, Network, NftFilters } from "alchemy-sdk";

import { OwnedNft } from "../types/ownedNft";
import { formatOwnedNfts } from "../utils/formatNft";
import { AlchemyNftWithMetadata } from "../types/nft";

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

export const getNftsByAddress = async (address: string, pageKey?: string): Promise<any | null> => {
  try {
    if (!alchemyApiKey) {
      throw new Error("Missing Alchemy Api Key");
    }

    const options = {
      excludeFilters: [NftFilters.AIRDROPS],
      pageSize: 100,
      ...(pageKey && { pageKey }),
    };

    const data = await alchemy.nft.getNftsForOwner(address, options);

    const response = {
      nfts: data.ownedNfts.length > 0 ? formatOwnedNfts(data.ownedNfts as unknown as AlchemyNftWithMetadata[]) : [],
      pageKey: data.pageKey ?? null,
    };

    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error: ", err);
    return null;
  }
};
