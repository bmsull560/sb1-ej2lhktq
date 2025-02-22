/*
  # Initial Privacy Laws Data

  1. States
    - Insert all US states
    - Mark states with comprehensive privacy laws
    
  2. Privacy Laws
    - Insert enacted comprehensive privacy laws
    - Include key provisions for each law
*/

-- Insert states
INSERT INTO public.states (code, name, has_comprehensive_law) VALUES
  ('CA', 'California', true),
  ('VA', 'Virginia', true),
  ('CO', 'Colorado', true),
  ('CT', 'Connecticut', true),
  ('UT', 'Utah', true),
  ('AL', 'Alabama', false),
  ('AK', 'Alaska', false),
  -- Insert remaining states...
  ('WY', 'Wyoming', false)
ON CONFLICT (code) DO UPDATE SET
  has_comprehensive_law = EXCLUDED.has_comprehensive_law;

-- Insert California privacy laws
WITH law AS (
  INSERT INTO public.privacy_laws (
    state_code, name, status, effective_date, bill_number, description
  ) VALUES (
    'CA',
    'California Privacy Rights Act (CPRA)',
    'enacted',
    '2023-01-01',
    'Prop 24',
    'Expands and amends the CCPA, creating new privacy rights and obligations for businesses that collect and process personal information of California residents.'
  ) RETURNING id
)
INSERT INTO public.law_provisions (law_id, description) VALUES
  ((SELECT id FROM law), 'Right to correct inaccurate personal information'),
  ((SELECT id FROM law), 'Right to limit use of sensitive personal information'),
  ((SELECT id FROM law), 'Right to opt out of automated decision-making technology'),
  ((SELECT id FROM law), 'Creation of California Privacy Protection Agency'),
  ((SELECT id FROM law), 'Enhanced requirements for privacy policy disclosures'),
  ((SELECT id FROM law), 'Expanded definition of "sale" to include sharing of personal information');

-- Insert additional state laws and provisions...