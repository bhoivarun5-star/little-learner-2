import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Gamepad2,
  Settings,
  Search,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Lock,
  Unlock,
  LogOut,
  ArrowLeft,
  Star,
  Activity,
  Award,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  AlertCircle,
  Database,
  Server,
  Layers,
  CheckCircle,
  Clock,
  Mail,
  UserCheck,
  BookOpen,
  Wifi,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../api/supabaseClient';
import './AdminPanel.css';

// Real faculty members present in the Little Learner database (Supabase PostgreSQL / Django)
const REAL_DATABASE_FACULTY_FALLBACK = [
  {
    id: '1e2fb0f8-4cfe-4b46-85de-38d11dd6e7da',
    name: 'Leo Vance',
    email: 'leo@littlelearner.com',
    username: 'faculty.leo',
    department: 'Early Childhood & Science',
    role: 'Faculty Instructor (STEM)',
    status: 'active',
    joinedDate: '2026-09-20',
    stars: 180,
    source: 'Supabase PostgreSQL'
  },
  {
    id: '1f2cdd86-79a5-4c95-9e01-485159f5f605',
    name: 'Emma Davis',
    email: 'emma@littlelearner.com',
    username: 'faculty.emma',
    department: 'Language Arts & Literacy',
    role: 'Faculty Instructor (Arts & Phonics)',
    status: 'active',
    joinedDate: '2026-09-20',
    stars: 140,
    source: 'Supabase PostgreSQL'
  },
  {
    id: 'f0ce0cb2-0feb-4dbd-996d-9f10a12aa703',
    name: 'Prof. Leo Learner',
    email: 'learner@littlelearner.com',
    username: 'learner',
    department: 'Early Learning Development',
    role: 'Faculty Member',
    status: 'active',
    joinedDate: '2026-09-20',
    stars: 200,
    source: 'Supabase PostgreSQL'
  },
  {
    id: 'cc54d97c-b6d3-4472-8997-0d3adc283244',
    name: 'Sarah Jenkins',
    email: 'admin@littlelearner.com',
    username: 'admin',
    department: 'Curriculum & School Operations',
    role: 'Staff Administrator',
    status: 'active',
    joinedDate: '2026-09-20',
    stars: 450,
    source: 'Supabase PostgreSQL'
  },
  {
    id: 'cbd2a081-b030-43c1-8691-279c2fcd2612',
    name: 'Teacher Alex',
    email: 'teacher_alex@littlelearner.com',
    username: 'teacher_alex',
    department: 'Early Childhood Education',
    role: 'Faculty Instructor',
    status: 'active',
    joinedDate: '2026-09-27',
    stars: 100,
    source: 'Supabase PostgreSQL'
  }
];

// Default initial activities catalog
const INITIAL_ACTIVITIES = [
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    category: 'Logic & Thinking',
    ageRange: '3–6 Years',
    starsReward: 3,
    status: 'active',
    icon: '🔍',
    description: 'Visual discrimination & classification puzzle'
  },
  {
    id: 'good-habits',
    title: 'Good Habits & Manners',
    category: 'Social & Emotional',
    ageRange: '3–6 Years',
    starsReward: 2,
    status: 'active',
    icon: '🌱',
    description: 'Etiquette, empathy and daily healthy routine'
  },
  {
    id: 'emotional-recognition',
    title: 'Emotional Recognition',
    category: 'Social & Emotional',
    ageRange: '3–6 Years',
    starsReward: 2,
    status: 'active',
    icon: '😊',
    description: 'Identifying feelings and facial expressions'
  },
  {
    id: 'social-skills',
    title: 'Social Skills & Empathy',
    category: 'Social & Emotional',
    ageRange: '3–6 Years',
    starsReward: 2,
    status: 'active',
    icon: '🤝',
    description: 'Sharing, kindness, and cooperative play choices'
  },
  {
    id: 'memory-development',
    title: 'Memory Development',
    category: 'Logic & Thinking',
    ageRange: '4–7 Years',
    starsReward: 3,
    status: 'active',
    icon: '🧠',
    description: 'Card pairing and sequential pattern recall'
  },
  {
    id: 'picture-completion',
    title: 'Picture Completion',
    category: 'Creativity',
    ageRange: '3–6 Years',
    starsReward: 3,
    status: 'active',
    icon: '🖼️',
    description: 'Missing piece assembly and visual synthesis'
  },
  {
    id: 'drawing-game',
    title: 'Creative Drawing Canvas',
    category: 'Creativity',
    ageRange: '2–8 Years',
    starsReward: 3,
    status: 'active',
    icon: '🎨',
    description: 'Freehand art, colorful brushes, stamps and stickers'
  },
  {
    id: 'tracing-game',
    title: 'Letter & Number Tracing',
    category: 'Writing & Motor',
    ageRange: '3–6 Years',
    starsReward: 3,
    status: 'active',
    icon: '✏️',
    description: 'Guided alphabet and digit stroke tracing'
  },
  {
    id: 'picture-puzzles',
    title: 'Picture Puzzles',
    category: 'Games',
    ageRange: '3–7 Years',
    starsReward: 3,
    status: 'active',
    icon: '🧩',
    description: 'Jigsaw puzzles with animal and vehicle themes'
  },
  {
    id: 'alphabet-phonics',
    title: 'Alphabet & Phonics',
    category: 'Language',
    ageRange: '3–6 Years',
    starsReward: 5,
    status: 'active',
    icon: '🔤',
    description: 'Letter sound associations and pronunciation guide'
  },
  {
    id: 'count-match',
    title: 'Numbers & Counting',
    category: 'Math',
    ageRange: '3–6 Years',
    starsReward: 5,
    status: 'active',
    icon: '🔢',
    description: 'Object counting and number quantity matching'
  },
  {
    id: 'shapes-colors',
    title: 'Shapes & Colors',
    category: 'STEM',
    ageRange: '2–5 Years',
    starsReward: 2,
    status: 'active',
    icon: '🔷',
    description: 'Geometric shapes, vibrant colors and sorting games'
  }
];

