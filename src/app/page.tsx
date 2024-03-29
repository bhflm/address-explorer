"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

import Header from "@/src/components/header";
import NftGallery from "@/src/components/nftGallery";

import { invalidEthAddressMessage } from "@/src/utils/constants";
import { isValidAddress } from "@/src/utils/validEthAddress";

export default function App() {
  const [address, setAddress] = useState<string | null>(null);

  const [validAddress, setValidAddress] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = () => {
    setValidationError(null);
    setValidAddress(false);
  };

  const handleSearch = () => {
    try {
      setValidationError(null);

      if (address && isValidAddress(address)) {
        setValidAddress(true);
        return;
      }
      setValidationError(invalidEthAddressMessage);
      setValidAddress(false);
    } catch (error) {
      setValidationError(null);
    }
  };

  const renderNftGallery = () => {
    if (validAddress && !validationError) {
      return <NftGallery address={address!} />;
    }
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <div>
        <Header />
      </div>

      <div className="m-8">
        <p className="text-white text-2xl text-center sm:text-4xl sm:pt-4">Address NFT Explorer</p>
      </div>
      <div className="searchbar sm:mt-12 flex justify-center">
        <div className="flex flex-col items-center sm:w-1/3">
          <Input
            className="w-[250px] truncate hover:text-clip sm:w-1/2"
            type="address"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
              handleInputChange();
            }}
          />
          <Button className="border-0.5 mt-4 sm:w-1/3" type="submit" onClick={() => handleSearch()}>
            Search 🔎
          </Button>
          {validationError && (
            <Alert className="mt-8 sm:mt-24 sm:w-1/2 border-2 border-black bg-yellow-600">
              <AlertDescription className="text-center">
                {validationError}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      {renderNftGallery()}
    </div>
  );
}
