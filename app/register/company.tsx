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

// Definimos el tipo para las compañías
type Company = {
  compañia: number; // Es un número
  hombres: string; // Es una cadena
  mujeres: string; // Es una cadena
};

export function CompanySelectionDialog({
  onSelect,
  comp,
}: {
  onSelect: (company: string) => void; // selectedCompany será un string
  comp: Company[]; // Array de compañías dinámico
}) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null); // selectedCompany es un string

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          Seleccionar Compañía
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#006184] text-white">
        <DialogHeader>
          <DialogTitle>Seleccionar Compañía</DialogTitle>
          <DialogDescription className="text-gray-200">
            Elija una compañía basada en la distribución de hombres y mujeres.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {comp.map((company, index) => (
            <Button
              key={index}
              variant="outline"
              className={`justify-between ${
                selectedCompany === company.compañia.toString()
                  ? "bg-[#01B6D1] text-white"
                  : "bg-white/20"
              } hover:bg-[#01B6D1] hover:text-white`}
              onClick={() => setSelectedCompany(company.compañia.toString())}
            >
              <span>
                <b>C{company.compañia}</b>
              </span>
              <span>
                Hombres: {company.hombres} | Mujeres: {company.mujeres}
              </span>
            </Button>
          ))}
        </div>
        <DialogClose asChild>
          <Button
            className="w-full bg-[#FFB81C] text-[#006184] hover:bg-[#FFB81C]/90"
            onClick={() => {
              if (selectedCompany) {
                onSelect(selectedCompany);
              }
            }}
            disabled={!selectedCompany}
          >
            Confirmar Selección
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
