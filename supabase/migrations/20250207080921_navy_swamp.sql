-- Insert states
INSERT INTO public.states (code, name, has_comprehensive_law) VALUES
  ('CA', 'California', true),
  ('VA', 'Virginia', true),
  ('CO', 'Colorado', true),
  ('CT', 'Connecticut', true),
  ('UT', 'Utah', true),
  ('AL', 'Alabama', false),
  ('AK', 'Alaska', false),
  ('AZ', 'Arizona', false),
  ('AR', 'Arkansas', false),
  ('DE', 'Delaware', false),
  ('FL', 'Florida', false),
  ('GA', 'Georgia', false),
  ('HI', 'Hawaii', false),
  ('ID', 'Idaho', false),
  ('IL', 'Illinois', false),
  ('IN', 'Indiana', false),
  ('IA', 'Iowa', false),
  ('KS', 'Kansas', false),
  ('KY', 'Kentucky', false),
  ('LA', 'Louisiana', false),
  ('ME', 'Maine', false),
  ('MD', 'Maryland', false),
  ('MA', 'Massachusetts', false),
  ('MI', 'Michigan', false),
  ('MN', 'Minnesota', false),
  ('MS', 'Mississippi', false),
  ('MO', 'Missouri', false),
  ('MT', 'Montana', false),
  ('NE', 'Nebraska', false),
  ('NV', 'Nevada', false),
  ('NH', 'New Hampshire', false),
  ('NJ', 'New Jersey', false),
  ('NM', 'New Mexico', false),
  ('NY', 'New York', false),
  ('NC', 'North Carolina', false),
  ('ND', 'North Dakota', false),
  ('OH', 'Ohio', false),
  ('OK', 'Oklahoma', false),
  ('OR', 'Oregon', false),
  ('PA', 'Pennsylvania', false),
  ('RI', 'Rhode Island', false),
  ('SC', 'South Carolina', false),
  ('SD', 'South Dakota', false),
  ('TN', 'Tennessee', false),
  ('TX', 'Texas', false),
  ('VT', 'Vermont', false),
  ('WA', 'Washington', false),
  ('WV', 'West Virginia', false),
  ('WI', 'Wisconsin', false),
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

WITH law AS (
  INSERT INTO public.privacy_laws (
    state_code, name, status, effective_date, bill_number, description
  ) VALUES (
    'CA',
    'California Consumer Privacy Act (CCPA)',
    'enacted',
    '2020-01-01',
    'AB 375',
    'Comprehensive consumer privacy law giving California residents control over their personal information collected by businesses.'
  ) RETURNING id
)
INSERT INTO public.law_provisions (law_id, description) VALUES
  ((SELECT id FROM law), 'Right to know what personal information is collected'),
  ((SELECT id FROM law), 'Right to delete personal information'),
  ((SELECT id FROM law), 'Right to opt-out of sale of personal information'),
  ((SELECT id FROM law), 'Right to non-discrimination for exercising rights'),
  ((SELECT id FROM law), 'Mandatory privacy policy requirements'),
  ((SELECT id FROM law), 'Data breach notification requirements');

-- Insert Virginia privacy laws
WITH law AS (
  INSERT INTO public.privacy_laws (
    state_code, name, status, effective_date, bill_number, description
  ) VALUES (
    'VA',
    'Virginia Consumer Data Protection Act (VCDPA)',
    'enacted',
    '2023-01-01',
    'SB 1392',
    'Comprehensive privacy law modeled after the GDPR and CCPA, establishing consumer rights and business obligations.'
  ) RETURNING id
)
INSERT INTO public.law_provisions (law_id, description) VALUES
  ((SELECT id FROM law), 'Consumer rights to access, correct, delete, and export data'),
  ((SELECT id FROM law), 'Right to opt out of targeted advertising'),
  ((SELECT id FROM law), 'Data protection assessments for high-risk processing'),
  ((SELECT id FROM law), 'Explicit consent required for sensitive data processing'),
  ((SELECT id FROM law), 'Processor and controller obligations'),
  ((SELECT id FROM law), 'Enforcement by Attorney General');

-- Insert Colorado privacy laws
WITH law AS (
  INSERT INTO public.privacy_laws (
    state_code, name, status, effective_date, bill_number, description
  ) VALUES (
    'CO',
    'Colorado Privacy Act (CPA)',
    'enacted',
    '2023-07-01',
    'SB 21-190',
    'Comprehensive privacy law establishing consumer rights and controller/processor obligations.'
  ) RETURNING id
)
INSERT INTO public.law_provisions (law_id, description) VALUES
  ((SELECT id FROM law), 'Universal opt-out mechanism requirement'),
  ((SELECT id FROM law), 'Right to appeal company decisions'),
  ((SELECT id FROM law), 'Data protection assessments'),
  ((SELECT id FROM law), 'Consent requirements for sensitive data'),
  ((SELECT id FROM law), 'Privacy notice requirements'),
  ((SELECT id FROM law), 'Data minimization principles');

-- Insert Connecticut privacy laws
WITH law AS (
  INSERT INTO public.privacy_laws (
    state_code, name, status, effective_date, bill_number, description
  ) VALUES (
    'CT',
    'Connecticut Data Privacy Act (CTDPA)',
    'enacted',
    '2023-07-01',
    'SB 6',
    'Comprehensive privacy law establishing consumer rights and business obligations for data protection.'
  ) RETURNING id
)
INSERT INTO public.law_provisions (law_id, description) VALUES
  ((SELECT id FROM law), 'Consumer rights to access, correct, delete, and port data'),
  ((SELECT id FROM law), 'Opt-out rights for targeted advertising'),
  ((SELECT id FROM law), 'Data minimization requirements'),
  ((SELECT id FROM law), 'Privacy notice obligations'),
  ((SELECT id FROM law), 'Processor and controller duties'),
  ((SELECT id FROM law), 'Enforcement by Attorney General');

-- Insert Utah privacy laws
WITH law AS (
  INSERT INTO public.privacy_laws (
    state_code, name, status, effective_date, bill_number, description
  ) VALUES (
    'UT',
    'Utah Consumer Privacy Act (UCPA)',
    'enacted',
    '2023-12-31',
    'SB 227',
    'Business-friendly comprehensive privacy law establishing consumer rights and business obligations.'
  ) RETURNING id
)
INSERT INTO public.law_provisions (law_id, description) VALUES
  ((SELECT id FROM law), 'Consumer rights to access and delete data'),
  ((SELECT id FROM law), 'Right to opt out of targeted advertising'),
  ((SELECT id FROM law), 'No private right of action'),
  ((SELECT id FROM law), 'Enforcement by Attorney General only'),
  ((SELECT id FROM law), 'Controller and processor obligations'),
  ((SELECT id FROM law), 'Data security requirements');