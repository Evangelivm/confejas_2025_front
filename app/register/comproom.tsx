"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { CompanySelectionDialog } from "./company";
import { RoomSelectionDialog } from "./room";
import { socket } from "@/lib/socket"; // Asegúrate de que este archivo socket.js sea accesible

interface ComproomProps {
  edad: number; // Recibe la edad como prop
  genero: string;
}
// Definimos el tipo Company
type Company = {
  compañia: number;
  hombres: string;
  mujeres: string;
};

// Definimos el tipo Room
type Room = {
  name: string;
  occupiedBeds: number;
  totalBeds: number;
};

function Comproom({ edad, genero }: ComproomProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [companyMessages, setCompanyMessages] = useState<Company[]>([]);
  const [roomsData, setRoomsData] = useState<Room[]>([]);

  useEffect(() => {
    const companyChannel = `summary-age-${edad}`;
    const roomChannel = `rooms-age-${edad}-${genero}`;

    // Emitir suscripción para compañías
    socket.emit("subscribeToChannel", companyChannel);

    // Manejar mensajes nuevos para compañías
    socket.on(companyChannel, (message: any) => {
      try {
        // Asegurarse de que el mensaje esté parseado como JSON
        const parsedMessage =
          typeof message === "string" ? JSON.parse(message) : message;

        // Verificar si es un array o encapsular en uno
        const newMessages = Array.isArray(parsedMessage)
          ? parsedMessage
          : [parsedMessage];

        // Validar objetos dentro del array
        const validMessages = newMessages.filter(
          (msg) =>
            msg &&
            typeof msg === "object" &&
            typeof msg.compañia === "number" &&
            typeof msg.hombres === "string" &&
            typeof msg.mujeres === "string"
        );

        // Si el mensaje es válido o vacío, manejarlo
        setTimeout(() => {
          if (validMessages.length > 0) {
            setCompanyMessages([...validMessages]); // Actualizar con mensajes válidos
          } else {
            setCompanyMessages([]); // Borrar el estado si no hay mensajes válidos
            console.log(
              "Estado borrado debido a mensaje vacío o sin formato válido."
            );
          }
        }, 1000);
      } catch (error) {
        console.error("Error al parsear mensaje:", error);
      }
    });

    // Emitir suscripción para habitaciones
    socket.emit("subscribeToChannel", roomChannel);

    // Manejar mensajes nuevos para habitaciones
    socket.on(roomChannel, (message: any) => {
      try {
        // Asegurarse de que el mensaje esté parseado como JSON
        const parsedMessage =
          typeof message === "string" ? JSON.parse(message) : message;

        // Verificar si es un array o encapsular en uno
        const newMessages = Array.isArray(parsedMessage)
          ? parsedMessage
          : [parsedMessage];

        // Validar objetos dentro del array
        const validMessages = newMessages.filter(
          (msg) =>
            msg &&
            typeof msg === "object" &&
            typeof msg.name === "string" &&
            typeof msg.occupiedBeds === "number" &&
            typeof msg.totalBeds === "number"
        );

        // Si el mensaje es válido o vacío, manejarlo
        setTimeout(() => {
          if (validMessages.length > 0) {
            setRoomsData([...validMessages]); // Actualizar con mensajes válidos
          } else {
            setRoomsData([]); // Borrar el estado si no hay mensajes válidos
            console.log(
              "Estado borrado debido a mensaje vacío o sin formato válido."
            );
          }
        }, 1000);
      } catch (error) {
        console.error("Error al parsear mensaje:", error);
      }
    });

    // Cleanup
    return () => {
      socket.off(companyChannel);
      socket.off(roomChannel);
    };
  }, [edad, genero]);

  console.log(companyMessages);
  console.log(roomsData);

  return (
    <>
      <div className="space-y-2">
        <Label>8. Compañía de acuerdo a la edad</Label>
        <div className="flex items-center space-x-2">
          <CompanySelectionDialog
            onSelect={setSelectedCompany}
            comp={companyMessages}
          />
          {selectedCompany && (
            <span className="text-white text-sm">
              Compañía seleccionada: <b>C{selectedCompany}</b>
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>9. Habitación de acuerdo al sexo</Label>
        <div className="flex items-center space-x-2">
          <RoomSelectionDialog onSelect={setSelectedRoom} rooms={roomsData} />
          {selectedRoom && (
            <span className="text-white text-sm">
              Habitación seleccionada: <b>{selectedRoom}</b>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Comproom;
