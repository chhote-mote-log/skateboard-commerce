import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import React from "react";
import { Skater } from "./Skater";
import { Slidein } from "@/app/components/Slidein";

/**
 * Props for `TeamGr`.
 */
export type TeamGrProps = SliceComponentProps<Content.TeamGrSlice>;

/**
 * Component for "TeamGr" Slices.
 */
const TeamGr = async ({ slice }: TeamGrProps)=> {
  const client = createClient();
  const skaters = await client.getAllByType("skater");
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Slidein>
        <Heading className="mb-8 text-center text-white" as="h2" size="lg">
          <PrismicRichText field={slice.primary.heading} />
        </Heading>
      </Slidein>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <React.Fragment key={index}>
            {skater.data.first_name && (<Slidein><Skater index={index} skater={skater} /></Slidein>)}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGr;
