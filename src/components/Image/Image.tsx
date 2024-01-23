import { Image as ImageBase, ImageProps } from "@chakra-ui/react";
import { useState } from "react";

export const Image = (props: ImageProps) => {
  const [image, setImage] = useState<string | undefined>(props.src);
  const { children } = props;

  return (
    <ImageBase
      {...props}
      src={image}
      onError={() => {
        setImage("empty.jpg");
      }}
    >
      {children}
    </ImageBase>
  );
};
