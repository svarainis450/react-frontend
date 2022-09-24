import { SelectedPlan } from 'src/state/reduxstate/user/types';
import { LinkList } from '../../../types';

export const planTypes = {
  yearly: 'yearly',
  monthly: 'monthly',
};

export interface Plan extends SelectedPlan {
  isMostPopular: boolean;
  description: string;
  discount: string;
  url: LinkList;
  bullets: string[];
  priceAfterDownsell?: number;
}

export const priceOptions: Record<string, Plan[]> = {
  [planTypes.monthly]: [
    {
      isMostPopular: false,
      plan: 'Potato Starter',
      description: 'Perfect for people who start investing in crypto',
      discount: '',
      monthly_price: 12,
      begin_price: 12,
      url: LinkList.Membership,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)',
      ],
      billing_type: 'monthly',
    },
    {
      isMostPopular: false,
      plan: 'Potato Pro',
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '',
      monthly_price: 20,
      begin_price: 20,
      url: LinkList.Membership,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      billing_type: 'monthly',
    },
  ],

  [planTypes.yearly]: [
    {
      isMostPopular: false,
      plan: 'Potato Starter',
      description: 'Perfect for people who start investing in crypto',
      discount: '-42',
      monthly_price: 5,
      begin_price: 60,
      url: LinkList.Membership,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)',
      ],
      billing_type: 'yearly',
    },
    {
      isMostPopular: true,
      plan: 'Potato Pro',
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '-25',
      monthly_price: 15,
      begin_price: 180,
      url: LinkList.Membership,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      billing_type: 'yearly',
    },
  ],
};
