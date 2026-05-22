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
  }
}`;
