import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  src: string;
  fallbackSrc: string
}

const ImageFallback: React.FC <ImageWithFallbackProps> = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(false);
    const [oldSrc, setOldSrc] = useState(src);
    if (oldSrc !== src) {
        setImgSrc(false);
        setOldSrc(src);
    }
    return (
        <Image
            {...rest}
            src={imgSrc ? fallbackSrc : src}
            onError={() => {
                setImgSrc(true);
            }}
        />
    );
};

export default ImageFallback;
