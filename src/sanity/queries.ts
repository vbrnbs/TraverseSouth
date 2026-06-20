export const homepageQuery = `*[_type == "landing"][0]{
  hero {
    eyebrow,
    headline,
    subtitle,
    primaryCta,
    riskReversals,
    "muxPlaybackId": muxVideo.asset->playbackId
  },
  mission {
    eyebrow,
    heading,
    bodyText,
    imageGallery,
    badges
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
  featuredActivities[]-> {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    description,
    adventureLevel,
    ctaText,
    image,
    pricing,
    region
  },
  featuredItineraries[]-> {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    image,
    pricing,
    activities[]-> {
      image
    }
  }
}`;
