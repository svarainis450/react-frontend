import visa from '../../../Assets/images/payments/visa.svg';
import mastercard from '../../../Assets/images/payments/mastercard.svg';
import amex from '../../../Assets/images/payments/amex.svg';
import paypal from '../../../Assets/images/payments/paypal.svg';
import applepay from '../../../Assets/images/payments/applepay.svg';
import gpay from '../../../Assets/images/payments/gpay.svg';

import ig from '../../../Assets/images/social/ig.svg';
import twitter from '../../../Assets/images/social/twitter.svg';
import discord from '../../../Assets/images/social/dc.svg';
import telegram from '../../../Assets/images/social/telegram.svg';

import {LinkList} from '../../../types/'


export const pageListLarge = [
  {
    title: 'Potato',
    links: [
      {title: 'About', url: LinkList.About},
      {title: 'Pricing', url: LinkList.Pricing},
      {title: 'Demo tour', url: LinkList.Demo},
      {title: 'Partnerships', url: LinkList.PARTNERSHIPS},
    ]
  },
  {
    title: 'Help center',
    links: [
      {title: 'Privacy policy', url: LinkList.PrivacyPolicy},
      {title: 'Terms & conditions', url: LinkList.TermsAndConditions},
      {title: 'FAQs', url: LinkList.Faq},
    ]
  },
]

export const pageListMobile = [
  {title: 'About', url: LinkList.About},
  {title: 'Pricing', url: LinkList.Pricing},
  {title: 'FAQ', url: LinkList.Faq},
  {title: 'Privacy Policy', url: LinkList.PrivacyPolicy},
  {title: 'Terms & conditions', url: LinkList.TermsAndConditions},
]

export const paymentList = [
  {
    type: 'visa',
    url: '/',
    img: visa
  },
  {
    type: 'mastercard',
    url: '/',
    img: mastercard
  },
  {
    type: 'amex',
    url: '/',
    img: amex
  },
  {
    type: 'paypal',
    url: '/',
    img: paypal
  },
  {
    type: 'applepay',
    url: '/',
    img: applepay
  },
  {
    type: 'gpay',
    url: '/',
    img: gpay
  },
]

export const socialList = [
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/potato.platform/',
    img: ig,
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/Potatodata',
    img: twitter
  },
  {
    title: 'Discord',
    url: 'https://discord.gg/MuQzdTCff4',
    img: discord
  },
  {
    title: 'Telegram',
    url: '/',
    img: telegram
  },
]