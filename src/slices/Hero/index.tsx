import { Bounded } from "@/app/components/Bounded";
import { asImageSrc, Content } from "@prismicio/client";
// import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import { InteractiveSkate } from "./InteractiveSkate";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Defalut_Deck_texture = "/skateboard/Deck.webp";
const Defalut_Wheel_texture = "/skateboard/SkateWheel1.png";
const Defalut_Truck_color = "#6F6E6A";
const Defalut_Bolt_color = "#6F6E6A";

const Hero = ({ slice }: HeroProps)=> {
  const deckTextureURL =
    asImageSrc(slice.primary.skateboard_deck_texture) || Defalut_Deck_texture;
  const wheelTextureURL =
    asImageSrc(slice.primary.skateboard_wheel_texture) || Defalut_Wheel_texture;
  const boltColorURL =
    slice.primary.skateboard_bolt_color || Defalut_Bolt_color;
  const truckColorURL =
    slice.primary.skateboard_truck_color || Defalut_Truck_color;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div>
      <div className="grid absolute inset-0 mx-auto mt-24 max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading size="lg" className="relative max-w-2xl place-self-start">
          <PrismicRichText field={slice.primary.heading} />
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>
      <InteractiveSkate
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        boltColor={boltColorURL}
        truckColor={truckColorURL}
      />
    </Bounded>
  );
};

export default Hero;
