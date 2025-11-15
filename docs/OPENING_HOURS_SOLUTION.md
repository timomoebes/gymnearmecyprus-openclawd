# Opening Hours Display Solution

## Problem
Gyms have varying complexity in their opening hours:
- **Simple**: "Monday-Friday: 6:30-9:15, 16:00-20:00"
- **Complex**: Multiple session types per day (Private Training, Open Gym, Group Training)

## Current Structure
- Database: JSON field `opening_hours` stored as text
- Type: `{ monday?: string, tuesday?: string, ... }`
- Display: Simple day + hours string

## Short-Term Solution (Immediate - 0-3 months)

### Database Format
Keep simple string format but allow structured text:

**Simple gym (Combat & Fitness):**
```json
{
  "monday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "tuesday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "wednesday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "thursday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "friday": "Morning: 6:30-9:15, Afternoon: 16:00-20:00",
  "saturday": "Morning: 8:30-9:30"
}
```

**Complex gym (Dreamchasers):**
```json
{
  "monday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "tuesday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "wednesday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "thursday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "friday": "Morning Sessions:\n• Private Training: 07:00-10:00\n• Open Gym: 10:00-13:00\n\nEvening Sessions:\n• Private Training: 15:00-16:00\n• Group Training: 16:00-20:00\n• Private Training: 20:00-22:00",
  "saturday": "Private Training: 07:00-13:00"
}
```

### Frontend Display
Update the display component to:
1. Detect if hours contain newlines (complex format)
2. Render simple format as single line
3. Render complex format with proper formatting (sections, bullet points)

**Advantages:**
- ✅ No database schema changes needed
- ✅ Works with existing 121+ gyms
- ✅ Flexible - can handle any format
- ✅ Easy to implement (just update display component)

**Disadvantages:**
- ❌ Not queryable (can't filter by "has morning sessions")
- ❌ Not structured (hard to parse programmatically)
- ❌ Manual formatting required

## Long-Term Solution (3-6 months)

### Database Schema
Create structured format with sessions:

```sql
-- New table for opening hours sessions
CREATE TABLE gym_opening_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Monday, 6=Sunday
  session_type VARCHAR(50), -- 'open_gym', 'private_training', 'group_training', 'class', etc.
  session_label VARCHAR(100), -- Display label: "Private Training", "Open Gym", etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_closed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(gym_id, day_of_week, session_type, start_time)
);

-- Index for queries
CREATE INDEX idx_gym_opening_hours_gym_id ON gym_opening_hours(gym_id);
CREATE INDEX idx_gym_opening_hours_day ON gym_opening_hours(day_of_week);
```

### TypeScript Type
```typescript
interface OpeningHoursSession {
  type: string; // 'open_gym' | 'private_training' | 'group_training' | 'class'
  label: string; // Display name
  startTime: string; // "07:00"
  endTime: string; // "10:00"
}

interface OpeningHours {
  monday?: OpeningHoursSession[];
  tuesday?: OpeningHoursSession[];
  wednesday?: OpeningHoursSession[];
  thursday?: OpeningHoursSession[];
  friday?: OpeningHoursSession[];
  saturday?: OpeningHoursSession[];
  sunday?: OpeningHoursSession[];
}
```

### Example Data
**Combat & Fitness:**
```json
{
  "monday": [
    { "type": "open_gym", "label": "Morning", "startTime": "06:30", "endTime": "09:15" },
    { "type": "open_gym", "label": "Afternoon", "startTime": "16:00", "endTime": "20:00" }
  ],
  "tuesday": [
    { "type": "open_gym", "label": "Morning", "startTime": "06:30", "endTime": "09:15" },
    { "type": "open_gym", "label": "Afternoon", "startTime": "16:00", "endTime": "20:00" }
  ],
  // ... same for wed-fri
  "saturday": [
    { "type": "open_gym", "label": "Morning", "startTime": "08:30", "endTime": "09:30" }
  ]
}
```

**Dreamchasers:**
```json
{
  "monday": [
    { "type": "private_training", "label": "Private Training", "startTime": "07:00", "endTime": "10:00" },
    { "type": "open_gym", "label": "Open Gym", "startTime": "10:00", "endTime": "13:00" },
    { "type": "private_training", "label": "Private Training", "startTime": "15:00", "endTime": "16:00" },
    { "type": "group_training", "label": "Group Training", "startTime": "16:00", "endTime": "20:00" },
    { "type": "private_training", "label": "Private Training", "startTime": "20:00", "endTime": "22:00" }
  ],
  // ... same for tue-fri
  "saturday": [
    { "type": "private_training", "label": "Private Training", "startTime": "07:00", "endTime": "13:00" }
  ]
}
```

**Advantages:**
- ✅ Fully queryable (filter gyms by session type, time ranges)
- ✅ Structured and parseable
- ✅ Supports advanced features (booking, availability checks)
- ✅ SEO-friendly (structured data)
- ✅ Future-proof for features like "find gyms open now"

**Disadvantages:**
- ❌ Requires database migration
- ❌ Need to migrate existing 121+ gyms
- ❌ More complex to implement
- ❌ Requires admin UI for editing

## Migration Strategy

### Phase 1: Short-Term (Now)
1. Update display component to handle formatted strings
2. For new gyms, use formatted string format
3. Keep existing gyms as-is

### Phase 2: Long-Term (3-6 months)
1. Create new `gym_opening_hours` table
2. Build migration script to parse existing string formats
3. Create admin UI for structured editing
4. Migrate gyms gradually (start with complex ones)
5. Update frontend to use structured format
6. Deprecate old `opening_hours` JSON field

## Recommended Approach

**Start with Short-Term** because:
- Immediate solution (can implement today)
- No breaking changes
- Works with all existing gyms
- Can display complex schedules nicely

**Plan Long-Term** for:
- When you have 200+ gyms
- When you need booking/availability features
- When you want to filter by session types
- When you have resources for migration

