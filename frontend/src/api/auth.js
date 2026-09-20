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
 * Check backend health status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health/`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      const data = await res.json();
      return { online: true, ...data };
    }
    return { online: false, message: 'Backend unreachable' };
  } catch (err) {
    return { online: false, message: 'Running in Progressive Offline Mode' };
  }
}

/**
 * Authenticate user (tries Django backend first, falls back to offline cache)
 */
export async function loginUser(identifier, password, rememberMe = true) {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPw = password.trim();

  // Try Django backend first
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
      signal: AbortSignal.timeout(4000)
    });

    const data = await response.json();
    if (response.ok && data.success) {
      if (rememberMe) {
        localStorage.setItem('ll_current_user', JSON.stringify(data.user));
        localStorage.setItem('ll_token', data.token);
      } else {
        sessionStorage.setItem('ll_current_user', JSON.stringify(data.user));
      }
      return {
        success: true,
        user: data.user,
        mode: 'online',
        message: data.message || `Welcome back, ${data.user.display_name}! 🚀`
      };
    } else if (response.status === 401 || response.status === 400 || response.status === 404) {
      // Valid backend returned credentials error
      return {
        success: false,
        error: data.error || 'Invalid username or password'
      };
    }
  } catch (error) {
    console.warn('Backend network unavailable. Executing progressive offline authentication fallback...', error);
  }

  // Progressive Offline Auth Fallback
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

    return {
      success: true,
      user: userProfile,
      mode: 'offline',
      message: `Welcome back, ${match.display_name}! (Offline Mode Active ⭐)`
    };
  }

  return {
    success: false,
    error: 'Incorrect username/email or password. Try: learner@littlelearner.com / password123'
  };
}

/**
 * Register user (tries Django backend, fallback to offline local store)
 */
export async function registerUser({ username, email, password, displayName }) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        display_name: displayName
      }),
      signal: AbortSignal.timeout(4000)
    });

    const data = await response.json();
    if (response.ok && data.success) {
      localStorage.setItem('ll_current_user', JSON.stringify(data.user));
      return { success: true, user: data.user, mode: 'online', message: data.message };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.warn('Backend unavailable during registration. Saving offline user...', err);
  }

  // Offline registration
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
    message: `Account created offline! Welcome to Little Learner, ${newUser.display_name}! 🌟`
  };
}

/**
 * Social login
 */
export async function socialLogin(provider) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/social/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
      signal: AbortSignal.timeout(4000)
    });

    const data = await response.json();
    if (response.ok && data.success) {
      localStorage.setItem('ll_current_user', JSON.stringify(data.user));
      return { success: true, user: data.user, mode: 'online', message: data.message };
    }
  } catch (err) {
    console.warn('Social backend offline fallback', err);
  }

  // Offline social fallback
  const user = {
    id: Date.now(),
    username: `${provider.toLowerCase()}_learner`,
    email: `${provider.toLowerCase()}_learner@example.com`,
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
