// src/components/ProgressBar.jsx
import { calculateProgressPercentage } from '../utils/progress.js';

const ProgressBar = ({ current, total, completed }) => {
  // Si el quiz está completado, forzar el progreso al 100%
  const progress = completed ? 100 : calculateProgressPercentage(current, total);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-width duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;