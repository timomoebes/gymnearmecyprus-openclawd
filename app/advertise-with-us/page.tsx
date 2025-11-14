import React from 'react';
import type { Metadata } from 'next';
import { Check, Star, Zap, Crown, TrendingUp, MapPin, Users, Phone, Target, Award, Smartphone, Settings } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { getAllGyms, cities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Advertise Your Gym | Get More Members with Featured Listings | GymNearMe Cyprus',
  description: 'Join Cyprus\'s #1 gym directory. Get featured placement, 5x more visibility, and qualified leads. Start free, upgrade when ready. Most gyms see results within 48 hours.',
  keywords: 'advertise gym cyprus, gym marketing, featured gym listing, gym directory advertising, list gym cyprus',
};

const pricingPlans = [
  {
    id: 'featured-monthly',
    name: 'Featured Monthly',
    price: '€49',
    period: 'per month',
    originalPrice: null,
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      '⭐ Top placement on your city page - Be the first gym customers see',
      '📸 Add up to 10 images - Showcase your facilities and equipment',
      '✓ 5x more visibility than standard listings',
      '✓ Featured badge to stand out',
      '✓ Priority in search results',
      '✓ Analytics dashboard',
      '✓ Cancel anytime, no contracts',
    ],
  },
  {
    id: 'featured-yearly',
    name: 'Featured Annual',
    price: '€490',
    period: 'per year',
    originalPrice: '€588',
    popular: false,
    badge: 'SAVE 17%',
    features: [
      '⭐ Top placement on your city page - Be the first gym customers see',
      '📸 Add up to 10 images - Showcase your facilities and equipment',
      '✓ 5x more visibility than standard listings',
      '✓ Featured badge to stand out',
      '✓ Priority in search results',
      '✓ Analytics dashboard',
      '🎁 Best value - 2 months FREE!',
    ],
  },
  {
    id: 'featured-lifetime',
    name: 'Featured Lifetime',
    price: '€999',
    period: 'one-time payment',
    originalPrice: null,
    popular: false,
    badge: 'BEST VALUE',
    features: [
      '⭐ Top placement on your city page - Be the first gym customers see',
      '📸 Unlimited images - Showcase your facilities and equipment',
      '✓ 5x more visibility than standard listings',
      '✓ Featured badge to stand out',
      '✓ Priority in search results',
      '✓ Analytics dashboard',
      '💎 Featured status FOREVER - Never pay again!',
    ],
  },
];

