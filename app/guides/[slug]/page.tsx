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

const GUIDES_PATH = path.join(process.cwd(), 'docs/guides');

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
    title: `${title} | Gym Near Me Cyprus`,
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
    <div className="min-h-screen bg-gradient-to-b from-background-dark via-background-dark to-surface-dark py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Guides', href: '/guides' },
            { label: data.title || 'Guide', href: `/guides/${params.slug}` },
          ]}
        />

        <article className="mt-12 sm:mt-16 space-y-12 sm:space-y-16">
          {/* Hero Section with Enhanced Title */}
          <div className="bg-gradient-to-r from-[#0A0E27]/80 via-[#0A0E27]/60 to-[#1A1F3A]/40 border border-[#00D9FF]/15 rounded-2xl p-6 sm:p-10 md:p-16 backdrop-blur-sm shadow-2xl">
            <div
              className="guide-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {/* Floating decoration elements */}
          <div className="fixed top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 pointer-events-none" />
          <div className="fixed bottom-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -z-10 pointer-events-none" />
        </article>
      </div>
    </div>
  );
}
