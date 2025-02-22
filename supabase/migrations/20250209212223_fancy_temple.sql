-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow public read access to states" ON public.states;
  DROP POLICY IF EXISTS "Allow public read access to privacy laws" ON public.privacy_laws;
  DROP POLICY IF EXISTS "Allow public read access to law provisions" ON public.law_provisions;
END $$;

-- Recreate policies with public access
CREATE POLICY "Allow public read access to states" 
  ON public.states FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow public read access to privacy laws" 
  ON public.privacy_laws FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow public read access to law provisions" 
  ON public.law_provisions FOR SELECT TO public 
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_laws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.law_provisions ENABLE ROW LEVEL SECURITY;

-- Create indexes if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'privacy_laws' 
    AND indexname = 'idx_privacy_laws_state_code'
  ) THEN
    CREATE INDEX idx_privacy_laws_state_code ON public.privacy_laws(state_code);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'law_provisions' 
    AND indexname = 'idx_law_provisions_law_id'
  ) THEN
    CREATE INDEX idx_law_provisions_law_id ON public.law_provisions(law_id);
  END IF;
END $$;