import type {
  BraceletContentSize,
  BraceletStrapType,
} from '../core/models/bracelet.model';

export interface StrapOption {
  value: BraceletStrapType;
  color: string;
}

export const STRAP_OPTIONS: StrapOption[] = [
  { value: 'leather-brown', color: '#5A3825' },
  { value: 'leather-black', color: '#1A1713' },
  { value: 'rubber', color: '#2C2C2C' },
];

export interface ContentSizeOption {
  value: BraceletContentSize;
}

export const CONTENT_SIZE_OPTIONS: ContentSizeOption[] = [
  { value: 'large' },
  { value: 'small' },
];
