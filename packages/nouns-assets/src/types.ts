export interface NounSeed {
  background: number;
  body: number;
  ear: number;
  head: number;
  glasses: number;
  face: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface NounData {
  parts: EncodedImage[];
  background: string;
}
