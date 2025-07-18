import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:3000";

interface ParticipanteStats {
  nombres: string;
  sexo: "H" | "M";
  estaca: string;
  barrio: string;
  compañia: number;
  habitacion: string;
  asistio: "Si" | "No";
}

// Función para obtener la lista de participantes
export const getParticipantes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/part`);
    // Mapea los datos para extraer los campos necesarios
    const participantes = response.data.map((participante: any) => ({
      id: participante.id,
      name: participante.name,
    }));
    return participantes;
  } catch (error) {
    console.error("Error al obtener los participantes:", error);
    throw error;
  }
};

// Función para buscar un participante por ID
export const buscarParticipante = async (id: number) => {
  try {
    //console.log(`Iniciando búsqueda para ID: ${id}`);
    const response = await axios.get(`${BASE_URL}/part/${id}`);
    //console.log("Respuesta del servidor:", response.data[0]);

    // Verificar si la respuesta tiene datos
    if (!response.data || !response.data[0]) {
      throw new Error("No se encontraron datos del participante");
    }

    // Mapea los datos para extraer los campos necesarios
    const participante = {
      id: response.data[0].id,
      compania: response.data[0].comp || "No asignada",
      nombres: response.data[0].nombre || "",
      apellidos: response.data[0].apellido || "",
      habitacion: response.data[0].habitacion || "Sin asignar",
      edad: response.data[0].edad || 0,
      estaca: response.data[0].estaca || "",
      barrio: response.data[0].barrio || "",
      asistio: response.data[0].asistio || "No",
    };

    //console.log("Datos mapeados del participante:", participante);
    return participante;
  } catch (error) {
    console.error("Error detallado al buscar el participante:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);
    }
    throw error;
  }
};

export const buscarParticipanteCompleto = async (id: number) => {
  try {
    //console.log(`Iniciando búsqueda para ID: ${id}`);
    const response = await axios.get(`${BASE_URL}/part/full/${id}`);
    //console.log("Respuesta del servidor:", response.data[0]);

    // Verificar si la respuesta tiene datos
    if (!response.data || !response.data[0]) {
      throw new Error("No se encontraron datos del participante");
    }

    // Mapea los datos para extraer los campos necesarios
    const participante = {
      id: response.data[0].id,
      compania: response.data[0].comp || "No asignada",
      nombres: response.data[0].nombre || "",
      apellidos: response.data[0].apellido || "",
      habitacion: response.data[0].habitacion || "Sin asignar",
      edad: response.data[0].edad || 0,
      estaca: response.data[0].estaca || "",
      barrio: response.data[0].barrio || "",
      asistio: response.data[0].asistio || "No",
      telefono: response.data[0].telefono || "",
      cumpleaños: response.data[0].cumpleaños || "",
      talla: response.data[0].talla || "",
      tipo: response.data[0].tipo || "",
      sexo: response.data[0].sexo || "",
      correo: response.data[0].correo || "",
      nom_c1: response.data[0].nom_c1 || "",
      telef_c1: response.data[0].telef_c1 || "",
      grupo_sang: response.data[0].grupo_sang || "",
      miembro: response.data[0].miembro || "",
      enf_cronica: response.data[0].enf_cronica || "",
      trat_med: response.data[0].trat_med || "",
      seguro: response.data[0].seguro || "",
      alergia_med: response.data[0].alergia_med || "",
    };

    //console.log("Datos mapeados del participante:", participante);
    return participante;
  } catch (error) {
    console.error("Error detallado al buscar el participante:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);
    }
    throw error;
  }
};

// Función para confirmar la asistencia de un participante
export const confirmarAsistencia = async (id: number) => {
  try {
    //console.log(`Confirmando asistencia para ID: ${id}`);
    const response = await axios.put(`${BASE_URL}/part/${id}`);
    //console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al confirmar la asistencia:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);
    }
    throw error;
  }
};

// Función para obtener las estadísticas de los participantes
export const getStats = async (): Promise<ParticipanteStats[]> => {
  try {
    console.log("Iniciando obtención de estadísticas");
    const response = await axios.get(`${BASE_URL}/stats`);
    console.log("Datos de estadísticas recibidos:", response.data);

    if (!response.data) {
      throw new Error("No se encontraron datos estadísticos");
    }

    return response.data;
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);
    }
    throw error;
  }
};
