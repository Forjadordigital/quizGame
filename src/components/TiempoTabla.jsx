function TiempoFormato({ milisegundos }) {
    const totalSegundos = Math.floor(milisegundos / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundosRestantes = totalSegundos % 60;
    const milisegundosRestantes = milisegundos % 1000;
  
    // Formatea minutos, segundos y milisegundos para que siempre tengan dos dígitos
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundosRestantes.toString().padStart(2, '0');
    const milisegundosFormateados = milisegundosRestantes.toString().padStart(3, '0');
  
    return (
      <div className="w-full text-xl text-center font-semibold text-gray-20 mb-6">
        {minutosFormateados}:{segundosFormateados}:{milisegundosFormateados}
      </div>
    );
  }
  
  export default TiempoFormato;
  