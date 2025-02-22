-- Drop existing objects if they exist
DO $$ 
BEGIN
  -- Drop policies if they exist
  DROP POLICY IF EXISTS "Allow public read access to states" ON public.states;
  DROP POLICY IF EXISTS "Allow public read access to privacy laws" ON public.privacy_laws;
  DROP POLICY IF EXISTS "Allow public read access to law provisions" ON public.law_provisions;

  -- Drop triggers if they exist
  DROP TRIGGER IF EXISTS update_states_updated_at ON public.states;
  DROP TRIGGER IF EXISTS update_privacy_laws_updated_at ON public.privacy_laws;
  DROP TRIGGER IF EXISTS update_law_provisions_updated_at ON public.law_provisions;

  -- Drop tables if they exist (in correct order)
  DROP TABLE IF EXISTS public.law_provisions;
  DROP TABLE IF EXISTS public.privacy_laws;
  DROP TABLE IF EXISTS public.states;
END $$;

-- Create states table
CREATE TABLE public.states (
  code text PRIMARY KEY,
  name text NOT NULL,
  has_comprehensive_law boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create privacy laws table
CREATE TABLE public.privacy_laws (
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

-- Create law provisions table
CREATE TABLE public.law_provisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  law_id uuid REFERENCES public.privacy_laws(id) ON DELETE CASCADE,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_laws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.law_provisions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to states" 
  ON public.states FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow public read access to privacy laws" 
  ON public.privacy_laws FOR SELECT TO public 
  USING (true);

CREATE POLICY "Allow public read access to law provisions" 
  ON public.law_provisions FOR SELECT TO public 
  USING (true);

-- Create indexes
CREATE INDEX idx_privacy_laws_state_code ON public.privacy_laws(state_code);
CREATE INDEX idx_law_provisions_law_id ON public.law_provisions(law_id);

-- Create triggers using existing update_updated_at_column function
CREATE TRIGGER update_states_updated_at
  BEFORE UPDATE ON states
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_privacy_laws_updated_at
  BEFORE UPDATE ON privacy_laws
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_law_provisions_updated_at
  BEFORE UPDATE ON law_provisions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();