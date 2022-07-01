import Token, { TokenInterface } from './Token';
import { TokensType } from './index';

export type BitmapFormat = 'png' | 'jpg' | 'webp' | 'avif' | 'wp2';

export interface BitmapValue {
  url: string;
  format: BitmapFormat;
  dimension?: number;
  fileName?: string;
}

export class BitmapToken extends Token implements TokenInterface {
  type: TokensType = 'bitmap';
  value: BitmapValue;

  constructor(element: Partial<BitmapToken>) {
    super(element);
    this.value = element.value!;
  }
}
