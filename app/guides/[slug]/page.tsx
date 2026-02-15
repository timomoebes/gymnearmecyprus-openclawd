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
          <div className="bg-gradient-to-r from-primary-600/10 via-primary-500/5 to-blue-600/10 border border-primary-500/20 rounded-2xl p-10 sm:p-16 backdrop-blur-sm shadow-2xl">
            <style>{`
              .guide-content h1 {
                @apply text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight;
                background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }

              .guide-content h2 {
                @apply text-2xl sm:text-3xl font-bold text-white mt-16 sm:mt-20 mb-8 sm:mb-10 pb-4 border-b border-primary-500/30;
              }

              .guide-content h3 {
                @apply text-xl sm:text-2xl font-bold text-white mt-10 sm:mt-12 mb-6 sm:mb-8 flex items-center gap-3;
              }

              .guide-content h4 {
                @apply text-lg sm:text-xl font-semibold text-primary-300 mt-8 mb-5 sm:mb-6;
              }

              .guide-content h3::before {
                content: '★';
                @apply text-yellow-400 text-2xl;
              }

              .guide-content p {
                @apply text-gray-200 text-base sm:text-lg mb-6 sm:mb-8;
                line-height: 1.85;
                letter-spacing: 0.3px;
              }

              .guide-content strong {
                @apply text-primary-300 font-semibold tracking-wide;
              }

              .guide-content em {
                @apply italic text-primary-200 tracking-wide;
              }

              .guide-content ul, .guide-content ol {
                @apply space-y-4 sm:space-y-5 mb-8 sm:mb-10;
              }

              .guide-content li {
                @apply text-gray-200 pl-6 sm:pl-7 relative;
                line-height: 1.75;
                letter-spacing: 0.3px;
              }

              .guide-content ul > li::before {
                content: '▪';
                @apply absolute left-0 text-primary-400 font-bold;
              }

              .guide-content ol > li {
                @apply list-decimal list-inside;
              }

              .guide-content hr {
                @apply border-primary-500/20 my-12 sm:my-16;
              }

              .guide-content a {
                @apply text-primary-400 hover:text-primary-300 underline transition-colors;
              }

              .guide-content blockquote {
                @apply border-l-4 border-primary-500 pl-6 sm:pl-8 italic text-gray-300 my-8 sm:my-10 py-4 sm:py-5;
                line-height: 1.8;
              }
            `}</style>
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
