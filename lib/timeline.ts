export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  date: string;
  category: 'achievement' | 'partnership' | 'program' | 'milestone';
  image?: string;
  country?: string;
  featured: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    year: 2010,
    title: 'Erasmus Program Launch',
    description: 'GBZA officially launched its Erasmus+ program with the first partnership agreement signed with University of Barcelona, marking the beginning of our international education journey.',
    date: '2010-09-15',
    category: 'milestone',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    country: 'Spain',
    featured: true
  },
  {
    id: '2',
    year: 2012,
    title: 'First Student Exchange Success',
    description: 'Our inaugural group of 8 students successfully completed their semester in Barcelona, achieving a 100% completion rate and establishing the foundation for future exchanges.',
    date: '2012-06-20',
    category: 'achievement',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    country: 'Spain',
    featured: true
  },
  {
    id: '3',
    year: 2014,
    title: 'French Partnership Established',
    description: 'Partnership with Sorbonne University in Paris was established, expanding our program to include French language and culture studies.',
    date: '2014-03-10',
    category: 'partnership',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    country: 'France',
    featured: true
  },
  {
    id: '4',
    year: 2015,
    title: '100 Students Milestone',
    description: 'Celebrated our 100th student participant in the Erasmus program, demonstrating the growing success and popularity of international education at GBZA.',
    date: '2015-11-05',
    category: 'achievement',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: '5',
    year: 2016,
    title: 'Italian Program Launch',
    description: 'Expanded to Italy with partnerships at Sapienza University of Rome and University of Florence, adding Renaissance art and culture to our curriculum.',
    date: '2016-08-22',
    category: 'partnership',
    image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    country: 'Italy',
    featured: true
  },
  {
    id: '6',
    year: 2018,
    title: 'German Technical Exchange',
    description: 'Launched specialized STEM program with Technical University of Munich, focusing on engineering and technology studies.',
    date: '2018-02-14',
    category: 'program',
    image: 'https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    country: 'Germany',
    featured: false
  },
  {
    id: '7',
    year: 2019,
    title: 'Portuguese Coastal Studies',
    description: 'Established marine biology and coastal studies program in Portugal, partnering with University of Aveiro for environmental research.',
    date: '2019-09-30',
    category: 'program',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    country: 'Portugal',
    featured: false
  },
  {
    id: '8',
    year: 2020,
    title: 'Digital Adaptation Success',
    description: 'Successfully adapted all programs to digital format during the pandemic, maintaining 95% student satisfaction and program continuity.',
    date: '2020-05-15',
    category: 'achievement',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: false
  },
  {
    id: '9',
    year: 2022,
    title: 'Alumni Network Launch',
    description: 'Established the official GBZA Erasmus Alumni Network, connecting over 300 former participants across Europe for mentorship and career opportunities.',
    date: '2022-10-12',
    category: 'milestone',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: true
  },
  {
    id: '10',
    year: 2024,
    title: 'Sustainability Initiative',
    description: 'Launched comprehensive sustainability program across all destinations, focusing on environmental awareness and green practices in international education.',
    date: '2024-01-20',
    category: 'program',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    featured: false
  }
];

export const getEventsByYear = (year: number): TimelineEvent[] => {
  return timelineEvents.filter(event => event.year === year);
};

export const getEventsByCategory = (category: string): TimelineEvent[] => {
  return timelineEvents.filter(event => event.category === category);
};

export const getFeaturedEvents = (): TimelineEvent[] => {
  return timelineEvents.filter(event => event.featured).slice(0, 4);
};

export const getAvailableYears = (): number[] => {
  const years = [...new Set(timelineEvents.map(event => event.year))];
  return years.sort((a, b) => b - a);
};

export const getAvailableCategories = (): string[] => {
  return ['achievement', 'partnership', 'program', 'milestone'];
};