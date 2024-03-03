import { useEffect, useState, useCallback } from "react";
import { getNftsByAddress } from "@/src/utils/server/getNftsByAddress";
import { NftCard } from "./nftCard"
import { OwnedNft } from "../types/ownedNft";

type Props = {
  address: string;
}

export function NftGallery({ address }: Props) {

  const [nfts, setNfts] = useState<OwnedNft[] >([])
  const [isLoading, setLoading] = useState(true);

  const fetchNfts = useCallback(async () => {
    try {
      const fetchedNfts = await getNftsByAddress(address);
      if (fetchedNfts) {
        setNfts(fetchedNfts);
      } else {
        setNfts([]);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      setNfts([]);
    }
  }, [address]);

  useEffect(() => {
    setLoading(true);
    fetchNfts();
  }, [address, fetchNfts])

  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:flex-wrap">
      { nfts && nfts.map((nft, i) => (<NftCard key={i} nftData={nft} />)) }
    </div>
  )
};