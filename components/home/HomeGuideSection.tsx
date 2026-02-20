'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

export function HomeGuideSection() {
  return (
    <section className="py-16 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            How to Choose a Gym
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            What to look for and what types of gyms you’ll find across the island.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface-card rounded-card p-8">
            <h3 className="text-2xl font-bold text-text-white mb-6">Tips for Choosing the Right Gym</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Check Location and Accessibility</strong>
                  <p className="text-text-light text-sm mt-1">Pick somewhere close to home or work so you’re more likely to go regularly.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Review Amenities and Equipment</strong>
                  <p className="text-text-light text-sm mt-1">Check for the kit you need: parking, showers, lockers, and any specialist equipment.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Read Reviews and Ratings</strong>
                  <p className="text-text-light text-sm mt-1">See what members say about the facilities, staff, and overall experience.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Consider Specialty Offerings</strong>
                  <p className="text-text-light text-sm mt-1">Into CrossFit, pilates, or MMA? Look for places that specialize in what you want.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Visit During Peak Hours</strong>
                  <p className="text-text-light text-sm mt-1">Drop in when you’d normally train to see how busy it gets.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Ask About Membership Options</strong>
                  <p className="text-text-light text-sm mt-1">Check trial periods, cancellation terms, and what’s included.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-surface-card rounded-card p-8">
            <h3 className="text-2xl font-bold text-text-white mb-6">Types of Gyms in Cyprus</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">Bodybuilding Gyms</h4>
                <p className="text-text-light text-sm">Free weights, machines, and gear aimed at serious lifters and strength training.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">CrossFit Boxes</h4>
                <p className="text-text-light text-sm">High-intensity functional training, classes, and open gym with a strong community vibe.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">Yoga & Pilates Studios</h4>
                <p className="text-text-light text-sm">Flexibility, core work, and mindfulness—reformer pilates, hot yoga, and various classes.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">MMA & Combat Sports</h4>
                <p className="text-text-light text-sm">MMA, boxing, BJJ, and more for self-defense, competition, or hard cardio.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">Swimming Facilities</h4>
                <p className="text-text-light text-sm">Pools for low-impact cardio, rehab, or cross-training; common in Nicosia and other cities.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">24/7 Gyms</h4>
                <p className="text-text-light text-sm">Open around the clock for early birds, night owls, or anyone with a shifting schedule.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-card p-8 border border-primary-blue/30">
          <h3 className="text-2xl font-bold text-text-white mb-4">💡 Pro Tip</h3>
          <p className="text-text-light text-lg">Try a few gyms before committing. Many offer trial sessions or day passes so you can see if the vibe and equipment suit you.</p>
        </div>
      </div>
    </section>
  );
}
