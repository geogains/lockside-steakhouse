import { SectionHeading } from "@/components/shared/SectionHeading";
import { Carousel } from "@/components/shared/Carousel";
import { galleryImages } from "@/data/gallery";

export const Gallery = () => (
  <section
    id="gallery"
    data-surface="dark"
    aria-labelledby="gallery-heading"
    className="scroll-mt-24 bg-ink py-20 md:py-28"
  >
    <div className="container-content">
      <SectionHeading
        eyebrow="The place"
        title="Inside Lockside"
        id="gallery-heading"
        align="center"
        intro="A look at the plates coming out of our open kitchen."
      />

      <div className="mt-12">
        <Carousel slides={galleryImages} aria-label="Lockside photography" />
      </div>
    </div>
  </section>
);
