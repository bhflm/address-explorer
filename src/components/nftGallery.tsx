import { useEffect, useState, useCallback } from "react";
import { Button } from "@/src/components/ui/button";

import { getNftsByAddress } from "@/src/utils/server/getNftsByAddress";
import { NftCard } from "./nftCard";
import { OwnedNft } from "../types/ownedNft";

type Props = {
  address: string;
};

export function NftGallery({ address }: Props) {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const nftsPerPage = 4;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const start = (currentPage - 1) * nftsPerPage;
  const end = start + nftsPerPage;

  const fetchNfts = useCallback(async () => {
    try {
      const fetchedNfts = await getNftsByAddress(address);
      if (fetchedNfts) {
        setNfts(fetchedNfts);
      } else {
        setNfts([]);
      }
    } catch (error) {
      // console.error("Error fetching NFTs:", error);
      setNfts([]);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    setLoading(true);
    fetchNfts();
  }, [address, fetchNfts]);

  const renderFixedNfts = () => {
    if (nfts) {
      return nfts.slice(start, end).map((nft, i) => <NftCard key={i} nftData={nft} />);
    }
  };

  const renderGalleryButtons = () => {
    if (isLoading || !nfts.length) {
      return null;
    }

    if (nfts) {
      const previousPageShowIndex = currentPage - 1 === start ? null : currentPage - 1;

      const nextPageShowIndex =
        currentPage * nftsPerPage + 1 > nfts.length ? null : currentPage + 1;

      return (
        <div className="flex justify-center mt-4">
          <Button
            className="border-0.5 m-4 sm:p-2 sm:w-1/3 sm:m-4"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous {previousPageShowIndex}
          </Button>
          <Button
            className="border-0.5 m-4 sm:w-1/3 sm:m-4"
            onClick={handleNextPage}
            disabled={end >= nfts.length}
          >
            Next {nextPageShowIndex}
          </Button>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:flex-wrap">
        {renderFixedNfts()}
      </div>
      {renderGalleryButtons()}
    </div>
  );
}
