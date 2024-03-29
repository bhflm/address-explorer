import * as React from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import ImageFallback from "@/src/components/imageWithFallback";

import { OwnedNft } from "../types/ownedNft";
import { localFallbackImgPath } from "@/src/utils/constants";

interface NftCardProps {
  nftData: OwnedNft
}

const NftCard: React.FC <NftCardProps> = ({ nftData }) => {
  const altText =
    nftData.description || nftData.name || nftData.collectionName || "Alt text not found";

  return (
    <div className="flex flex-col items-center">
      <Card className="border-white border-2 rounded-2xl bg-gradient-to-r from-slate-400 to-gray-800 w-[250px] h-[250px] my-2 sm:w-[350px] sm:m-8 sm:h-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-white truncate hover:text-clip text-sm sm:text-2xl">
            {nftData.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-[175px] h-[125px] sm:w-[225px] sm:h-[220px] relative">
            <ImageFallback alt={altText} src={nftData.thumbnailUrl} fallbackSrc={localFallbackImgPath} fill={true} className="rounded-2xl" />
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger>
              <span className="text-xs text-white px-2 text-base bg-gray-800 border-1 rounded-xl p-0.5">
                Preview info
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{nftData.name}</DialogTitle>
                <DialogDescription>{nftData.description}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NftCard;
