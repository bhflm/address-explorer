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

import { OwnedNft } from "../types/ownedNft";


export function NftCard (props: { nftData: OwnedNft}) {
  const { nftData } = props;
  
  return (
    <div className="flex flex-col">
      <Card className="border-white border-2 rounded-2xl bg-gradient-to-r from-slate-400 to-gray-800  w-[250px] h-[250px] my-2 sm:w-[450px] sm:m-8 sm:h-[450px]">
        <CardHeader>
          <CardTitle className="text-center text-white truncate hover:text-clip text-sm sm:text-2xl">{nftData.name ?? 'REPLACE_ME'}</CardTitle>
          {/* <CardDescription className="text-xs sm:text-base">{description}</CardDescription> @@SHOW ON OPEN */}
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-[165px] h-[165px] sm:w-[225px] sm:h-[275px] relative">
            <Image
              alt="Vercel Logo"
              priority={true}
              src={nftData.thumbnailUrl}
              className="rounded-xl"
              layout="fill"
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* <p>{collectionName}</p>
          <p>{contract}</p>
          <p>{symbol}</p> */}
        </CardFooter>
      </Card>
    {/* <Button className="ml-8 w-1/4" type="submit">Preview</Button> //@@ TODO: If time is enoughdo preview of nft */}
    </div>
  )
}