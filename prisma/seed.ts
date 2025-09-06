import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create demo users
  const hashedPassword = await bcrypt.hash('password', 12);

  const editor = await prisma.user.upsert({
    where: { email: 'editor@gbza.ch' },
    update: {},
    create: {
      email: 'editor@gbza.ch',
      name: 'Demo Editor',
      password: hashedPassword,
      role: 'EDITOR',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gbza.ch' },
    update: {},
    create: {
      email: 'admin@gbza.ch',
      name: 'Demo Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create sample articles
  const article1 = await prisma.article.create({
    data: {
      title: 'GBZA Students Excel in Barcelona Exchange Program',
      content: `Our carefully selected GBZA students have completed an outstanding semester at the University of Barcelona. The program, which hosts only the most academically gifted students from our school, has once again demonstrated the exceptional quality of our student body.

The five selected students - chosen from over 30 applicants - immersed themselves in Spanish culture while maintaining their academic excellence. Each student was selected based on their outstanding academic performance, language aptitude, and demonstrated maturity.

"The selection process was rigorous, but it ensured that our students were well-prepared for this incredible opportunity," said Dr. Maria Schneider, our Erasmus Program Director. "These students truly represent the best of GBZA."

The students participated in advanced coursework, cultural immersion activities, and collaborative projects with local Spanish students. Their achievements include academic honors, language certifications, and lasting international friendships.

This program continues GBZA's tradition of sending only our most exceptional students abroad, ensuring they serve as excellent ambassadors for our school while gaining invaluable international experience.`,
      excerpt: 'Our carefully selected GBZA students completed an outstanding semester in Barcelona, representing the school with academic excellence and cultural enthusiasm.',
      slug: 'gbza-students-excel-barcelona-exchange',
      status: 'PUBLISHED',
      country: 'Spain',
      tags: ['Student Excellence', 'Barcelona', 'Academic Achievement'],
      authorId: editor.id,
      publishedAt: new Date(),
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: 'Selection Process for 2025 Erasmus Placements Begins',
      content: `The application period for our 2025 Erasmus+ placements has officially opened. As always, GBZA maintains its selective approach, choosing only the most qualified students for these prestigious international opportunities.

This year, we have partnerships with 15 top-tier European institutions across our five destination countries. Each placement is highly competitive, with selection based on academic merit, language proficiency, and personal readiness for international study.

"We're looking for students who will not only succeed academically but also serve as outstanding representatives of GBZA values," explained Prof. Andreas Weber, our Academic Coordinator.

The selection criteria include:
- Minimum GPA of 5.0 (Swiss grading system)
- Demonstrated language proficiency in the destination country's language
- Strong personal statement and motivation letter
- Faculty recommendations
- Interview performance

Applications are due by March 15, 2025, with final selections announced in May. Selected students will begin intensive preparation programs in June, including advanced language training and cultural orientation.

This selective approach has resulted in a 100% success rate for our Erasmus participants over the past five years, with many students receiving academic honors and recognition from their host institutions.`,
      excerpt: 'Applications open for our highly selective 2025 Erasmus+ placements. Only the most exceptional GBZA students will be chosen for these prestigious opportunities.',
      slug: 'selection-process-2025-erasmus-placements',
      status: 'PUBLISHED',
      country: 'All',
      tags: ['Selection Process', 'Applications', '2025 Program'],
      authorId: admin.id,
      publishedAt: new Date(),
    },
  });

  console.log('Database seeded successfully!');
  console.log('Demo users created:');
  console.log('- Editor: editor@gbza.ch / password');
  console.log('- Admin: admin@gbza.ch / password');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });