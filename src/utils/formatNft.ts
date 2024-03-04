import { OwnedNft } from "@/src/types/ownedNft";
import { AlchemyNftWithMetadata, AlchemyImageData, AlchemyNftContract } from "@/src/types/nft";
import { descriptionPlaceholderMessage, localFallbackImgPath } from "./constants";

export const fallbackImgPlaceholderUrl = process.env.IMG_FALLBACK_URL || localFallbackImgPath;

const getImageUrlOrDefaultPlaceholder = ({
  imageData,
  contractData,
}: {
  imageData: AlchemyImageData | null;
  contractData: AlchemyNftContract | null;
}): string => {
  let imageUrl;

  if (imageData && imageData.originalUrl) {
    imageUrl = imageData.originalUrl;
  } else if (contractData && contractData.openSeaMetadata.imageUrl) {
    imageUrl = contractData.openSeaMetadata.imageUrl;
  } else {
    imageUrl = fallbackImgPlaceholderUrl;
  }
  return imageUrl;
};

const getDescriptionOrDefaultPlaceholder = ({ descriptionData }: { descriptionData?: string | null}) => {
  let description = descriptionPlaceholderMessage;
  if (descriptionData) {
    description = descriptionData;
  } else {
    description = descriptionPlaceholderMessage;
  }
  return description;
};

export const formatNftResponse = (nftResponse: AlchemyNftWithMetadata): OwnedNft => {
  const { contract } = nftResponse;

  const name = nftResponse.name || contract.name || nftResponse.tokenId;

  const imageUrl = getImageUrlOrDefaultPlaceholder({
    imageData: nftResponse.image,
    contractData: contract,
  });

  const description = getDescriptionOrDefaultPlaceholder({
    descriptionData: nftResponse.description,
  });

  const ownedNft = {
    name,
    contract: contract?.address,
    collectionName: nftResponse.collection?.name || null,
    imageUrl,
    thumbnailUrl: imageUrl,
    description,
  };

  return ownedNft;
};

export const formatOwnedNfts = (responseNfts: AlchemyNftWithMetadata[]): OwnedNft[] => {
  return responseNfts.map(formatNftResponse);
};
