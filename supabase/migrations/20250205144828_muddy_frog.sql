/*
  # Privacy Laws Database Schema

  1. New Tables
    - states
      - code (text, primary key) - State code (e.g., CA, NY)
      - name (text) - Full state name
      - has_comprehensive_law (boolean) - Whether state has comprehensive privacy law
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - privacy_laws
      - id (uuid, primary key)
      - state_code (text, foreign key)
      - name (text) - Law name
      - status (text) - enacted, proposed, failed
      - effective_date (date)
      - bill_number (text) 
      - description (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - law_provisions
      - id (uuid, primary key) 
      - law_id (uuid, foreign key)
      - description (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Public read access
    - Admin write access
*/

-- Create states table
CREATE TABLE IF NOT EXISTS public.states (
  code text PRIMARY KEY,
  name text NOT NULL,
  has_comprehensive_law boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create privacy laws table
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

-- Create law provisions table
CREATE TABLE IF NOT EXISTS public.law_provisions (
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
CREATE POLICY "Allow public read access to states" ON public.states
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access to privacy laws" ON public.privacy_laws
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access to law provisions" ON public.law_provisions
  FOR SELECT TO public USING (true);

-- Create indexes
CREATE INDEX idx_privacy_laws_state_code ON public.privacy_laws(state_code);
CREATE INDEX idx_law_provisions_law_id ON public.law_provisions(law_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

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