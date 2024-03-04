import { Nft, BaseNft, NftImage, NftContractForNft } from "alchemy-sdk";

export type AlchemyNftWithMetadata = Nft & BaseNft;

export type AlchemyImageData = NftImage;

export type AlchemyNftContract = NftContractForNft;
