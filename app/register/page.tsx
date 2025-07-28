"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Edad from "./edad";
import Estaca from "./estaca";
import Comproom from "./comproom";
import { registerParticipante } from "@/lib/connections";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [edad, setEdad] = useState<number>(0);
  const [estaca, setEstaca] = useState<number>(0);
  const [barrio, setBarrio] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // New state for loading
  const router = useRouter();

  // Solo ejecutar cuando el componente se ha montado en el cliente
  useEffect(() => {
    // Inicializa la fecha de nacimiento y edad solo en el cliente
    setFechaNacimiento(""); // Si deseas un valor inicial vacío o una fecha predeterminada
    setEdad(0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5AB04] to-[#01667C] text-white">
      <header className="p-4 bg-[#F5AB04] shadow-lg">
        <h1 className="text-2xl font-bold text-center">Conferencia JAS 2025</h1>
        <p className="text-center text-sm">El Gozo de Vivir los Convenios</p>
      </header>

      <main className="container mx-auto md:py-4 md:px-20 p-4 space-y-6">
        <Card className="bg-white/10 backdrop-blur border-none text-white">
          <CardHeader>
            <CardTitle>Registro de Participante</CardTitle>
            <CardDescription className="text-gray-200">
              Ingresa los datos del participante siguiendo la numeracion de cada
              paso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apellidos">1. Apellidos</Label>
                <Input
                  id="apellidos"
                  placeholder="Ingrese sus apellidos"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombres">2. Nombres</Label>
                <Input
                  id="nombres"
                  placeholder="Ingrese sus nombres"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <Edad
                initialFecha={fechaNacimiento}
                initialEdad={edad}
                setInitialFecha={setFechaNacimiento}
                setInitialEdad={setEdad}
              />
              <Estaca setEstac={setEstaca} setBarr={setBarrio} />
              <div className="space-y-2">
                <Label htmlFor="sexo">7. Sexo</Label>
                <Select
                  onValueChange={(value) => setGenero(value)} // Actualiza el estado
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Seleccione su sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="H">Hombre</SelectItem>
                    <SelectItem value="M">Mujer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Comproom
                edad={edad}
                genero={genero}
                onSelectCompany={setSelectedCompany}
                onSelectRoom={(room) => setSelectedRoom(room ? room.id : null)}
              />
              {/* Pasamos la edad como prop */}
            </div>
            <Button
              className="w-full mt-6 bg-[#FFB81C] text-[#006184] hover:bg-[#FFB81C]/90"
              onClick={async () => {
                setIsSubmitting(true); // Set loading to true
                const apellidosInput = document.getElementById(
                  "apellidos"
                ) as HTMLInputElement;
                const nombresInput = document.getElementById(
                  "nombres"
                ) as HTMLInputElement;

                const registrationData = {
                  apellido: apellidosInput ? apellidosInput.value : "",
                  nombre: nombresInput ? nombresInput.value : "",
                  nacimiento: fechaNacimiento,
                  edad: edad,
                  sexo: genero,
                  id_estaca: estaca,
                  id_barrio: barrio,
                  id_comp: selectedCompany,
                  id_habitacion: selectedRoom,
                };
                console.log("Datos de registro:", registrationData);

                try {
                  console.log("Attempting to register participant...");
                  await registerParticipante(registrationData);
                  console.log(
                    "Participant registered successfully. Showing success toast."
                  );
                  toast.success("Registro Exitoso", {
                    description:
                      "El participante ha sido registrado correctamente.",
                  });
                  router.refresh(); // Refresh the page
                } catch (error) {
                  console.error("Error al registrar:", error);
                  console.log("Registration failed. Showing error toast.");
                  toast.error("Error en el Registro", {
                    description:
                      "Hubo un problema al registrar el participante. Inténtelo de nuevo.",
                  });
                } finally {
                  setIsSubmitting(false); // Set loading to false
                  console.log(
                    "Submission process finished. Button re-enabled."
                  );
                }
              }}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Registrando..." : "Registrar"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
