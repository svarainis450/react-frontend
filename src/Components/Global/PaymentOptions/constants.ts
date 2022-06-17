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
        '3 chosen crypto experts to follow',
        '1 month of historical data storage',
        'Text recognition only'
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
        '18 months of historical data storage',
        'An unlimited amount of categories to follow',
        '24/7 support with a four-hour response time',
        'Text and video data recognition',
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
        '3 chosen crypto experts to follow',
        '1 month of historical data storage',
        'Text recognition only'
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
        '18 months of historical data storage',
        'An unlimited amount of categories to follow',
        '24/7 support with a four-hour response time',
        'Text and video data recognition',
      ],
      period: 'Yearly'
    }
  ]
}