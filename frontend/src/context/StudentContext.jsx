import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const StudentContext = createContext(null);

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/+$/, '');

// Default fallback student roster with sequential unique IDs - Starts at 0 real stars
const DEFAULT_STUDENTS = [
  {
    id: 'STU-001',
    student_id: 'STU-001',
    name: 'Aarav Sharma',
    avatar: '/assets/boy-avatar.jpg',
    grade: 'Kindergarten',
    total_score: 0,
    total_stars: 0,
    progress: []
  },
  {
    id: 'STU-002',
    student_id: 'STU-002',
    name: 'Ananya Patil',
    avatar: '/assets/boy-avatar.jpg',
    grade: 'Grade 1',
    total_score: 0,
    total_stars: 0,
    progress: []
  },
  {
    id: 'STU-003',
    student_id: 'STU-003',
    name: 'Rohan Joshi',
    avatar: '/assets/boy-avatar.jpg',
    grade: 'Pre-K',
    total_score: 0,
    total_stars: 0,
    progress: []
  },
  {
    id: 'STU-004',
    student_id: 'STU-004',
    name: 'Meera Nair',
    avatar: '/assets/boy-avatar.jpg',
    grade: 'Kindergarten',
    total_score: 0,
    total_stars: 0,
    progress: []
  }
];

