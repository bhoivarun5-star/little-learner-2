const { Client } = require('pg');

const client = new Client({
  host: 'db.uciwpoxpcurenwjzpbjc.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'VarunBhoi@2711',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function initSupabaseDatabase() {
  console.log('Connecting to Supabase PostgreSQL database...');
  try {
    await client.connect();
    console.log('Connected successfully!');

    // 1. Create public.users table
    console.log('Creating public.users table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        display_name TEXT,
        role TEXT DEFAULT 'Learner',
        department TEXT DEFAULT 'Early Childhood Education',
        avatar TEXT DEFAULT '/assets/boy-avatar.jpg',
        stars INTEGER DEFAULT 100,
        streak_days INTEGER DEFAULT 1,
        current_level TEXT DEFAULT 'New Explorer',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 2. Create public.login_records table
    console.log('Creating public.login_records table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.login_records (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID,
        identifier TEXT NOT NULL,
        username TEXT,
        email TEXT,
        display_name TEXT,
        role TEXT,
        login_at TIMESTAMPTZ DEFAULT NOW(),
        auth_mode TEXT DEFAULT 'supabase',
        status TEXT DEFAULT 'success',
        user_agent TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 3. Grant table permissions to anon and authenticated roles
    console.log('Granting permissions to anon and authenticated roles...');
    await client.query(`
      GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
      GRANT ALL ON TABLE public.users TO anon, authenticated, service_role;
      GRANT ALL ON TABLE public.login_records TO anon, authenticated, service_role;
    `);

    // 4. Set RLS Policies
    console.log('Configuring Row Level Security (RLS) policies...');
    await client.query(`
      ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.login_records ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow anon read users" ON public.users;
      CREATE POLICY "Allow anon read users" ON public.users FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow anon insert users" ON public.users;
      CREATE POLICY "Allow anon insert users" ON public.users FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow anon update users" ON public.users;
      CREATE POLICY "Allow anon update users" ON public.users FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Allow anon read login_records" ON public.login_records;
      CREATE POLICY "Allow anon read login_records" ON public.login_records FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow anon insert login_records" ON public.login_records;
      CREATE POLICY "Allow anon insert login_records" ON public.login_records FOR INSERT WITH CHECK (true);
    `);

    // 5. Seed default demo users if they don't already exist
    console.log('Seeding demo accounts into public.users...');
    const demoUsers = [
      {
        username: 'learner',
        email: 'learner@littlelearner.com',
        password: 'password123',
        display_name: 'Prof. Leo Learner',
        role: 'Faculty Member',
        department: 'Early Learning Development',
        stars: 200,
        streak_days: 15,
        current_level: 'Faculty Educator'
      },
      {
        username: 'admin',
        email: 'admin@littlelearner.com',
        password: 'admin123',
        display_name: 'Sarah Jenkins',
        role: 'Staff Administrator',
        department: 'Curriculum & School Operations',
        stars: 450,
        streak_days: 28,
        current_level: 'Head Administrator'
      },
      {
        username: 'faculty.leo',
        email: 'leo@littlelearner.com',
        password: 'password123',
        display_name: 'Leo Vance',
        role: 'Faculty Instructor (STEM)',
        department: 'Early Childhood & Science',
        stars: 180,
        streak_days: 12,
        current_level: 'Senior Faculty'
      },
      {
        username: 'faculty.emma',
        email: 'emma@littlelearner.com',
        password: 'password123',
        display_name: 'Emma Davis',
        role: 'Faculty Instructor (Arts & Phonics)',
        department: 'Language Arts & Literacy',
        stars: 140,
        streak_days: 9,
        current_level: 'Associate Faculty'
      }
    ];

    for (const u of demoUsers) {
      await client.query(`
        INSERT INTO public.users (username, email, password, display_name, role, department, stars, streak_days, current_level)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (username) DO UPDATE SET
          email = EXCLUDED.email,
          password = EXCLUDED.password,
          display_name = EXCLUDED.display_name,
          role = EXCLUDED.role,
          department = EXCLUDED.department;
      `, [u.username, u.email, u.password, u.display_name, u.role, u.department, u.stars, u.streak_days, u.current_level]);
    }

    // 6. Reload PostgREST schema cache so REST API sees tables immediately
    console.log('Reloading PostgREST schema cache...');
    await client.query("NOTIFY pgrst, 'reload schema';");

    console.log('✅ Supabase database initialized and seeded successfully!');
    await client.end();
  } catch (err) {
    console.error('❌ Supabase database initialization error:', err);
    process.exit(1);
  }
}

initSupabaseDatabase();
