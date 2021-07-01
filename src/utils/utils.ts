import { CampaignType, CouponType } from 'greenpeace';

export const isCouponType = (x: any, y: any): x is CouponType => y.includes(x);
export const isCampaign = (x: any, y: any): x is CampaignType => y.includes(x);