export function StudentProvider({ children }) {
  // Load cached students from localStorage or fallback with accurate stars
  const [students, setStudents] = useState(() => {
    try {
      const hasRealStarsReset = localStorage.getItem('ll_real_stars_v2');
      if (!hasRealStarsReset) {
        localStorage.setItem('ll_real_stars_v2', 'true');
        localStorage.removeItem('ll_students_roster');
        return DEFAULT_STUDENTS;
      }
      const saved = localStorage.getItem('ll_students_roster');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Accurately compute real stars from actual game progress records
          return parsed.map(s => {
            const prog = Array.isArray(s.progress) ? s.progress : [];
            const realStars = prog.reduce((sum, p) => sum + (Number(p.stars) || 0), 0);
            const realScore = prog.reduce((sum, p) => sum + (Number(p.score) || 0), 0);
            return {
              ...s,
              total_stars: realStars,
              total_score: realScore,
              progress: prog
            };
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached students:', e);
    }
    return DEFAULT_STUDENTS;
  });

  // Active student ID (e.g. 'STU-001')
  const [activeStudentId, setActiveStudentId] = useState(() => {
    try {
      const saved = localStorage.getItem('ll_active_student_id');
      if (saved) return saved;
    } catch (e) {}
    return 'STU-001';
  });

  const [notification, setNotification] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ll_students_roster', JSON.stringify(students));
    } catch (e) {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('ll_active_student_id', activeStudentId);
    } catch (e) {}
  }, [activeStudentId]);

  // Fetch from backend API on mount
  useEffect(() => {
    const fetchStudentsFromApi = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/students/`, {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.students) && data.students.length > 0) {
            setStudents(data.students);
            // Verify active student exists in fetched list
            const exists = data.students.some(s => s.student_id === activeStudentId || s.id === activeStudentId);
            if (!exists) {
              setActiveStudentId(data.students[0].student_id || data.students[0].id);
            }
          }
        }
      } catch (err) {
        console.log('Backend students API offline, running in offline progressive mode.');
      }
    };

    fetchStudentsFromApi();
  }, []);

  // Compute active student object
  const activeStudent = students.find(
    s => s.student_id === activeStudentId || s.id === activeStudentId
  ) || students[0] || null;

  // Helper to compute next sequential ID
  const getNextSequentialId = useCallback(() => {
    let maxNum = 0;
    students.forEach(s => {
      const sid = s.student_id || s.id || '';
      if (sid.startsWith('STU-')) {
        const num = parseInt(sid.split('-')[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });
    const nextNum = maxNum + 1;
    return `STU-${String(nextNum).padStart(3, '0')}`;
  }, [students]);

  // 1-Click Switch Student
  const switchStudent = useCallback((id) => {
    const target = students.find(s => s.student_id === id || s.id === id);
    if (!target) return;
    
    setActiveStudentId(target.student_id || target.id);
    setNotification({
      type: 'switch',
      message: `Switched active learner to ${target.name} (${target.student_id || target.id}) 🎓`,
      student: target
    });

    setTimeout(() => {
      setNotification(prev => (prev?.student?.student_id === target.student_id ? null : prev));
    }, 3200);
  }, [students]);

  // Add Student with Auto-Generated Sequential ID
  const addStudent = useCallback(async ({ name, grade = 'Kindergarten', avatar = '/assets/boy-avatar.jpg' }) => {
    if (!name || !name.trim()) return null;
    const cleanName = name.trim();
    const newId = getNextSequentialId();

    const newStudentObj = {
      id: newId,
      student_id: newId,
      name: cleanName,
      grade,
      avatar,
      total_score: 0,
      total_stars: 0,
      progress: [],
      created_at: new Date().toISOString()
    };

    // Optimistically update local state
    setStudents(prev => [...prev, newStudentObj]);

    // Send to backend API
    try {
      const res = await fetch(`${API_BASE_URL}/students/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, grade, avatar })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.student) {
          setStudents(prev => prev.map(s => (s.student_id === newId ? data.student : s)));
        }
      }
    } catch (err) {
      console.warn('Backend offline, student saved to local storage roster.');
    }

    setNotification({
      type: 'success',
      message: `Added new student ${cleanName} with ID ${newId}! ⭐`,
      student: newStudentObj
    });
    setTimeout(() => setNotification(null), 3500);

    return newStudentObj;
  }, [getNextSequentialId]);

  // Teacher Manually Updates Student Name or Grade
  const updateStudent = useCallback(async (id, updates) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.student_id === id || s.id === id) {
          return { ...s, ...updates };
        }
        return s;
      })
    );

    try {
      await fetch(`${API_BASE_URL}/students/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.warn('Backend offline, student update saved locally.');
    }

    setNotification({
      type: 'success',
      message: `Updated student ${id} details successfully! ✏️`
    });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Delete Student
  const deleteStudent = useCallback(async (id) => {
    setStudents(prev => {
      const filtered = prev.filter(s => s.student_id !== id && s.id !== id);
      if ((activeStudentId === id) && filtered.length > 0) {
        setActiveStudentId(filtered[0].student_id || filtered[0].id);
      }
      return filtered;
    });

    try {
      await fetch(`${API_BASE_URL}/students/${id}/`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend offline, removed student locally.');
    }
  }, [activeStudentId]);

  // Record Game Progress for the Currently Selected Student
  const recordGameProgress = useCallback(async (gameId, scoreDelta = 0, starsDelta = 0, gameTitle = '') => {
    if (!activeStudentId) return;

    // Optimistically update active student's scores and game progress
    setStudents(prev =>
      prev.map(s => {
        if (s.student_id === activeStudentId || s.id === activeStudentId) {
          const currentProgress = s.progress ? [...s.progress] : [];
          const idx = currentProgress.findIndex(p => p.game_id === gameId);

          let updatedProgress;
          if (idx >= 0) {
            const existing = currentProgress[idx];
            currentProgress[idx] = {
              ...existing,
              score: (existing.score || 0) + scoreDelta,
              stars: (existing.stars || 0) + starsDelta,
              times_played: (existing.times_played || 1) + 1,
              game_title: gameTitle || existing.game_title || gameId,
              last_played: new Date().toISOString()
            };
            updatedProgress = currentProgress;
          } else {
            updatedProgress = [
              ...currentProgress,
              {
                game_id: gameId,
                game_title: gameTitle || gameId,
                score: scoreDelta,
                stars: starsDelta,
                times_played: 1,
                last_played: new Date().toISOString()
              }
            ];
          }

          // Accurately calculate total stars and score directly from the sum of all game records
          const accurateTotalStars = updatedProgress.reduce((sum, p) => sum + (Number(p.stars) || 0), 0);
          const accurateTotalScore = updatedProgress.reduce((sum, p) => sum + (Number(p.score) || 0), 0);

          return {
            ...s,
            total_score: accurateTotalScore,
            total_stars: accurateTotalStars,
            progress: updatedProgress
          };
        }
        return s;
      })
    );

    // Toast notification for earned stars
    if (starsDelta > 0) {
      setNotification({
        type: 'score',
        message: `+${starsDelta} ⭐ earned in ${gameTitle || gameId}!`
      });
      setTimeout(() => setNotification(null), 2500);
    }

    // Sync progress to backend if online
    try {
      fetch(`${API_BASE_URL}/students/${activeStudentId}/progress/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          game_title: gameTitle,
          score: scoreDelta,
          stars: starsDelta
        })
      })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.success && data.student) {
          setStudents(prev =>
            prev.map(s => (s.student_id === data.student.student_id || s.id === data.student.student_id ? data.student : s))
          );
        }
      })
      .catch(() => {});
    } catch (e) {}
  }, [activeStudentId]);

  const value = {
    students,
    activeStudent,
    activeStudentId,
    switchStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    recordGameProgress,
    getNextSequentialId,
    notification
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
      {/* Toast Notification for 1-Click Switch / Updates */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 99999,
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            color: '#ffffff',
            padding: '0.85rem 1.4rem',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-display)',
            fontSize: '0.92rem',
            fontWeight: 700,
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            animation: 'slideDownIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>
            {notification.type === 'switch' ? '🔄' : '✨'}
          </span>
          <span>{notification.message}</span>
        </div>
      )}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
