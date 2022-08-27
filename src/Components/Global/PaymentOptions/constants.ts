import { LinkList } from "../../../types"

export const planTypes = {
  yearly: 'yearly',
  monthly: 'monthly',
}

export interface Plan {
  isMostPopular: boolean,
  name: string,
  description: string,
  discount: string,
  price: string,
  beginPrice: string,
  url: LinkList,
  bullets: string[],
  period: string,
  priceAfterDownsell?: number
};

export const priceOptions: Record<string, Plan[]> = {
  [planTypes.monthly]: [
    {
      isMostPopular: false,
      name: 'Potato Starter',
      description: 'Perfect for people who start investing in crypto',
      discount: '',
      price: '12',
      beginPrice: '12',
      url: LinkList.Membership,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)'
      ],
      period: 'Monthly'
    },
    {
      isMostPopular: false,
      name: 'Potato Pro',
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '',
      price: '20',
      beginPrice: '20',
      url: LinkList.Membership,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      period: 'Monthly'
    },
  ],

  [planTypes.yearly]: [
    {
      isMostPopular: false,
      name: 'Potato Starter',
      description: 'Perfect for people who start investing in crypto',
      discount: '-42',
      price: '5',
      beginPrice: '60',
      url: LinkList.Membership,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)'
      ],
      period: 'Yearly'
    },
    {
      isMostPopular: true,
      name: 'Potato Pro',
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '-25',
      price: '15',
      beginPrice: '180',
      url: LinkList.Membership,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      period: 'Yearly'
    }
  ]
}