export const homepageQuery = `*[_type == "landing"][0]{
  hero {
    eyebrow,
    headline,
    subtitle,
    primaryCta,
    riskReversals,
    "muxPlaybackId": muxVideo.asset->playbackId,
    "muxThumbTime": muxVideo.asset->thumbTime
  },
  adventures {
    eyebrow,
    heading,
    subtitle,
    viewAllCard {
      title,
      subtitle,
      ctaText,
      image
    }
  },
  mission {
    eyebrow,
    heading,
    bodyText,
    imageGallery,
    badges,
    riskReversals
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
    duration,
    description,
    adventureLevel,
    levelLabel,
    ctaText,
    image,
    pricing,
    "region": region->name
  },
  "itinerariesPage": *[_type == "page" && slug.current == "itineraries"][0] {
    eyebrow,
    title,
    subtitle,
    seoDescription,
    ctaText,
    image,
    _updatedAt
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
  },
  popup {
    enabled,
    eyebrow,
    heading,
    description,
    inputPlaceholder,
    ctaText,
    successMessage,
    delaySeconds,
    countdownDays
  }
}`;

export const operatorDetailQuery = `*[_type == "operator" && slug.current == $slug][0] {
  _id,
  companyName,
  slug,
  logo,
  website,
  content[] {
    ...,
    markDefs[] {
      ...,
      _type == "internalActivityLink" => {
        ...,
        "slug": reference->slug.current
      },
      _type == "internalDestinationLink" => {
        ...,
        "slug": reference->slug.current
      }
    }
  },
  gallery[],
  "activities": *[_type == "activity" && (references(^._id) || _id in ^.activities[]._ref)] {
    _id,
    title,
    slug,
    subtitle,
    duration,
    image,
    pricing {
      priceString
    }
  },
  destinations[]-> {
    _id,
    name,
    slug
  },
  cancellationPolicy
}`;

export const itineraryDetailQuery = `*[_type == "itinerary" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  eyebrow,
  subtitle,
  description[] {
    ...,
    markDefs[] {
      ...,
      _type == "activityLink" => {
        ...,
        "slug": reference->slug.current
      }
    }
  },
  image,
  pricing {
    priceString,
    minimumGroup,
    inclusions
  },
  activities[]-> {
    _id,
    title,
    slug,
    eyebrow,
    subtitle,
    duration,
    description,
    adventureLevel,
    image,
    pricing {
      priceString,
      minimumGroup,
      inclusions
    },
    "suppliers": select(
      defined(operator) => [{
        "label": "Vetted Operator",
        "name": operator->companyName,
        "slug": operator->slug.current,
        "logo": operator->logo
      }],
      suppliers[] {
        label,
        name
      }
    )
  },
  relatedActivities[]-> {
    _id,
    title,
    slug,
    subtitle,
    duration,
    image,
    pricing {
      priceString
    }
  }
}`;

export const activityDetailQuery = `*[_type == "activity" && slug.current == $slug][0] {
  _id,
  _type,
  title,
  slug,
  eyebrow,
  subtitle,
  duration,
  description,
  adventureLevel,
  adventureHighlights,
  image,
  pricing {
    priceString,
    minimumGroup,
    inclusions
  },
  "suppliers": select(
    defined(operator) => [{
      "label": "Vetted Operator",
      "name": operator->companyName,
      "slug": operator->slug.current,
      "logo": operator->logo
    }],
    suppliers[] {
      label,
      name
    }
  ),
  relatedActivities[]-> {
    _id,
    title,
    slug,
    subtitle,
    duration,
    image,
    pricing {
      priceString
    }
  }
}`;

export const fallbackRelatedActivitiesQuery = `*[_type == "activity" && slug.current != $slug][0...3] {
  _id,
  title,
  slug,
  subtitle,
  duration,
  image,
  pricing { priceString }
}`;

export const genericPageQuery = `*[_type == "page" && slug.current == $slug][0] {
  title,
  body,
  seoDescription,
  image,
  eyebrow,
  subtitle,
  ctaText,
  _updatedAt
}`;

export const allActivitiesQuery = `*[_type == "activity"] {
  _id,
  title,
  slug,
  eyebrow,
  subtitle,
  duration,
  description,
  adventureLevel,
  levelLabel,
  ctaText,
  image,
  pricing,
  "region": region->name
}`;

export const missionContentQuery = `*[_type == "landing"][0].mission {
  eyebrow,
  heading,
  bodyText,
  imageGallery,
  badges,
  riskReversals
}`;

export const packageDetailQuery = `*[_type in ["activity", "category", "product"] && (_id == $slug || _id == "category-" + $slug || slug.current == $slug)][0] {
  _type,
  eyebrow,
  title,
  description,
  adventureHighlights,
  ctaText,
  imageCaption,
  image,
  modules,
  subtitle,
  days[] {
    dayNumber,
    title,
    description,
    logistics
  },
  suppliers[] {
    label,
    name,
    credential
  },
  pricing {
    priceString,
    minimumGroup,
    inclusions
  }
}`;

export const corporatePageQuery = `*[_type == "corporatePage" || _id == "corporatePage"][0] {
  hero {
    eyebrow,
    heading,
    subtitle,
    ctaButton {
      label,
      href
    },
    backgroundImage
  },
  workshopsSection {
    eyebrow,
    heading,
    description,
    cards[] {
      eyebrow,
      title,
      description,
      tags
    }
  },
  infrastructureSection {
    leftColumn {
      eyebrow,
      heading,
      description,
      bulletPoints[] {
        title,
        text
      },
      image,
      imageCaption
    },
    rightColumn {
      eyebrow,
      heading,
      description,
      bulletPoints[] {
        title,
        text
      },
      image,
      imageCaption
    }
  },
  advantageSection {
    sectionTitle,
    columns[] {
      title,
      description,
      backgroundImage
    }
  },
  packagesSection {
    eyebrow,
    heading,
    description,
    packagesList[] {
      tierEyebrow,
      title,
      description,
      isFeaturedDarkTheme,
      packageId,
      buttonLabel,
      headerImage,
      inclusions
    }
  },
  inquirySection {
    leftEditorial {
      eyebrow,
      heading,
      description,
      commitmentsBox {
        eyebrow,
        items
      }
    },
    formConfig {
      formEyebrow,
      formSubtitle,
      defaultSubject,
      responseGuaranteeText
    }
  }
}`;

