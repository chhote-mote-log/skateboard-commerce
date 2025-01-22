import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import { Logo } from "@/app/components/Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";
import { asImageSrc } from "@prismicio/client";



export const Footer = async () => {
  const client = createClient();
  const settings = await client.getSingle("settings");

const boardTextURLs = settings.data.skateboards_footer.map((item)=>asImageSrc(item.skateboard,{h:600})).filter((url):url is string =>Boolean(url))

  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-0/16 md:aspect-auto">
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          width={1200}
          className="object-cover"
        />
        <FooterPhysics boardTextureURLs={boardTextURLs} className="overflow-hidden absolute inset-0"/>
        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28"/>
      </div>
      <Bounded as="nav">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
            {settings.data.navigation.map((item)=>(
                <li className="hover:underline" key={item.link.text}>
                    <PrismicNextLink field={item.link}/>
                </li>
            ))}
        </ul>
      </Bounded>
    </footer>
  );
};
