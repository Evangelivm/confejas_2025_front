import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { confirmarAsistencia } from "@/lib/connections";
import { toast } from "sonner";

interface ParticipanteInfo {
  id: number;
  apellidos: string;
  nombres: string;
  compania: string;
  habitacion: string;
  edad: number;
  estaca: string;
  barrio: string;
  asistio: string;
}

interface ResultadosParticipanteProps {
  participanteInfo: ParticipanteInfo;
  onAsistenciaConfirmada: () => void;
}

export const ResultadosParticipante: React.FC<ResultadosParticipanteProps> = ({
  participanteInfo,
  onAsistenciaConfirmada,
}) => {
  const handleConfirmarAsistencia = async () => {
    try {
      //console.log("Confirmando asistencia para ID:", participanteInfo.id);
      await confirmarAsistencia(participanteInfo.id);
      //console.log("Asistencia confirmada exitosamente");
      toast.success("Asistencia confirmada exitosamente!");
      onAsistenciaConfirmada();
    } catch (error) {
      console.error("Error al confirmar asistencia:", error);
      toast.error("Error al confirmar asistencia.");
    }
  };
  return (
    <Card className="bg-white/10 backdrop-blur border-none relative z-0">
      <CardHeader>
        <CardTitle className="text-white">2. Resultados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="text-gray-200">Estado:</div>
            <div className="text-white font-medium">
              <Badge
                className={cn(
                  "font-semibold",
                  participanteInfo.asistio === "Si"
                    ? "bg-green-500 hover:bg-green-600 "
                    : "bg-red-500 hover:bg-red-600 "
                )}
              >
                {participanteInfo.asistio === "Si" ? "Asistió" : "No Asistió"}
              </Badge>
            </div>

            <div className="text-gray-200">Apellidos:</div>
            <div className="text-white font-medium">
              {participanteInfo.apellidos}
            </div>

            <div className="text-gray-200">Nombres:</div>
            <div className="text-white font-medium">
              {participanteInfo.nombres}
            </div>

            <div className="text-gray-200">Compañía:</div>
            <div className="text-white font-medium">
              <Badge
                className={cn(
                  "font-semibold",
                  participanteInfo.compania === "Staff"
                    ? "bg-[#FFB81C] hover:bg-[#FFB81C]/90 text-[#006184]"
                    : "bg-blue-500 hover:bg-blue-600"
                )}
              >
                {participanteInfo.compania}
              </Badge>
            </div>

            <div className="text-gray-200">Habitación:</div>
            <div className="text-white font-medium">
              {participanteInfo.habitacion}
            </div>

            <div className="text-gray-200">Edad:</div>
            <div className="text-white font-medium">
              {participanteInfo.edad}
            </div>

            <div className="text-gray-200">Estaca:</div>
            <div className="text-white font-medium">
              {participanteInfo.estaca}
            </div>

            <div className="text-gray-200">Barrio:</div>
            <div className="text-white font-medium">
              {participanteInfo.barrio}
            </div>
          </div>

          <Button
            className="w-full mt-4 bg-[#01B6D1] hover:bg-[#01B6D1]/90"
            onClick={handleConfirmarAsistencia}
            disabled={participanteInfo.asistio === "Si"}
          >
            {participanteInfo.asistio === "Si"
              ? "Asistencia Confirmada"
              : "Confirmar Asistencia"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