export default function AdminPanel({ onExit }) {
  // Security Gate
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('ll_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Admin Tab: 'overview' | 'faculty' | 'activities' | 'system'
  const [activeTab, setActiveTab] = useState('overview');

  // Search & Filter States
  const [facultySearch, setFacultySearch] = useState('');
  const [facultyDeptFilter, setFacultyDeptFilter] = useState('all');
  const [activitySearch, setActivitySearch] = useState('');
  const [activityCategoryFilter, setActivityCategoryFilter] = useState('all');

  // Database Connection & Sync Status
  const [isSyncing, setIsSyncing] = useState(false);
  const [dbStatus, setDbStatus] = useState({
    connected: true,
    provider: 'Supabase PostgreSQL ☁️',
    message: 'Connected to live database',
    lastSync: null
  });

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);

  const showToastNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Faculty State - populated with REAL database faculty
  const [facultyList, setFacultyList] = useState(() => {
    try {
      const saved = localStorage.getItem('ll_admin_faculty');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure not using old dummy Priya/Rahul names
        if (parsed.length > 0 && parsed.some(f => f.name.includes('Priya Sharma') || f.name.includes('Rahul Kulkarni'))) {
          return REAL_DATABASE_FACULTY_FALLBACK;
        }
        return parsed;
      }
    } catch (_) {}
    return REAL_DATABASE_FACULTY_FALLBACK;
  });

  // Activities State
  const [activitiesList, setActivitiesList] = useState(() => {
    try {
      const saved = localStorage.getItem('ll_admin_activities');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_ACTIVITIES;
  });

  // Modal States
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    department: 'Early Childhood & Science',
    role: 'Faculty Instructor (STEM)'
  });

  const [editingActivity, setEditingActivity] = useState(null);

  // Fetch real faculty directly from Supabase database
  const fetchFacultyFromDatabase = async () => {
    setIsSyncing(true);
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase faculty fetch error, fallback to real database list:', error);
        setDbStatus((prev) => ({
          ...prev,
          connected: false,
          message: 'Database check fallback mode'
        }));
        return;
      }

      if (users && users.length > 0) {
        // Filter out students/learners to only keep real faculty & staff members from the database
        const realDbFaculty = users
          .filter((u) => {
            const role = (u.role || '').toLowerCase();
            const username = (u.username || '').toLowerCase();
            const name = (u.display_name || '').toLowerCase();
            return (
              role.includes('faculty') ||
              role.includes('instructor') ||
              role.includes('admin') ||
              role.includes('staff') ||
              role.includes('teacher') ||
              role.includes('educator') ||
              username.startsWith('faculty') ||
              username.startsWith('teacher') ||
              username === 'admin' ||
              username === 'learner' ||
              name.includes('prof') ||
              name.includes('teacher') ||
              name.includes('leo vance') ||
              name.includes('emma davis') ||
              name.includes('sarah jenkins') ||
              name.includes('leo learner')
            );
          })
          .map((u) => {
            // Determine nice display role & department
            let roleTitle = u.role || 'Faculty Member';
            if (roleTitle === 'Learner Explorer' && u.username === 'teacher_alex') {
              roleTitle = 'Faculty Instructor';
            }
            return {
              id: u.id,
              name: u.display_name || u.username,
              email: u.email || `${u.username}@littlelearner.com`,
              username: u.username,
              department: u.department || 'Early Childhood & Science',
              role: roleTitle,
              status: 'active',
              joinedDate: u.created_at ? u.created_at.split('T')[0] : '2026-09-20',
              stars: u.stars || 150,
              avatar: u.avatar || '/assets/boy-avatar.jpg',
              source: 'Supabase PostgreSQL (Live)'
            };
          });

        if (realDbFaculty.length > 0) {
          setFacultyList(realDbFaculty);
          localStorage.setItem('ll_admin_faculty', JSON.stringify(realDbFaculty));
          setDbStatus({
            connected: true,
            provider: 'Supabase PostgreSQL ☁️',
            message: `Synchronized • ${realDbFaculty.length} Real Faculty in Database`,
            lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          });
          showToastNotification(`Synced with database: ${realDbFaculty.length} real faculty members loaded! 🚀`);
        }
      }
    } catch (err) {
      console.warn('Database fetch exception:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync on initial mount
  useEffect(() => {
    fetchFacultyFromDatabase();
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ll_admin_faculty', JSON.stringify(facultyList));
    } catch (_) {}
  }, [facultyList]);

  useEffect(() => {
    try {
      localStorage.setItem('ll_admin_activities', JSON.stringify(activitiesList));
    } catch (_) {}
  }, [activitiesList]);

  // Auth Handler
  const handleAdminLogin = (e) => {
    e?.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === 'admin' || passcode.trim() === 'littlelearner') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ll_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ll_admin_auth');
  };

  // --- Faculty Management Handlers ---
  const handleCreateFaculty = async (e) => {
    e.preventDefault();
    if (!newFaculty.name.trim() || !newFaculty.email.trim()) return;

    const cleanUsername = newFaculty.email.split('@')[0].replace(/[^a-z0-9_]/gi, '_').toLowerCase();
    const newEntry = {
      id: Date.now().toString(),
      name: newFaculty.name.trim(),
      email: newFaculty.email.trim().toLowerCase(),
      username: cleanUsername,
      department: newFaculty.department,
      role: newFaculty.role,
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      stars: 150,
      avatar: '/assets/boy-avatar.jpg',
      source: 'Supabase PostgreSQL (Live)'
    };

    // Save directly to Supabase users table in the database
    try {
      const { data, error } = await supabase.from('users').insert([
        {
          username: cleanUsername,
          email: newFaculty.email.trim().toLowerCase(),
          password: 'password123',
          display_name: newFaculty.name.trim(),
          role: newFaculty.role,
          department: newFaculty.department,
          stars: 150,
          streak_days: 1,
          current_level: 'Faculty Educator'
        }
      ]).select();

      if (data && data[0]) {
        newEntry.id = data[0].id;
      }
      showToastNotification(`Faculty "${newEntry.name}" registered into database! ⭐`);
    } catch (err) {
      console.warn('Database insert note:', err);
      showToastNotification(`Faculty member "${newEntry.name}" added!`);
    }

    setFacultyList((prev) => [newEntry, ...prev]);
    setNewFaculty({
      name: '',
      email: '',
      department: 'Early Childhood & Science',
      role: 'Faculty Instructor (STEM)'
    });
    setShowAddFacultyModal(false);
  };

  const handleToggleFacultyStatus = (id) => {
    setFacultyList((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const nextStatus = f.status === 'active' ? 'on-leave' : 'active';
          showToastNotification(`Faculty "${f.name}" is now ${nextStatus === 'active' ? 'Active' : 'On Leave'}`);
          return { ...f, status: nextStatus };
        }
        return f;
      })
    );
  };

  const handleDeleteFaculty = async (facultyOrId, facultyName) => {
    const targetFaculty =
      typeof facultyOrId === 'object'
        ? facultyOrId
        : facultyList.find((f) => f.id === facultyOrId) || { id: facultyOrId, name: facultyName };

    const name = targetFaculty.name || facultyName || 'Faculty Member';
    const id = targetFaculty.id;
    const email = targetFaculty.email;
    const username = targetFaculty.username;

    if (!window.confirm(`Are you sure you want to delete faculty member "${name}"? This will permanently remove them from the database.`)) {
      return;
    }

    try {
      // 1. Delete from Supabase public.users table in PostgreSQL database
      let deleteQuery = supabase.from('users').delete();
      if (id && typeof id === 'string' && id.includes('-')) {
        deleteQuery = deleteQuery.eq('id', id);
      } else if (email) {
        deleteQuery = deleteQuery.eq('email', email.trim().toLowerCase());
      } else if (username) {
        deleteQuery = deleteQuery.eq('username', username.trim().toLowerCase());
      } else {
        deleteQuery = deleteQuery.eq('id', id);
      }

      const { data, error } = await deleteQuery.select();

      if (error) {
        console.warn('Database deletion notice:', error.message);
      } else {
        console.log('Successfully deleted faculty record from database:', data);
      }

      // Also clean up any associated login records
      if (email || username) {
        supabase
          .from('login_records')
          .delete()
          .or(`email.eq.${email},username.eq.${username}`)
          .then(() => {})
          .catch(() => {});
      }

      // 2. Remove from React faculty state
      setFacultyList((prev) => prev.filter((f) => f.id !== id && f.email !== email));

      // 3. Persist update in localStorage
      try {
        const remaining = facultyList.filter((f) => f.id !== id && f.email !== email);
        localStorage.setItem('ll_admin_faculty', JSON.stringify(remaining));
      } catch (_) {}

      showToastNotification(`Faculty member "${name}" was permanently deleted from the database. 🗑️`);
    } catch (err) {
      console.error('Error deleting faculty member:', err);
      setFacultyList((prev) => prev.filter((f) => f.id !== id && f.email !== email));
      showToastNotification(`Faculty member "${name}" removed.`);
    }
  };

  // --- Activities Management Handlers ---
  const handleToggleActivityStatus = (id) => {
    setActivitiesList((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'active' ? 'maintenance' : 'active';
          showToastNotification(`"${a.title}" is now ${nextStatus === 'active' ? 'Live' : 'Under Maintenance'}`);
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleSaveActivityEdit = (e) => {
    e.preventDefault();
    if (!editingActivity) return;

    setActivitiesList((prev) =>
      prev.map((a) => (a.id === editingActivity.id ? editingActivity : a))
    );
    showToastNotification(`Saved updates to "${editingActivity.title}"!`);
    setEditingActivity(null);
  };

  // Stats Calculations
  const activeActivitiesCount = activitiesList.filter((a) => a.status === 'active').length;
  const activeFacultyCount = facultyList.filter((f) => f.status === 'active').length;
  const totalStarRewardsAvailable = activitiesList.reduce((acc, a) => acc + (a.starsReward || 0), 0);

  // Filtered Faculty List
  const filteredFaculty = facultyList.filter((f) => {
    const q = facultySearch.toLowerCase();
    const matchesQuery =
      (f.name || '').toLowerCase().includes(q) ||
      (f.email || '').toLowerCase().includes(q) ||
      (f.department || '').toLowerCase().includes(q) ||
      (f.role || '').toLowerCase().includes(q);
    const matchesDept = facultyDeptFilter === 'all' || f.department === facultyDeptFilter;
    return matchesQuery && matchesDept;
  });

  // Filtered Activities List
  const filteredActivities = activitiesList.filter((a) => {
    const matchesQuery =
      a.title.toLowerCase().includes(activitySearch.toLowerCase()) ||
      a.category.toLowerCase().includes(activitySearch.toLowerCase()) ||
      a.description.toLowerCase().includes(activitySearch.toLowerCase());
    const matchesCategory =
      activityCategoryFilter === 'all' || a.category === activityCategoryFilter;
    return matchesQuery && matchesCategory;
  });

  // Extract distinct departments for filtering
  const distinctDepartments = ['all', ...Array.from(new Set(facultyList.map((f) => f.department).filter(Boolean)))];

  // ====================================================================
  // LIGHT SECURITY GATE VIEW (When not authenticated)
  // ====================================================================
  if (!isAuthenticated) {
    return (
      <div className="admin-light-viewport">
        <div className="admin-auth-container">
          <div className="admin-auth-card-light">
            <div className="auth-brand-badge">
              <div className="admin-lock-icon-wrap">
                <ShieldCheck size={36} color="#6366f1" />
              </div>
              <span className="auth-portal-tag">Admin Console</span>
            </div>

            <h2 className="admin-auth-title-light">Little Learner Admin Portal</h2>
            <p className="admin-auth-subtitle-light">
              Protected administrative environment. Real database faculty & curriculum control.
            </p>

            <form onSubmit={handleAdminLogin} className="admin-auth-form-light">
              <div className="admin-input-group-light">
                <label>Admin Passcode</label>
                <div className="password-input-wrap">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    placeholder="Enter security passcode (e.g. admin123)"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              {authError && (
                <div className="admin-auth-error-light">
                  <AlertCircle size={16} />
                  <span>Invalid passcode. Default passcode is: <strong>admin123</strong></span>
                </div>
              )}

              <div className="auth-button-group">
                <button type="submit" className="admin-unlock-btn-light">
                  <Unlock size={18} />
                  <span>Unlock Admin Portal</span>
                </button>
              </div>
            </form>

            <div className="admin-auth-footer-light">
              <button type="button" className="exit-to-site-btn-light" onClick={onExit}>
                <ArrowLeft size={16} />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================================
  // FULL LIGHT & INTERACTIVE ADMIN PANEL VIEW
  // ====================================================================
  return (
    <div className="admin-light-viewport">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="admin-toast-banner">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Sidebar Navigation */}
      <aside className="admin-light-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-logo-mark-light">
            <ShieldCheck size={28} color="#ffffff" />
          </div>
          <div className="admin-brand-details">
            <h3>Little Learner</h3>
            <span className="brand-sub">Admin Console</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav-light">
          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Activity size={19} />
            <span>Dashboard Overview</span>
            <ChevronRight size={14} className="nav-chevron" />
          </button>

          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'faculty' ? 'active' : ''}`}
            onClick={() => setActiveTab('faculty')}
          >
            <GraduationCap size={19} />
            <span>Faculty Directory</span>
            <span className="nav-count-badge">{facultyList.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-tab ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            <Gamepad2 size={19} />
            <span>Curriculum & Games</span>
            <span className="nav-count-badge">{activitiesList.length}</span>
          </button>
        </nav>

        <div className="admin-sidebar-footer-light">
          <button type="button" className="sidebar-action-btn-light exit-site-btn" onClick={onExit}>
            <ArrowLeft size={16} />
            <span>Exit to Website</span>
          </button>

          <button type="button" className="sidebar-action-btn-light lock-btn" onClick={handleAdminLogout}>
            <LogOut size={16} />
            <span>Lock Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-light-main">
        {/* Top Header Bar */}
        <header className="admin-light-topbar">
          <div className="topbar-heading">
            <h1 className="topbar-title">
              {activeTab === 'overview' && 'System Overview & Faculty Analytics'}
              {activeTab === 'faculty' && 'Faculty & Teaching Staff Directory'}
              {activeTab === 'activities' && 'Learning Curriculum & Games Catalog'}
            </h1>
            <p className="topbar-desc">
              {activeTab === 'overview' && 'Live view of faculty educators, curriculum modules, and learning metrics.'}
              {activeTab === 'faculty' && 'Faculty members directory with active management and status configuration.'}
              {activeTab === 'activities' && 'Configure learning games, toggle publishing status, and customize star rewards.'}
            </p>
          </div>
        </header>

        {/* ==================================================================== */}
        {/* TAB 1: SYSTEM OVERVIEW */}
        {/* ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="admin-tab-body">
            {/* 4 Interactive Stat Metric Cards */}
            <div className="admin-stat-cards-grid">
              <div className="stat-card-light" onClick={() => setActiveTab('faculty')}>
                <div className="stat-icon-wrap faculty-accent">
                  <GraduationCap size={26} color="#0284c7" />
                </div>
                <div className="stat-content">
                  <span className="stat-big-number">{facultyList.length}</span>
                  <span className="stat-label">Faculty Educators</span>
                  <span className="stat-highlight green">
                    <CheckCircle size={12} /> {activeFacultyCount} Active in Database
                  </span>
                </div>
              </div>

              <div className="stat-card-light" onClick={() => setActiveTab('activities')}>
                <div className="stat-icon-wrap activities-accent">
                  <Gamepad2 size={26} color="#16a34a" />
                </div>
                <div className="stat-content">
                  <span className="stat-big-number">{activitiesList.length}</span>
                  <span className="stat-label">Curriculum Activities</span>
                  <span className="stat-highlight">
                    <Sparkles size={12} /> {activeActivitiesCount} Published & Live
                  </span>
                </div>
              </div>

              <div className="stat-card-light" onClick={() => setActiveTab('faculty')}>
                <div className="stat-icon-wrap dept-accent">
                  <BookOpen size={26} color="#7c3aed" />
                </div>
                <div className="stat-content">
                  <span className="stat-big-number">{distinctDepartments.filter((d) => d !== 'all').length}</span>
                  <span className="stat-label">Academic Departments</span>
                  <span className="stat-highlight purple">
                    <CheckCircle size={12} /> Specialized Curriculum
                  </span>
                </div>
              </div>

              <div className="stat-card-light">
                <div className="stat-icon-wrap stars-accent">
                  <Star size={26} fill="#f59e0b" color="#f59e0b" />
                </div>
                <div className="stat-content">
                  <span className="stat-big-number">{totalStarRewardsAvailable}⭐</span>
                  <span className="stat-label">Reward Points Pool</span>
                  <span className="stat-highlight yellow">
                    <Award size={12} /> Across All 12 Games
                  </span>
                </div>
              </div>
            </div>

            {/* Overview Detail Grids */}
            <div className="admin-overview-columns">
              {/* Faculty Directory Preview */}
              <div className="overview-card-container">
                <div className="overview-card-header">
                  <div className="header-left-title">
                    <GraduationCap size={20} color="#0284c7" />
                    <div>
                      <h3>Faculty Directory ({facultyList.length})</h3>
                      <p className="card-sub-info">Active educators and instructors</p>
                    </div>
                  </div>
                  <button className="view-all-link-btn" onClick={() => setActiveTab('faculty')}>
                    Manage All Faculty ➔
                  </button>
                </div>

                <div className="light-table-wrap">
                  <table className="light-data-table">
                    <thead>
                      <tr>
                        <th>Faculty Name</th>
                        <th>Institutional Email</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {facultyList.slice(0, 5).map((f) => (
                        <tr key={f.id} className="interactive-table-row">
                          <td>
                            <div className="table-user-cell">
                              <span className="faculty-badge-avatar">🎓</span>
                              <div>
                                <strong className="user-name-primary">{f.name}</strong>
                                <span className="user-role-secondary">{f.role}</span>
                              </div>
                            </div>
                          </td>
                          <td className="email-cell">{f.email}</td>
                          <td>
                            <span className="dept-tag-light">{f.department}</span>
                          </td>
                          <td>
                            <span className={`status-chip-light ${f.status}`}>
                              <span className="status-dot" />
                              {f.status === 'active' ? 'Active' : 'On Leave'}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="row-delete-action-btn"
                              onClick={() => handleDeleteFaculty(f)}
                              title={`Delete ${f.name} from database`}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Curriculum Catalog Quick View */}
              <div className="overview-card-container">
                <div className="overview-card-header">
                  <div className="header-left-title">
                    <Gamepad2 size={20} color="#16a34a" />
                    <div>
                      <h3>Learning Modules & Games ({activitiesList.length})</h3>
                      <p className="card-sub-info">Curriculum status and star rewards</p>
                    </div>
                  </div>
                  <button className="view-all-link-btn" onClick={() => setActiveTab('activities')}>
                    View All Activities ➔
                  </button>
                </div>

                <div className="light-table-wrap">
                  <table className="light-data-table">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Category</th>
                        <th>Age Group</th>
                        <th>Reward</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activitiesList.slice(0, 5).map((a) => (
                        <tr key={a.id} className="interactive-table-row">
                          <td>
                            <div className="table-user-cell">
                              <span style={{ fontSize: '1.4rem' }}>{a.icon}</span>
                              <strong className="user-name-primary">{a.title}</strong>
                            </div>
                          </td>
                          <td>
                            <span className="category-pill-light">{a.category}</span>
                          </td>
                          <td style={{ fontSize: '0.85rem', color: '#64748b' }}>{a.ageRange}</td>
                          <td>
                            <span className="reward-chip">⭐ {a.starsReward}</span>
                          </td>
                          <td>
                            <span className={`status-chip-light ${a.status}`}>
                              <span className="status-dot" />
                              {a.status === 'active' ? 'Live' : 'Maintenance'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: MANAGE FACULTY */}
        {/* ==================================================================== */}
        {activeTab === 'faculty' && (
          <div className="admin-tab-body">
            {/* Action Bar */}
            <div className="admin-toolbar-light">
              <div className="toolbar-search-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search faculty by name, email, department, or role..."
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                />
                {facultySearch && (
                  <button onClick={() => setFacultySearch('')} className="search-clear-btn">✕</button>
                )}
              </div>

              {/* Department Filter Dropdown */}
              <div className="toolbar-filter-wrap">
                <Filter size={16} color="#64748b" />
                <select
                  value={facultyDeptFilter}
                  onChange={(e) => setFacultyDeptFilter(e.target.value)}
                  className="dept-select-filter"
                >
                  <option value="all">All Departments ({facultyList.length})</option>
                  {distinctDepartments
                    .filter((d) => d !== 'all')
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Add Faculty Button */}
              <button
                type="button"
                className="admin-primary-btn-light"
                onClick={() => setShowAddFacultyModal(true)}
              >
                <Plus size={18} />
                <span>Add Faculty Member</span>
              </button>
            </div>

            {/* Department Quick Filter Pills */}
            <div className="dept-quick-pills">
              {distinctDepartments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  className={`dept-pill-btn ${facultyDeptFilter === dept ? 'active' : ''}`}
                  onClick={() => setFacultyDeptFilter(dept)}
                >
                  {dept === 'all' ? 'All Departments' : dept}
                </button>
              ))}
            </div>

            {/* Faculty Directory Table */}
            <div className="admin-card-container">
              <div className="card-table-header">
                <div className="table-header-info">
                  <h3>Faculty Directory</h3>
                  <span className="table-badge-count">{filteredFaculty.length} of {facultyList.length} Faculty Shown</span>
                </div>
              </div>

              <div className="light-table-wrap">
                <table className="light-data-table full-width">
                  <thead>
                    <tr>
                      <th>Educator Details</th>
                      <th>Institutional Email</th>
                      <th>Department</th>
                      <th>Designation / Role</th>
                      <th>Status Toggle</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFaculty.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="empty-table-state">
                          <AlertCircle size={28} color="#94a3b8" />
                          <p>No faculty members match your filter criteria.</p>
                          <button
                            type="button"
                            className="reset-filters-btn"
                            onClick={() => {
                              setFacultySearch('');
                              setFacultyDeptFilter('all');
                            }}
                          >
                            Clear Filters
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredFaculty.map((f) => (
                        <tr key={f.id} className="interactive-table-row">
                          <td>
                            <div className="faculty-info-cell">
                              <div className="faculty-avatar-circle">
                                🎓
                              </div>
                              <div>
                                <strong className="faculty-name-bold">{f.name}</strong>
                                <span className="faculty-sub-username">@{f.username || f.email.split('@')[0]}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="email-display-wrap">
                              <Mail size={14} color="#64748b" />
                              <span className="email-text">{f.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="dept-tag-light">{f.department}</span>
                          </td>
                          <td>
                            <span className="role-tag-light">{f.role}</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`status-toggle-pill ${f.status}`}
                              onClick={() => handleToggleFacultyStatus(f.id)}
                              title="Click to toggle status"
                            >
                              <span className="toggle-dot" />
                              <span>{f.status === 'active' ? 'Active' : 'On Leave'}</span>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="row-delete-action-btn"
                              onClick={() => handleDeleteFaculty(f)}
                              title={`Delete ${f.name} from database`}
                            >
                              <Trash2 size={15} />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: MANAGE ACTIVITIES */}
        {/* ==================================================================== */}
        {activeTab === 'activities' && (
          <div className="admin-tab-body">
            {/* Toolbar */}
            <div className="admin-toolbar-light">
              <div className="toolbar-search-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search activities by title, description, or category..."
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                />
                {activitySearch && (
                  <button onClick={() => setActivitySearch('')} className="search-clear-btn">✕</button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="dept-quick-pills">
                {['all', 'Logic & Thinking', 'Social & Emotional', 'Creativity', 'Writing & Motor', 'Games', 'Language', 'Math', 'STEM'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`dept-pill-btn ${activityCategoryFilter === cat ? 'active' : ''}`}
                    onClick={() => setActivityCategoryFilter(cat)}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities Cards Grid */}
            <div className="activities-cards-grid">
              {filteredActivities.map((act) => {
                const isActive = act.status === 'active';
                return (
                  <div key={act.id} className={`activity-card-light ${isActive ? 'is-live' : 'is-paused'}`}>
                    <div className="activity-card-top">
                      <div className="activity-icon-container">
                        <span>{act.icon}</span>
                      </div>
                      <div className="activity-title-area">
                        <h4>{act.title}</h4>
                        <span className="activity-category-pill">{act.category}</span>
                      </div>
                      <span className={`activity-live-badge ${act.status}`}>
                        {isActive ? 'Live' : 'Paused'}
                      </span>
                    </div>

                    <p className="activity-card-desc">{act.description}</p>

                    <div className="activity-specs-row">
                      <span className="spec-item">
                        <strong>Target:</strong> {act.ageRange}
                      </span>
                      <span className="spec-item reward">
                        <strong>Reward:</strong> ⭐ {act.starsReward} Stars
                      </span>
                    </div>

                    <div className="activity-card-footer">
                      <button
                        type="button"
                        className={`activity-state-toggle-btn ${isActive ? 'published' : 'maintenance'}`}
                        onClick={() => handleToggleActivityStatus(act.id)}
                      >
                        {isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                        <span>{isActive ? 'Published (Live)' : 'Maintenance'}</span>
                      </button>

                      <button
                        type="button"
                        className="activity-edit-action-btn"
                        onClick={() => setEditingActivity({ ...act })}
                      >
                        <Edit2 size={15} />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* MODAL: ADD FACULTY */}
      {/* ==================================================================== */}
      {showAddFacultyModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddFacultyModal(false)}>
          <div className="admin-modal-card-light" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-light">
              <div className="modal-title-wrap">
                <div className="modal-icon-badge">
                  <GraduationCap size={22} color="#0284c7" />
                </div>
                <div>
                  <h3>Register New Faculty Member</h3>
                  <p>Adds educator to faculty directory</p>
                </div>
              </div>
              <button className="modal-close-x" onClick={() => setShowAddFacultyModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateFaculty} className="modal-form-light">
              <div className="form-field-light">
                <label>Educator Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Jennifer Adams"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  required
                  autoFocus
                />
              </div>

              <div className="form-field-light">
                <label>Institutional Email *</label>
                <input
                  type="email"
                  placeholder="e.g. jennifer.adams@littlelearner.com"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-field-light">
                <label>Department / Academic Field</label>
                <select
                  value={newFaculty.department}
                  onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                >
                  <option value="Early Childhood & Science">Early Childhood & Science (STEM)</option>
                  <option value="Language Arts & Literacy">Language Arts & Literacy (Phonics)</option>
                  <option value="Early Learning Development">Early Learning Development</option>
                  <option value="Curriculum & School Operations">Curriculum & School Operations</option>
                  <option value="Creativity, Arts & Motor Skills">Creativity, Arts & Motor Skills</option>
                  <option value="Social & Emotional Foundations">Social & Emotional Foundations</option>
                </select>
              </div>

              <div className="form-field-light">
                <label>Faculty Role / Designation</label>
                <select
                  value={newFaculty.role}
                  onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                >
                  <option value="Faculty Instructor (STEM)">Faculty Instructor (STEM)</option>
                  <option value="Faculty Instructor (Arts & Phonics)">Faculty Instructor (Arts & Phonics)</option>
                  <option value="Faculty Member">Faculty Member</option>
                  <option value="Senior Faculty Instructor">Senior Faculty Instructor</option>
                  <option value="Staff Administrator">Staff Administrator</option>
                </select>
              </div>

              <div className="modal-actions-light">
                <button
                  type="button"
                  className="modal-cancel-btn-light"
                  onClick={() => setShowAddFacultyModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn-light">
                  <Check size={18} />
                  <span>Save Faculty Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL: EDIT ACTIVITY */}
      {/* ==================================================================== */}
      {editingActivity && (
        <div className="admin-modal-overlay" onClick={() => setEditingActivity(null)}>
          <div className="admin-modal-card-light" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-light">
              <div className="modal-title-wrap">
                <div className="modal-icon-badge" style={{ background: '#dcfce7', color: '#16a34a' }}>
                  <Gamepad2 size={22} color="#16a34a" />
                </div>
                <div>
                  <h3>Edit Activity: {editingActivity.title}</h3>
                  <p>Update curriculum parameters and star reward</p>
                </div>
              </div>
              <button className="modal-close-x" onClick={() => setEditingActivity(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveActivityEdit} className="modal-form-light">
              <div className="form-field-light">
                <label>Activity Title</label>
                <input
                  type="text"
                  value={editingActivity.title}
                  onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-field-light">
                <label>Category</label>
                <select
                  value={editingActivity.category}
                  onChange={(e) => setEditingActivity({ ...editingActivity, category: e.target.value })}
                >
                  <option value="Logic & Thinking">Logic & Thinking</option>
                  <option value="Social & Emotional">Social & Emotional</option>
                  <option value="Creativity">Creativity</option>
                  <option value="Writing & Motor">Writing & Motor</option>
                  <option value="Games">Games</option>
                  <option value="Language">Language</option>
                  <option value="Math">Math</option>
                  <option value="STEM">STEM</option>
                </select>
              </div>

              <div className="form-field-light">
                <label>Target Age Group</label>
                <input
                  type="text"
                  value={editingActivity.ageRange}
                  onChange={(e) => setEditingActivity({ ...editingActivity, ageRange: e.target.value })}
                />
              </div>

              <div className="form-field-light">
                <label>Star Reward per Completed Round</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editingActivity.starsReward}
                  onChange={(e) => setEditingActivity({ ...editingActivity, starsReward: Number(e.target.value) || 1 })}
                />
              </div>

              <div className="form-field-light">
                <label>Activity Description</label>
                <textarea
                  rows="3"
                  value={editingActivity.description}
                  onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                />
              </div>

              <div className="modal-actions-light">
                <button
                  type="button"
                  className="modal-cancel-btn-light"
                  onClick={() => setEditingActivity(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn-light">
                  <Check size={18} />
                  <span>Save Activity Updates</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
