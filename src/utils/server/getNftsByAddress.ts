"use server"

import { OwnedNft } from "../../types/ownedNft";
import { NftApiResponse, ImageResponseData, ContractResponseData } from "@/src/types/rawNft";

const defaultPlaceHolder = "http://placekitten.com/g/200/300";


const getImageUrlOrDefaultPlaceholder = ({ imageData , contractData } : { imageData: ImageResponseData | null, contractData: ContractResponseData | null }): string => {
  let imageUrl = defaultPlaceHolder;
  
  if (imageData && imageData.originalUrl) {
    imageUrl = imageData.originalUrl; 
  } else if (contractData && contractData.openSeaMetadata.imageUrl) {
    imageUrl = contractData.openSeaMetadata.imageUrl;
  }
  return imageUrl;
};

const formatNftResponse = (nftResponse: NftApiResponse): OwnedNft => {
  const { contract } = nftResponse;

  const name = nftResponse.name || contract.name;

  let imageUrl: string = getImageUrlOrDefaultPlaceholder({ imageData: nftResponse.image, contractData: contract });

  return ({
    name,
    contract: contract?.address,
    symbol: contract?.symbol,
    collectionName: nftResponse.collection?.name || null,
    imageUrl,
    thumbnailUrl: imageUrl,
    description: nftResponse.description,
  });
};

const formatOwnedNfts = (responseNfts: NftApiResponse[]): OwnedNft[] => {
  return responseNfts.map(formatNftResponse);
};

// @@ TODO: Support pagination
export const getNftsByAddress = async (address: string): Promise< OwnedNft[] | null> => { 
  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
  try {

    if (!ALCHEMY_API_KEY) {
      throw new Error("Missing Alchemy Api Key");
    }

    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const res = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`, options)
    const data = await res.json();

    if (!data.ownedNfts || data.ownedNfts.length == 0) {
      return [];
    }

    const nfts = formatOwnedNfts(data.ownedNfts);
  
    return nfts;
  } catch (err) {
    console.log('Error: ', err);
    return null;
  }
  

}