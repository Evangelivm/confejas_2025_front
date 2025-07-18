"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X } from "lucide-react";
import { getParticipantes, buscarParticipante } from "@/lib/connections";
import { ResultadosParticipante } from "./result";

interface AutocompleteInputProps {
  suggestions: { id: number; name: string }[];
  onSelect: (id: number) => void;
  onClear: () => void; // Add onClear prop
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  suggestions,
  onSelect,
  onClear, // Destructure onClear
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { id: number; name: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const filtered = suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(userInput.toLowerCase())
    );

    setInputValue(e.target.value);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setActiveSuggestionIndex(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, id: number) => {
    const selectedSuggestion = filteredSuggestions.find((s) => s.id === id);
    //console.log("Sugerencia seleccionada en click:", selectedSuggestion);

    setFilteredSuggestions([]);
    setInputValue(e.currentTarget.innerText);
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);
    if (id !== 0) {
      onSelect(id);
      //console.log("ID seleccionado en handleClick:", id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];
      //console.log("Sugerencia seleccionada en keydown:", selectedSuggestion);

      if (selectedSuggestion) {
        setInputValue(selectedSuggestion.name);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setActiveSuggestionIndex(0);
        if (selectedSuggestion.id !== 0) {
          onSelect(selectedSuggestion.id);
          console.log(
            "ID seleccionado en handleKeyDown:",
            selectedSuggestion.id
          );
        }
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === "ArrowDown") {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);
    onClear(); // Call the onClear prop
  };

  const SuggestionsListComponent = () => {
    const limitedSuggestions = filteredSuggestions.slice(0, 10);

    return limitedSuggestions.length ? (
      <ul className="suggestions absolute bg-white text-black border border-gray-300 rounded-md mt-1 z-[999] w-full max-h-[320px] overflow-y-auto">
        {limitedSuggestions.map((suggestion, index) => {
          let className = "suggestion-item p-2 cursor-pointer";
          if (index !== 0) {
            className += " hover:bg-gray-200";
          }
          if (index === activeSuggestionIndex) {
            className += " suggestion-active bg-gray-200";
          }
          return (
            <li
              className={className}
              key={suggestion.id}
              onClick={(e) => handleClick(e, suggestion.id)}
            >
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions absolute bg-white text-black border border-gray-300 rounded-md mt-1 z-[999] w-full p-2">
        <em>No hay sugerencias disponibles</em>
      </div>
    );
  };

  return (
    <div className="relative w-full sm:flex-1 sm:max-w-[500px] sm:min-w-[200px]">
      <div className="relative flex items-center w-full">
        <Input
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
          placeholder="Ingrese nombre del participante"
          className="w-full bg-white/20 border-white/30 text-white placeholder:text-white/70 pr-8"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {showSuggestions && inputValue && <SuggestionsListComponent />}
    </div>
  );
};

export default function AsistenciaPage() {
  const [participantes, setParticipantes] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [participanteInfo, setParticipanteInfo] = useState<any>(null);

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        //console.log("Iniciando fetchParticipantes");
        const data = await getParticipantes();
        //console.log("Datos recibidos en fetchParticipantes:", data);
        setParticipantes(data);
      } catch (error) {
        console.error("Error en fetchParticipantes:", error);
      }
    };

    fetchParticipantes();
  }, []);

  const handleSelect = (id: number) => {
    //console.log("handleSelect llamado con id:", id);
    if (id !== 0) {
      setSelectedId(id);
      //console.log("selectedId actualizado a:", id);
    }
  };

  const handleBuscar = async () => {
    //console.log("handleBuscar iniciado");
    //console.log("Valor actual de selectedId:", selectedId);

    if (selectedId !== null) {
      try {
        //console.log("Intentando buscar participante con ID:", selectedId);
        const data = await buscarParticipante(selectedId);
        //console.log("Datos recibidos de buscarParticipante:", data);
        setParticipanteInfo(data);
      } catch (error) {
        //console.error("Error en handleBuscar:", error);
      }
    } else {
      console.log("No se ha seleccionado ningún participante");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5AB04] to-[#01667C] text-white">
      <header className="p-4 bg-[#F5AB04] shadow-lg">
        <h1 className="text-2xl font-bold text-center">
          Asistencia de Participantes
        </h1>
        <p className="text-center text-sm mt-1 font-bold">
          Escriba el nombre, seleccione cuando aparezca y hace click en "Buscar"
        </p>
      </header>

      <main className="container mx-auto p-4 space-y-6 max-w-2xl">
        <Card className="bg-white/10 backdrop-blur border-none relative z-10">
          <CardHeader>
            <CardTitle className="text-white">1. Buscar Participante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
              <AutocompleteInput
                suggestions={participantes}
                onSelect={handleSelect}
                onClear={() => {
                  setSelectedId(null);
                  setParticipanteInfo(null);
                }}
              />
              <Button
                className="bg-[#FFB81C] text-[#006184] hover:bg-[#FFB81C]/90 whitespace-nowrap px-6 w-full sm:w-auto"
                onClick={handleBuscar}
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {participanteInfo && (
          <ResultadosParticipante
            participanteInfo={participanteInfo}
            onAsistenciaConfirmada={handleBuscar}
          />
        )}
      </main>
    </div>
  );
}
