import { useEffect, useState, useCallback } from "react";
import { Button } from "@/src/components/ui/button";

import { getNftsByAddress } from "@/src/actions/getNftsByAddress";
import { NftCard } from "./nftCard";
import { OwnedNft } from "../types/ownedNft";
import { LoadingSpinner } from "./ui/loadingSpinner";

type Props = {
  address: string;
};

export function NftGallery({ address }: Props) {
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [pageKey, setPageKey] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const nftsPerPage = 4;

  const handleNextPage = async () => {
    setCurrentPage((prevPage) => prevPage + 1);

    if (pageKey && (currentPage * nftsPerPage) + nftsPerPage >= nfts.length) {
      try {
        const response = await getNftsByAddress(address, pageKey);
        const fetchedNfts = response?.nfts;

        if (fetchedNfts) {
          setNfts((prevNfts) => [...prevNfts, ...fetchedNfts]);
        }

        if (response?.pageKey) {
          setPageKey(response.pageKey);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching additional NFTs:", error);
      }
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const start = (currentPage - 1) * nftsPerPage;
  const end = start + nftsPerPage;

  const fetchNfts = useCallback(async () => {
    try {
      const response = await getNftsByAddress(address);
      const fetchedNfts = response?.nfts;
      if (fetchedNfts) {
        setNfts(fetchedNfts);
      } else {
        setNfts([]);
      }

      if (response?.pageKey) {
        setPageKey(response?.pageKey);
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

  const renderNfts = () => {
    if (nfts) {
      const startIndex = (currentPage - 1) * nftsPerPage;
      const endIndex = startIndex + nftsPerPage;
      // console.log("Nfts to render: ", nfts.slice(startIndex, endIndex));

      return nfts.slice(startIndex, endIndex).map((nft, i) => <NftCard key={i} nftData={nft} />);
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
        {
         isLoading
          ? <LoadingSpinner className="mt-12 sm:mt-8" />
          : renderNfts()
        }
      </div>
      {renderGalleryButtons()}
    </div>
  );
}
