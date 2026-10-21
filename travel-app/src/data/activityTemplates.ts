import type { Slot, TripType } from '../types';

// "{destination}" is replaced with the trip's destination.
export const ACTIVITY_TEMPLATES: Record<TripType, Record<Slot, string[]>> = {
  relaxed: {
    morning: [
      'Slow breakfast at a café in {destination}',
      'Stroll through a park or garden',
      'Sleep in, then coffee with a view',
      'Gentle walk along the waterfront',
      'Browse a weekend market at your own pace',
    ],
    afternoon: [
      'Spa or massage',
      'Read a book in a quiet square',
      'Long lunch with nowhere to be',
      'Beach, pool or lakeside lounging',
      'Boutique shopping in {destination}',
    ],
    evening: [
      'Sunset drinks somewhere scenic',
      'Early dinner at a cosy local restaurant',
      'Evening walk through the old town',
      'Rooftop bar with a view of {destination}',
      'Quiet night in with takeaway',
    ],
  },
  adventure: {
    morning: [
      'Sunrise hike near {destination}',
      'Kayaking or paddleboarding',
      'Bike tour of {destination}',
      'Rock climbing or bouldering session',
      'Early start for a day trip into nature',
    ],
    afternoon: [
      'Zip-lining or a ropes course',
      'Snorkelling, diving or a boat trip',
      'Trail run or mountain bike ride',
      'Canyoning, rafting or caving tour',
      'Explore a lesser-known neighbourhood on foot',
    ],
    evening: [
      'Night market or street food crawl',
      'Stargazing spot outside {destination}',
      'Hearty dinner to refuel',
      'Live music at a local venue',
      'Plan tomorrow\'s route over a drink',
    ],
  },
  family: {
    morning: [
      'Zoo or aquarium in {destination}',
      'Playground and picnic in a big park',
      'Hands-on science or children\'s museum',
      'Short, kid-friendly nature walk',
      'Pancake breakfast, then a train or tram ride',
    ],
    afternoon: [
      'Nap or downtime back at the hotel',
      'Swimming pool or splash park',
      'Ice cream and a stroll around {destination}',
      'Boat ride or hop-on hop-off bus',
      'Theme park or farm visit',
    ],
    evening: [
      'Early family dinner',
      'Puppet show, circus or family-friendly show',
      'Bedtime stories and an early night',
      'Evening walk to see the city lights',
      'Pizza and a movie',
    ],
  },
  foodie: {
    morning: [
      'Bakery crawl in {destination}',
      'Food market tour with tastings',
      'Classic local breakfast spot',
      'Coffee roaster or specialty café',
      'Cooking class with a market visit',
    ],
    afternoon: [
      'Street food tour of {destination}',
      'Long lunch at a famous local institution',
      'Wine, beer or tea tasting',
      'Cheese, chocolate or pastry shop hop',
      'Visit a farm, vineyard or producer outside town',
    ],
    evening: [
      'Tasting menu at a standout restaurant',
      'Neighbourhood bistro the locals love',
      'Night market grazing',
      'Cocktail bar with local spirits',
      'Regional speciality dinner in {destination}',
    ],
  },
  culture: {
    morning: [
      'Main museum or gallery in {destination}',
      'Guided walking tour of the historic centre',
      'Visit a cathedral, temple or landmark',
      'Architecture walk',
      'Local history museum',
    ],
    afternoon: [
      'Smaller gallery or artist studios',
      'Historic house or palace tour',
      'Craft workshop or local artisan visit',
      'Neighbourhood with street art or murals',
      'Library, archive or bookshop crawl in {destination}',
    ],
    evening: [
      'Theatre, opera or concert',
      'Traditional music or dance performance',
      'Dinner in a historic quarter',
      'Evening lecture, film or festival event',
      'Night tour of {destination}\'s landmarks',
    ],
  },
};
