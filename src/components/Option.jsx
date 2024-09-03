import { useState } from 'preact/hooks';

const Option = ({ text, isCorrect, onAnswer }) => {
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState(null); // 'correct' | 'incorrect' | null

  const handleClick = () => {
        if (selected) return;
    
        setSelected(true);
        setStatus(isCorrect ? 'correct' : 'incorrect');
    
        // Retrasa el cambio a la siguiente pregunta si la respuesta es correcta
        if (isCorrect) {
          setTimeout(() => {
            onAnswer(isCorrect);
          }, 300); // Cambia a la siguiente pregunta después de 500ms
        } else {
          onAnswer(isCorrect);
        }
      };

  const getBackgroundColor = () => {
    if (!selected) return 'bg-slate-200';
    return status === 'correct' ? 'bg-green-500' : 'bg-red-500';
  };

  const getShakeClass = () => {
    if (status === 'incorrect') {
      return 'animate-shake';
    } else if (status === 'correct') {
      return 'animate-bump';
    } else {
      return '';
    }
  };

  return (
    <button
      className={`py-3 px-4 first:mt-4 mb-4 text-slate-700 text-xl font-semibold text-left shadow-md rounded transition-colors duration-300 ${getBackgroundColor()} ${getShakeClass()}`}
      onClick={handleClick}
      disabled={selected}
    >
      {text}
    </button>
  );
};

export default Option;


// import { useState } from 'preact/hooks';

// const Option = ({ text, isCorrect, onAnswer }) => {
//   const [selected, setSelected] = useState(false);
//   const [status, setStatus] = useState(null); // 'correct' | 'incorrect' | null

//   const handleClick = () => {
//     if (selected) return;

//     setSelected(true);
//     setStatus(isCorrect ? 'correct' : 'incorrect');

//     // Retrasa el cambio a la siguiente pregunta si la respuesta es correcta
//     if (isCorrect) {
//       setTimeout(() => {
//         onAnswer(isCorrect);
//       }, 500); // Cambia a la siguiente pregunta después de 500ms
//     } else {
//       onAnswer(isCorrect);
//     }
//   };

//   const getBackgroundColor = () => {
//     if (!selected) return 'bg-slate-200';
//     return status === 'correct' ? 'bg-green-500' : 'bg-red-500';
//   };

//   return (
//     <button
//       className={`py-3 px-4 first:mt-4 mb-4 text-slate-700 text-xl font-semibold text-left shadow-md rounded transition-colors duration-300 ${getBackgroundColor()}`}
//       onClick={handleClick}
//       disabled={selected}
//     >
//       {text}
//     </button>
//   );
// };

// export default Option;
