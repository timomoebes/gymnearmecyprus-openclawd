import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Metadata } from 'next';
import { ChevronRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Gyms in Cyprus – City & Fitness Guides | Gym Near Me',
  description: 'Expert guides to the best gyms in Cyprus by city. Compare fitness centers, 24/7 gyms, and find your gym—Limassol, Nicosia, Paphos, Larnaca.',
};

const GUIDES_PATH = path.join(process.cwd(), 'docs/guides');

export default function GuidesIndex() {
  const files = fs.readdirSync(GUIDES_PATH).filter(f => f.endsWith('.md') && !f.startsWith('INTERNAL') && !f.startsWith('image-'));

  const guides = files.map(filename => {
    const filePath = path.join(GUIDES_PATH, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filename.replace('.md', '');
    const title = data.title || content.split('\n')[0].replace('# ', '').trim();
    
    return {
      slug,
      title,
      description: data.description || content.split('\n').find(l => l.length > 50 && !l.startsWith('#'))?.substring(0, 160) + '...'
    };
  });

  return (
    <div className="min-h-screen bg-background-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Guides', href: '/guides' }]} />
        
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-primary-blue" />
            <h1 className="text-4xl font-bold text-text-white">Fitness Guides & Insights</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map(guide => (
              <Link 
                key={guide.slug} 
                href={`/guides/${guide.slug}`}
                className="group bg-surface-card rounded-card border border-surface-lighter p-6 hover:border-primary-blue transition-all duration-300 flex flex-col"
              >
                <h2 className="text-xl font-bold text-text-white group-hover:text-primary-blue transition-colors mb-3">
                  {guide.title}
                </h2>
                <p className="text-text-muted text-sm flex-grow mb-6">
                  {guide.description}
                </p>
                <div className="flex items-center text-primary-blue font-semibold text-sm">
                  Read Guide <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
