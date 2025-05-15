import call from '~/assets/icons/call.svg';
import facebook from '~/assets/icons/facebook.svg';
import instagram from '~/assets/icons/instagram.svg';
import location from '~/assets/icons/location.svg';
import message from '~/assets/icons/message.svg';
import pinterest from '~/assets/icons/pinterest.svg';
import telegram from '~/assets/icons/telegram.svg';
import twitter from '~/assets/icons/twitter.svg';

export const FOOTER_INFO = {
  COPYRIGHT: {
    CREDITS: '© 2025 HUH Coffee',
    POLICY: 'Privacy policy',
    TERMS: 'Terms and conditions',
  },
  CREDENTIALS: {
    DESCRIPTION: 'Discover the richness of nature in our coffee products.',
    EMAIL: 'info@huh-coffee.top',
    LOCATION: 'London, UK',
    MOBILE: '+12 050 123 45 67',
  },
  LISTS: {
    ACCOUNT: 'My account',
    CARE: 'Customer care',
    HELP: 'Help',
  },
  SUBSCRIPTION: {
    CTA: 'Subscribe →',
    DESCRIPTION: 'Stay informed, subscribe to our newsletter now!',
    TITLE: 'Sign up for emails',
  },
};

export const HELP_LINKS_TEXT = {
  CONTACT: 'Contact us',
  FAQ: 'FAQ',
  SHIPPING: 'Shipping & Returns',
};

export const ACCOUNT_LINKS_TEXT = {
  ADDRESSES: 'Addresses',
  ORDER_STATUS: 'Order Status',
  WISHLIST: 'Wishlist',
};

export const CARE_LINKS_TEXT = {
  ABOUT: 'About us',
  BLOG: 'Blog',
};

export const SOCIAL_LINKS = [
  { href: 'https://facebook.com', icon: facebook },
  { href: 'https://pinterest.com', icon: pinterest },
  { href: 'https://telegram.com', icon: telegram },
  { href: 'https://instagram.com', icon: instagram },
  { href: 'https://twitter.com', icon: twitter },
];

export const CONTACT_LINKS = [
  {
    href: `tel:${FOOTER_INFO.CREDENTIALS.MOBILE.split(' ').join('').toString()}`,
    icon: call,
    text: FOOTER_INFO.CREDENTIALS.MOBILE,
  },
  {
    href: `mailto:${FOOTER_INFO.CREDENTIALS.EMAIL}`,
    icon: message,
    text: FOOTER_INFO.CREDENTIALS.EMAIL,
  },
  {
    href: 'https://www.google.com/maps/place/London,+UK/',
    icon: location,
    text: FOOTER_INFO.CREDENTIALS.LOCATION,
  },
];

export const SUBSCRIPTION_SUCCESS = "You've been successfully subscribed!";
