"use server";

import { OwnedNft } from "../types/ownedNft";
import { formatOwnedNfts } from "../utils/formatNft";
import { isValidEthAddress } from "../utils/validEthAddress";
interface GetNftsResponse {
  nfts: OwnedNft[] | null,
  pageKey: string | null
}

export const getNftsByAddress = async (address: string, pageKey?: string): Promise<GetNftsResponse | null> => {
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  try {
    if (!ALCHEMY_API_KEY) {
      throw new Error("Missing Alchemy Api Key");
    }

    if (!isValidEthAddress(address)) {
      throw new Error(`Invalid address: ${address}`);
    }

    const options = { method: "GET", headers: { accept: "application/json" } };
    const res = await fetch(
      `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`,
      options,
    );
    const data = await res.json();

    const response: GetNftsResponse = {
      nfts: data.ownedNfts && data.ownedNfts.length > 0 ? formatOwnedNfts(data.ownedNfts) : null,
      pageKey: data.pageKey ?? null,
    };

    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error: ", err);
    return null;
  }
};
