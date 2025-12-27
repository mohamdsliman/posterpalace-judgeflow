-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'judge', 'user');

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('pending', 'approved', 'rejected');

-- Create enum for evaluation status
CREATE TYPE public.evaluation_status AS ENUM ('pending', 'in_progress', 'completed');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  institution TEXT,
  is_external BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Create specializations table (תחומי התמחות)
CREATE TABLE public.specializations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create conferences table (כנסים)
CREATE TABLE public.conferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create sessions table (מושבים)
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id UUID REFERENCES public.conferences(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  max_judges INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create session_specializations junction table
CREATE TABLE public.session_specializations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  specialization_id UUID REFERENCES public.specializations(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (session_id, specialization_id)
);

-- Create projects table (פרויקטים)
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  specialization_id UUID REFERENCES public.specializations(id) ON DELETE SET NULL,
  students TEXT[] NOT NULL DEFAULT '{}',
  supervisor TEXT,
  poster_url TEXT,
  status project_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create evaluation_criteria table (קריטריונים להערכה)
CREATE TABLE public.evaluation_criteria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_id UUID REFERENCES public.conferences(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  max_score INTEGER DEFAULT 10 NOT NULL,
  weight DECIMAL(3,2) DEFAULT 1.00 NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create judge_sessions table (שיבוץ שופטים למושבים)
CREATE TABLE public.judge_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judge_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (judge_id, session_id)
);

-- Create evaluations table (הערכות)
CREATE TABLE public.evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  judge_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status evaluation_status DEFAULT 'pending',
  total_score DECIMAL(5,2),
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (project_id, judge_id)
);

-- Create evaluation_scores table (ציונים לפי קריטריון)
CREATE TABLE public.evaluation_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID REFERENCES public.evaluations(id) ON DELETE CASCADE NOT NULL,
  criteria_id UUID REFERENCES public.evaluation_criteria(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  comment TEXT,
  UNIQUE (evaluation_id, criteria_id)
);

-- Create reminders table (תזכורות)
CREATE TABLE public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judge_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'conference_reminder', 'evaluation_reminder'
  message TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judge_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user profile id
CREATE OR REPLACE FUNCTION public.get_profile_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- User roles policies (only admins can manage)
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Specializations policies (public read, admin write)
CREATE POLICY "Anyone can view specializations" ON public.specializations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage specializations" ON public.specializations
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Conferences policies
CREATE POLICY "Anyone can view active conferences" ON public.conferences
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage conferences" ON public.conferences
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Sessions policies
CREATE POLICY "Anyone can view sessions" ON public.sessions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage sessions" ON public.sessions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Session specializations policies
CREATE POLICY "Anyone can view session specializations" ON public.session_specializations
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage session specializations" ON public.session_specializations
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Projects policies
CREATE POLICY "Anyone can view approved projects" ON public.projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Evaluation criteria policies
CREATE POLICY "Anyone can view evaluation criteria" ON public.evaluation_criteria
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage evaluation criteria" ON public.evaluation_criteria
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Judge sessions policies
CREATE POLICY "Judges can view their own sessions" ON public.judge_sessions
  FOR SELECT USING (judge_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Judges can manage their own sessions" ON public.judge_sessions
  FOR ALL USING (judge_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Admins can manage all judge sessions" ON public.judge_sessions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Evaluations policies
CREATE POLICY "Judges can view their own evaluations" ON public.evaluations
  FOR SELECT USING (judge_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Judges can manage their own evaluations" ON public.evaluations
  FOR ALL USING (judge_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Admins can view all evaluations" ON public.evaluations
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all evaluations" ON public.evaluations
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Evaluation scores policies
CREATE POLICY "Judges can manage their own scores" ON public.evaluation_scores
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.evaluations e
      WHERE e.id = evaluation_id
      AND e.judge_id = public.get_profile_id(auth.uid())
    )
  );

CREATE POLICY "Admins can manage all scores" ON public.evaluation_scores
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Reminders policies
CREATE POLICY "Judges can view their own reminders" ON public.reminders
  FOR SELECT USING (judge_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Admins can manage all reminders" ON public.reminders
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_conferences_updated_at
  BEFORE UPDATE ON public.conferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evaluations_updated_at
  BEFORE UPDATE ON public.evaluations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, phone, institution, is_external)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'institution',
    COALESCE((NEW.raw_user_meta_data ->> 'is_external')::boolean, false)
  );
  
  -- Assign default 'judge' role for new users
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'judge');
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();