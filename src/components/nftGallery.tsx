import { useEffect, useState, useCallback } from "react";
import { getNftsByAddress } from "@/src/utils/server/getNftsByAddress";
import { NftCard } from "./nftCard"
import { OwnedNft } from "../types/ownedNft";

type Props = {
  address: string;
}

export function NftGallery({ address }: Props) {

  const [nfts, setNfts] = useState<OwnedNft[] >([])

  const fetchNfts = useCallback(async () => {
    const data = await getNftsByAddress(address);
    if (data) {
        setNfts(data);
    }
  }, [address]);
  
  useEffect(() => {
     fetchNfts()
  }, [address, fetchNfts])

  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:flex-wrap">
      { nfts && nfts.map((nft, i) => (<NftCard key={i} nftData={nft} />)) }
    </div>
  )
};