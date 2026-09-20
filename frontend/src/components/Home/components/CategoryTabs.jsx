import React from 'react';
import {
  LayoutGrid,
  Gamepad2,
  Palette,
  Lightbulb,
  Pencil,
  Hash,
  FlaskConical,
  Activity,
  Heart
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', label: 'All Activities', icon: LayoutGrid, classMod: '' },
  { id: 'games', label: 'Games', icon: Gamepad2, classMod: 'tab-games' },
  { id: 'creativity', label: 'Creativity', icon: Palette, classMod: 'tab-creativity' },
  { id: 'logic', label: 'Logic & Thinking', icon: Lightbulb, classMod: 'tab-logic' },
  { id: 'writing', label: 'Writing', icon: Pencil, classMod: 'tab-writing' },
  { id: 'math', label: 'Math Fun', icon: Hash, classMod: 'tab-math' },
  { id: 'science', label: 'Science', icon: FlaskConical, classMod: 'tab-science' },
  { id: 'movement', label: 'Movement', icon: Activity, classMod: 'tab-movement' },
  { id: 'life', label: 'Life Skills', icon: Heart, classMod: 'tab-life' },
];

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter-bar">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = (selectedCategory || 'all') === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`category-tab-btn ${cat.classMod} ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <Icon size={18} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
