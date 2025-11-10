'use client';

import React, { useState } from 'react';
import { Check, Building, Clock, Star, Zap, Crown, Users, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { cities } from '@/lib/data';
import { specialties } from '@/lib/data';

interface FormData {
  name: string;
  cityId: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  selectedSpecialties: string[];
  amenities: string[];
  openingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
  services: string[];
}

const allAmenities = [
  'Parking',
  'Showers',
  'Locker Rooms',
  'Personal Training',
  '24/7 Access',
  'Sauna',
  'Steam Room',
  'Swimming Pool',
  'Cafe',
  'WiFi',
  'Childcare',
  'Group Classes',
  'Cardio Equipment',
  'Free Weights',
  'Machines',
];

const services = [
  'Personal Training',
  'Group Classes',
  'Nutrition Counseling',
  'Physical Therapy',
  'Massage Therapy',
  'Childcare',
];

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

// Generate time options
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      const time12 = new Date(2000, 0, 1, hour, minute).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      times.push({ value: `${h}:${m}`, label: time12 });
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export default function AddGymPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cityId: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    selectedSpecialties: [],
    amenities: [],
    openingHours: daysOfWeek.reduce((acc, day) => {
      acc[day] = { open: '09:00', close: '21:00', closed: false };
      return acc;
    }, {} as FormData['openingHours']),
    services: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    alert('Gym listing submitted! We\'ll review and approve your listing within 24-48 hours. (This is a demo - no data was saved)');
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSpecialties: prev.selectedSpecialties.includes(specialty)
        ? prev.selectedSpecialties.filter(s => s !== specialty)
        : [...prev.selectedSpecialties, specialty],
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const updateOpeningHours = (day: string, field: 'open' | 'close' | 'closed', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: 'Add Your Gym', href: '/add-gym' }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-white mb-4">Add Your Gym to Our Directory</h1>
          <p className="text-text-light text-lg">
            Can't find your gym in our directory? Add it here! No account required to submit a listing.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-6 mb-8">
          <h2 className="text-xl font-bold text-text-white mb-4 flex items-center gap-2">
            💡 How it works:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-text-light mb-6">
            <li>Submit your gym information (no account needed)</li>
            <li>We'll review and approve your listing within 24-48 hours</li>
            <li>To manage or upgrade your listing, create an account and claim it</li>
          </ol>

          <h3 className="text-lg font-semibold text-text-white mb-3">Benefits of listing your gym:</h3>
          <ul className="space-y-2 text-text-light">
            <li className="flex items-start gap-2">
              <Users className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
              <span>Reach more customers looking for gyms in Cyprus</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-secondary-green flex-shrink-0 mt-0.5" />
              <span>Free basic listing - no payment required</span>
            </li>
            <li className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-primary-purple flex-shrink-0 mt-0.5" />
              <span>Upgrade to featured listings for increased visibility (requires account)</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" />
              <span>Build customer trust with verified business status</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
              <Building className="w-6 h-6 text-primary-blue" />
              Basic Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-text-white font-semibold mb-2">
                  Gym Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="e.g., Powerhouse Gym Limassol"
                />
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-2">
                  City *
                </label>
                <select
                  required
                  value={formData.cityId}
                  onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-white font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="+357 XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    placeholder="contact@gym.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="https://yourgym.com"
                />
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-surface-card rounded-card p-8">
            <h2 className="text-2xl font-bold text-text-white mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary-blue" />
              Business Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-text-white font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Describe your gym, facilities, and what makes it special..."
                />
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-3">
                  Specialties *
                </label>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty) => (
                    <button
                      key={specialty.id}
                      type="button"
                      onClick={() => toggleSpecialty(specialty.name)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        formData.selectedSpecialties.includes(specialty.name)
                          ? 'bg-primary-blue text-white'
                          : 'bg-surface-lighter text-text-light hover:bg-surface-lighter/80'
                      }`}
                    >
                      {specialty.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-3">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {allAmenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer p-3 bg-surface-lighter rounded-lg hover:bg-surface-lighter/80"
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-primary-blue"
                      />
                      <span className="text-text-light">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-3">
                  Services Offered
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2 cursor-pointer p-3 bg-surface-lighter rounded-lg hover:bg-surface-lighter/80"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="w-4 h-4 text-primary-blue"
                      />
                      <span className="text-text-light">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-text-white font-semibold mb-3">
                  Business Hours
                </label>
                <div className="space-y-3">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-28">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!formData.openingHours[day].closed}
                            onChange={(e) => updateOpeningHours(day, 'closed', !e.target.checked)}
                            className="w-4 h-4 text-primary-blue"
                          />
                          <span className="text-text-light capitalize font-medium">{day}</span>
                        </label>
                      </div>
                      {!formData.openingHours[day].closed ? (
                        <div className="flex items-center gap-2 flex-1">
                          <select
                            value={formData.openingHours[day].open}
                            onChange={(e) => updateOpeningHours(day, 'open', e.target.value)}
                            className="px-4 py-2 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                          >
                            {timeOptions.map((time) => (
                              <option key={time.value} value={time.value}>
                                {time.label}
                              </option>
                            ))}
                          </select>
                          <span className="text-text-muted">to</span>
                          <select
                            value={formData.openingHours[day].close}
                            onChange={(e) => updateOpeningHours(day, 'close', e.target.value)}
                            className="px-4 py-2 bg-surface-lighter border border-surface-lighter rounded-lg text-text-white focus:outline-none focus:ring-2 focus:ring-primary-blue"
                          >
                            {timeOptions.map((time) => (
                              <option key={time.value} value={time.value}>
                                {time.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <span className="text-text-muted">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" asChild>
              <a href="/">Cancel</a>
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Gym
            </Button>
          </div>
        </form>

        {/* Upgrade Prompt */}
        <div className="mt-12 bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 rounded-card p-8">
          <div className="flex items-start gap-4">
            <Star className="w-8 h-8 text-accent-gold flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-text-white mb-2">
                Ready to Stand Out from the Competition?
              </h3>
              <p className="text-text-light mb-4">
                Your gym listing is just the beginning. Take your business to the next level with <strong>Featured Gym status</strong> and watch your customer traffic soar.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-2xl mb-1">🎯</div>
                  <h4 className="font-semibold text-text-white mb-1">Prime Placement</h4>
                  <p className="text-sm text-text-muted">Featured gyms appear at the top of search results and city pages</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">📈</div>
                  <h4 className="font-semibold text-text-white mb-1">3x More Visibility</h4>
                  <p className="text-sm text-text-muted">Featured listings get 300% more clicks than standard listings</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🏆</div>
                  <h4 className="font-semibold text-text-white mb-1">Premium Branding</h4>
                  <p className="text-sm text-text-muted">Photo galleries, detailed descriptions, and verified badges</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="primary" asChild>
                  <a href="/pricing">🚀 Upgrade to Featured Gym</a>
                </Button>
                <span className="text-text-muted text-sm">Starting at just €49/month • Cancel anytime</span>
              </div>
              <p className="text-text-muted text-sm mt-4">
                Join 50+ featured gyms already growing their business with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
