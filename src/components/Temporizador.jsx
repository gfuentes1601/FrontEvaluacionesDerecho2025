import { useState, useEffect, useRef } from "react";

const Temporizador = ({ tiempoInicial, onFinalizar }) => {
  const [segundos, setSegundos] = useState(tiempoInicial);
  const onFinalizarRef = useRef(onFinalizar);

  // Mantener la referencia actualizada
  useEffect(() => {
    onFinalizarRef.current = onFinalizar;
  }, [onFinalizar]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          
          // SOLUCIÓN: Ejecutar onFinalizar fuera del ciclo de renderizado actual
          setTimeout(() => {
            onFinalizarRef.current();
          }, 0);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;

  return (
    <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "20px" }}>
      Tiempo restante: {minutos}:{segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes}
    </div>
  );
};

export default Temporizador;