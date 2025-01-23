import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/app/components/Bounded";
// import { PrismicNextLink } from "@prismicio/next";
import { Heading } from "@/app/components/Heading";
import ProductSkateboard from "./ProductSkateboard";
import { Slidein } from "@/app/components/Slidein";
/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid = ({ slice }: ProductGridProps)=> {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-gray"
    >
      <Slidein>
        <Heading className="text-center ~mb-4/6" as="h2">
          <PrismicText field={slice.primary.heading} />
        </Heading>
      <div className="text-center ~mb-6/10">
        <PrismicRichText field={slice.primary.body} />
      </div>
      </Slidein>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {slice.primary.product.map(
          ({ skateboard }) =>
            isFilled.contentRelationship(skateboard) && (
              <ProductSkateboard key={skateboard.id} id={skateboard.id} />
            )
        )}
      </div>
    </Bounded>
  );
};

export default ProductGrid;
