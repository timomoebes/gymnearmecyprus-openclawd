# Photo Upload Feature Setup Guide

## Overview
The photo upload feature allows gym owners to upload up to 3 photos (free tier) or 10 photos (featured tier) to their claimed listings. Photos are stored in Supabase Storage and URLs are saved to the gym profile in the database.

## Tech Stack
- **Storage**: Supabase Storage (bucket: `gym-photos`)
- **Database**: Supabase PostgreSQL (gyms table)
- **Frontend**: Next.js React Component (OwnerPhotoUpload.tsx)
- **Auth**: Supabase Authentication (JWT via cookies)

## Components & Files

### 1. Database Schema
**File**: `supabase/migrations/012_add_featured_images.sql`

Adds `featured_images` JSONB array column to `gyms` table:
```sql
ALTER TABLE gyms ADD COLUMN featured_images JSONB DEFAULT '[]'::jsonb;
```

**Example data**:
```json
{
  "featured_images": [
    "https://bucket.supabase.co/storage/v1/object/public/gym-photos/gyms/{gymId}/photos/photo1.jpg",
    "https://bucket.supabase.co/storage/v1/object/public/gym-photos/gyms/{gymId}/photos/photo2.png"
  ]
}
```

### 2. API Functions
**File**: `lib/api/photo-uploads.ts`

Provides server actions and utility functions:

#### `uploadPhotoToStorage(file, gymId)`
- Client-side file upload to Supabase Storage
- Validates: file type (JPG/PNG), size (max 5MB)
- Returns: public URL, filename, upload timestamp
- Path: `gyms/{gymId}/photos/{gymId}-{timestamp}.{ext}`

#### `saveFeaturedImagesToGymAction(gymId, imageUrls)`
- Server action: saves URLs to gym profile
- Validates: gym ownership (owner_id check)
- Updates: featured_images array in database
- Returns: success status and updated images array

#### `deletePhotoFromStorageAction(gymId, photoUrl)`
- Server action: deletes photo from storage + database
- Validates: gym ownership
- Updates: removes URL from featured_images array
- Returns: success status

#### `validatePhotoFile(file)`
- Client-side validation helper
- Checks: file size (max 5MB), MIME type (JPG/PNG)
- Returns: validation result with error message if invalid

#### `getFeaturedImagesForGym(gymId)`
- Fetches featured_images array for a gym
- Returns: array of image URLs

### 3. React Component
**File**: `components/owner/OwnerPhotoUpload.tsx`

User-facing component with:
- **Drag-and-drop UI**: Drag files or click to browse
- **File validation**: Real-time validation with error messages
- **Upload queue**: Shows pending files with file sizes
- **Image gallery**: Displays uploaded images with delete buttons
- **Error handling**: Toast messages for all operations
- **Loading states**: Smooth UX during uploads
- **Image limit tracking**: Shows current count (X/3 free or X/10 featured)

**Props**:
```typescript
interface OwnerPhotoUploadProps {
  gymId: string;              // Required: gym ID
  maxImages?: number;        // Optional: plan limit (default 3 free, 10 featured)
  isFeatured?: boolean;      // Optional: used for upgrade CTA when false
  onSuccess?: (imageUrls: string[]) => void;  // Optional: callback after successful upload
}
```

### 4. Dashboard Integration
**File**: `app/dashboard/page.tsx`

- New "Photos" tab in owner dashboard
- Quick action button to navigate to Photos tab
- Displays OwnerPhotoUpload component for claimed gym
- Calls onSuccess callback to update UI

## Setup Instructions

### Step 1: Create the Storage Bucket (Supabase Dashboard)

1. Go to **Supabase Dashboard** → **Storage**
2. Click **Create a new bucket**
3. Name: `gym-photos`
4. Privacy: **Public** (for read access; write is controlled by RLS)
5. Click **Create bucket**

### Step 2: Set Up Storage RLS Policies

1. In Supabase Dashboard, go to **Storage** → **gym-photos** bucket
2. Click the **Policies** tab
3. Create the following policies:

**Policy 1: Allow public read access**
- Name: `Allow public read gym photos`
- Command: `SELECT`
- Target roles: `public`
- **USING expression:** In the "USING expression" field, enter either:
  - `true` (allow read on all rows), or
  - `(bucket_id = 'gym-photos')` (allow read only for objects in the `gym-photos` bucket — **recommended**; this is often the Supabase default when creating a policy for this bucket).  
  Both work; the second is more precise.

**Policy 2: Allow authenticated uploads to own gym**
- Name: `Allow authenticated users upload to own gym`
- Command: `INSERT`
- Target roles: `authenticated`
- WITH CHECK: `bucket_id = 'gym-photos'`
- Note: Ownership check is done in application code via `saveFeaturedImagesToGymAction`

### Step 3: Run Database Migration

```bash
# Using Supabase CLI
supabase migration list
supabase db push

# Or manually execute migration 012_add_featured_images.sql
# in Supabase Dashboard SQL editor
```

### Step 4: Update Environment Variables

Ensure `.env.local` contains:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 5: Test the Feature

1. Run the app: `npm run dev`
2. Sign in as a gym owner (with claimed gym)
3. Navigate to Dashboard → Photos tab
4. Upload test images:
   - Valid: JPG/PNG files under 5MB
   - Invalid: TIFF, BMP, files over 5MB
