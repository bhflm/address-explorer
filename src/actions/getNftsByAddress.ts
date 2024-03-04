"use server";

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

const buildAdditionalParams = ({ address, addMetadata, pageSize, pageKey }: AdditionalParams) => {
  const ownerParam = `owner=${address}`;
  const metadataParam = `withMetadata=${addMetadata}`;
  const pageSizeParam = `pageSize=${pageSize}`;
  const pageKeyParam = pageKey ? `pageKey=${pageKey}` : "";

  const paramsArray = [ownerParam, metadataParam, pageSizeParam, pageKeyParam].filter(Boolean);

  return "?" + paramsArray.join("&");
};

export const getNftsByAddress = async (address: string, pageKey?: string): Promise<GetNftsResponse | null> => {
  const alchemyApiKey = process.env.ALCHEMY_API_KEY;
  const alchemyMainnetUrl = process.env.ALCHEMY_MAINNET_URL_V3;

  try {
    if (!alchemyApiKey) {
      throw new Error("Missing Alchemy Api Key");
    }

    if (!isValidEthAddress(address)) {
      throw new Error(`Invalid address: ${address}`);
    }

    const options = { method: "GET", headers: { accept: "application/json" } };

    const additionalParams = buildAdditionalParams({
      address,
      addMetadata: true,
      pageSize: 100,
      pageKey,
    });

    const res = await fetch(
      `${alchemyMainnetUrl}/${alchemyApiKey}/getNFTsForOwner${additionalParams}`,
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
