import React from 'react';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Metadata } from 'next';

interface GuidePageProps {
  params: {
    slug: string;
  };
}

const GUIDES_PATH = path.join(process.cwd(), 'docs');

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const filePath = path.join(GUIDES_PATH, `${params.slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return { title: 'Guide Not Found' };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Extract title from H1 if not in frontmatter
  const title = data.title || content.split('\n')[0].replace('# ', '').trim();

  return {
    title: `${title} | GymNearMe Cyprus`,
    description: data.description || `Read our expert guide: ${title}. Discover the best fitness options in Cyprus.`,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const filePath = path.join(GUIDES_PATH, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-background-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: data.title || 'Guide', href: `/guides/${params.slug}` },
          ]}
        />
        
        <article className="mt-8 prose prose-invert prose-blue max-w-none bg-surface-card p-8 rounded-card border border-surface-lighter shadow-xl">
          <div 
            className="guide-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </article>
      </div>
    </div>
  );
}