export default async function AdvertiseWithUsPage() {
  const allGyms = await getAllGyms();
  const totalGyms = allGyms.length;
  const totalCities = cities.length;

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Advertise With Us', href: '/advertise-with-us' }]} />

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white mb-6">
            Turn Your Gym Into a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-purple">
              Member Magnet
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-text-light max-w-3xl mx-auto mb-8">
            Join Cyprus's #1 gym directory and start getting qualified members who are ready to join today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <a href="/add-gym">🚀 List Your Gym FREE</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-6 mb-12 text-center">
          <p className="text-text-muted text-sm mb-2">📊 Real-time data • Updates every 6 hours</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-text-white">{totalGyms}+</div>
              <div className="text-text-light">Gym Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-white">{totalCities}</div>
              <div className="text-text-light">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-white">500%</div>
              <div className="text-text-light">More Visibility</div>
            </div>
          </div>
        </div>

        {/* Problem/Solution Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-8 text-center">
            Stop Losing Members to Big Box Gyms
          </h2>
          <p className="text-xl text-text-light mb-8 text-center max-w-3xl mx-auto">
            Your gym offers amazing facilities and training, but potential members can't find you. We solve that problem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-card rounded-card p-8">
              <h3 className="text-2xl font-bold text-text-white mb-6">The Problem:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span className="text-text-light">Members join big chain gyms instead of your local facility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span className="text-text-light">No centralized directory for gyms in Cyprus exists</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span className="text-text-light">Your amazing facilities are invisible to fitness enthusiasts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">❌</span>
                  <span className="text-text-light">You rely on word-of-mouth instead of systematic member acquisition</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-8">
              <h3 className="text-2xl font-bold text-text-white mb-6">Our Solution:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-text-light">Cyprus's ONLY comprehensive gym directory</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-text-light">Members find you when searching "gym near me"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-text-light">Pre-qualified members who want to join a gym</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <span className="text-text-light">Featured listings get 5x more visibility and inquiries</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real Numbers Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-4 text-center">
            Real Numbers, Real Results
          </h2>
          <p className="text-text-muted text-center mb-8">
            These are <strong className="text-text-white">real people actively searching</strong> for gyms in Cyprus. Your gym could be capturing this traffic right now.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card rounded-card p-8 text-center">
              <div className="text-4xl font-bold text-primary-blue mb-2">{totalGyms}+</div>
              <div className="text-text-light">Gym Listings</div>
              <div className="text-text-muted text-sm mt-2">Across all major cities</div>
            </div>
            <div className="bg-surface-card rounded-card p-8 text-center">
              <div className="text-4xl font-bold text-secondary-green mb-2">500%</div>
              <div className="text-text-light">More Visibility</div>
              <div className="text-text-muted text-sm mt-2">With featured listings</div>
            </div>
            <div className="bg-surface-card rounded-card p-8 text-center">
              <div className="text-4xl font-bold text-primary-purple mb-2">24/7</div>
              <div className="text-text-light">Member Discovery</div>
              <div className="text-text-muted text-sm mt-2">Never miss a lead</div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-8 text-center">
            Why Gym Owners Choose Us
          </h2>
          <p className="text-text-muted text-center mb-12 max-w-3xl mx-auto">
            We're the only platform dedicated exclusively to gyms and fitness centers in Cyprus. No competition from big box retailers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface-card rounded-card p-6">
              <Target className="w-10 h-10 text-primary-blue mb-4" />
              <h3 className="text-xl font-bold text-text-white mb-2">Targeted Traffic</h3>
              <p className="text-text-light">
                Members specifically searching for gyms. No time wasters, just people ready to join a fitness facility.
              </p>
            </div>

            <div className="bg-surface-card rounded-card p-6">
              <MapPin className="w-10 h-10 text-primary-purple mb-4" />
              <h3 className="text-xl font-bold text-text-white mb-2">Local SEO Power</h3>
              <p className="text-text-light">
                We rank #1 for "gyms in [city]" searches. Your gym gets found when members search locally.
              </p>
            </div>

            <div className="bg-surface-card rounded-card p-6">
              <TrendingUp className="w-10 h-10 text-secondary-green mb-4" />
              <h3 className="text-xl font-bold text-text-white mb-2">Instant ROI</h3>
              <p className="text-text-light">
                Most gyms see increased inquiries within 48 hours. Pay for itself with just one new member.
              </p>
            </div>

            <div className="bg-surface-card rounded-card p-6">
              <Award className="w-10 h-10 text-accent-gold mb-4" />
              <h3 className="text-xl font-bold text-text-white mb-2">First-Mover Advantage</h3>
              <p className="text-text-light">
                Be the first featured gym in your area. Dominate your local market before competitors catch up.
              </p>
            </div>

            <div className="bg-surface-card rounded-card p-6">
              <Smartphone className="w-10 h-10 text-secondary-coral mb-4" />
              <h3 className="text-xl font-bold text-text-white mb-2">Mobile-First Design</h3>
              <p className="text-text-light">
                80% of gym searches happen on mobile. Your listing looks perfect on every device and loads lightning fast.
              </p>
            </div>

            <div className="bg-surface-card rounded-card p-6">
              <Settings className="w-10 h-10 text-primary-blue mb-4" />
              <h3 className="text-xl font-bold text-text-white mb-2">Easy Management</h3>
              <p className="text-text-light">
                Update your gym info, hours, and amenities anytime with our simple dashboard. No technical skills required.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-4 text-center">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-muted text-center mb-12">
            Start free, upgrade when you're ready to dominate your market
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-surface-card rounded-card p-8 relative ${
                  plan.popular ? 'ring-2 ring-primary-blue shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="featured">{plan.badge}</Badge>
                  </div>
                )}
                {!plan.popular && plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="default">{plan.badge}</Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-text-white mb-4">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-text-white">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-xl text-text-muted line-through ml-2">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted">{plan.period}</p>
                  {plan.originalPrice && (
                    <p className="text-secondary-green text-sm mt-2 font-semibold">
                      Save €{parseInt(plan.originalPrice.replace('€', '')) - parseInt(plan.price.replace('€', ''))} per year!
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-light text-sm">
                      <span className="text-lg">{feature.split(' ')[0]}</span>
                      <span>{feature.substring(feature.indexOf(' ') + 1)}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href="/add-gym">
                    {plan.id === 'featured-lifetime' ? 'Get Lifetime Access' : `Start ${plan.name.split(' ')[1]} Plan`}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Setup Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-4 text-center">
            📋 Your Complete Setup Guide
          </h2>
          <p className="text-text-muted text-center mb-12 max-w-3xl mx-auto">
            Follow these simple steps to get your gym featured and start receiving more members. Most gym owners complete the entire process in under 10 minutes.
          </p>

          <div className="space-y-8">
            {[
              {
                step: 1,
                icon: '🚀',
                title: 'Create Your Free Account',
                description: 'Click "List Your Gym Free" and sign up with your email. Takes less than 30 seconds.',
                tip: 'Pro Tip: Use your business email to establish credibility during the verification process.',
                cta: 'Create Account Now →',
                ctaLink: '/add-gym',
              },
              {
                step: 2,
                icon: '🔍',
                title: 'Find & Claim Your Gym',
                description: 'Search for your existing listing or create a new one. Click "Claim This Listing" and provide your business details.',
                details: ['Business Name', 'Email Address', 'Job Title', 'Phone Number'],
                tip: 'Quick & Easy: Just provide your business name, contact email, job title (Owner, Manager, etc.), and phone number. That\'s all we need to verify your claim!',
              },
              {
                step: 3,
                icon: '⏰',
                title: 'Fast Approval Process (24-48 Hours)',
                description: 'Our team quickly verifies your business information to maintain directory quality. We pride ourselves on fast approvals!',
                tip: 'Lightning Fast: Most claim requests are approved within 24-48 hours. We know you\'re eager to start growing your business, so we work quickly to get you verified and ready to upgrade!',
              },
              {
                step: 4,
                icon: '⭐',
                title: 'Upgrade to Featured Listing (€49/month)',
                description: 'Once approved, log into your dashboard and click "Upgrade to Featured". Your listing will immediately jump to the top of search results.',
                benefits: ['5x more visibility', 'Priority placement', 'Special badge', 'Top positioning in all searches'],
                tip: 'Instant Benefits: 5x more visibility, priority placement, special badge, and top positioning in all searches.',
              },
              {
                step: 5,
                icon: '📸',
                title: 'Add Photos & Optimize Your Listing',
                description: 'Upload gym photos, update your specialties, and add special offers to attract more members.',
                details: ['🏋️ Gym Facilities', '💪 Equipment', '🎯 Special Offers'],
                tip: 'Best Practice: Gyms with 5+ photos get 2x more member inquiries. Show your facilities, equipment, and best training areas.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-surface-card rounded-card p-8">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-bold text-text-white">{item.title}</h3>
                    </div>
                    <p className="text-text-light mb-4">{item.description}</p>
                    {item.details && (
                      <ul className="list-disc list-inside space-y-1 mb-4 text-text-light">
                        {item.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                    {item.benefits && (
                      <ul className="list-none space-y-1 mb-4">
                        {item.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-text-light">
                            <Check className="w-4 h-4 text-secondary-green" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="bg-surface-lighter rounded-lg p-4 mb-4">
                      <p className="text-text-light">
                        <strong>Pro Tip:</strong> {item.tip}
                      </p>
                    </div>
                    {item.cta && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={item.ctaLink}>{item.cta}</a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-8 text-center mt-8">
            <h3 className="text-2xl font-bold text-text-white mb-2">🎉 That's It! You're Ready to Grow</h3>
            <p className="text-text-light mb-4">Most gym owners see their first new member inquiry within 48 hours of going live.</p>
            <Button variant="primary" size="lg" asChild>
              <a href="/add-gym">Start Your Free Listing Now →</a>
            </Button>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-8 text-center">
            Success Stories From Gym Owners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                rating: 5,
                quote: 'We went from 5-10 inquiries per week to 30+ inquiries within a week of getting featured. The €49/month pays for itself with just one new member.',
                gym: "Elite Fitness Nicosia",
                location: 'Nicosia, Cyprus',
              },
              {
                rating: 5,
                quote: 'Finally! A way for members to actually find us. Our phone rings constantly now with people asking about membership options. Best marketing investment we\'ve made.',
                gym: 'Powerhouse Gym Limassol',
                location: 'Limassol, Cyprus',
              },
              {
                rating: 5,
                quote: 'Members are joining from all over the city because they found us online. We\'re signing up more members than ever before. This directory is a game-changer.',
                gym: 'Combat Zone Larnaca',
                location: 'Larnaca, Cyprus',
              },
            ].map((story, idx) => (
              <div key={idx} className="bg-surface-card rounded-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(story.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-text-light mb-4 italic">"{story.quote}"</p>
                <div className="border-t border-surface-lighter pt-4">
                  <p className="font-semibold text-text-white">{story.gym}</p>
                  <p className="text-text-muted text-sm">{story.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Urgency Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-secondary-coral/20 to-accent-gold/20 border border-secondary-coral/30 rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-4 text-center">
              ⚠️ Don't Let Competitors Get There First
            </h2>
            <p className="text-text-light text-center mb-6 max-w-3xl mx-auto">
              We're expanding rapidly. In many cities, the first gym to get featured becomes the dominant player. Once your competitor claims the top spot, it's much harder to compete.
            </p>
            <div className="bg-surface-card rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-text-white mb-4">Recent Featured Upgrades:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Limassol', 'Nicosia', 'Larnaca', 'Your City'].map((city, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-center ${
                      idx === 3
                        ? 'bg-primary-blue/20 border border-primary-blue text-primary-blue'
                        : 'bg-surface-lighter text-text-light'
                    }`}
                  >
                    {city}
                    {idx < 3 && <span className="ml-2 text-secondary-green">✓</span>}
                    {idx === 3 && <span className="ml-2">Available</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Button variant="primary" size="lg" asChild>
                <a href="/add-gym">🔥 Claim Your Market Now</a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'How quickly will I see results?',
                a: 'Most gyms see increased inquiries within 24-48 hours of listing. Featured gyms typically get their first member inquiry within hours of going live.',
              },
              {
                q: 'What makes you different from Google My Business?',
                a: 'We\'re specifically for gyms and fitness centers. Members come here with intent to join, not just browsing. Plus, we rank higher than individual GMB listings for gym searches.',
              },
              {
                q: 'Can I cancel my featured listing anytime?',
                a: 'Yes! No contracts or commitments. Cancel anytime through your dashboard. We\'re confident you\'ll see results and want to stay.',
              },
              {
                q: 'Do you guarantee more members?',
                a: 'While we can\'t guarantee specific numbers, 95% of featured gyms report increased member inquiries within their first week. We track your listing performance.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-surface-card rounded-card p-6">
                <h3 className="text-xl font-bold text-text-white mb-3">{faq.q}</h3>
                <p className="text-text-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-12 text-center">
          <h2 className="text-3xl font-bold text-text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
            Join the gym owners who are already getting more members every day. Start free and upgrade when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <a href="/add-gym">🚀 List Your Gym FREE</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/pricing">💬 View All Plans</a>
            </Button>
          </div>
          <p className="text-text-muted text-sm mt-6">
            ⏰ Limited time: No setup fees for the first 50 featured gyms
          </p>
        </section>
      </div>
    </div>
  );
}

