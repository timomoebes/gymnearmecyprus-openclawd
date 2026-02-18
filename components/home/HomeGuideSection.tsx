'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

export function HomeGuideSection() {
  return (
    <section className="py-16 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-white mb-4">
            Complete Guide to Finding the Best Gyms in Cyprus
          </h2>
          <p className="text-lg text-text-light max-w-3xl mx-auto">
            Our comprehensive guide helps you find the perfect gym near me, fitness center, or health club in Cyprus. Learn what to look for, how to compare options, and make the best choice for your fitness journey.
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
                  <p className="text-text-light text-sm mt-1">When searching for a gym near me, consider proximity to your home or work. A nearby gym or gym close to me increases the likelihood of regular attendance.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Review Amenities and Equipment</strong>
                  <p className="text-text-light text-sm mt-1">Look for fitness centers and health clubs that offer the equipment and facilities you need. Check for parking, showers, locker rooms, and specialized equipment.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Read Reviews and Ratings</strong>
                  <p className="text-text-light text-sm mt-1">Check what other members are saying about the gym. Look for patterns in reviews - are people happy with the facilities, staff, and overall experience?</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Consider Specialty Offerings</strong>
                  <p className="text-text-light text-sm mt-1">If you're interested in specific training like CrossFit, pilates, or MMA, look for fitness studios and gyms that specialize in those areas.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Visit During Peak Hours</strong>
                  <p className="text-text-light text-sm mt-1">See how crowded the gym gets during your preferred workout times. This helps you understand if the facility can accommodate your schedule.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-blue mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-text-white">Ask About Membership Options</strong>
                  <p className="text-text-light text-sm mt-1">Inquire about membership plans, trial periods, and cancellation policies. Many fitness clubs offer flexible options to suit different needs.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-surface-card rounded-card p-8">
            <h3 className="text-2xl font-bold text-text-white mb-6">Types of Gyms Available in Cyprus</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">Bodybuilding Gyms</h4>
                <p className="text-text-light text-sm">Comprehensive fitness centers with extensive free weights, machines, and bodybuilding-focused equipment. Perfect for serious lifters and strength training enthusiasts.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">CrossFit Boxes</h4>
                <p className="text-text-light text-sm">High-intensity functional training facilities offering CrossFit classes, open gym access, and community-driven workouts. Ideal for those seeking challenging, varied workouts.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">Yoga & Pilates Studios</h4>
                <p className="text-text-light text-sm">Specialized fitness studios focusing on flexibility, core strength, and mindfulness. Many offer reformer pilates, hot yoga, and various class formats.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">MMA & Combat Sports</h4>
                <p className="text-text-light text-sm">Martial arts gyms offering MMA, boxing, Brazilian Jiu-Jitsu, and other combat sports training. Great for self-defense, competition training, or intense cardio workouts.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">Swimming Facilities</h4>
                <p className="text-text-light text-sm">Health clubs and fitness centers with swimming pools. Perfect for low-impact cardio, rehabilitation, or cross-training. Many gyms in Nicosia and other cities offer pool access.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-text-white mb-2">24/7 Gyms</h4>
                <p className="text-text-light text-sm">24 hour gyms and 24 7 gyms near me offer round-the-clock access. Perfect for early morning workouts, late-night training, or flexible schedules. Many fitness centers now offer 24/7 access options.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-card p-8 border border-primary-blue/30">
          <h3 className="text-2xl font-bold text-text-white mb-4">💡 Pro Tip</h3>
          <p className="text-text-light text-lg">When searching for a gym near me, consider visiting multiple options before committing. Many fitness centers and health clubs offer trial periods or day passes. This allows you to experience the facility, equipment, and atmosphere firsthand before making a decision. Also, don't forget to check if the gym offers 24/7 access if you need flexibility in your workout schedule.</p>
        </div>
      </div>
    </section>
  );
}
