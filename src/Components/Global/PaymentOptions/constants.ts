import {
  StripeProductKeys,
  SubsPriceIdStripe,
} from 'src/globalConstants/prices';
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

export const isDevelopment = process.env.REACT_APP_ENV === 'development';

export const priceOptions: Record<string, Plan[]> = {
  [planTypes.monthly]: [
    {
      key: 'potato-starter-monthly',
      title: 'Potato Starter',
      final_price: 12,
      subscription_period: 1,
      isMostPopular: false,
      togglePayment: true,
      description: 'Perfect for people who start investing in crypto',
      discount: '',
      url: LinkList.Membership,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)',
      ],
      stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.STARTER_MONTHLY_DEV
        : SubsPriceIdStripe.STARTER_MONTHLY_PROD,
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DEV
        : StripeProductKeys.POTATO_STARTER_PROD,
      downsell: {
        price: 12,
        final_price: 10.2,
        stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.STARTER_DOWNSELL_MONTHLY_DEV
        : SubsPriceIdStripe.STARTER_DOWNSELL_MONTHLY_PROD,
        product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DOWNSELL_DEV
        : StripeProductKeys.POTATO_STARTER_DOWNSELL_PROD,
      }
    },
    {
      key: 'potato-pro-monthly',
      title: 'Potato Pro',
      isMostPopular: false,
      final_price: 20,
      subscription_period: 1,
      togglePayment: true,
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '',
      url: LinkList.Membership,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.PRO_MONTHLY_DEV
        : SubsPriceIdStripe.PRO_MONTHLY_PROD,
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DEV
        : StripeProductKeys.POTATO_PRO_PROD,
        downsell: {
          price: 20,
          final_price: 17,
          stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.PRO_DOWNSELL_MONTHLY_DEV
        : SubsPriceIdStripe.PRO_DOWNSELL_MONTHLY_PROD,
      product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DOWNSELL_DEV
        : StripeProductKeys.POTATO_PRO_DOWNSELL_PROD,
        }
    },
  ],

  [planTypes.yearly]: [
    {
      key: 'potato-starter-yearly',
      isMostPopular: false,
      title: 'Potato Starter',
      description: 'Perfect for people who start investing in crypto',
      discount: '-42',
      final_price: 60,
      subscription_period: 12,
      url: LinkList.Membership,
      togglePayment: true,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)',
      ],
      stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.STARTER_YEARLY_DEV
        : SubsPriceIdStripe.STARTER_YEARLY_PROD,
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DEV
        : StripeProductKeys.POTATO_STARTER_PROD,
      
      downsell: {
        price: 60,
        final_price: 51,
        stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.STARTER_DOWNSELL_YEARLY_DEV
        : SubsPriceIdStripe.STARTER_DOWNSELL_YEARLY_PROD,
      product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DOWNSELL_DEV
        : StripeProductKeys.POTATO_STARTER_DOWNSELL_PROD,
      }
    },
    {
      key: 'potato-pro-yearly',
      isMostPopular: true,
      title: 'Potato Pro',
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '-25',
      final_price: 180,
      subscription_period: 12,
      url: LinkList.Membership,
      togglePayment: true,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.PRO_YEARLY_DEV
        : SubsPriceIdStripe.PRO_YEARLY_DEV,
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DEV
        : StripeProductKeys.POTATO_PRO_PROD,
        downsell: {
          price: 180,
          final_price: 153,
        stripe_price_id: isDevelopment
        ? SubsPriceIdStripe.PRO_DOWNSELL_YEARLY_DEV
        : SubsPriceIdStripe.PRO_DOWNSELL_YEARLY_PROD,
        product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DOWNSELL_DEV
        : StripeProductKeys.POTATO_PRO_DOWNSELL_PROD,
        }
    },
  ],
};

