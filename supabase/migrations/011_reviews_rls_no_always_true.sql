-- Security Advisor: "RLS Policy Always True" für reviews beheben
-- WITH CHECK (true) wird als zu permissiv gewertet → explizite Bedingung nutzen

DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.reviews;

CREATE POLICY "Authenticated users can insert reviews"
  ON public.reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
