"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { CompanySelectionDialog } from "./company";
import { RoomSelectionDialog } from "./room";
import { socket } from "@/lib/socket"; // Asegúrate de que este archivo socket.js sea accesible

interface ComproomProps {
  edad: number; // Recibe la edad como prop
  genero: string;
  onSelectCompany: (company: number | null) => void;
  onSelectRoom: (room: { id: number; name: string } | null) => void;
}
// Definimos el tipo Company
type Company = {
  id_comp: number;
  comp: string;
  hombres: string;
  mujeres: string;
};

// Definimos el tipo Room
type Room = {
  id_habitacion: number;
  habitacion: string;
  camas: string;
  registrados: number;
  ocupados: number;
  libres: number;
};

function Comproom({
  edad,
  genero,
  onSelectCompany,
  onSelectRoom,
}: ComproomProps) {
  const [selectedCompany, setSelectedCompanyInternal] = useState<number | null>(
    null
  );
  const [selectedRoomDisplay, setSelectedRoomDisplay] = useState<string | null>(
    null
  ); // State to hold the room name for display
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null); // State to hold the room ID for parent
  const [companyMessages, setCompanyMessages] = useState<Company[]>([]);
  const [roomsData, setRoomsData] = useState<Room[]>([]);

  // Update parent state when internal state changes
  useEffect(() => {
    onSelectCompany(selectedCompany);
  }, [selectedCompany, onSelectCompany]);

  useEffect(() => {
    onSelectRoom(
      selectedRoomId !== null
        ? { id: selectedRoomId, name: selectedRoomDisplay || "" }
        : null
    );
  }, [selectedRoomId, selectedRoomDisplay, onSelectRoom]);

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
            typeof msg.id_comp === "number" &&
            typeof msg.hombres === "string" &&
            typeof msg.mujeres === "string"
        );

        // Si el mensaje es válido o vacío, manejarlo
        if (validMessages.length > 0) {
          setCompanyMessages([...validMessages]); // Actualizar con mensajes válidos
        } else {
          setCompanyMessages([]); // Borrar el estado si no hay mensajes válidos
          console.log(
            "Estado borrado debido a mensaje vacío o sin formato válido."
          );
        }
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
            typeof msg.id_habitacion === "number" &&
            typeof msg.habitacion === "string" &&
            typeof msg.camas === "string" &&
            typeof msg.registrados === "number" &&
            typeof msg.ocupados === "number" &&
            typeof msg.libres === "number"
        );

        // Si el mensaje es válido o vacío, manejarlo
        if (validMessages.length > 0) {
          setRoomsData([...validMessages]); // Actualizar con mensajes válidos
        } else {
          setRoomsData([]); // Borrar el estado si no hay mensajes válidos
          console.log(
            "Estado borrado debido a mensaje vacío o sin formato válido."
          );
        }
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
            onSelect={setSelectedCompanyInternal}
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
          <RoomSelectionDialog
            onSelect={(room) => {
              setSelectedRoomId(room ? room.id : null);
              setSelectedRoomDisplay(room ? room.name : null);
            }}
            rooms={roomsData}
          />
          {selectedRoomDisplay && (
            <span className="text-white text-sm">
              Habitación seleccionada: <b>{selectedRoomDisplay}</b>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Comproom;