export const PRICE_OPTIONS_BIGGER: Record<string, Plan[]> = {
  [planTypes.monthly]: [
    {
      key: 'potato-starter-monthly',
      title: 'Potato Starter',
      final_price: 19,
      subscription_period: 1,
      isMostPopular: false,
      togglePayment: true,
      description: 'Perfect for people who start investing in crypto',
      discount: '',
      url: LinkList.Membership,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)',
      ],
      stripe_price_id: isDevelopment
        ? 'price_1LyF5eLPHXTxUZlWHNmpVIjz'
        : 'price_1LyF90LPHXTxUZlWVw1KEriI',
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DEV
        : StripeProductKeys.POTATO_STARTER_PROD,
      downsell: {
        price: 19,
        final_price: 16.15,
        stripe_price_id: isDevelopment
        ? 'price_1LyuJdLPHXTxUZlWyDR2QBLG'
        : 'price_1LyuLLLPHXTxUZlWzvRNt0QR',
        product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DOWNSELL_DEV
        : StripeProductKeys.POTATO_STARTER_DOWNSELL_PROD,
      }
    },
    {
      key: 'potato-pro-monthly',
      title: 'Potato Pro',
      isMostPopular: false,
      final_price: 39,
      subscription_period: 1,
      togglePayment: true,
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '',
      url: LinkList.Membership,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      stripe_price_id: isDevelopment
        ? 'price_1LyFBkLPHXTxUZlWJL0dJbgN'
        : 'price_1LyFDuLPHXTxUZlWZiJ6Ebwy',
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DEV
        : StripeProductKeys.POTATO_PRO_PROD,
        downsell: {
          price: 39,
          final_price: 33.15,
          stripe_price_id: isDevelopment
        ? 'price_1LyuOsLPHXTxUZlWmWY5ElP2'
        : 'price_1LyuNQLPHXTxUZlWcVdACxsI',
      product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DOWNSELL_DEV
        : StripeProductKeys.POTATO_PRO_DOWNSELL_PROD,
        }
    },
  ],

  [planTypes.yearly]: [
    {
      key: 'potato-starter-yearly',
      isMostPopular: false,
      title: 'Potato Starter',
      description: 'Perfect for people who start investing in crypto',
      discount: '-42',
      final_price: 108,
      subscription_period: 12,
      url: LinkList.Membership,
      togglePayment: true,
      bullets: [
        'Limited amount of crypto experts to follow',
        'Limited amount of crypto and NFT projects to follow',
        'Social sentiment & mentions volume analysis only (excl. price & volume)',
      ],
      stripe_price_id: isDevelopment
        ? 'price_1LyF6KLPHXTxUZlWxZdvfsK2'
        : 'price_1LyF9fLPHXTxUZlWqHLXXFBw',
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DEV
        : StripeProductKeys.POTATO_STARTER_PROD,
      
      downsell: {
        price: 108,
        final_price: 91.8,
        stripe_price_id: isDevelopment
        ? 'price_1LyuK4LPHXTxUZlWpIiDAFE0'
        : 'price_1LyuLwLPHXTxUZlWMC25AFGE',
      product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_STARTER_DOWNSELL_DEV
        : StripeProductKeys.POTATO_STARTER_DOWNSELL_PROD,
      }
    },
    {
      key: 'potato-pro-yearly',
      isMostPopular: true,
      title: 'Potato Pro',
      description: 'Perfect for crypto gurus and advanced traders',
      discount: '-25',
      final_price: 348,
      subscription_period: 12,
      url: LinkList.Membership,
      togglePayment: true,
      bullets: [
        'Follow an unlimited amount of crypto experts',
        'Follow an unlimited amount of projects',
        'NFT floor price and volume analysis',
        'Crypto price and volume analysis',
        '24/7 support with a four-hour response time',
      ],
      stripe_price_id: isDevelopment
        ? 'price_1LyFCFLPHXTxUZlWcP1l3Fxq'
        : 'price_1LyFDDLPHXTxUZlW4J47yzdO',
      stripe_product: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DEV
        : StripeProductKeys.POTATO_PRO_PROD,
        downsell: {
          price: 348,
          final_price: 295.8,
        stripe_price_id: isDevelopment
        ? 'price_1LyuOSLPHXTxUZlWaOlvBLZm'
        : 'price_1LyuNwLPHXTxUZlWm5S0eMTh',
        product_stripe: isDevelopment
        ? StripeProductKeys.POTATO_PRO_DOWNSELL_DEV
        : StripeProductKeys.POTATO_PRO_DOWNSELL_PROD,
        }
    },
  ],
};
