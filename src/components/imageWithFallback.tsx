import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { LoadingSpinner } from "@/src/components/ui/loadingSpinner";

interface ImageWithFallbackProps extends ImageProps {
  src: string;
  fallbackSrc: string
}

const ImageFallback: React.FC <ImageWithFallbackProps> = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(false);
    const [oldSrc, setOldSrc] = useState(src);

    if (oldSrc !== src) {
        setImgSrc(false);
        setOldSrc(src);
    }

    const handleLoad = () => {
        setLoading(false);
    };
    return (
        <>
         {loading && (<LoadingSpinner className="mx-8 sm:mx-6 w-[auto] h-[105px] sm:h-[180px]"/>)}
         {<Image
        {...rest}
        src={imgSrc ? fallbackSrc : src}
        onLoad={handleLoad}
        onError={() => {
            setImgSrc(true);
        }} />}
        </>
    );
};

export default ImageFallback;