5. Verify images appear in gallery
6. Test delete: hover over image, click X
7. Test drag-drop: drag multiple files to upload area

## Validation Rules

### File Validation
- **Formats**: JPG, PNG only
- **Size**: Max 5MB per file
- **Count**: Max 3 images per gym (free) or 10 (featured)
- **Total**: Existing + Pending + New cannot exceed plan limit

### Database Validation
- **Ownership**: Only gym owner (owner_id = auth.uid()) can upload
- **Array**: featured_images is JSONB array of strings (URLs)
- **Updates**: updated_at timestamp is automatically set

## Error Handling

### Client-Side Errors
- Invalid file type → User message + stop
- File too large → User message + stop
- Exceeds image limit → User message + stop

### Server-Side Errors
- User not authenticated → Error: "Must be signed in"
- User doesn't own gym → Error: "You do not own this gym"
- Gym not found → Error: "Gym not found"
- Database update failed → Error message + suggestion

### Storage Errors
- Upload fails → Error message with reason
- Delete fails → Error with context
- All errors prevent operations + show toast

## Usage Examples

### Component Usage in Dashboard
```tsx
import { OwnerPhotoUpload } from '@/components/owner/OwnerPhotoUpload';

export function MyDashboard() {
  const [gym] = useState<Gym>({ id: 'gym-123', ... });

  return (
    <OwnerPhotoUpload
      gymId={gym.id}
      onSuccess={(images) => console.log('Uploaded:', images)}
    />
  );
}
```

### Direct API Usage
```tsx
import {
  uploadPhotoToStorage,
  saveFeaturedImagesToGymAction,
  deletePhotoFromStorageAction,
} from '@/lib/api/photo-uploads';

// Upload file to storage
const result = await uploadPhotoToStorage(file, gymId);
console.log(result.url);

// Save URLs to gym profile
const saveResult = await saveFeaturedImagesToGymAction(gymId, [result.url]);

// Delete photo
const deleteResult = await deletePhotoFromStorageAction(gymId, imageUrl);
```

## Security Considerations

1. **RLS Policies**: Storage bucket RLS restricts uploads to authenticated users; app code verifies gym ownership
2. **Ownership Check**: Server action verifies `owner_id` before any database modification
3. **File Validation**: Client + server-side validation prevents invalid files
4. **No Admin Bypass**: Even admins must own gym to upload (could be changed if needed)
5. **Public Read**: Photos are public (by design; change RLS if needed)
6. **Path Isolation**: Files stored under `gyms/{gymId}/photos/` for organization

## Troubleshooting

### Photos not uploading
1. Check Supabase Storage bucket exists: `gym-photos`
2. Verify RLS policies are configured correctly
3. Check NEXT_PUBLIC_SUPABASE_ANON_KEY is set in `.env.local`
4. Check browser console for errors

### Photos not saving to database
1. Verify migration 012 was applied: Check `gyms.featured_images` column exists
2. Check user is authenticated
3. Verify user owns the gym (check `gyms.owner_id`)
4. Check app logs for server action errors

### CORS errors
1. Supabase Storage should have CORS configured by default
2. If issues, check Supabase project settings → Security

### Slow uploads
1. Large files or slow connection
2. Implement progress bar if needed (see future enhancements)

## Future Enhancements

1. **Upload Progress**: Add progress bar using `fetch` with onProgress callback
2. **Image Optimization**: Compress/resize images before upload
3. **Image Cropping**: Allow users to crop/rotate before upload
4. **Reordering**: Drag-to-reorder featured images
5. **Aspect Ratio**: Enforce consistent aspect ratios
6. **Alt Text**: Allow adding descriptions to images
7. **Batch Delete**: Select multiple images to delete
8. **Preview**: Preview before uploading

## Monitoring & Analytics

Track uploads in Supabase:
1. Go to **Storage** → **gym-photos** → **Files** tab
2. Monitor file sizes and counts
3. Check storage usage in project settings

## Troubleshooting

### "new row violates row-level security policy" on upload

- **Cause:** The upload request was not sent as an authenticated user, so Storage treated it as `anon`. Your INSERT policy allows only `authenticated` users.
- **Fix in app:** The upload must use the **browser** Supabase client (session in cookies), not the plain anon client. The code in `lib/api/photo-uploads.ts` uses `createClient()` from `@/lib/supabase/browser` so the user's JWT is sent with the request.
- **Policy check:** For the INSERT policy, set the **WITH CHECK** expression to `(bucket_id = 'gym-photos')`. In the Supabase Storage policy UI, use the "WITH CHECK expression" field (not only "USING"). Target role: `authenticated`.

### Photo uploads succeed but images don’t save to the gym (DB update fails)

- **Cause:** The app treats ownership as **`gyms.owner_id = auth.uid()`** (set when an admin approves a claim). If your **gyms** table RLS UPDATE policy only allows updates via **gym_owners** or **user_profiles.role = 'admin'**, claimed owners (with `owner_id` set) are blocked from updating `featured_images`.
- **Fix:** Allow updates when **`gyms.owner_id = auth.uid()`** as well. Run the migration **`supabase/migrations/014_gyms_update_policy_owner_id.sql`** in the Supabase SQL Editor (or `supabase db push`). It replaces the "Gym owners can update their gyms" policy so that either `gyms.owner_id = auth.uid()`, or a row in **gym_owners**, or an admin in **user_profiles** can update.

## References

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js File Upload](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
