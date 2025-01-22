import { Bounded } from "@/app/components/Bounded";
import { ButtonLink } from "@/app/components/ButtonLink";
import { Heading } from "@/app/components/Heading";
import { Content } from "@prismicio/client";
// import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import {ParallelImage} from "./ParallelImage"
import { Slidein } from "@/app/components/Slidein";

declare module "react" {
  interface CSSProperties {
    "--index"?:number,
  }
}

/**
 * Props for `TextImage`.
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component for "TextImage" Slices.
 */
const TextImage = ({ slice,index }: TextImageProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]",
        slice.primary.theme === "Blue" && "bg-texture bg-brand-blue text-white",
        slice.primary.theme === "Orange" &&
          "bg-texture bg-brand-orange text-white",
        slice.primary.theme === "Navy" && "bg-texture bg-brand-navy text-white",
        slice.primary.theme === "Lime" && "bg-texture bg-brand-lime text-white"
      )}
      style={{"--index":index}}
    >
      <div className="grid grid-cols-1 items-center md:grid-cols-2 md:gap-24 ">
        <div className={clsx("flex flex-col items-center gap-8 text-center md:items-start md:text-left",
          slice.variation === "imageOnLeft" && "md:order-2"
        )}>
          <Slidein>
          <Heading as="h2" size="lg">
            <PrismicRichText field={slice.primary.heading} />
          </Heading>
          <div className="max-w-md text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.body} />
          </div>

          </Slidein>
          <Slidein>
          <ButtonLink
            field={slice.primary.button}
            color={slice.primary.theme === "Lime" ? "orange" : "lime"}
          >
            {slice.primary.button.text}
          </ButtonLink>
          </Slidein>
        </div>
          <ParallelImage foregroundImage={slice.primary.foreground_image} backgroundImage={slice.primary.background_image}/>
      </div>
    </Bounded>
  );
};

export default TextImage;
