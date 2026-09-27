import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  LogOut,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Calendar,
  BarChart3,
  UserCheck,
  Edit3,
  Trash2,
  Trophy,
  Star,
  Check,
  UserPlus,
  PlayCircle,
  Search,
  Gamepad2,
  ChevronDown,
  ChevronUp,
  Settings
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../../context/StudentContext';
import { useLanguage } from '../../context/LanguageContext';
import SettingsModal from '../SettingsModal';
import ScoreRecordsModal from '../ScoreRecordsModal';

export default function LearnerDashboard({ user, mode, onLogout }) {
  const { language } = useLanguage();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [scoreModalStudentId, setScoreModalStudentId] = useState(null);
  const {
    students,
    activeStudent,
    activeStudentId,
    switchStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    getNextSequentialId
  } = useStudent();

  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'classes'
  const [announcementSent, setAnnouncementSent] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Kindergarten');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search / Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Inline Editing Student
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editNameValue, setEditNameValue] = useState('');
  const [editGradeValue, setEditGradeValue] = useState('');

  // Expanded student progress detail
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.55 }
    });
  };

  const handleSendStarReward = () => {
    setAnnouncementSent(true);
    triggerConfetti();
    setTimeout(() => setAnnouncementSent(false), 3500);
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    setIsSubmitting(true);
    await addStudent({
      name: newStudentName.trim(),
      grade: newStudentGrade
    });
    setNewStudentName('');
    setIsSubmitting(false);
    triggerConfetti();
  };

  const handleStartEditing = (student) => {
    const sid = student.student_id || student.id;
    setEditingStudentId(sid);
    setEditNameValue(student.name);
    setEditGradeValue(student.grade || 'Kindergarten');
  };

  const handleSaveStudentEdit = async (sid) => {
    if (editNameValue.trim()) {
      await updateStudent(sid, {
        name: editNameValue.trim(),
        grade: editGradeValue
      });
    }
    setEditingStudentId(null);
  };

  const handleDeleteStudent = (student) => {
    const sid = student.student_id || student.id;
    if (window.confirm(`Are you sure you want to remove student "${student.name}" (${sid})?`)) {
      deleteStudent(sid);
    }
  };

  const nextSeqId = getNextSequentialId();

  // Filter students based on search query
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const sid = (s.student_id || s.id || '').toLowerCase();
    const sname = (s.name || '').toLowerCase();
    const sgrade = (s.grade || '').toLowerCase();
    return sid.includes(q) || sname.includes(q) || sgrade.includes(q);
  });

  const totalClassScore = students.reduce((acc, s) => acc + (s.total_score || 0), 0);
  const totalClassStars = students.reduce((acc, s) => acc + (s.total_stars || 0), 0);

  return (
    <div className="dashboard-container-card" style={{ fontFamily: 'var(--font-display, Outfit, sans-serif)' }}>
      {/* Top Faculty Header Bar */}
      <div style={profileBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
          <div style={avatarWrapStyle}>
            <img
              src={user?.avatar || '/assets/boy-avatar.jpg'}
              alt="Faculty Avatar"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
                {user?.display_name || 'Faculty Member'}
              </h2>
              <span style={facultyBadgeStyle}>Faculty Staff</span>
            </div>
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginTop: '0.35rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                🏛️ Faculty & Staff Portal
              </span>
              <span style={{ fontSize: '0.85rem', color: mode === 'offline' ? '#d97706' : '#16a34a', fontWeight: 700 }}>
                ● {mode === 'offline' ? 'Offline Progressive Mode' : 'Connected to Django Backend API'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={statBoxStyle}>
            <Users color="#0284c7" size={20} />
            <span style={statTextStyle}>{students.length} Students</span>
          </div>
          <div style={statBoxStyle}>
            <Star color="#f59e0b" fill="#f59e0b" size={20} />
            <span style={statTextStyle}>{totalClassStars} Class Stars</span>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#ede9fe',
              color: '#7c3aed',
              border: 'none',
              padding: '0.6rem 1.1rem',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="App & Language Settings"
          >
            <Settings size={18} />
            <span>Settings ({language === 'mr' ? 'मराठी' : 'EN'})</span>
          </button>
          <button onClick={onLogout} style={logoutBtnStyle} title="Log Out of Faculty Portal">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Dashboard */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('students')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'students' ? '#7c3aed' : '#ffffff',
            color: activeTab === 'students' ? '#ffffff' : '#475569',
            fontWeight: 800,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'students' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <Users size={18} />
          <span>Student Roster & ID Tracking</span>
          <span style={{
            background: activeTab === 'students' ? 'rgba(255,255,255,0.25)' : '#ede9fe',
            color: activeTab === 'students' ? '#ffffff' : '#7c3aed',
            padding: '2px 8px',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 800
          }}>
            {students.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'classes' ? '#7c3aed' : '#ffffff',
            color: activeTab === 'classes' ? '#ffffff' : '#475569',
            fontWeight: 800,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'classes' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <BookOpen size={18} />
          <span>Classroom Curriculum & Modules</span>
        </button>
      </div>

      {announcementSent && (
        <div style={successAlertStyle}>
          <CheckCircle2 size={20} color="#16a34a" />
          <span>Hooray! 50 reward stars were distributed across your active student roster! 🌟</span>
        </div>
      )}

      {/* TAB 1: STUDENT ROSTER & SEQUENTIAL ID TRACKING CONSOLE */}
      {activeTab === 'students' && (
        <div style={{ marginTop: '1.5rem' }}>
          {/* Active Student Highlight Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 100%)',
            color: '#ffffff',
            padding: '1.25rem 1.5rem',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PlayCircle size={26} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.85 }}>
                    Currently Active Tracking ID
                  </span>
                  <span style={{
                    background: '#22c55e',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}>
                    ● PLAYING NOW
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '2px 0 0 0' }}>
                  <span style={{ background: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: '8px', marginRight: '8px' }}>
                    {activeStudent?.student_id || activeStudent?.id || 'STU-001'}
                  </span>
                  {activeStudent?.name || 'Aarav Sharma'}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>This Learner's Stars</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                  ⭐ {activeStudent?.total_stars || 0} Stars
                </div>
              </div>
            </div>
          </div>

          {/* Add Student & Search Bar Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
            marginTop: '1.5rem'
          }}>
            {/* Add New Student Form (Auto-Generates Sequential ID) */}
            <div style={{
              background: '#ffffff',
              padding: '1.25rem 1.5rem',
              borderRadius: '20px',
              border: '1.5px solid #e0e7ff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <UserPlus size={20} color="#7c3aed" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
                  Add Student with Sequential ID
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 1rem 0' }}>
                Type student name to automatically generate the next unique ID:{' '}
                <strong style={{ color: '#7c3aed', background: '#ede9fe', padding: '2px 7px', borderRadius: '6px' }}>
                  {nextSeqId}
                </strong>
              </p>

              <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Diya Sengupta"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Grade / Level
                    </label>
                    <select
                      value={newStudentGrade}
                      onChange={(e) => setNewStudentGrade(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.88rem',
                        background: '#ffffff',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Pre-K">Pre-K</option>
                      <option value="Kindergarten">Kindergarten</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                    </select>
                  </div>

                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.68rem 1rem',
                        borderRadius: '12px',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                      }}
                    >
                      <PlusCircle size={17} />
                      <span>Generate {nextSeqId}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Class Stats Summary & Instructions */}
            <div style={{
              background: '#f8fafc',
              padding: '1.25rem 1.5rem',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.5rem 0' }}>
                  🎯 How 1-Click ID Tracking Works
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#475569', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <li>Click <strong>"Switch to this ID"</strong> on any student to activate them instantly.</li>
                  <li>Click the <strong>✏️ Edit Name</strong> button to update any student's name manually.</li>
                  <li>All game scores and stars earned in any game will automatically track to the selected ID!</li>
                  <li>You can also switch the ID at any time from the top Navbar or floating In-Game badge!</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <div style={{
                  flex: 1,
                  background: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Total Students</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e1b4b' }}>{students.length}</div>
                </div>

                <div style={{
                  flex: 1,
                  background: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Active Learners</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#4338ca' }}>🎓 {students.length}</div>
                </div>

                <div style={{
                  flex: 1,
                  background: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Class Stars</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#d97706' }}>⭐ {totalClassStars}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar for Students */}
          <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
              All Enrolled Students ({filteredStudents.length})
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#ffffff',
              padding: '0.45rem 0.85rem',
              borderRadius: '12px',
              border: '1.5px solid #cbd5e1',
              width: '280px'
            }}>
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search by ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
                  width: '100%',
                  fontFamily: 'inherit'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Student Roster Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '1.15rem',
            marginTop: '1rem'
          }}>
            {filteredStudents.map((student) => {
              const sid = student.student_id || student.id;
              const isSelected = sid === activeStudentId;
              const isEditing = editingStudentId === sid;
              const isExpanded = expandedStudentId === sid;
              const progressList = student.progress || [];

              return (
                <div
                  key={sid}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: isSelected ? '2px solid #7c3aed' : '1.5px solid #e2e8f0',
                    boxShadow: isSelected ? '0 8px 24px rgba(124, 58, 237, 0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Top Line: Sequential ID Badge & Active Status */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{
                          background: isSelected ? '#7c3aed' : '#ede9fe',
                          color: isSelected ? '#ffffff' : '#6d28d9',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          letterSpacing: '0.5px'
                        }}>
                          {sid}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                          {student.grade || 'Kindergarten'}
                        </span>
                      </div>

                      {isSelected ? (
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: '#dcfce7',
                          color: '#15803d',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          padding: '3px 9px',
                          borderRadius: '999px',
                          border: '1px solid #bbf7d0'
                        }}>
                          <UserCheck size={13} />
                          <span>Active Tracking</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => switchStudent(sid)}
                          style={{
                            background: '#eff6ff',
                            color: '#2563eb',
                            border: '1px solid #bfdbfe',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            padding: '3px 9px',
                            borderRadius: '999px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          Switch (1-Click) ➔
                        </button>
                      )}
                    </div>

                    {/* Student Name & Manual Edit Form */}
                    {isEditing ? (
                      <div style={{
                        background: '#f8faff',
                        border: '1.5px solid #a5b4fc',
                        borderRadius: '12px',
                        padding: '0.65rem',
                        margin: '0.5rem 0'
                      }}>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '3px' }}>
                          Update Student Name:
                        </label>
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveStudentEdit(sid)}
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '0.45rem 0.65rem',
                            borderRadius: '8px',
                            border: '1.5px solid #6366f1',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            boxSizing: 'border-box',
                            marginBottom: '6px'
                          }}
                        />

                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => setEditingStudentId(null)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              background: '#ffffff',
                              fontSize: '0.76rem',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveStudentEdit(sid)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.35rem 0.75rem',
                              borderRadius: '8px',
                              border: 'none',
                              background: '#16a34a',
                              color: '#ffffff',
                              fontSize: '0.76rem',
                              cursor: 'pointer',
                              fontWeight: 700
                            }}
                          >
                            <Check size={13} />
                            <span>Save Name</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', margin: 0 }}>
                          {student.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleStartEditing(student)}
                          title="Manually edit student name"
                          style={{
                            background: '#f1f5f9',
                            border: 'none',
                            color: '#64748b',
                            borderRadius: '6px',
                            padding: '3px 6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          <Edit3 size={12} />
                          <span>Edit</span>
                        </button>
                      </div>
                    )}

                    {/* Stats Micro Row */}
                    <div style={{
                      display: 'flex',
                      gap: '0.65rem',
                      marginTop: '0.65rem',
                      background: '#f8fafc',
                      padding: '0.6rem 0.85rem',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Total Stars</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#d97706' }}>⭐ {student.total_stars || 0}</span>
                      </div>
                      <div style={{ width: '1px', background: '#cbd5e1' }} />
                      <div style={{ flex: 1, textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, display: 'block' }}>Games Played</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#16a34a' }}>🎮 {progressList.length}</span>
                      </div>
                    </div>

                    {/* Expandable Per-Game Breakdown */}
                    {isExpanded && (
                      <div style={{
                        marginTop: '0.85rem',
                        background: '#fdf4ff',
                        border: '1px solid #f0abfc',
                        borderRadius: '12px',
                        padding: '0.75rem'
                      }}>
                        <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#86198f', marginBottom: '0.5rem' }}>
                          Game Progress for {student.name} ({sid}):
                        </div>
                        {progressList.length === 0 ? (
                          <div style={{ fontSize: '0.75rem', color: '#701a75', fontStyle: 'italic' }}>
                            No game scores tracked yet. Select this student and launch any game!
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {progressList.map((prog, idx) => (
                              <div
                                key={idx}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  fontSize: '0.75rem',
                                  background: '#ffffff',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  border: '1px solid #fae8ff'
                                }}
                              >
                                <span style={{ fontWeight: 700, color: '#1e293b' }}>
                                  {prog.game_title || prog.game_id}
                                </span>
                                <span style={{ color: '#475569', fontWeight: 600 }}>
                                  🎯 {prog.score} pts • ⭐ {prog.stars}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <button
                        type="button"
                        onClick={() => setExpandedStudentId(isExpanded ? null : sid)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#7c3aed',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Details'}</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setScoreModalStudentId(sid)}
                        style={{
                          background: '#fffbeb',
                          border: '1px solid #fde68a',
                          color: '#b45309',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '0.3rem 0.6rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                        title="Open detailed score records of each game played"
                      >
                        <Trophy size={13} color="#d97706" />
                        <span>Score Records</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!isSelected && (
                        <button
                          type="button"
                          onClick={() => switchStudent(sid)}
                          style={{
                            background: '#7c3aed',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '10px',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)'
                          }}
                        >
                          Switch to ID ➔
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteStudent(student)}
                        title="Delete Student"
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          padding: '0.45rem 0.65rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CLASSROOM CURRICULUM MODULES */}
      {activeTab === 'classes' && (
        <div style={{ marginTop: '1.5rem' }}>
          {/* Quick Action Bar for Staff */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleSendStarReward}
              style={primaryActionBtn}
            >
              <Sparkles size={18} />
              <span>Award Class Stars ⭐</span>
            </button>

            <button
              onClick={() => alert('New lesson module added to offline cache!')}
              style={secondaryActionBtn}
            >
              <PlusCircle size={18} />
              <span>Create New Lesson</span>
            </button>
          </div>

          <div className="dashboard-classes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
            {/* Class 1 */}
            <div style={courseCardStyle('#f0fdf4', '#16a34a')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>🦁</span>
                <span style={badgeSmall('#16a34a')}>Grade 1 • 24 Students</span>
              </div>
              <h3 style={courseTitleStyle}>STEM & Number Safari</h3>
              <p style={courseDescStyle}>Unit 3: Basic addition, counting patterns, and geometric animal shapes.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700 }}>92% Progress</span>
                <button style={courseBtnStyle('#16a34a')}>Manage Class ➔</button>
              </div>
            </div>

            {/* Class 2 */}
            <div style={courseCardStyle('#eff6ff', '#0284c7')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>📖</span>
                <span style={badgeSmall('#0284c7')}>Kindergarten • 18 Students</span>
              </div>
              <h3 style={courseTitleStyle}>Phonics & Storybook Castle</h3>
              <p style={courseDescStyle}>Unit 2: Alphabet sound matching, rhymes, and story listening adventures.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700 }}>85% Progress</span>
                <button style={courseBtnStyle('#0284c7')}>Manage Class ➔</button>
              </div>
            </div>

            {/* Class 3 */}
            <div style={courseCardStyle('#fdf4ff', '#8b5cf6')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>🎨</span>
                <span style={badgeSmall('#8b5cf6')}>Pre-K • 20 Students</span>
              </div>
              <h3 style={courseTitleStyle}>Creative Arts & Music</h3>
              <p style={courseDescStyle}>Unit 1: Color mixing, rhythm clapping, and tactile finger painting.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 700 }}>96% Progress</span>
                <button style={courseBtnStyle('#8b5cf6')}>Manage Class ➔</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* Detailed Game Score Records Modal */}
      <ScoreRecordsModal
        isOpen={Boolean(scoreModalStudentId)}
        selectedStudentId={scoreModalStudentId}
        onClose={() => setScoreModalStudentId(null)}
      />
    </div>
  );
}

const profileBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#ffffff',
  padding: '1.25rem 1.75rem',
  borderRadius: '24px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
  flexWrap: 'wrap',
  gap: '1rem'
};

const avatarWrapStyle = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  border: '3px solid #8b5cf6',
  padding: '2px'
};

const facultyBadgeStyle = {
  background: '#ede9fe',
  color: '#7c3aed',
  fontSize: '0.78rem',
  fontWeight: 700,
  padding: '3px 9px',
  borderRadius: '999px',
  fontFamily: 'var(--font-display)'
};

const statBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
  background: '#f8fafc',
  padding: '0.55rem 1.1rem',
  borderRadius: '16px',
  border: '1px solid #e2e8f0'
};

const statTextStyle = {
  fontSize: '0.95rem',
  fontWeight: 800,
  color: '#1e293b',
  fontFamily: 'var(--font-display)'
};

const logoutBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  background: '#fee2e2',
  color: '#b91c1c',
  border: 'none',
  padding: '0.6rem 1.1rem',
  borderRadius: '14px',
  fontWeight: 700,
  cursor: 'pointer'
};

const primaryActionBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  color: '#ffffff',
  border: 'none',
  padding: '0.75rem 1.35rem',
  borderRadius: '16px',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
};

const secondaryActionBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: '#ffffff',
  color: '#334155',
  border: '1.5px solid #e2e8f0',
  padding: '0.75rem 1.35rem',
  borderRadius: '16px',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  cursor: 'pointer'
};

const successAlertStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  background: '#dcfce7',
  color: '#15803d',
  padding: '0.85rem 1.25rem',
  borderRadius: '16px',
  marginTop: '1.25rem',
  fontWeight: 700,
  fontSize: '0.92rem',
  border: '1px solid #bbf7d0'
};

const courseCardStyle = (bgColor, accentColor) => ({
  background: bgColor,
  padding: '1.5rem',
  borderRadius: '22px',
  border: `1.5px solid ${accentColor}33`,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
});

const courseTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: '#1e1b4b',
  fontFamily: 'var(--font-display)'
};

const courseDescStyle = {
  fontSize: '0.88rem',
  color: '#475569',
  lineHeight: 1.4,
  marginBottom: '1rem'
};

const badgeSmall = (color) => ({
  background: '#ffffff',
  color: color,
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '3px 8px',
  borderRadius: '999px',
  border: `1px solid ${color}33`
});

const courseBtnStyle = (color) => ({
  background: color,
  color: '#ffffff',
  border: 'none',
  borderRadius: '12px',
  padding: '0.55rem 0.95rem',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: '0.85rem'
});
