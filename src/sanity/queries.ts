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
  "allProducts": *[_type == "product"] {
    _id,
    title,
    slug,
    eyebrow,
    description,
    adventureScore,
    durationDays,
    image,
    pricing
  }
}`;
