-- Create states table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.states (
  code text PRIMARY KEY,
  name text NOT NULL,
  has_comprehensive_law boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create privacy laws table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.privacy_laws (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code text REFERENCES public.states(code) ON DELETE CASCADE,
  name text NOT NULL,
  status text NOT NULL CHECK (status IN ('enacted', 'proposed', 'failed')),
  effective_date date,
  bill_number text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create law provisions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.law_provisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  law_id uuid REFERENCES public.privacy_laws(id) ON DELETE CASCADE,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'states' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'privacy_laws' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.privacy_laws ENABLE ROW LEVEL SECURITY;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'law_provisions' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE public.law_provisions ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'states' 
    AND policyname = 'Allow public read access to states'
  ) THEN
    CREATE POLICY "Allow public read access to states" 
      ON public.states FOR SELECT TO public 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'privacy_laws' 
    AND policyname = 'Allow public read access to privacy laws'
  ) THEN
    CREATE POLICY "Allow public read access to privacy laws" 
      ON public.privacy_laws FOR SELECT TO public 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'law_provisions' 
    AND policyname = 'Allow public read access to law provisions'
  ) THEN
    CREATE POLICY "Allow public read access to law provisions" 
      ON public.law_provisions FOR SELECT TO public 
      USING (true);
  END IF;
END $$;

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

-- Create triggers if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_states_updated_at'
  ) THEN
    CREATE TRIGGER update_states_updated_at
      BEFORE UPDATE ON states
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_privacy_laws_updated_at'
  ) THEN
    CREATE TRIGGER update_privacy_laws_updated_at
      BEFORE UPDATE ON privacy_laws
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_law_provisions_updated_at'
  ) THEN
    CREATE TRIGGER update_law_provisions_updated_at
      BEFORE UPDATE ON law_provisions
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
  END IF;
END $$;