import {
  supabase,
  supabaseAuthenticate,
  supabaseRegisterUser,
  supabaseSocialLogin,
  recordLoginEvent,
  fetchRecentLoginRecords
} from './supabaseClient';

const API_BASE_URL = 'http://localhost:8000/api';

// Pre-seeded demo credentials for instant offline / fallback access
const OFFLINE_DEMO_USERS = [
  {
    username: 'faculty.leo',
    email: 'leo@littlelearner.com',
    password: 'password123',
    display_name: 'Leo Vance',
    role: 'Faculty Instructor (STEM)',
    is_staff: true,
    department: 'Early Childhood & Science',
    avatar: '/assets/boy-avatar.jpg',
    assigned_students: 22,
    active_courses: 4,
    stars: 180,
    streak_days: 12,
    current_level: 'Senior Faculty'
  },
  {
    username: 'admin',
    email: 'admin@littlelearner.com',
    password: 'admin123',
    display_name: 'Sarah Jenkins',
    role: 'Staff Administrator',
    is_staff: true,
    department: 'Curriculum & School Operations',
    avatar: '/assets/boy-avatar.jpg',
    assigned_students: 120,
    active_courses: 8,
    stars: 450,
    streak_days: 28,
    current_level: 'Head Administrator'
  },
  {
    username: 'faculty.emma',
    email: 'emma@littlelearner.com',
    password: 'password123',
    display_name: 'Emma Davis',
    role: 'Faculty Instructor (Arts & Phonics)',
    is_staff: true,
    department: 'Language Arts & Literacy',
    avatar: '/assets/boy-avatar.jpg',
    assigned_students: 18,
    active_courses: 3,
    stars: 140,
    streak_days: 9,
    current_level: 'Associate Faculty'
  },
  {
    username: 'learner',
    email: 'learner@littlelearner.com',
    password: 'password123',
    display_name: 'Prof. Leo Learner',
    role: 'Faculty Member',
    is_staff: true,
    department: 'Early Learning Development',
    avatar: '/assets/boy-avatar.jpg',
    assigned_students: 25,
    active_courses: 5,
    stars: 200,
    streak_days: 15,
    current_level: 'Faculty Educator'
  }
];

