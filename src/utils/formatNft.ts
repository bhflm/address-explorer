import { OwnedNft } from "@/src/types/ownedNft";
import { NftApiResponse, ImageResponseData, ContractResponseData } from "@/src/types/rawNft";
import { descriptionPlaceholderMessage } from "./constants";

export const getRandomImgPlaceholder = () => {
  const randomImgPlaceholderBaseUrl = "http://placekitten.com";
  const randomKittenId = Math.floor(Math.random() * 9) + 1;
  const endpoint = `g/40${randomKittenId}/400`;
  return `${randomImgPlaceholderBaseUrl}/${endpoint}`;
};

const getImageUrlOrDefaultPlaceholder = ({
  imageData,
  contractData,
}: {
  imageData: ImageResponseData | null;
  contractData: ContractResponseData | null;
}): string => {
  let imageUrl;

  if (imageData && imageData.originalUrl) {
    imageUrl = imageData.originalUrl;
  } else if (contractData && contractData.openSeaMetadata.imageUrl) {
    imageUrl = contractData.openSeaMetadata.imageUrl;
  } else {
    imageUrl = getRandomImgPlaceholder();
  }
  return imageUrl;
};

const getDescriptionOrDefaultPlaceholder = ({ descriptionData }: { descriptionData: string | null}) => {
  let description = descriptionPlaceholderMessage;
  if (descriptionData) {
    description = descriptionData;
  } else {
    description = descriptionPlaceholderMessage;
  }
  return description;
};

export const formatNftResponse = (nftResponse: NftApiResponse): OwnedNft => {
  const { contract } = nftResponse;

  const name = nftResponse.name || contract.name;

  const imageUrl = getImageUrlOrDefaultPlaceholder({
    imageData: nftResponse.image,
    contractData: contract,
  });

  const description = getDescriptionOrDefaultPlaceholder({
    descriptionData: nftResponse.description,
  });

  return {
    name,
    contract: contract?.address,
    symbol: contract?.symbol,
    collectionName: nftResponse.collection?.name || null,
    imageUrl,
    thumbnailUrl: imageUrl,
    description,
  };
};

export const formatOwnedNfts = (responseNfts: NftApiResponse[]): OwnedNft[] => {
  return responseNfts.map(formatNftResponse);
};
