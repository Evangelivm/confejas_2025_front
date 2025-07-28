import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Room = {
  id_habitacion: number; // Nuevo campo para el ID de la habitación
  habitacion: string;
  camas: string;
  registrados: number;
  ocupados: number;
  libres: number;
};

export function RoomSelectionDialog({
  onSelect,
  rooms,
}: {
  onSelect: (room: { id: number; name: string } | null) => void;
  rooms: Room[]; // Array de habitaciones dinámico
}) {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Seleccionar Habitación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#006184] text-white">
        <DialogHeader>
          <DialogTitle>Seleccionar Habitación</DialogTitle>
          <DialogDescription className="text-gray-200">
            Elija una habitación basada en la disponibilidad de camas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {rooms.map((room) => (
            <Button
              key={room.id_habitacion} // Usar id_habitacion como key
              variant="outline"
              className={`justify-between ${
                selectedRoom === room.id_habitacion
                  ? "bg-[#01B6D1] text-white"
                  : "bg-white/20"
              } hover:bg-[#01B6D1] hover:text-white`}
              onClick={() => setSelectedRoom(room.id_habitacion)}
            >
              <span>{room.habitacion}</span>
              <span>
                Ocupadas: {room.ocupados} | Libres:{" "}
                {parseInt(room.camas) - room.ocupados}
              </span>
            </Button>
          ))}
        </div>
        <DialogClose asChild>
          <Button
            className="w-full bg-[#FFB81C] text-[#006184] hover:bg-[#FFB81C]/90"
            onClick={() => {
              if (selectedRoom !== null) {
                const roomData = rooms.find(
                  (r) => r.id_habitacion === selectedRoom
                );
                if (roomData) {
                  onSelect({
                    id: roomData.id_habitacion,
                    name: roomData.habitacion,
                  });
                }
              } else {
                onSelect(null);
              }
            }}
            disabled={selectedRoom === null}
          >
            Confirmar Selección
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
