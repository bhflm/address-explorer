// TODO Add zod validation and make it nicer
interface AcquiredAtResponseData {
  blockTimestamp: number | null;
  blockNumber: number | null;
}

interface MintResponseData {
  mintAddress: string | null;
  blockNumber: number | null;
  timestamp: number | null;
  transactionHash: string | null;
}

interface CollectionResponseData {
  name: string | null;
  slug: string | null;
  externalUrl: string | null;
  bannerImageUrl: string | null;
}

interface RawNftData {
  tokenUri: string;
  metadata: {
    background_image: string;
    image: string;
    last_request_date: number;
    is_normalized: boolean;
    image_url: string;
    name: string;
    description: string;
    attributes: any[];
    version: number;
    url: string;
  };
  error: null;
}

export interface ContractResponseData {
  address: string;
  name: string | null;
  symbol: string | null;
  totalSupply: number | null;
  tokenType: string;
  contractDeployer: string;
  deployedBlockNumber: number;
  openSeaMetadata: {
    floorPrice: number | null;
    collectionName: string | null;
    collectionSlug: string | null;
    safelistRequestStatus: string | null;
    imageUrl: string | null;
    description: string | null;
    externalUrl: string | null;
    twitterUsername: string | null;
    discordUrl: string | null;
    bannerImageUrl: string | null;
    lastIngestedAt: string | null;
  };
  isSpam: boolean | null;
  spamClassifications: string[];
}

export interface ImageResponseData {
  cachedUrl: string;
  thumbnailUrl: string | null;
  pngUrl: string | null;
  contentType: string | null;
  size: number | null;
  originalUrl: string;
}

export interface NftApiResponse {
  contract: ContractResponseData;
  tokenId: string;
  tokenType: string;
  name: string;
  description: string;
  tokenUri: string;
  image: ImageResponseData;
  raw: RawNftData;
  collection: CollectionResponseData;
  mint: MintResponseData;
  owners: null;
  timeLastUpdated: string;
  balance: string;
  acquiredAt: AcquiredAtResponseData;
}
