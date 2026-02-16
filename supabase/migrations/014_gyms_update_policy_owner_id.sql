-- Migration: Allow gym updates by owner_id (claimed owners) for photo upload and listing edits
-- The app sets gyms.owner_id when admin approves a claim; RLS must allow those users to UPDATE.

-- Drop the existing update policy so we can replace it with one that includes owner_id
DROP POLICY IF EXISTS "Gym owners can update their gyms" ON public.gyms;

-- Recreate: allow UPDATE if user is the owner (owner_id), or in gym_owners, or admin in user_profiles
CREATE POLICY "Gym owners can update their gyms"
  ON public.gyms
  FOR UPDATE
  TO public
  USING (
    (gyms.owner_id = auth.uid())
    OR (EXISTS (
      SELECT 1 FROM gym_owners
      WHERE gym_owners.gym_id = gyms.id AND gym_owners.user_id = auth.uid()
    ))
    OR (EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid() AND (user_profiles.role)::text = 'admin'::text
    ))
  );
