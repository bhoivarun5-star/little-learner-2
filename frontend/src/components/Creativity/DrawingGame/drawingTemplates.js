// Drawing and Coloring Templates for Kids (Ages 3-6)
// Each template renders bold, clear black outlines on the canvas with distinct regions for color-fill

export const TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    icon: '✨',
    category: 'Free Drawing',
    subtitle: 'Draw anything your imagination dreams up!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    }
  },
  {
    id: 'cat',
    name: 'Cute Kitten',
    icon: '🐱',
    category: 'Animals',
    subtitle: 'Color this happy smiling kitty!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const scale = Math.min(w, h) / 400;
      ctx.translate((w - 400 * scale) / 2, (h - 400 * scale) / 2);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#1e1b4b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Left Ear Outer
      ctx.beginPath();
      ctx.moveTo(130, 150);
      ctx.lineTo(100, 70);
      ctx.lineTo(170, 115);
      ctx.closePath();
      ctx.stroke();

      // Right Ear Outer
      ctx.beginPath();
      ctx.moveTo(270, 150);
      ctx.lineTo(300, 70);
      ctx.lineTo(230, 115);
      ctx.closePath();
      ctx.stroke();

      // Left Ear Inner
      ctx.beginPath();
      ctx.moveTo(125, 135);
      ctx.lineTo(110, 85);
      ctx.lineTo(155, 118);
      ctx.closePath();
      ctx.stroke();

      // Right Ear Inner
      ctx.beginPath();
      ctx.moveTo(275, 135);
      ctx.lineTo(290, 85);
      ctx.lineTo(245, 118);
      ctx.closePath();
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.ellipse(200, 200, 110, 95, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Eyes
      ctx.beginPath();
      ctx.arc(160, 180, 16, 0, Math.PI * 2);
      ctx.arc(240, 180, 16, 0, Math.PI * 2);
      ctx.stroke();

      // Eye pupils
      ctx.fillStyle = '#1e1b4b';
      ctx.beginPath();
      ctx.arc(160, 180, 8, 0, Math.PI * 2);
      ctx.arc(240, 180, 8, 0, Math.PI * 2);
      ctx.fill();

      // Nose
      ctx.beginPath();
      ctx.moveTo(200, 220);
      ctx.lineTo(188, 208);
      ctx.lineTo(212, 208);
      ctx.closePath();
      ctx.stroke();

      // Mouth
      ctx.beginPath();
      ctx.moveTo(200, 220);
      ctx.quadraticCurveTo(185, 240, 170, 230);
      ctx.moveTo(200, 220);
      ctx.quadraticCurveTo(215, 240, 230, 230);
      ctx.stroke();

      // Whiskers
      ctx.beginPath();
      ctx.moveTo(120, 205);
      ctx.lineTo(60, 195);
      ctx.moveTo(120, 220);
      ctx.lineTo(55, 225);
      ctx.moveTo(280, 205);
      ctx.lineTo(340, 195);
      ctx.moveTo(280, 220);
      ctx.lineTo(345, 225);
      ctx.stroke();

      // Little Body
      ctx.beginPath();
      ctx.moveTo(130, 285);
      ctx.quadraticCurveTo(120, 360, 150, 370);
      ctx.lineTo(250, 370);
      ctx.quadraticCurveTo(280, 360, 270, 285);
      ctx.stroke();

      // Collar with bell
      ctx.beginPath();
      ctx.ellipse(200, 292, 45, 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(200, 312, 10, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 'flower',
    name: 'Sunny Flower',
    icon: '🌸',
    category: 'Flowers',
    subtitle: 'A cheerful blooming flower in the warm sun!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const scale = Math.min(w, h) / 400;
      ctx.translate((w - 400 * scale) / 2, (h - 400 * scale) / 2);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#1e1b4b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Stem
      ctx.beginPath();
      ctx.moveTo(200, 220);
      ctx.quadraticCurveTo(205, 290, 200, 370);
      ctx.stroke();

      // Left Leaf
      ctx.beginPath();
      ctx.moveTo(200, 290);
      ctx.quadraticCurveTo(140, 270, 120, 310);
      ctx.quadraticCurveTo(160, 330, 200, 305);
      ctx.stroke();

      // Right Leaf
      ctx.beginPath();
      ctx.moveTo(200, 310);
      ctx.quadraticCurveTo(260, 290, 280, 330);
      ctx.quadraticCurveTo(240, 350, 200, 325);
      ctx.stroke();

      // Petals (8 big petals)
      const numPetals = 8;
      for (let i = 0; i < numPetals; i++) {
        const angle = (i * 2 * Math.PI) / numPetals;
        const cx = 200 + 72 * Math.cos(angle);
        const cy = 160 + 72 * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Flower Center
      ctx.beginPath();
      ctx.arc(200, 160, 48, 0, Math.PI * 2);
      ctx.stroke();

      // Smiling Face on Center
      ctx.beginPath();
      ctx.arc(185, 150, 6, 0, Math.PI * 2);
      ctx.arc(215, 150, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(200, 162, 14, 0.15 * Math.PI, 0.85 * Math.PI, false);
      ctx.stroke();

      // Small Fluttering Butterfly
      ctx.beginPath();
      ctx.ellipse(80, 80, 18, 12, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(65, 95, 14, 10, -Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 'house',
    name: 'Cozy Cottage',
    icon: '🏡',
    category: 'Houses',
    subtitle: 'A sweet fairy tale cottage under the smiling sun!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const scale = Math.min(w, h) / 400;
      ctx.translate((w - 400 * scale) / 2, (h - 400 * scale) / 2);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#1e1b4b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Ground Line
      ctx.beginPath();
      ctx.moveTo(30, 360);
      ctx.lineTo(370, 360);
      ctx.stroke();

      // Sun
      ctx.beginPath();
      ctx.arc(70, 70, 32, 0, Math.PI * 2);
      ctx.stroke();
      // Sun Rays
      for (let a = 0; a < 8; a++) {
        const rad = (a * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(70 + 38 * Math.cos(rad), 70 + 38 * Math.sin(rad));
        ctx.lineTo(70 + 52 * Math.cos(rad), 70 + 52 * Math.sin(rad));
        ctx.stroke();
      }

      // Chimney
      ctx.beginPath();
      ctx.rect(260, 95, 30, 60);
      ctx.stroke();

      // Puffy smoke
      ctx.beginPath();
      ctx.arc(275, 75, 14, 0, Math.PI * 2);
      ctx.arc(295, 55, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Roof (Triangle)
      ctx.beginPath();
      ctx.moveTo(200, 90);
      ctx.lineTo(80, 190);
      ctx.lineTo(320, 190);
      ctx.closePath();
      ctx.stroke();

      // Attic Round Window
      ctx.beginPath();
      ctx.arc(200, 150, 16, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(200, 134);
      ctx.lineTo(200, 166);
      ctx.moveTo(184, 150);
      ctx.lineTo(216, 150);
      ctx.stroke();

      // House Main Walls
      ctx.beginPath();
      ctx.rect(105, 190, 190, 170);
      ctx.stroke();

      // Front Door
      ctx.beginPath();
      ctx.rect(175, 260, 50, 100);
      ctx.stroke();
      // Door Knob
      ctx.beginPath();
      ctx.arc(188, 310, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();

      // Left Window
      ctx.beginPath();
      ctx.rect(120, 220, 42, 45);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(141, 220);
      ctx.lineTo(141, 265);
      ctx.moveTo(120, 242);
      ctx.lineTo(162, 242);
      ctx.stroke();

      // Right Window
      ctx.beginPath();
      ctx.rect(238, 220, 42, 45);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(259, 220);
      ctx.lineTo(259, 265);
      ctx.moveTo(238, 242);
      ctx.lineTo(280, 242);
      ctx.stroke();

      // Flower Bush by door
      ctx.beginPath();
      ctx.arc(80, 350, 20, 0, Math.PI * 2);
      ctx.arc(325, 350, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 'apple',
    name: 'Juicy Apple',
    icon: '🍎',
    category: 'Fruits',
    subtitle: 'A sweet crunchy apple with a cute leaf!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const scale = Math.min(w, h) / 400;
      ctx.translate((w - 400 * scale) / 2, (h - 400 * scale) / 2);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#1e1b4b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Stem
      ctx.beginPath();
      ctx.moveTo(200, 120);
      ctx.quadraticCurveTo(205, 75, 230, 50);
      ctx.stroke();

      // Leaf
      ctx.beginPath();
      ctx.moveTo(215, 80);
      ctx.quadraticCurveTo(260, 55, 280, 80);
      ctx.quadraticCurveTo(255, 110, 215, 80);
      ctx.stroke();

      // Apple Body
      ctx.beginPath();
      ctx.moveTo(200, 120);
      ctx.bezierCurveTo(140, 85, 70, 130, 80, 220);
      ctx.bezierCurveTo(90, 310, 150, 360, 195, 355);
      ctx.bezierCurveTo(200, 355, 205, 355, 210, 355);
      ctx.bezierCurveTo(255, 360, 315, 310, 325, 220);
      ctx.bezierCurveTo(335, 130, 265, 85, 200, 120);
      ctx.stroke();

      // Smiling Face
      ctx.beginPath();
      ctx.arc(160, 215, 12, 0, Math.PI * 2);
      ctx.arc(240, 215, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(200, 235, 20, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.stroke();

      // Cute Cheeks
      ctx.beginPath();
      ctx.arc(135, 235, 8, 0, Math.PI * 2);
      ctx.arc(265, 235, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 'car',
    name: 'Beep-Beep Car',
    icon: '🚗',
    category: 'Vehicles',
    subtitle: 'Zoom zoom! Color this happy little car!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const scale = Math.min(w, h) / 400;
      ctx.translate((w - 400 * scale) / 2, (h - 400 * scale) / 2);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#1e1b4b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Road Line
      ctx.beginPath();
      ctx.moveTo(30, 320);
      ctx.lineTo(370, 320);
      ctx.stroke();

      // Car Roof & Windows
      ctx.beginPath();
      ctx.moveTo(110, 210);
      ctx.lineTo(150, 130);
      ctx.lineTo(270, 130);
      ctx.lineTo(305, 210);
      ctx.closePath();
      ctx.stroke();

      // Window Divider
      ctx.beginPath();
      ctx.moveTo(210, 130);
      ctx.lineTo(210, 210);
      ctx.stroke();

      // Car Main Body
      ctx.beginPath();
      ctx.moveTo(50, 250);
      ctx.quadraticCurveTo(50, 210, 95, 210);
      ctx.lineTo(320, 210);
      ctx.quadraticCurveTo(360, 210, 360, 250);
      ctx.lineTo(360, 275);
      ctx.lineTo(315, 275);
      // Back Wheel Arch
      ctx.arc(275, 275, 40, 0, Math.PI, true);
      ctx.lineTo(165, 275);
      // Front Wheel Arch
      ctx.arc(125, 275, 40, 0, Math.PI, true);
      ctx.lineTo(50, 275);
      ctx.closePath();
      ctx.stroke();

      // Left Wheel
      ctx.beginPath();
      ctx.arc(125, 280, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(125, 280, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Right Wheel
      ctx.beginPath();
      ctx.arc(275, 280, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(275, 280, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Headlight
      ctx.beginPath();
      ctx.arc(55, 235, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Taillight
      ctx.beginPath();
      ctx.rect(350, 230, 10, 16);
      ctx.stroke();

      ctx.restore();
    }
  },
  {
    id: 'rainbow',
    name: 'Magic Rainbow',
    icon: '🌈',
    category: 'Nature',
    subtitle: 'A colorful rainbow connecting smiling clouds!',
    draw: (ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const scale = Math.min(w, h) / 400;
      ctx.translate((w - 400 * scale) / 2, (h - 400 * scale) / 2);
      ctx.scale(scale, scale);

      ctx.strokeStyle = '#1e1b4b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Rainbow Arcs (3 distinct bands for kids to color!)
      const bands = [160, 130, 100, 70];
      for (let i = 0; i < bands.length; i++) {
        ctx.beginPath();
        ctx.arc(200, 280, bands[i], Math.PI, 0, false);
        ctx.stroke();
      }

      // Left Cloud
      ctx.beginPath();
      ctx.arc(80, 280, 30, 0, Math.PI * 2);
      ctx.arc(110, 260, 34, 0, Math.PI * 2);
      ctx.arc(140, 280, 28, 0, Math.PI * 2);
      ctx.stroke();

      // Right Cloud
      ctx.beginPath();
      ctx.arc(260, 280, 28, 0, Math.PI * 2);
      ctx.arc(290, 260, 34, 0, Math.PI * 2);
      ctx.arc(320, 280, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Sun peeking over rainbow
      ctx.beginPath();
      ctx.arc(200, 100, 30, 0, Math.PI * 2);
      ctx.stroke();
      for (let a = 0; a < 6; a++) {
        const rad = (a * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(200 + 36 * Math.cos(rad), 100 + 36 * Math.sin(rad));
        ctx.lineTo(200 + 48 * Math.cos(rad), 100 + 48 * Math.sin(rad));
        ctx.stroke();
      }

      // Cute Little Twinkling Stars
      const starPoints = [[60, 80], [340, 90], [200, 20]];
      starPoints.forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.restore();
    }
  }
];
