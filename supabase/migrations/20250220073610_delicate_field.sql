/*
  # Privacy Tools Directory Schema

  1. New Tables
    - `tool_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `slug` (text)
      - `icon` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `privacy_tools`
      - `id` (uuid, primary key)
      - `category_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `url` (text)
      - `github_url` (text, nullable)
      - `license` (text, nullable)
      - `is_open_source` (boolean)
      - `is_free` (boolean)
      - `has_paid_plan` (boolean)
      - `platforms` (text[])
      - `tags` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access
    - Admin write access

  3. Indexes
    - Category slug
    - Tool name search
    - Tool tags
*/

-- Create tool categories table
CREATE TABLE public.tool_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  slug text UNIQUE NOT NULL,
  icon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create privacy tools table
CREATE TABLE public.privacy_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.tool_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  url text NOT NULL,
  github_url text,
  license text,
  is_open_source boolean DEFAULT false,
  is_free boolean DEFAULT false,
  has_paid_plan boolean DEFAULT false,
  platforms text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_tool_categories_slug ON public.tool_categories(slug);
CREATE INDEX idx_privacy_tools_name ON public.privacy_tools USING gin(to_tsvector('english', name));
CREATE INDEX idx_privacy_tools_tags ON public.privacy_tools USING gin(tags);

-- Enable RLS
ALTER TABLE public.tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_tools ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to tool categories"
  ON public.tool_categories
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public read access to privacy tools"
  ON public.privacy_tools
  FOR SELECT TO public
  USING (true);

-- Create updated_at triggers
CREATE TRIGGER update_tool_categories_updated_at
  BEFORE UPDATE ON public.tool_categories
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_privacy_tools_updated_at
  BEFORE UPDATE ON public.privacy_tools
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();