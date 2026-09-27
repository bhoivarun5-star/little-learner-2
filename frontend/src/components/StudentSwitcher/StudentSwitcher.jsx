import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  UserCheck,
  ChevronDown,
  Sparkles,
  Plus,
  Check,
  Edit2,
  Trophy,
  Star,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import ScoreRecordsModal from '../ScoreRecordsModal';
import './StudentSwitcher.css';

export default function StudentSwitcher({ compact = false, onOpenDashboard }) {
  const {
    students,
    activeStudent,
    activeStudentId,
    switchStudent,
    addStudent,
    updateStudent,
    getNextSequentialId
  } = useStudent();

  const [isOpen, setIsOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Kindergarten');

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowAddForm(false);
        setEditingId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectStudent = (id) => {
    switchStudent(id);
    setIsOpen(false);
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    await addStudent({
      name: newStudentName.trim(),
      grade: newStudentGrade
    });
    setNewStudentName('');
    setShowAddForm(false);
  };

  const handleStartRename = (e, student) => {
    e.stopPropagation();
    setEditingId(student.student_id || student.id);
    setEditingName(student.name);
  };

  const handleSaveRename = async (e, id) => {
    e.stopPropagation();
    if (editingName.trim()) {
      await updateStudent(id, { name: editingName.trim() });
    }
    setEditingId(null);
  };

  const nextId = getNextSequentialId();

  return (
    <div className={`student-switcher-container ${compact ? 'compact' : ''}`} ref={dropdownRef}>
      {/* Minimized 1-Click Trigger Button */}
      <button
        type="button"
        className={`student-switcher-trigger ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        title={`Active Student ID: ${activeStudent?.student_id || activeStudent?.id || 'STU-001'} (${activeStudent?.name || 'Learner'}) - Click to switch`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="active-student-id-tag">
          {activeStudent?.student_id || activeStudent?.id || 'STU-001'}
        </span>

        <span className="active-student-name">
          {activeStudent?.name ? activeStudent.name.split(' ')[0] : 'Learner'}
        </span>

        <ChevronDown size={13} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
      </button>

      {/* Dropdown Menu for 1-Click Student Switching & Management */}
      {isOpen && (
        <div className="student-switcher-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-header-title">
              <Users size={16} color="#7c3aed" />
              <span>Switch Student (1-Click)</span>
            </div>
            <span className="student-count-badge">{students.length} Learners</span>
          </div>

          <p className="dropdown-subtitle">
            Click any student to instantly switch game scores & progress tracking to their ID.
          </p>

          {/* List of Students */}
          <div className="students-list-scroll">
            {students.map((student) => {
              const sid = student.student_id || student.id;
              const isSelected = sid === activeStudentId;
              const isEditing = editingId === sid;

              return (
                <div
                  key={sid}
                  className={`student-row-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => !isEditing && handleSelectStudent(sid)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="student-row-left">
                    <span className="student-row-id-pill">{sid}</span>
                    {isEditing ? (
                      <div className="student-inline-edit" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(e, sid)}
                          autoFocus
                          className="inline-edit-input"
                        />
                        <button
                          type="button"
                          className="inline-save-btn"
                          onClick={(e) => handleSaveRename(e, sid)}
                          title="Save Name"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="student-row-details">
                        <div className="student-row-name-row">
                          <span className="student-row-name">{student.name}</span>
                          <button
                            type="button"
                            className="student-edit-btn"
                            onClick={(e) => handleStartRename(e, student)}
                            title="Edit Student Name"
                          >
                            <Edit2 size={12} />
                          </button>
                        </div>
                        <span className="student-row-grade">{student.grade || 'Kindergarten'}</span>
                      </div>
                    )}
                  </div>

                  <div className="student-row-right">
                    <div className="student-stats-micro">
                      <span className="stat-stars" title="Stars Earned">
                        ⭐ {student.total_stars || 0}
                      </span>
                    </div>

                    {isSelected ? (
                      <span className="playing-now-pill" title="Currently Active Student">
                        <UserCheck size={12} />
                        <span>Active</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="switch-now-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudent(sid);
                        }}
                      >
                        Switch ➔
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Student Section */}
          {showAddForm ? (
            <form className="add-student-form" onSubmit={handleCreateStudent}>
              <div className="form-header-line">
                <span className="form-title">
                  New Student (ID: <strong style={{ color: '#7c3aed' }}>{nextId}</strong>)
                </span>
                <button
                  type="button"
                  className="cancel-form-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  ✕
                </button>
              </div>

              <input
                type="text"
                placeholder="Student Full Name (e.g. Advait Rao)"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                autoFocus
                required
                className="add-student-input"
              />

              <div className="form-actions-row">
                <select
                  value={newStudentGrade}
                  onChange={(e) => setNewStudentGrade(e.target.value)}
                  className="grade-select"
                >
                  <option value="Pre-K">Pre-K</option>
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                </select>

                <button type="submit" className="confirm-add-btn">
                  <Plus size={15} />
                  <span>Generate ID & Add</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="dropdown-footer-actions">
              <button
                type="button"
                className="add-student-toggle-btn"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={15} />
                <span>Add Student (Auto {nextId})</span>
              </button>

              <button
                type="button"
                className="view-dashboard-link-btn"
                style={{ background: '#fffbeb', borderColor: '#fde68a', color: '#b45309' }}
                onClick={() => {
                  setIsOpen(false);
                  setShowScoreModal(true);
                }}
                title="View detailed score record of each game played"
              >
                <Trophy size={13} color="#d97706" />
                <span>Score Records</span>
              </button>

              {onOpenDashboard && (
                <button
                  type="button"
                  className="view-dashboard-link-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDashboard();
                  }}
                >
                  Dashboard ➔
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Detailed Game Score Records Modal */}
      <ScoreRecordsModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
      />
    </div>
  );
}
