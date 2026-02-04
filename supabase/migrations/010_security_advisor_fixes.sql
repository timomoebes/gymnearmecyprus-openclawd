-- Security Advisor Fixes (see docs/SECURITY_AUDIT_REPORT.md)
-- 1) RLS: replace permissive "Anyone can insert reviews" with authenticated-only insert
-- 2) Function search_path: set explicit search_path on advisor-flagged functions

-- ---------------------------------------------------------------------------
-- 1. RLS: reviews table – restrict INSERT to authenticated users
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;

CREATE POLICY "Authenticated users can insert reviews"
  ON public.reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- 2. Function search_path (fixes "Function Search Path Mutable" advisor)
-- ---------------------------------------------------------------------------
-- update_updated_at_column: typically a trigger function with no args
-- (PostgreSQL does not support IF EXISTS for ALTER FUNCTION; comment out if function is missing)
ALTER FUNCTION public.update_updated_at_column()
  SET search_path = public;

-- get_gym_average_rating: set search_path (works for any argument signature)
DO $$
DECLARE
  fn_oid oid;
  fn_args text;
BEGIN
  SELECT p.oid, pg_get_function_identity_arguments(p.oid)
    INTO fn_oid, fn_args
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'get_gym_average_rating'
    LIMIT 1;
  IF fn_oid IS NOT NULL THEN
    EXECUTE format(
      'ALTER FUNCTION public.get_gym_average_rating(%s) SET search_path = public',
      fn_args
    );
  END IF;
END $$;
