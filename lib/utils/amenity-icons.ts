import type { LucideIcon } from 'lucide-react';
import {
  Coffee,
  Users,
  Droplets,
  Activity,
  Droplet,
  Wind,
  KeyRound,
  Flame,
  Bath,
  Wifi,
  Car,
  CloudFog,
  Waves,
  Baby,
  AirVent,
  Clock,
  CheckCircle,
} from 'lucide-react';

/**
 * Map amenity name (as stored in DB / displayed) to a Lucide icon.
 * Unknown amenities fall back to CheckCircle.
 */
const AMENITY_ICONS: Record<string, LucideIcon> = {
  'Cafe': Coffee,
  'Group Classes': Users,
  'Showers': Droplets,
  'Cardio Equipment': Activity,
  'Free Water': Droplet,
  'Hair Dryers': Wind,
  'Locker Room': KeyRound,
  'Sauna': Flame,
  'Toilets': Bath,
  'WiFi': Wifi,
  'Parking': Car,
  'Steam Room': CloudFog,
  'Swimming Pool': Waves,
  'Kids Friendly': Baby,
  'Air Condition': AirVent,
  '24/7 Access': Clock,
};

/**
 * Returns the Lucide icon component for an amenity name.
 * Uses CheckCircle for any amenity not in the map (e.g. future DB entries).
 */
export function getAmenityIcon(amenityName: string): LucideIcon {
  return AMENITY_ICONS[amenityName] ?? CheckCircle;
}
