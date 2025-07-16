import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EdadProps {
  initialFecha: string;
  initialEdad: number;
  setInitialFecha: (fecha: string) => void;
  setInitialEdad: (edad: number) => void;
}

function Edad({
  initialFecha,
  initialEdad,
  setInitialFecha,
  setInitialEdad,
}: EdadProps) {
  const [fechaNacimiento, setFechaNacimiento] = useState<string>(initialFecha);
  const [edad, setEdad] = useState<number>(initialEdad);
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar si el componente se montó

  useEffect(() => {
    setIsMounted(true); // Marca el componente como montado
  }, []);

  const calcularEdad = (fecha: string): number => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  useEffect(() => {
    if (isMounted && fechaNacimiento) {
      // Asegúrate de que el componente está montado antes de calcular la edad
      const nuevaEdad = calcularEdad(fechaNacimiento);
      setEdad(nuevaEdad);
      setInitialEdad(nuevaEdad); // Pasar la nueva edad al componente Form
    }
  }, [fechaNacimiento, isMounted, setInitialEdad]);

  const handleFechaNacimientoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nuevaFecha = e.target.value;
    setFechaNacimiento(nuevaFecha);
    setInitialFecha(nuevaFecha); // Actualizar la fecha de nacimiento en el componente Form
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="cumpleaños">3. Fecha de Nacimiento</Label>
        <Input
          id="cumpleaños"
          type="date"
          name="cumpleaños"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
          value={fechaNacimiento}
          onChange={handleFechaNacimientoChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="edad">4. Edad (Se completa solo)</Label>
        <Input
          type="text"
          id="edad"
          name="edad"
          placeholder="Edad"
          className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
          disabled
          value={edad}
          required
        />
      </div>
    </>
  );
}

export default Edad;
