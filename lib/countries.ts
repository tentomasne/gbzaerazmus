export interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  image: string;
  details: {
    capital: string;
    language: string;
    currency: string;
    population: string;
    timeZone: string;
  };
  programInfo: {
    duration: string;
    subjects: string[];
    accommodation: string;
    requirements: string[];
  };
  highlights: string[];
}

export const countries: Country[] = [
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    description: 'Discover the rich culture, vibrant traditions, and warm hospitality of Spain while studying in world-renowned institutions.',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    details: {
      capital: 'Madrid',
      language: 'Spanish',
      currency: 'Euro (EUR)',
      population: '47.4 million',
      timeZone: 'CET (UTC+1)',
    },
    programInfo: {
      duration: '3-12 months',
      subjects: ['Spanish Language', 'European History', 'Art & Culture', 'International Business'],
      accommodation: 'Host families, Student residences, Shared apartments',
      requirements: ['Basic Spanish knowledge', 'Good academic standing', 'Medical insurance'],
    },
    highlights: [
      'Study at prestigious universities in Madrid and Barcelona',
      'Experience Flamenco dancing and Spanish cuisine',
      'Visit iconic landmarks like Sagrada Familia and Alhambra',
      'Practice Spanish with native speakers daily',
    ],
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    description: 'Experience the birthplace of Renaissance art, incredible cuisine, and timeless architecture in this culturally rich destination.',
    image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    details: {
      capital: 'Rome',
      language: 'Italian',
      currency: 'Euro (EUR)',
      population: '59.1 million',
      timeZone: 'CET (UTC+1)',
    },
    programInfo: {
      duration: '4-10 months',
      subjects: ['Italian Language', 'Renaissance Art', 'European Politics', 'Culinary Arts'],
      accommodation: 'University dormitories, Host families, Private studios',
      requirements: ['Basic Italian knowledge preferred', 'Academic transcript', 'Health certificate'],
    },
    highlights: [
      'Study in historic cities like Rome, Florence, and Venice',
      'Learn from world-class professors in art and humanities',
      'Explore ancient Roman ruins and Renaissance masterpieces',
      'Enjoy authentic Italian cuisine and wine culture',
    ],
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    description: 'Immerse yourself in French culture, language, and intellectual tradition in the heart of Europe.',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    details: {
      capital: 'Paris',
      language: 'French',
      currency: 'Euro (EUR)',
      population: '67.8 million',
      timeZone: 'CET (UTC+1)',
    },
    programInfo: {
      duration: '3-12 months',
      subjects: ['French Language', 'European Literature', 'Philosophy', 'International Relations'],
      accommodation: 'CROUS residences, Host families, Private housing',
      requirements: ['Basic French proficiency', 'Academic excellence', 'Motivation letter'],
    },
    highlights: [
      'Study at prestigious Sorbonne University in Paris',
      'Experience French café culture and gastronomy',
      'Visit world-famous museums like the Louvre and Musée d\'Orsay',
      'Explore châteaux of the Loire Valley',
    ],
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    description: 'Explore innovation, tradition, and academic excellence in the economic powerhouse of Europe.',
    image: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    details: {
      capital: 'Berlin',
      language: 'German',
      currency: 'Euro (EUR)',
      population: '83.2 million',
      timeZone: 'CET (UTC+1)',
    },
    programInfo: {
      duration: '4-12 months',
      subjects: ['German Language', 'Engineering', 'European Studies', 'Environmental Science'],
      accommodation: 'Student dormitories, WG (shared flats), Host families',
      requirements: ['Basic German knowledge', 'Strong academic record', 'Health insurance'],
    },
    highlights: [
      'Study at top-ranked German universities',
      'Experience Christmas markets and Oktoberfest',
      'Visit historic Berlin Wall and Brandenburg Gate',
      'Explore Bavaria\'s castles and the Black Forest',
    ],
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    description: 'Discover the coastal beauty, warm hospitality, and rich maritime history of Portugal.',
    image: 'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    details: {
      capital: 'Lisbon',
      language: 'Portuguese',
      currency: 'Euro (EUR)',
      population: '10.3 million',
      timeZone: 'WET (UTC+0)',
    },
    programInfo: {
      duration: '3-10 months',
      subjects: ['Portuguese Language', 'Marine Sciences', 'European History', 'Tourism Management'],
      accommodation: 'University residences, Host families, Shared apartments',
      requirements: ['Open to all levels', 'Academic transcript', 'Medical documentation'],
    },
    highlights: [
      'Study in beautiful coastal cities like Porto and Lisbon',
      'Experience Portuguese Fado music and culture',
      'Explore stunning beaches of the Algarve',
      'Discover historic monasteries and palaces',
    ],
  },
];