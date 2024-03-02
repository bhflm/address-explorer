"use client"
import { useState } from "react";

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { NftGallery } from '@/src/components/nftGallery';
import { isValidEthAddress } from '@/src/utils/validEthAddress';

export default function Explorer() {
  
  const [ address, setAddress] = useState<string | null>(null)

  const [validAddress, setValidAddress] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = () => {
    setValidationError('');
  }

  const handleSearch = () => {

    try {
      setValidationError(null);
      if (!address || !isValidEthAddress(address)) {
        setValidationError('Please enter a valid Ethereum address');
        setValidAddress(false);
        return;
      }
      
      setValidAddress(true);
    } catch (error) {
      console.error('Error handling search', error);
    }
  };

  return (
    <div className="flex justify-center flex-col w-full">
      <div className="m-8">
          <p className="font-bold text-xl text-center sm:text-3xl">Address Explorer</p>
        </div>

        <div className="searchbar mt-8 mx-12 sm:mt-24 flex justify-center">
          <div className="flex flex-col items-center sm:mx-48 sm:w-1/3 px-4 py-2">
              <Input className="w-full" type="address" placeholder="Address" onChange={(e) => {
                setAddress(e.target.value);
                handleInputChange();
               }} />
              <Button className="m-4 w-1/3" type="submit" onClick={() => handleSearch()}>Search</Button>
              {validationError && <p className="text-red-500">{validationError}</p>}
          </div>
        </div>
        {(address && validAddress && !validationError) ? <NftGallery address={address} /> : null}
      </div>
  );
}
