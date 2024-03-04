import { OwnedNft } from "@/src/types/ownedNft";
import { NftApiResponse, ImageResponseData, ContractResponseData } from "@/src/types/rawNft";

export const getRandomImgPlaceholder = () => {
  const randomKittenId = Math.floor(Math.random() * 9) + 1;
  const baseUrl = "http://placekitten.com";
  const path = `g/40${randomKittenId}/400`;
  return `${baseUrl}/${path}`;
};

const descriptionPlaceholder = "Sorry, we couldn't find any description related to this NFT";

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
  let description = descriptionPlaceholder;
  if (descriptionData) {
    description = descriptionData;
  } else {
    description = descriptionPlaceholder;
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
    descriptionData: nftResponse.description
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
