"use server";

import { Alchemy, Network, NftFilters, NftOrdering } from "alchemy-sdk";

import { OwnedNft } from "../types/ownedNft";
import { formatOwnedNfts } from "../utils/formatNft";
import { AlchemyNftWithMetadata } from "../types/nft";

interface GetNftsResponse {
  nfts: OwnedNft[] | null,
  pageKey: string | null
}

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

const alchemy = new Alchemy({
  apiKey: alchemyApiKey,
  network: Network.ETH_MAINNET,
});

interface GetNftsByAddressPayload {
  address: string;
  pageKey?: string;
  orderByTransferTime: boolean;
}

export const getNftsByAddress = async ({ address, pageKey, orderByTransferTime }: GetNftsByAddressPayload): Promise<GetNftsResponse | null> => {
  try {
    if (!alchemyApiKey) {
      throw new Error("Missing Alchemy Api Key");
    }

    const options = {
      excludeFilters: [NftFilters.AIRDROPS],
      pageSize: 100,
      ...(pageKey && { pageKey }),
      ...(orderByTransferTime && { orderBy: NftOrdering.TRANSFERTIME }),
    };

    const data = await alchemy.nft.getNftsForOwner(address, options);

    const nfts = data.ownedNfts.length > 0 ? formatOwnedNfts(data.ownedNfts as unknown as AlchemyNftWithMetadata[]) : [];

    const response = {
      nfts,
      pageKey: data.pageKey ?? null,
    };

    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error: ", err);
    return null;
  }
};
