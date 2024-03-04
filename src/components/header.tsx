import * as React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="">
      <nav className="mx-auto flex items-center justify-between p-6 sm:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Image src="wc.svg" alt="WalletConnect dark logo" width={32} height={40} />
          <p className="text-white mx-4 text-base sm:text-xl ">WalletConnect</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
