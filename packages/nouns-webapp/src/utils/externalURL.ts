export enum ExternalURL {
  discord,
  twitter,
  notion,
  discourse,
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'https://discord.gg/Attgsp9TTM';
    case ExternalURL.twitter:
      return 'https://twitter.com/lilgoblinswtf';
    case ExternalURL.notion:
      return 'https://lilnouns.notion.site/Explore-Lil-Nouns-db990658e6ab4cf19121b22642645032';
    case ExternalURL.discourse:
      return 'https://discourse.lilnouns.wtf/';
  }
};
