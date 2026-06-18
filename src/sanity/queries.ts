export const homepageQuery = `*[_type == "homepage"][0]{
  hero {
    eyebrow,
    headline,
    subtitle,
    primaryCta,
    secondaryCta
  },
  mission {
    eyebrow,
    headline,
    bodyText,
    photoDeck[] {
      label,
      image
    }
  },
  categories[]-> {
    eyebrow,
    title,
    description,
    ctaText,
    image,
    imageCaption,
    modules[] {
      number,
      label
    }
  },
  engine {
    builderEyebrow,
    builderHeadline,
    builderSubtitle,
    eyebrow,
    headline,
    description,
    ctaText,
    swaps[] {
      from,
      to
    },
    validationMessage,
    pricingNote
  },
  footer {
    copyright,
    columns[] {
      heading,
      links[] {
        label,
        href
      }
    }
  },
  "allProducts": *[_type == "activity"] {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    description,
    adventureLevel,
    ctaText,
    image,
    pricing
  },
  "allItineraries": *[_type == "itinerary"] {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    image,
    pricing
  }
}`;
