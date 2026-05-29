import type {
  BraceletContentSize,
  BraceletSizeOption,
  BraceletStrapType,
} from '../core/models/bracelet.model';

export interface SizeOption {
  value: BraceletSizeOption;
  label: string;
  cm: string;
}

export const SIZE_OPTIONS: SizeOption[] = [
  { value: 'S', label: 'S', cm: '15-16 cm' },
  { value: 'M', label: 'M', cm: '17-18 cm' },
  { value: 'L', label: 'L', cm: '19-20 cm' },
  { value: 'XL', label: 'XL', cm: '21+ cm' },
];

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
