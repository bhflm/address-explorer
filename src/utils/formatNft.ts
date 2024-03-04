import { OwnedNft } from "@/src/types/ownedNft";
import { NftApiResponse, ImageResponseData, ContractResponseData } from "@/src/types/rawNft";

const defaultPlaceHolder = "http://placekitten.com/g/200/300";

export const getImageUrlOrDefaultPlaceholder = ({
  imageData,
  contractData,
}: {
  imageData: ImageResponseData | null;
  contractData: ContractResponseData | null;
}): string => {
  let imageUrl = defaultPlaceHolder;

  if (imageData && imageData.originalUrl) {
    imageUrl = imageData.originalUrl;
  } else if (contractData && contractData.openSeaMetadata.imageUrl) {
    imageUrl = contractData.openSeaMetadata.imageUrl;
  }
  return imageUrl;
};

export const formatNftResponse = (nftResponse: NftApiResponse): OwnedNft => {
  const { contract } = nftResponse;

  const name = nftResponse.name || contract.name;

  const imageUrl = getImageUrlOrDefaultPlaceholder({
    imageData: nftResponse.image,
    contractData: contract,
  });

  return {
    name,
    contract: contract?.address,
    symbol: contract?.symbol,
    collectionName: nftResponse.collection?.name || null,
    imageUrl,
    thumbnailUrl: imageUrl,
    description: nftResponse.description,
  };
};

export const formatOwnedNfts = (responseNfts: NftApiResponse[]): OwnedNft[] => {
  return responseNfts.map(formatNftResponse);
};
