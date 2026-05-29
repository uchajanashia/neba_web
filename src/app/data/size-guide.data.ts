export interface SizeRow {
  wristSize: string;
  recommendationKey: string;
}

export const SIZE_GUIDE: SizeRow[] = [
  { wristSize: '15-16 cm', recommendationKey: 'guide.size.rec.small' },
  { wristSize: '17-18 cm', recommendationKey: 'guide.size.rec.medium' },
  { wristSize: '19-20 cm', recommendationKey: 'guide.size.rec.large' },
  { wristSize: '20+ cm', recommendationKey: 'guide.size.rec.custom' },
];
