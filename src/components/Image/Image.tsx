import { Image as ImageBase, ImageProps } from "@chakra-ui/react";
import { useState } from "react";

export const Image = (props: ImageProps) => {
  const [image, setImage] = useState<string | undefined>(props.src);
  const { children } = props;
  console.log(image);

  return (
    <ImageBase
      {...props}
      src={image}
      onError={(e) => {
        console.log("e", e);
        setImage(
          "https://cdn.discordapp.com/attachments/1045327638257995788/1199372998080212992/IMG_3074.jpg?ex=65c24e26&is=65afd926&hm=336bddf40bcd6fe67521358c1f9e0691239fa3e52595b7112a7e686fd47c2749&"
        );
      }}
    >
      {children}
    </ImageBase>
  );
};