// Helper to get local accounts from localStorage
function getLocalUsers() {
  try {
    const saved = localStorage.getItem('ll_registered_users');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

// Helper to save new local accounts to localStorage
function saveLocalUser(user) {
  try {
    const users = getLocalUsers();
    users.push(user);
    localStorage.setItem('ll_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save user offline', e);
  }
}

/**
 * Check backend / database health status
 */
export async function checkBackendHealth() {
  // Check Supabase first
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (!error) {
      return {
        online: true,
        provider: 'supabase',
        message: 'Connected to Supabase PostgreSQL Database ☁️',
        registered_users: count
      };
    }
  } catch (e) {
    console.warn('Supabase ping check failed:', e);
  }

  // Check Django backend
  try {
    const res = await fetch(`${API_BASE_URL}/health/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(2000)
    });
    if (res.ok) {
      const data = await res.json();
      return { online: true, provider: 'django', ...data };
    }
  } catch (err) {}

  return { online: false, message: 'Running in Offline Mode' };
}

/**
 * Authenticate user (Saves login data directly to Supabase database)
 */
export async function loginUser(identifier, password, rememberMe = true) {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPw = password.trim();

  // 1. PRIMARY: Authenticate and record login in Supabase Database
  try {
    const supabaseResult = await supabaseAuthenticate(cleanId, cleanPw);
    if (supabaseResult.success) {
      const user = supabaseResult.user;
      if (rememberMe) {
        localStorage.setItem('ll_current_user', JSON.stringify(user));
        localStorage.setItem('ll_token', `supabase-auth-${user.id}`);
      } else {
        sessionStorage.setItem('ll_current_user', JSON.stringify(user));
      }

      return {
        success: true,
        user: user,
        mode: 'supabase',
        message: supabaseResult.message || `Welcome back, ${user.display_name}! 🚀 (Saved to Supabase)`
      };
    } else if (supabaseResult.error && !supabaseResult.error.includes('Failed to fetch')) {
      // Valid response from Supabase indicating wrong credentials
      return {
        success: false,
        error: supabaseResult.error
      };
    }
  } catch (err) {
    console.warn('Supabase login error, attempting secondary fallback...', err);
  }

  // 2. SECONDARY: Try Django backend if running
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: cleanId,
        password: cleanPw,
        remember_me: rememberMe
      }),
      signal: AbortSignal.timeout(2500)
    });

    const data = await response.json();
    if (response.ok && data.success) {
      if (rememberMe) {
        localStorage.setItem('ll_current_user', JSON.stringify(data.user));
        localStorage.setItem('ll_token', data.token);
      } else {
        sessionStorage.setItem('ll_current_user', JSON.stringify(data.user));
      }
      
      // Async record to Supabase
      recordLoginEvent({
        identifier: cleanId,
        user: data.user,
        authMode: 'django_backed',
        status: 'success'
      }).catch(() => {});

      return {
        success: true,
        user: data.user,
        mode: 'online',
        message: data.message || `Welcome back, ${data.user.display_name}! 🚀`
      };
    } else if (response.status === 401 || response.status === 400 || response.status === 404) {
      return {
        success: false,
        error: data.error || 'Invalid username or password'
      };
    }
  } catch (error) {
    console.warn('Django backend not available.');
  }

  // 3. TERTIARY: Progressive Offline Auth Fallback
  const allUsers = [...OFFLINE_DEMO_USERS, ...getLocalUsers()];
  const match = allUsers.find(
    (u) =>
      (u.username.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId) &&
      u.password === cleanPw
  );

  if (match) {
    const userProfile = {
      id: match.id || 999,
      username: match.username,
      email: match.email,
      display_name: match.display_name,
      avatar: match.avatar || '/assets/boy-avatar.jpg',
      stars: match.stars || 100,
      streak_days: match.streak_days || 1,
      current_level: match.current_level || 'Offline Explorer',
      badges: match.badges || ['Offline Hero']
    };

    if (rememberMe) {
      localStorage.setItem('ll_current_user', JSON.stringify(userProfile));
      localStorage.setItem('ll_token', 'll-offline-token');
    }

    // Try background recording to Supabase
    recordLoginEvent({
      identifier: cleanId,
      user: userProfile,
      authMode: 'offline_fallback',
      status: 'success'
    }).catch(() => {});

    return {
      success: true,
      user: userProfile,
      mode: 'offline',
      message: `Welcome back, ${match.display_name}! ⭐`
    };
  }

  return {
    success: false,
    error: 'Incorrect username/email or password. Try: learner@littlelearner.com / password123'
  };
}

/**
 * Register user (Saves user and login event to Supabase database)
 */
export async function registerUser({ username, email, password, displayName, department }) {
  // 1. PRIMARY: Register in Supabase Database
  try {
    const res = await supabaseRegisterUser({
      username,
      email,
      password,
      displayName,
      department
    });

    if (res.success) {
      localStorage.setItem('ll_current_user', JSON.stringify(res.user));
      localStorage.setItem('ll_token', `supabase-auth-${res.user.id}`);
      return res;
    } else if (res.error && !res.error.includes('Failed to fetch')) {
      return res;
    }
  } catch (err) {
    console.warn('Supabase registration error:', err);
  }

  // 2. SECONDARY: Django Backend
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        display_name: displayName,
        department
      }),
      signal: AbortSignal.timeout(2500)
    });

    const data = await response.json();
    if (response.ok && data.success) {
      localStorage.setItem('ll_current_user', JSON.stringify(data.user));
      return { success: true, user: data.user, mode: 'online', message: data.message };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (err) {}

  // 3. TERTIARY: Offline Local Store
  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    display_name: displayName || username,
    avatar: '/assets/boy-avatar.jpg',
    stars: 50,
    streak_days: 1,
    current_level: 'New Explorer',
    badges: ['Welcome Star']
  };
  saveLocalUser(newUser);
  localStorage.setItem('ll_current_user', JSON.stringify(newUser));

  return {
    success: true,
    user: newUser,
    mode: 'offline',
    message: `Account created! Welcome to Little Learner, ${newUser.display_name}! 🌟`
  };
}

/**
 * Social login (Saves to Supabase database)
 */
export async function socialLogin(provider) {
  try {
    const res = await supabaseSocialLogin(provider);
    if (res.success) {
      localStorage.setItem('ll_current_user', JSON.stringify(res.user));
      localStorage.setItem('ll_token', `supabase-social-${res.user.id}`);
      return res;
    }
  } catch (err) {
    console.warn('Supabase social login error:', err);
  }

  // Offline social fallback
  const user = {
    id: Date.now(),
    username: `${provider.toLowerCase()}_learner`,
    email: `${provider.toLowerCase()}_learner@littlelearner.com`,
    display_name: `${provider} Adventurer`,
    avatar: '/assets/boy-avatar.jpg',
    stars: 100,
    streak_days: 3,
    current_level: 'Star Explorer',
    badges: ['Social Adventurer']
  };
  localStorage.setItem('ll_current_user', JSON.stringify(user));

  return {
    success: true,
    user,
    mode: 'offline',
    message: `Connected via ${provider}! Have fun learning! 🎨`
  };
}

export {
  supabase,
  recordLoginEvent,
  fetchRecentLoginRecords
};
