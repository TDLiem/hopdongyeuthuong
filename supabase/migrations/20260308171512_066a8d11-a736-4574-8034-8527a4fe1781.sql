
-- Create a single-row table for shared contract data
CREATE TABLE public.contract_data (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  clauses JSONB NOT NULL DEFAULT '[]'::jsonb,
  rewards JSONB NOT NULL DEFAULT '[]'::jsonb,
  penalties JSONB NOT NULL DEFAULT '[]'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contract_data ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Anyone can read contract data"
ON public.contract_data FOR SELECT USING (true);

-- Allow anyone to update (shared contract)
CREATE POLICY "Anyone can update contract data"
ON public.contract_data FOR UPDATE USING (true);

-- Allow insert for initial seed
CREATE POLICY "Anyone can insert contract data"
ON public.contract_data FOR INSERT WITH CHECK (true);
