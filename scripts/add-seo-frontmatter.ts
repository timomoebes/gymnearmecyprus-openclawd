import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const GUIDES_PATH = path.join(process.cwd(), 'docs/guides');

const metaData = {
  '5-best-gyms-cyprus': {
    title: 'Best Gyms in Cyprus: City Champions 2026 | Top-Rated Fitness Centers',
    description: 'Discover the #1 gym in each Cyprus city. 5-star rated, verified reviews, expert training. Find your champion gym near you in Limassol, Paphos, Nicosia & more.',
  },
  'best-gyms-limassol-2026': {
    title: 'Best Gyms in Limassol 2026 | Top 10 Fitness Centers & Reviews',
    description: 'Find the best gyms in Limassol. Compare 10 top-rated fitness centers with verified reviews, pricing, specialties. Iron Fitness, Grind Fitness & more.',
  },
  'best-gyms-paphos-2026': {
    title: 'Best Gyms in Paphos 2026 | Top-Rated Fitness Centers & Pricing',
    description: 'Discover the best gyms in Paphos. Kings BJJ, Poseidonio Health Spa & more. Compare facilities, pricing, reviews. Find your perfect gym near you.',
  },
  'best-gyms-nicosia-2026': {
    title: 'Best Gyms in Nicosia 2026 | Top Fitness Centers in Cyprus Capital',
    description: 'Find the best gyms in Nicosia. Gabriel Fitness, Maxx Fitness & more. Expert reviews, pricing, specialties. Your guide to fitness in Cyprus capital.',
  },
  'best-gyms-larnaca-2026': {
    title: 'Best Gyms in Larnaca 2026 | Top-Rated Fitness & Combat Sports Centers',
    description: 'Explore the best gyms in Larnaca. Samtsihara Fight System (5.0★), CrossFit, MMA & more. Find top-rated fitness centers with verified reviews.',
  },
  'best-gyms-ayia-napa-2026': {
    title: 'Best Gyms in Ayia Napa 2026 | World Gym & Top Fitness Centers',
    description: 'Find the best gyms in Ayia Napa. World Gym (4.9★, 1,266 reviews), premium facilities, tourist-friendly. Compare fitness centers near you.',
  },
  'best-gyms-paralimni-2026': {
    title: 'Best Gyms in Paralimni 2026 | Top Fitness Centers in East Cyprus',
    description: 'Discover the best gyms in Paralimni. Bodyart Fitness (5.0★), complete facilities, all fitness levels. Find your gym in Eastern Cyprus.',
  },
};

async function addFrontmatter() {
  const guides = Object.keys(metaData);

  for (const slug of guides) {
    const filePath = path.join(GUIDES_PATH, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${slug} - file not found`);
      continue;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Add/update frontmatter
    const updatedData = {
      ...data,
      title: metaData[slug].title,
      description: metaData[slug].description,
    };

    // Rebuild file with frontmatter
    const updatedFile = matter.stringify(content, updatedData);

    fs.writeFileSync(filePath, updatedFile, 'utf8');
    console.log(`✅ Updated frontmatter for ${slug}`);
  }

  console.log('🎉 All guide frontmatter updated successfully!');
}

addFrontmatter();
