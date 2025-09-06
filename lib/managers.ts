export interface Manager {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  office: string;
  image: string;
  bio: string;
  specializations: string[];
  languages: string[];
}

export const managers: Manager[] = [
  {
    id: '1',
    name: 'Dr. Maria Schneider',
    title: 'Erasmus Program Director',
    email: 'maria.schneider@gbza.ch',
    phone: '+41 61 377 94 00',
    office: 'Room 205, Administration Building',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Dr. Schneider has been leading our Erasmus program for over 8 years, coordinating exchanges with partner institutions across Europe. She holds a PhD in European Studies and speaks five languages fluently.',
    specializations: ['Program Coordination', 'Student Selection', 'Partner Relations'],
    languages: ['German', 'English', 'French', 'Spanish', 'Italian']
  },
  {
    id: '2',
    name: 'Prof. Andreas Weber',
    title: 'Academic Coordinator',
    email: 'andreas.weber@gbza.ch',
    phone: '+41 61 377 94 15',
    office: 'Room 312, Academic Building',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Professor Weber oversees the academic aspects of our Erasmus exchanges, ensuring curriculum alignment and credit transfers. He has established partnerships with over 20 European universities.',
    specializations: ['Curriculum Development', 'Credit Transfer', 'Academic Assessment'],
    languages: ['German', 'English', 'French']
  },
  {
    id: '3',
    name: 'Ms. Sophie Laurent',
    title: 'Student Support Coordinator',
    email: 'sophie.laurent@gbza.ch',
    phone: '+41 61 377 94 22',
    office: 'Room 108, Student Services',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Sophie provides comprehensive support to our Erasmus students, from pre-departure preparation to reintegration. She ensures every student has a smooth and enriching experience abroad.',
    specializations: ['Student Counseling', 'Cultural Preparation', 'Crisis Management'],
    languages: ['French', 'German', 'English', 'Portuguese']
  },
  {
    id: '4',
    name: 'Mr. Giovanni Rossi',
    title: 'International Relations Manager',
    email: 'giovanni.rossi@gbza.ch',
    phone: '+41 61 377 94 33',
    office: 'Room 201, International Office',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    bio: 'Giovanni manages our relationships with European partner institutions and coordinates new program developments. His extensive network across Europe helps expand opportunities for our students.',
    specializations: ['Partnership Development', 'Contract Negotiation', 'Program Expansion'],
    languages: ['Italian', 'German', 'English', 'Spanish']
  }
];