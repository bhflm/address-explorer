/* eslint-disable @next/next/no-img-element */
import * as React from "react" 
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"

import { OwnedNft } from "../types/ownedNft";


export function NftCard (props: { nftData: OwnedNft}) {
  const { nftData } = props;

  console.log('Nft data; ', nftData);

  return (
    <div className="flex flex-col items-center">
    <Card className="border-white border-2 rounded-2xl bg-gradient-to-r from-slate-400 to-gray-800 w-[250px] h-[250px] my-2 sm:w-[350px] sm:m-8 sm:h-[350px]">
      <CardHeader>
        <CardTitle className="text-center text-white truncate hover:text-clip text-sm sm:text-2xl">{nftData.name}</CardTitle>
        {/* <CardDescription className="text-xs sm:text-base">{description}</CardDescription> @@SHOW ON OPEN */}
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-[175px] h-[125px] sm:w-[225px] sm:h-[220px] relative">
          <Image
            alt="Description of img REPLACE_ME"
            src={nftData.thumbnailUrl}
            fill={true}
            className="rounded-2xl"
          />
        </div>
      </CardContent>
      <CardFooter>
        {/* <p>{collectionName}</p>
        <p>{contract}</p>
        <p>{symbol}</p> */}
        <Dialog>
        <DialogTrigger>
          <span className="text-xs text-white px-2 text-base bg-gray-800 border-1 rounded-xl p-0.5">Preview info</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{nftData.name}</DialogTitle>
            <DialogDescription>
              {nftData.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </CardFooter>
    </Card>
    {/* <Button className="ml-8 w-1/4" type="submit">Preview</Button> //@@ TODO: If time is enoughdo preview of nft */}
    </div>
  )
}