/**
 * HSR Snooker Cafe — business details.
 * Edit this file to update anything shown on the site.
 * Only verified information belongs here: no invented prices, menus, table counts or hours.
 */
export const business = {
  name: 'HSR Snooker Cafe',
  category: 'Snooker and pool hall with cafeteria',
  rating: { value: '4.9', outOf: '5', count: 84, source: 'Google' },

  phone: {
    display: '+91 89042 26660',
    tel: 'tel:+918904226660',
  },

  address: {
    lines: ['2nd Floor, 387, 9th Main Road,', '7th Sector, HSR Layout,', 'Bengaluru, Karnataka 560102'],
    singleLine: '2nd Floor, 387, 9th Main Road, 7th Sector, HSR Layout, Bengaluru, Karnataka 560102, India',
    plusCode: 'WJ5P+64 Bengaluru',
  },

  /** Only the listed closing time is verified; do not add hours for other days here. */
  closingTime: '1:00 AM',

  links: {
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=HSR+Snooker+Cafe%2C+2nd+Floor%2C+387%2C+9th+Main+Road%2C+7th+Sector%2C+HSR+Layout%2C+Bengaluru%2C+Karnataka+560102',
    reviews: 'https://www.google.com/maps/search/?api=1&query=HSR+Snooker+Cafe+HSR+Layout+Bengaluru',
    mapEmbed:
      'https://maps.google.com/maps?q=HSR+Snooker+Cafe%2C+2nd+Floor%2C+387%2C+9th+Main+Road%2C+7th+Sector%2C+HSR+Layout%2C+Bengaluru+560102&z=16&output=embed',
    playo: 'https://playo.co/',
    /** Add the verified Instagram URL here to show the icon in the footer. Left empty on purpose. */
    instagram: '',
  },

  /** Short excerpts from customer feedback supplied by the owner. No names or dates are shown on purpose. */
  reviews: [
    'Very beautifully organised and maintained. Really loved the snacks and the staff.',
    'Best place to hang out with friends, with good food and a friendly atmosphere.',
    'The tables are great, and the café is usually busy, so call in advance for billiards.',
  ],

  busyNote:
    'We can get busy — please call ahead to check availability, especially for French billiards, where tables are limited.',
} as const;

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'The Experience' },
  { id: 'cafe', label: 'Café' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'find-us', label: 'Find Us' },
] as const;
