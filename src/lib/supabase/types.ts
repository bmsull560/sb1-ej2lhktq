export interface State {
  code: string;
  name: string;
  has_comprehensive_law: boolean;
  created_at: string;
  updated_at: string;
}

export interface PrivacyLaw {
  id: string;
  state_code: string;
  name: string;
  status: 'enacted' | 'proposed' | 'failed';
  effective_date?: string;
  bill_number?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface LawProvision {
  id: string;
  law_id: string;
  description: string;
  created_at: string;
  updated_at: string;
}