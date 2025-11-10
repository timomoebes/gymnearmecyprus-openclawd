import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';

export const metadata = {
  title: 'Gym Listing Pricing | List Your Gym on GymNearMe',
  description: 'Choose the perfect plan for your gym listing. Free basic listings or upgrade to featured for maximum visibility. Transparent pricing, no hidden fees.',
  keywords: 'gym listing pricing, featured gym listing, list gym free, gym directory pricing',
};

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '€0',
    period: 'Forever',
    description: 'Perfect for getting started',
    icon: Check,
    features: [
      'Basic gym listing',
      'Contact information',
      'Location on map',
      'Up to 3 photos',
      'Basic amenities list',
      'Standard placement',
    ],
    cta: 'List Your Gym Free',
    ctaVariant: 'outline' as const,
    popular: false,
  },
  {
    id: 'featured-monthly',
    name: 'Featured Monthly',
    price: '€49',
    period: 'per month',
    description: 'Best for ongoing visibility',
    icon: Star,
    features: [
      'Everything in Free',
      'Featured badge',
      'Priority placement',
      'Up to 10 photos',
      'Enhanced description',
      'Analytics dashboard',
      'Email support',
      'Cancel anytime',
    ],
    cta: 'Get Featured',
    ctaVariant: 'primary' as const,
    popular: true,
  },
  {
    id: 'featured-yearly',
    name: 'Featured Yearly',
    price: '€490',
    period: 'per year',
    originalPrice: '€588',
    description: 'Save 17% with annual billing',
    icon: Zap,
    features: [
      'Everything in Monthly',
      '2 months free',
      'Priority support',
      'Custom listing design',
      'Social media promotion',
      'Monthly performance reports',
    ],
    cta: 'Get Featured',
    ctaVariant: 'primary' as const,
    popular: false,
  },
  {
    id: 'featured-lifetime',
    name: 'Featured Lifetime',
    price: '€999',
    period: 'one-time',
    description: 'Pay once, featured forever',
    icon: Crown,
    features: [
      'Everything in Yearly',
      'Lifetime featured status',
      'No recurring fees',
      'Premium support',
      'Exclusive placement',
      'Future feature access',
    ],
    cta: 'Get Lifetime',
    ctaVariant: 'secondary' as const,
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Pricing', href: '/pricing' }]} />

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-text-light max-w-3xl mx-auto mb-6">
            Choose the perfect plan for your gym. Start free or upgrade to featured for maximum visibility and more members.
          </p>
          <Badge variant="featured" className="text-base px-4 py-2">
            No credit card required for free listings
          </Badge>
        </div>

        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-4 mb-12 text-center">
          <p className="text-text-white font-semibold">
            ⚡ Limited Availability: Only 2 featured slots left in Limassol!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`bg-surface-card rounded-card p-8 relative ${
                  plan.popular
                    ? 'ring-2 ring-primary-blue shadow-lg scale-105'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant="featured">Most Popular</Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-blue/10 rounded-full">
                      <Icon className="w-8 h-8 text-primary-blue" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-text-white">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-xl text-text-muted line-through ml-2">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm">{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-secondary-green flex-shrink-0 mt-0.5" />
                      <span className="text-text-light text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href="/add-gym">{plan.cta}</a>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-surface-card rounded-card p-8 mb-12">
          <h2 className="text-3xl font-bold text-text-white mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-lighter">
                  <th className="text-left py-4 px-4 text-text-white font-semibold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-text-white font-semibold">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 text-text-white font-semibold">
                    Monthly
                  </th>
                  <th className="text-center py-4 px-4 text-text-white font-semibold">
                    Yearly
                  </th>
                  <th className="text-center py-4 px-4 text-text-white font-semibold">
                    Lifetime
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-surface-lighter">
                  <td className="py-4 px-4 text-text-light">Basic Listing</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-surface-lighter">
                  <td className="py-4 px-4 text-text-light">Featured Badge</td>
                  <td className="text-center py-4 px-4 text-text-muted">—</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-surface-lighter">
                  <td className="py-4 px-4 text-text-light">Priority Placement</td>
                  <td className="text-center py-4 px-4 text-text-muted">—</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-surface-lighter">
                  <td className="py-4 px-4 text-text-light">Analytics Dashboard</td>
                  <td className="text-center py-4 px-4 text-text-muted">—</td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="w-5 h-5 text-secondary-green mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-surface-lighter">
                  <td className="py-4 px-4 text-text-light">Photo Uploads</td>
                  <td className="text-center py-4 px-4 text-text-light">3</td>
                  <td className="text-center py-4 px-4 text-text-light">10</td>
                  <td className="text-center py-4 px-4 text-text-light">10</td>
                  <td className="text-center py-4 px-4 text-text-light">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-text-light">Support</td>
                  <td className="text-center py-4 px-4 text-text-light">Community</td>
                  <td className="text-center py-4 px-4 text-text-light">Email</td>
                  <td className="text-center py-4 px-4 text-text-light">Priority</td>
                  <td className="text-center py-4 px-4 text-text-light">Premium</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">
                Can I upgrade later?
              </h3>
              <p className="text-text-light">
                Yes! You can upgrade from free to featured at any time. Your listing will be updated immediately.
              </p>
            </div>
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-text-light">
                We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted.
              </p>
            </div>
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">
                Can I cancel my featured listing?
              </h3>
              <p className="text-text-light">
                Yes, you can cancel your monthly or yearly subscription at any time. Your listing will remain featured until the end of your billing period.
              </p>
            </div>
            <div className="bg-surface-card rounded-card p-6">
              <h3 className="text-xl font-bold text-text-white mb-3">
                Is there a setup fee?
              </h3>
              <p className="text-text-light">
                No setup fees! The price you see is the price you pay. No hidden costs or surprises.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 rounded-card p-12 text-center">
          <h2 className="text-3xl font-bold text-text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-text-light mb-8 max-w-2xl mx-auto">
            List your gym for free today, or upgrade to featured for maximum visibility and more members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <a href="/add-gym">List Your Gym Free</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/add-gym">Get Featured</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

