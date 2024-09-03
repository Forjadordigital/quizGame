import { useState, useEffect } from 'preact/hooks';
import Timer from './Timer.jsx';
import TiempoFormato from './TiempoFormato.jsx';
import Option from './Option.jsx';
import ProgressBar from './ProgressBar.jsx';

const Quiz = () => {
  const questions = [
    {
      question: "¿Cuál es el índice Gini?",
      options: [
        "A - Índice de desempleo",
        "B - Índice de educación",
        "C - Índice de poder adquisitivo",
        "D - Índice de desigualdad de la riqueza",
      ],
      correctAnswer: "D - Índice de desigualdad de la riqueza",
    },
    {
      question: "¿Cuál es el apodo por el que se conoce a la ciudad de Roma?",
      options: [
        "A - La ciudad eterna",
        "B - La bien amada de Dios",
        "C - La ciudad de Pedro",
        "D - La cuna de la civilización",
      ],
      correctAnswer: "A - La ciudad eterna",
    },
    {
      question: "¿Cuál es el nombre del creador de las Leyes de la Robótica?",
      options: [
        "A - Pablo Coelho",
        "B - Mark Twain",
        "C - Victor Hugo",
        "D - Isaac Asimov",
      ],
      correctAnswer: "D - Isaac Asimov",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [resultsSent, setResultsSent] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStartTimer(false);
        setQuizCompleted(true);
      }
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  const handleTimerStop = (time) => {
    const adjustedTime = time + incorrectAnswers * 500;
    setTotalTime(adjustedTime);
  };

  const enviarResultados = async () => {
    if (resultsSent) return;

    if (totalTime <= 200) {
      console.warn('El tiempo total es menor o igual a 200 ms, no se enviarán los resultados.');
      return;
    }

    const apodo = localStorage.getItem('apodo');
    if (apodo) {
      try {
        const response = await fetch(`/api/actualizaciones?apodo=${apodo}&tiempo=${totalTime}`, {
          method: 'GET',
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        setResultsSent(true);
        setShowFinalTime(true);
        window.location.href = './resultados';
      } catch (error) {
        console.error('Error al enviar los resultados:', error);
      }
    } else {
      console.error('No se encontró el apodo en localStorage');
    }
  };

  return (
    <div className="w-full flex flex-col justify-center">
      {!showFinalTime && (
        <Timer start={startTimer} reset={false} onStop={handleTimerStop} />
      )}
      <ProgressBar current={currentQuestionIndex} total={questions.length} completed={quizCompleted} />
      {!quizCompleted ? (
        <div className="w-full mt-10 p-4">
          <h2 className="text-3xl bg-slate-200 py-5 px-4 rounded-lg shadow-lg">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="flex flex-col">
            {questions[currentQuestionIndex].options.map((option) => (
              <Option
                key={option}
                text={option}
                isCorrect={option === questions[currentQuestionIndex].correctAnswer}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-2xl flex flex-col justify-center items-center w-full">
          <TiempoFormato milisegundos={totalTime} />
          <h2 className="text-4xl text-center text-pink-500 uppercase font-bold mb-6 ">
            ¡Felicidades lo has completado!
          </h2>
          <button
            onClick={enviarResultados}
            className="py-3 w-1/2 bg-pink-500 text-white text-xl font-semibold rounded-lg shadow-lg"
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;