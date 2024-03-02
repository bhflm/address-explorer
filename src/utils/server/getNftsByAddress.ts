import { OwnedNft } from "../../types/ownedNft";

function mapDataToOwnedNfts(ownedNfts: any): OwnedNft[] {
  const formattedNfts = ownedNfts.map((nft: any) => {
    return ({
      contract: nft.contract.address,
      symbol: nft.contract.symbol,
      collectionName: nft.collection.name,
      imageUrl: nft.image.pngUrl,
      thumbnailUrl: nft.image.thumbnailUrl,
      tokenType: nft.tokenType,
      tokenId: nft.tokenId,
      name: nft.name ?? 'REPLACE_ME_NAME',
      description: nft.description ?? 'REPLACE_ME_DESCRIPTION',
    });
  });
  return formattedNfts;
}

// @@ TODO: Support pagination
export async function getNftsByAddress(address: string): Promise< OwnedNft[] | null> { 
  console.log('Calling server action getNftsByAddress');
  // @@ WARNING
  const removeMe = "API_KEY";
  const apiKey =  process.env.ALCHEMY_API_KEY || removeMe;
  // @@ WARNING
  try {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const res = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`, options)
    const data = await res.json();
    
    if (data.ownedNfts.length == 0) {
      return [];
    }

    const nfts = mapDataToOwnedNfts(data.ownedNfts);
    return nfts;
  } catch (err) {
    console.log('Error: ', err);
    return null;
  }
  

}