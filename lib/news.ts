export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  country: string;
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Spanish Students Share Their Barcelona Experience',
    excerpt: 'Our students recently returned from an incredible semester in Barcelona, sharing insights about their cultural immersion and academic achievements.',
    content: `
      Our group of 12 students recently completed their semester at the University of Barcelona, and their experiences have been nothing short of transformative. From mastering the Spanish language to exploring Catalonian culture, each student has returned with valuable skills and unforgettable memories.

      "The program exceeded all my expectations," said Sarah Mueller, a third-year student who studied International Business. "Not only did I improve my Spanish significantly, but I also gained a deeper understanding of European business practices through hands-on projects with local companies."

      The students participated in various cultural activities, including flamenco dancing lessons, cooking classes featuring traditional Spanish cuisine, and guided tours of architectural marvels like the Sagrada Familia and Park Güell. These experiences provided them with authentic insights into Spanish culture beyond the classroom.

      Academic achievements were equally impressive. All students successfully completed their coursework, with several receiving recognition for outstanding performance in their respective fields. The integration with local students fostered lasting friendships and professional networks that will benefit them throughout their careers.

      The program also included sustainability workshops, where students learned about Barcelona's innovative approaches to urban planning and environmental conservation. This knowledge aligns perfectly with our school's commitment to global citizenship and environmental responsibility.

      As we prepare for the next semester's departure, we're excited to see how these experiences will continue to shape our students' personal and academic development.
    `,
    author: 'Maria Gonzalez',
    publishedAt: '2024-12-15',
    image: 'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    country: 'Spain',
    tags: ['Student Experience', 'Cultural Exchange', 'Academic Success']
  },
  {
    id: '2',
    title: 'New Partnership with University of Rome',
    excerpt: 'We are excited to announce our latest partnership with Sapienza University of Rome, expanding our Italian program opportunities.',
    content: `
      We are thrilled to announce our newest partnership with Sapienza University of Rome, one of Europe's oldest and most prestigious universities. This collaboration significantly expands our Italian program offerings and provides students with access to world-class facilities and renowned faculty members.

      The partnership, formally signed this month, opens doors to new academic opportunities in fields such as Art History, Classical Studies, European Politics, and Engineering. Students will have access to the university's extensive libraries, research facilities, and cultural resources in the heart of Rome.

      "This partnership represents a major milestone for our Erasmus program," said Dr. Andreas Weber, our program director. "Sapienza University's rich history and academic excellence align perfectly with our commitment to providing transformative educational experiences."

      The new collaboration includes several unique features:
      - Access to specialized courses taught by leading Italian scholars
      - Participation in archaeological excavations and historical research projects
      - Internship opportunities with Italian cultural institutions and museums
      - Language immersion programs with dedicated Italian language support

      Our first group of students will begin their studies in Rome this spring semester, with applications currently being accepted for the fall 2025 intake. The program will accommodate up to 15 students per semester, ensuring personalized attention and meaningful cultural integration.

      Additionally, the partnership includes a faculty exchange component, allowing our teachers to collaborate with Italian colleagues on research projects and curriculum development. This academic cooperation will enrich our European Studies program back home.

      Students interested in this exciting opportunity should contact our Erasmus coordinators for application details and requirements. The application deadline for the fall 2025 semester is March 15, 2024.
    `,
    author: 'Dr. Andreas Weber',
    publishedAt: '2024-12-10',
    image: 'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    country: 'Italy',
    tags: ['Partnership', 'University', 'Academic Opportunity']
  },
  {
    id: '3',
    title: 'French Immersion Program Celebrates 10 Years',
    excerpt: 'Our French immersion program marks its tenth anniversary with record participation and outstanding student outcomes.',
    content: `
      This year marks a significant milestone for our French immersion program as we celebrate ten years of successful cultural and academic exchanges. Since its inception in 2014, the program has welcomed over 200 students to various French cities, creating lasting impacts on their personal and academic development.

      The anniversary celebration took place last week at our school, featuring presentations from program alumni, current participants, and French partner institutions via video conference. The event highlighted the program's evolution and its role in fostering international understanding.

      "Ten years ago, we started with just eight students going to Lyon," reflected Christine Dubois, our French program coordinator. "Today, we have partnerships with institutions in Paris, Lyon, Toulouse, and Marseille, accommodating up to 25 students per academic year."

      Key achievements over the past decade include:
      - 98% program completion rate among participants
      - Average 40% improvement in French language proficiency
      - 15 students who pursued advanced degrees in French universities
      - Multiple cultural exchange projects between French and Swiss students

      Alumni testimonials reveal the program's lasting impact. Emma Schneider, who participated in 2018, shared: "My semester in Lyon not only perfected my French but also inspired me to pursue a career in international relations. I'm now working at the Swiss embassy in Paris."

      The program has also evolved to include modern elements such as digital storytelling projects, virtual reality cultural experiences, and sustainable tourism initiatives. These innovations ensure that our students receive a contemporary and relevant educational experience.

      Looking ahead, we plan to expand the program further by adding partnerships with French-speaking universities in Belgium and Canada, providing even more diverse opportunities for cultural immersion.

      To commemorate this milestone, we're launching a scholarship fund to support students from diverse backgrounds who wish to participate in the French program. Applications for both the program and scholarship will open in January 2025.
    `,
    author: 'Christine Dubois',
    publishedAt: '2024-12-05',
    image: 'https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    country: 'France',
    tags: ['Anniversary', 'Program Milestone', 'Cultural Exchange']
  },
  {
    id: '4',
    title: 'German Engineering Exchange Launches',
    excerpt: 'A new specialized program focusing on engineering and technology has been established with leading German technical universities.',
    content: `
      We are excited to introduce our newest addition to the Erasmus program: a specialized engineering and technology exchange with three premier German technical universities. This innovative program addresses the growing demand for STEM education and international technical expertise.

      The German Engineering Exchange Program partners with:
      - Technical University of Munich (TUM)
      - RWTH Aachen University  
      - Karlsruhe Institute of Technology (KIT)

      This specialized track is designed for students pursuing degrees in mechanical engineering, electrical engineering, computer science, and renewable energy technologies. The program combines rigorous academic coursework with hands-on experience in Germany's renowned industrial sector.

      "Germany's reputation for engineering excellence and innovation makes this partnership particularly valuable," explained Prof. Dr. Michael Schmidt, head of our STEM department. "Students will gain exposure to cutting-edge technology and industry practices that are shaping the future."

      Program highlights include:
      - Semester-long research projects with leading German companies
      - Access to state-of-the-art laboratories and manufacturing facilities
      - Industry 4.0 workshops and digital manufacturing training
      - Internship opportunities with German automotive and technology companies

      The first cohort of 10 students will begin their studies in September 2025. Selection criteria emphasize academic excellence in mathematics and sciences, along with demonstrated interest in engineering applications.

      Language preparation is integrated into the program, with intensive German language courses beginning six months before departure. Students will also receive cultural orientation and professional development workshops to maximize their international experience.

      Partnership agreements include faculty exchanges, joint research projects, and collaborative curriculum development. These elements ensure that the benefits extend beyond individual student experiences to enhance our entire engineering program.

      The program has already attracted significant interest from our student body, with over 30 applications received for the inaugural cohort. Final selections will be made in March 2025 following interviews and technical assessments.

      This initiative represents our commitment to preparing students for the globalized technology sector while strengthening Switzerland's ties with European innovation networks.
    `,
    author: 'Prof. Dr. Michael Schmidt',
    publishedAt: '2024-11-28',
    image: 'https://images.pexels.com/photos/5483064/pexels-photo-5483064.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    country: 'Germany',
    tags: ['STEM', 'Engineering', 'New Program']
  },
  {
    id: '5',
    title: 'Portuguese Coastal Studies Program Expands',
    excerpt: 'Our marine biology and coastal studies program in Portugal receives additional funding and new research opportunities.',
    content: `
      Our Portuguese Coastal Studies Program has received significant expansion through additional European funding and new research partnerships. The enhanced program now offers unprecedented opportunities for students interested in marine biology, environmental science, and sustainable coastal development.

      The expanded program, based primarily in Porto and Aveiro, now includes:
      - Advanced marine research facilities at the University of Aveiro
      - Field stations along Portugal's Atlantic coast
      - Collaboration with Portuguese marine conservation organizations
      - New courses in marine biotechnology and blue economy principles

      Dr. Helena Costa from the University of Aveiro, our primary partner, explains: "The Atlantic Ocean provides an exceptional natural laboratory for students to study marine ecosystems, climate change impacts, and sustainable ocean management."

      Recent program additions focus on pressing environmental challenges:
      - Microplastics research in marine environments
      - Sustainable aquaculture development projects  
      - Coastal erosion monitoring and mitigation strategies
      - Marine renewable energy assessment

      Student testimonials highlight the program's practical approach. João Silva, who completed the program last year, noted: "Working directly with Portuguese researchers on real conservation projects gave me invaluable experience that I couldn't get in a traditional classroom setting."

      The program expansion was made possible through a €500,000 grant from the European Maritime and Fisheries Fund, specifically designated for educational initiatives that address ocean sustainability challenges.

      New equipment includes underwater drones, water quality monitoring systems, and mobile laboratories that allow students to conduct research directly in coastal environments. These resources provide hands-on experience with the latest marine research technology.

      The cultural component remains strong, with students participating in traditional Portuguese fishing communities, learning about maritime heritage, and exploring the country's unique coastal cuisine and traditions.

      Applications for the expanded program open in February 2025, with the first enhanced cohort beginning studies in September 2025. The program can now accommodate 18 students per semester, up from the previous 12.

      This expansion reinforces our commitment to environmental education and positions our students at the forefront of marine conservation efforts in Europe.
    `,
    author: 'Dr. Helena Costa',
    publishedAt: '2024-11-20',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    country: 'Portugal',
    tags: ['Environmental Science', 'Marine Biology', 'Program Expansion']
  },
  {
    id: '6',
    title: 'Erasmus Alumni Network Reunion 2024',
    excerpt: 'Over 150 former Erasmus participants gathered to share experiences and discuss the lasting impact of their international education.',
    content: `
      Our annual Erasmus Alumni Network Reunion brought together over 150 former participants from across all our program destinations. The event, held at our school campus, celebrated the enduring connections and professional achievements of our international education alumni.

      The reunion featured panel discussions, networking sessions, and presentations showcasing how international experiences have shaped career paths. Alumni from the past fifteen years shared insights about leveraging their Erasmus experiences in their professional lives.

      Key highlights from the event included:
      - Career success stories from alumni now working in international organizations
      - Presentation of new mentorship program connecting recent graduates with experienced alumni
      - Announcement of the Alumni Scholarship Fund for future students
      - Cultural performances representing all five program countries

      Sarah Martinez, who studied in Spain in 2019 and now works for the European Commission, reflected: "My Erasmus experience didn't just teach me Spanish; it taught me how to navigate different cultures and perspectives – skills I use every day in my current role."

      The reunion also served as a platform for launching our new Alumni Mentorship Program. Experienced alumni will mentor current students, providing career guidance and professional networking opportunities. Over 60 alumni have already volunteered as mentors.

      Professional achievements among our alumni are remarkable:
      - 35% work in international organizations or multinational companies
      - 25% have pursued advanced degrees in their host countries  
      - 40% regularly use their second European language in their careers
      - 15% have started their own businesses with international components

      The event concluded with the announcement of the Alumni Scholarship Fund, which has already raised CHF 25,000 to support students from underprivileged backgrounds. The fund will provide full scholarships for 5 students annually.

      Next year's reunion will take place in Rome, hosted by our Italian alumni network. This international format reflects the global reach and impact of our Erasmus program.

      The success of this reunion demonstrates the lasting value of international education and the strong bonds formed through shared cultural experiences. These connections continue to benefit both our alumni and current students through ongoing collaboration and support.
    `,
    author: 'Alumni Relations Team',
    publishedAt: '2024-11-15',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    country: 'All',
    tags: ['Alumni', 'Networking', 'Career Development']
  }
];