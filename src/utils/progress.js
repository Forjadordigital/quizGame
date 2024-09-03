// src/utils/progress.js
export const calculateProgressPercentage = (current, total) => {
    const step = 100 / total; // Dividimos el progreso total en partes iguales
    return current * step;
  };