import type { StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Homepage section containing Landing page singleton and all Page documents in a single list
      S.listItem()
        .title('Homepage')
        .child(
          S.documentList()
            .title('Homepage & Pages')
            .filter('_type == "landing" || _type == "page"')
            .apiVersion('2026-02-01')
        ),
      
      S.divider(),
      
      // Other document types
      S.listItem()
        .title('Destinations')
        .child(S.documentTypeList('destination').title('Destinations')),
      S.listItem()
        .title('Activities')
        .child(S.documentTypeList('activity').title('Activities')),
      S.listItem()
        .title('Itineraries')
        .child(S.documentTypeList('itinerary').title('Itineraries')),
    ]);
