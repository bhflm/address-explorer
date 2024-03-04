"use server";

import { OwnedNft } from "../types/ownedNft";
import { formatOwnedNfts } from "../utils/formatNft";

// @@ TODO: Support pagination
export const getNftsByAddress = async (address: string): Promise<OwnedNft[] | null> => {
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  try {
    if (!ALCHEMY_API_KEY) {
      throw new Error("Missing Alchemy Api Key");
    }

    const options = { method: "GET", headers: { accept: "application/json" } };
    const res = await fetch(
      `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`,
      options,
    );
    const data = await res.json();

    if (!data.ownedNfts || data.ownedNfts.length === 0) {
      return [];
    }

    const nfts = formatOwnedNfts(data.ownedNfts);

    return nfts;
  } catch (err) {
    // console.log("Error: ", err);
    return null;
  }
};
