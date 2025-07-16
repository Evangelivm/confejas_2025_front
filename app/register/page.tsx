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

export default function Page() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [edad, setEdad] = useState<number>(0);
  const [estaca, setEstaca] = useState<number>(0);
  const [barrio, setBarrio] = useState<number>(0);

  // Solo ejecutar cuando el componente se ha montado en el cliente
  useEffect(() => {
    // Inicializa la fecha de nacimiento y edad solo en el cliente
    setFechaNacimiento(""); // Si deseas un valor inicial vacío o una fecha predeterminada
    setEdad(0);
  }, []);

  return (
    <div className="min-h-screen bg-[#006184] text-white">
      <header className="p-4 bg-[#01B6D1] shadow-lg">
        <h1 className="text-2xl font-bold text-center">PFJ 2025</h1>
        <p className="text-center text-sm">Mira hacia Cristo</p>
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
              <Comproom edad={edad} genero={genero} />
              {/* Pasamos la edad como prop */}
            </div>
            <Button className="w-full mt-6 bg-[#FFB81C] text-[#006184] hover:bg-[#FFB81C]/90">
              Registrar
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
