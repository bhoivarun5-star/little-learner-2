import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://uciwpoxpcurenwjzpbjc.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_Hf78gLDO9kXgVpr6RX02xg_oQsFnrmb';

// Initialize Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

/**
 * Record a login event into the Supabase database (login_records table)
 */
export async function recordLoginEvent({
  identifier,
  user,
  authMode = 'supabase',
  status = 'success'
}) {
  try {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser Client';
    
    const recordPayload = {
      identifier: identifier || user?.email || user?.username || 'unknown',
      user_id: user?.id || null,
      username: user?.username || identifier || 'Guest',
      email: user?.email || (identifier?.includes('@') ? identifier : `${identifier}@littlelearner.com`),
      display_name: user?.display_name || user?.first_name || user?.username || 'Learner',
      role: user?.role || (user?.is_staff ? 'Faculty Instructor' : 'Learner'),
      auth_mode: authMode,
      status: status,
      user_agent: userAgent,
      login_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('login_records')
      .insert([recordPayload])
      .select();

    if (error) {
      console.warn('Supabase recordLoginEvent error:', error.message);
      return { success: false, error: error.message };
    }

    console.log('✅ Login record saved to Supabase database:', data?.[0]);
    return { success: true, record: data?.[0] };
  } catch (err) {
    console.warn('Could not save login record to Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Authenticate against Supabase public.users table and record the login
 */
export async function supabaseAuthenticate(identifier, password) {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPw = password.trim();

  try {
    // 1. Search for matching user by email or username
    const { data: users, error: fetchErr } = await supabase
      .from('users')
      .select('*')
      .or(`username.ilike.${cleanId},email.ilike.${cleanId}`);

    if (fetchErr) {
      console.warn('Supabase query error:', fetchErr.message);
      return { success: false, error: fetchErr.message };
    }

    if (!users || users.length === 0) {
      // Record failed attempt
      recordLoginEvent({
        identifier: cleanId,
        authMode: 'supabase',
        status: 'failed_user_not_found'
      }).catch(() => {});
      
      return {
        success: false,
        error: `No account found with "${identifier}". Try signing up!`
      };
    }

    const matchedUser = users.find(u => u.password === cleanPw);

    if (!matchedUser) {
      // Record failed password attempt
      recordLoginEvent({
        identifier: cleanId,
        user: users[0],
        authMode: 'supabase',
        status: 'failed_wrong_password'
      }).catch(() => {});

      return {
        success: false,
        error: 'Incorrect password. Please double-check and try again.'
      };
    }

    // Format safe user profile for state
    const userProfile = {
      id: matchedUser.id,
      username: matchedUser.username,
      email: matchedUser.email,
      display_name: matchedUser.display_name || matchedUser.username,
      role: matchedUser.role || 'Faculty Member',
      is_staff: true,
      department: matchedUser.department || 'Early Childhood Education',
      avatar: matchedUser.avatar || '/assets/boy-avatar.jpg',
      assigned_students: 20,
      active_courses: 4,
      stars: matchedUser.stars || 100,
      streak_days: matchedUser.streak_days || 1,
      current_level: matchedUser.current_level || 'Active Learner',
      badges: ['Supabase Cloud Star']
    };

    // 2. Save login event to Supabase database
    await recordLoginEvent({
      identifier: cleanId,
      user: userProfile,
      authMode: 'supabase',
      status: 'success'
    });

    // 3. Update updated_at timestamp on users table
    try {
      await supabase
        .from('users')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', matchedUser.id);
    } catch (_) {}

    return {
      success: true,
      user: userProfile,
      mode: 'supabase',
      message: `Welcome back, ${userProfile.display_name}! 🚀 (Saved to Supabase)`
    };
  } catch (err) {
    console.warn('Supabase authentication failed:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Register a new user in Supabase public.users and record the initial login
 */
export async function supabaseRegisterUser({ username, email, password, displayName, department }) {
  const cleanUsername = username.trim().toLowerCase();
  const cleanEmail = (email || `${cleanUsername}@littlelearner.com`).trim().toLowerCase();
  const cleanPw = password.trim();
  const safeDisplayName = displayName?.trim() || username.trim();

  try {
    // Check if user already exists
    const { data: existing, error: checkErr } = await supabase
      .from('users')
      .select('username, email')
      .or(`username.ilike.${cleanUsername},email.ilike.${cleanEmail}`);

    if (checkErr) {
      console.warn('Error checking existing user in Supabase:', checkErr.message);
    } else if (existing && existing.length > 0) {
      const takenUser = existing.find(u => u.username.toLowerCase() === cleanUsername);
      if (takenUser) {
        return { success: false, error: 'This username is already taken. Please choose another one!' };
      }
      return { success: false, error: 'An account with this email already exists. Please log in instead.' };
    }

    // Insert user into Supabase
    const newUserRow = {
      username: cleanUsername,
      email: cleanEmail,
      password: cleanPw,
      display_name: safeDisplayName,
      role: 'Learner Explorer',
      department: department || 'Early Childhood Education',
      avatar: '/assets/boy-avatar.jpg',
      stars: 100,
      streak_days: 1,
      current_level: 'New Explorer'
    };

    const { data: inserted, error: insertErr } = await supabase
      .from('users')
      .insert([newUserRow])
      .select();

    if (insertErr) {
      console.error('Supabase registration error:', insertErr);
      return { success: false, error: insertErr.message };
    }

    const createdUser = inserted?.[0] || newUserRow;
    const userProfile = {
      id: createdUser.id || Date.now(),
      username: createdUser.username,
      email: createdUser.email,
      display_name: createdUser.display_name,
      role: createdUser.role,
      is_staff: true,
      department: createdUser.department,
      avatar: createdUser.avatar,
      stars: createdUser.stars,
      streak_days: createdUser.streak_days,
      current_level: createdUser.current_level,
      badges: ['Supabase Newbie Star']
    };

    // Record registration login event in login_records
    await recordLoginEvent({
      identifier: cleanEmail,
      user: userProfile,
      authMode: 'supabase_signup',
      status: 'success'
    });

    return {
      success: true,
      user: userProfile,
      mode: 'supabase',
      message: `Account created in Supabase! Welcome, ${userProfile.display_name}! 🌟`
    };
  } catch (err) {
    console.error('Supabase register error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Handle social login with Supabase
 */
export async function supabaseSocialLogin(provider) {
  const username = `${provider.toLowerCase()}_learner`;
  const email = `${provider.toLowerCase()}_learner@littlelearner.com`;
  const displayName = `${provider} Adventurer`;

  try {
    // Find or create in Supabase
    const { data: users } = await supabase
      .from('users')
      .select('*')
      .eq('username', username);

    let profile;
    if (users && users.length > 0) {
      profile = users[0];
    } else {
      const { data: created } = await supabase
        .from('users')
        .insert([{
          username,
          email,
          password: 'social_auto_login',
          display_name: displayName,
          role: 'Social Explorer',
          stars: 150,
          streak_days: 3,
          current_level: 'Super Explorer'
        }])
        .select();
      profile = created?.[0] || {};
    }

    const userProfile = {
      id: profile.id || Date.now(),
      username: profile.username || username,
      email: profile.email || email,
      display_name: profile.display_name || displayName,
      avatar: '/assets/boy-avatar.jpg',
      stars: profile.stars || 150,
      streak_days: profile.streak_days || 3,
      current_level: profile.current_level || 'Super Explorer',
      badges: ['Social Star', 'Supabase Star']
    };

    await recordLoginEvent({
      identifier: email,
      user: userProfile,
      authMode: `supabase_${provider.toLowerCase()}`,
      status: 'success'
    });

    return {
      success: true,
      user: userProfile,
      mode: 'supabase',
      message: `Signed in with ${provider}! (Saved to Supabase) 🎨`
    };
  } catch (err) {
    console.warn('Supabase social login error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch recent login records from Supabase database
 */
export async function fetchRecentLoginRecords(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('login_records')
      .select('*')
      .order('login_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Error fetching login records:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchRecentLoginRecords error:', err);
    return [];
  }
}
