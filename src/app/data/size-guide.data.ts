export interface SizeRow {
  wristSize: string;
  recommendation: string;
}

export const SIZE_GUIDE: SizeRow[] = [
  { wristSize: '15-16 cm', recommendation: 'Small' },
  { wristSize: '17-18 cm', recommendation: 'Medium' },
  { wristSize: '19-20 cm', recommendation: 'Large' },
  { wristSize: '20+ cm', recommendation: 'Custom - contact us' },
];
