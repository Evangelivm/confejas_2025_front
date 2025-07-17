"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Shirt,
  Users,
  ChevronDown,
  ChevronUp,
  Heart,
  Building,
  Church,
  Send,
  PhoneCall,
  MessageSquare,
  Droplet,
  AlertCircle,
  Pill,
  FileText,
  Activity,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import RadialMenu from "@/components/radial-menu";
import gsap from "gsap";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

// Tipos para las atenciones médicas
interface DiagnosticoCIE {
  codigo: string;
  descripcion: string;
}

interface Medicamento {
  nombre: string;
  dosis: string;
  frecuencia: string;
  duracion: string;
}

interface AtencionMedica {
  id: number;
  participanteId: number;
  fecha: string;
  hora: string;
  motivoConsulta: string;
  sintomas: string[];
  signos: {
    temperatura: string;
    presionArterial: string;
    frecuenciaCardiaca: string;
    frecuenciaRespiratoria: string;
    saturacionOxigeno: string;
  };
  diagnosticos: DiagnosticoCIE[];
  tratamiento: string;
  medicamentos: Medicamento[];
  indicaciones: string;
  seguimiento: boolean;
  fechaSeguimiento?: string;
  medico: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [showAllergies, setShowAllergies] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [atencionSeleccionada, setAtencionSeleccionada] =
    useState<AtencionMedica | null>(null);
  const isMobile = useMobile();

  // Refs for tab content animations
  const personalTabRef = useRef<HTMLDivElement>(null);
  const contactoTabRef = useRef<HTMLDivElement>(null);
  const saludTabRef = useRef<HTMLDivElement>(null);
  const iglesiaTabRef = useRef<HTMLDivElement>(null);
  const atencionesTabRef = useRef<HTMLDivElement>(null);

  // Animation timeline ref
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Radial menu states
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // User data
  const userData = {
    id: 1, // Añadido ID para relacionar con atenciones médicas
    compañía: "",
    id_part: 10,
    nombres: "Víctor Jharem Ranyi",
    apellidos: "Gomez Ortiz",
    edad: 18,
    sexo: "H",
    cumpleaños: "19/10/2005",
    estaca: "San Luis",
    barrio: "Salamanca",
    telefono: "961491335",
    tipo: "Participante",
    correo: "hohenzhollern@hotmail.com",
    talla: "L",
    nom_c1: "Cristina Margarita Gomez Pahleví",
    correo_c1: "-",
    telef_c1: "987135067",
    miembro: "Si",
    // Health information
    bloodType: "O+",
    allergies: ["Penicilina", "Maní", "Polen"],
    medicalTreatment: "Tratamiento para el asma con inhalador de mantenimiento",
    chronicConditions: ["Asma"],
  };

  // Datos de ejemplo para el historial de atenciones médicas del participante
  const historialAtenciones: AtencionMedica[] = [
    {
      id: 1,
      participanteId: 1,
      fecha: "2023-05-15",
      hora: "09:30",
      motivoConsulta: "Dolor de garganta y fiebre",
      sintomas: ["Dolor de garganta", "Fiebre", "Malestar general"],
      signos: {
        temperatura: "38.5",
        presionArterial: "120/80",
        frecuenciaCardiaca: "88",
        frecuenciaRespiratoria: "18",
        saturacionOxigeno: "97",
      },
      diagnosticos: [
        { codigo: "J02.9", descripcion: "Faringitis aguda, no especificada" },
      ],
      tratamiento: "Reposo, hidratación y medicamentos",
      medicamentos: [
        {
          nombre: "Paracetamol",
          dosis: "500mg",
          frecuencia: "Cada 8 horas",
          duracion: "5 días",
        },
        {
          nombre: "Ibuprofeno",
          dosis: "400mg",
          frecuencia: "Cada 8 horas",
          duracion: "3 días",
        },
      ],
      indicaciones: "Reposo por 48 horas, evitar alimentos irritantes",
      seguimiento: false,
      medico: "Dr. Roberto Méndez",
    },
    {
      id: 6,
      participanteId: 1,
      fecha: "2023-05-20",
      hora: "15:45",
      motivoConsulta: "Control de faringitis",
      sintomas: ["Mejora de síntomas", "Leve dolor de garganta"],
      signos: {
        temperatura: "36.8",
        presionArterial: "118/78",
        frecuenciaCardiaca: "72",
        frecuenciaRespiratoria: "16",
        saturacionOxigeno: "99",
      },
      diagnosticos: [
        { codigo: "J02.9", descripcion: "Faringitis aguda, no especificada" },
      ],
      tratamiento: "Continuar hidratación",
      medicamentos: [],
      indicaciones: "Alta médica, retomar actividades normales",
      seguimiento: false,
      medico: "Dra. Carmen Jiménez",
    },
    {
      id: 12,
      participanteId: 1,
      fecha: "2023-07-10",
      hora: "11:20",
      motivoConsulta: "Reacción alérgica leve",
      sintomas: ["Erupciones cutáneas", "Picazón", "Estornudos"],
      signos: {
        temperatura: "36.6",
        presionArterial: "115/75",
        frecuenciaCardiaca: "76",
        frecuenciaRespiratoria: "16",
        saturacionOxigeno: "98",
      },
      diagnosticos: [
        { codigo: "T78.4", descripcion: "Alergia no especificada" },
      ],
      tratamiento: "Antihistamínicos",
      medicamentos: [
        {
          nombre: "Loratadina",
          dosis: "10mg",
          frecuencia: "Cada 24 horas",
          duracion: "5 días",
        },
      ],
      indicaciones: "Evitar exposición a alérgenos conocidos",
      seguimiento: false,
      medico: "Dr. Roberto Méndez",
    },
  ];

  // Format phone number for display
  const formatPhone = (phone: string) => {
    if (phone.length === 9) {
      return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(6, 9)}`;
    }
    return phone;
  };

  // Format phone number for WhatsApp (international format)
  const formatWhatsAppPhone = (phone: string) => {
    // Assuming Peru country code (+51)
    return `51${phone}`;
  };

  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  // Initialize tab animations
  useEffect(() => {
    // Set initial states for all tabs
    const tabs = [
      personalTabRef,
      contactoTabRef,
      saludTabRef,
      iglesiaTabRef,
      atencionesTabRef,
    ];

    tabs.forEach((tabRef, index) => {
      if (tabRef.current && index > 0) {
        // Skip the first tab (personal) as it's visible by default
        gsap.set(tabRef.current, {
          opacity: 0,
          x: 20,
          display: "none",
        });
      }
    });

    return () => {
      // Clean up any animations
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // Handle tab change with GSAP animation
  const handleTabChange = (value: string) => {
    if (value === activeTab) return;

    // Get refs for current and next tabs
    const currentTabRef = getTabRef(activeTab);
    const nextTabRef = getTabRef(value);

    if (!currentTabRef?.current || !nextTabRef?.current) return;

    // Create a new timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveTab(value);
        timelineRef.current = null;
      },
    });

    timelineRef.current = tl;

    // Determine animation direction
    const tabOrder = ["personal", "contacto", "salud", "iglesia", "atenciones"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const nextIndex = tabOrder.indexOf(value);
    const direction = nextIndex > currentIndex ? 1 : -1;

    // Animate out current tab
    tl.to(currentTabRef.current, {
      opacity: 0,
      x: -20 * direction,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (currentTabRef.current) {
          currentTabRef.current.style.display = "none";
        }
        if (nextTabRef.current) {
          nextTabRef.current.style.display = "block";
        }
      },
    });

    // Animate in next tab
    tl.fromTo(
      nextTabRef.current,
      {
        opacity: 0,
        x: 20 * direction,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      }
    );
  };

  // Helper to get the correct ref based on tab name
  const getTabRef = (tabName: string) => {
    switch (tabName) {
      case "personal":
        return personalTabRef;
      case "contacto":
        return contactoTabRef;
      case "salud":
        return saludTabRef;
      case "iglesia":
        return iglesiaTabRef;
      case "atenciones":
        return atencionesTabRef;
      default:
        return personalTabRef;
    }
  };

  // Radial menu handlers
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowMenu(false);

    // Redireccionar según la opción seleccionada
    if (option === "health") {
      router.push("/historial-atenciones");
    }
  };

  const handleMobileMenuOpen = () => {
    // En móviles, posicionamos el menú en el centro de la pantalla
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
    setShowMenu(true);
  };

  // Ver detalles de una atención
  const verDetallesAtencion = (atencion: AtencionMedica) => {
    setAtencionSeleccionada(atencion);
  };

  // Ir a nueva atención
  const nuevaAtencion = () => {
    router.push("/atencion-medica");
  };

  // Ir al historial completo
  const verHistorialCompleto = () => {
    router.push("/historial-atenciones");
  };

  // Radial menu options
  const menuOptions = [
    { id: "companies", label: "Compañía", icon: "Users" },
    { id: "person", label: "Persona", icon: "User" },
    { id: "health", label: "Salud", icon: "FirstAid" },
    { id: "registration", label: "Inscripción", icon: "ClipboardList" },
    { id: "attendance", label: "Asistencia", icon: "CalendarCheck" },
    { id: "statistics", label: "Stats", icon: "BarChart2" },
  ];

  return (
    <main
      className="flex min-h-screen flex-col items-center bg-slate-50 pb-10 relative"
      onContextMenu={!isMobile ? handleRightClick : undefined}
    >
      {/* Header with background */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
        <h1 className="text-2xl font-bold text-white">{`${userData.nombres} ${userData.apellidos}`}</h1>
        <div className="flex justify-center mt-2">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-sm px-3 py-1">
            {userData.tipo}
          </Badge>
        </div>
      </div>

      {/* Profile content */}
      <div className="container max-w-md px-4 mt-6">
        {/* ID Badge */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">Compañia</p>
            <p className="text-lg font-semibold">1</p>
          </div>
          <Badge
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50"
          >
            {userData.miembro === "Si" ? "Miembro" : "No Miembro"}
          </Badge>
        </div>

        {/* Tabs for different sections */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="contacto">Contacto</TabsTrigger>
            <TabsTrigger value="salud">Salud</TabsTrigger>
            <TabsTrigger value="iglesia">Iglesia</TabsTrigger>
            <TabsTrigger value="atenciones">Médico</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <div
            ref={personalTabRef}
            className={activeTab === "personal" ? "block" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Fecha de Nacimiento
                    </p>
                    <p className="text-slate-900">
                      {userData.cumpleaños} ({userData.edad} años)
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Género</p>
                    <p className="text-slate-900">
                      {userData.sexo === "H" ? "Hombre" : "Mujer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shirt className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Talla de Ropa
                    </p>
                    <p className="text-slate-900">{userData.talla}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Tab */}
          <div
            ref={contactoTabRef}
            className={activeTab === "contacto" ? "block" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-slate-500 mr-3 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500">
                      Teléfono
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-slate-900">
                        {formatPhone(userData.telefono)}
                      </p>
                      <div className="flex space-x-2">
                        <a
                          href={`tel:${userData.telefono}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          aria-label="Llamar"
                        >
                          <PhoneCall className="h-4 w-4" />
                        </a>
                        <a
                          href={`https://wa.me/${formatWhatsAppPhone(
                            userData.telefono
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          aria-label="WhatsApp"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Correo Electrónico
                    </p>
                    <p className="text-slate-900 break-all">
                      {userData.correo}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between"
                  onClick={() => setShowEmergencyContact(!showEmergencyContact)}
                >
                  <span>Contacto de Emergencia</span>
                  {showEmergencyContact ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>

                {showEmergencyContact && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-medium mb-3">{userData.nom_c1}</h3>

                    <div className="flex items-start">
                      <Phone className="h-4 w-4 text-slate-500 mr-2 mt-1" />
                      <div className="flex-1">
                        <p className="text-slate-900">
                          {formatPhone(userData.telef_c1)}
                        </p>
                        <div className="flex space-x-2 mt-1">
                          <a
                            href={`tel:${userData.telef_c1}`}
                            className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            aria-label="Llamar al contacto de emergencia"
                          >
                            <PhoneCall className="h-3 w-3" />
                          </a>
                          <a
                            href={`https://wa.me/${formatWhatsAppPhone(
                              userData.telef_c1
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            aria-label="WhatsApp al contacto de emergencia"
                          >
                            <MessageSquare className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {userData.correo_c1 !== "-" && (
                      <div className="flex items-center mt-2">
                        <Mail className="h-4 w-4 text-slate-500 mr-2" />
                        <p className="text-slate-900">{userData.correo_c1}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Health Information Tab */}
          <div
            ref={saludTabRef}
            className={activeTab === "salud" ? "block" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-red-600" />
                  Información de Salud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-1 flex items-center">
                    <Droplet className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Tipo de Sangre
                      </p>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-0">
                          {userData.bloodType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-2" />

                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between"
                  onClick={() => setShowAllergies(!showAllergies)}
                >
                  <span>Alergia a algún medicamento</span>
                  {showAllergies ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>

                {showAllergies && (
                  <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {userData.allergies && userData.allergies.length > 0 ? (
                      <p className="text-slate-900 mt-1 text-sm">
                        {userData.allergies.join(", ")}
                      </p>
                    ) : (
                      <p className="text-slate-500 text-sm">
                        No se han registrado alergias
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-start">
                  <Pill className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500">
                      Tratamiento Médico
                    </p>
                    <p className="text-slate-900 mt-1 text-sm">
                      {userData.medicalTreatment ||
                        "No tiene tratamiento médico actual"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start mt-4">
                  <Activity className="h-5 w-5 text-slate-500 mr-3 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-500">
                      Enfermedad Crónica
                    </p>
                    {userData.chronicConditions &&
                    userData.chronicConditions.length > 0 ? (
                      <p className="text-slate-900 mt-1 text-sm">
                        {userData.chronicConditions.join(", ")}
                      </p>
                    ) : (
                      <p className="text-slate-900 mt-1">Ninguna</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Church Information Tab */}
          <div
            ref={iglesiaTabRef}
            className={activeTab === "iglesia" ? "block" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Church className="h-5 w-5 mr-2 text-blue-600" />
                  Información de la Iglesia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Estaca</p>
                    <p className="text-slate-900">{userData.estaca}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Barrio</p>
                    <p className="text-slate-900">{userData.barrio}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Miembro
                    </p>
                    <p className="text-slate-900">{userData.miembro}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medical Attentions Tab */}
          <div
            ref={atencionesTabRef}
            className={activeTab === "atenciones" ? "block" : "hidden"}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Historial de Atenciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {historialAtenciones.length > 0 ? (
                  <>
                    <div className="space-y-3">
                      {historialAtenciones.map((atencion) => (
                        <div
                          key={atencion.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50"
                          onClick={() => verDetallesAtencion(atencion)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-slate-500 mr-1" />
                              <span className="text-sm text-slate-500">
                                {formatearFecha(atencion.fecha)} •{" "}
                                {atencion.hora}
                              </span>
                            </div>
                            <p className="font-medium mt-1">
                              {atencion.motivoConsulta}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {atencion.diagnosticos.map(
                                (diagnostico, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {diagnostico.codigo}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={verHistorialCompleto}
                    >
                      Ver historial completo
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                    <p className="text-slate-500">
                      No hay atenciones médicas registradas
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={nuevaAtencion}
                    >
                      Registrar nueva atención
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Tabs>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            Editar Perfil
          </Button>
          <Button variant="outline" className="flex-1">
            Compartir
          </Button>
        </div>
      </div>

      {/* Botón flotante para móviles (Radial Menu) */}
      {isMobile && (
        <button
          onClick={handleMobileMenuOpen}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-slate-700 shadow-lg flex items-center justify-center z-20 hover:bg-slate-600 transition-colors"
          aria-label="Abrir menú"
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Radial Menu */}
      {showMenu && (
        <RadialMenu
          options={menuOptions}
          position={position}
          onSelect={handleOptionSelect}
          onClose={() => setShowMenu(false)}
          isMobile={isMobile}
        />
      )}

      {/* Modal de detalles de atención */}
      {atencionSeleccionada && (
        <Sheet
          open={!!atencionSeleccionada}
          onOpenChange={() => setAtencionSeleccionada(null)}
        >
          <SheetContent side="bottom" className="h-[90vh] rounded-t-xl">
            <SheetHeader className="text-left">
              <SheetTitle>Detalles de la Atención</SheetTitle>
              <SheetDescription>
                {formatearFecha(atencionSeleccionada.fecha)} •{" "}
                {atencionSeleccionada.hora} • {atencionSeleccionada.medico}
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto h-[calc(100%-80px)] pb-8">
              <div>
                <h3 className="font-medium text-sm text-slate-500">
                  Motivo de Consulta
                </h3>
                <p className="mt-1">{atencionSeleccionada.motivoConsulta}</p>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium text-sm text-slate-500">
                  Diagnósticos
                </h3>
                <div className="space-y-2 mt-2">
                  {atencionSeleccionada.diagnosticos.map(
                    (diagnostico, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 p-3 rounded-md border border-slate-200"
                      >
                        <p className="font-medium">{diagnostico.codigo}</p>
                        <p className="text-sm text-slate-600">
                          {diagnostico.descripcion}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium text-sm text-slate-500">
                  Tratamiento
                </h3>
                <p className="mt-1">{atencionSeleccionada.tratamiento}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-sm text-slate-500">
                  Medicamentos
                </h3>
                {atencionSeleccionada.medicamentos.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {atencionSeleccionada.medicamentos.map(
                      (medicamento, index) => (
                        <div
                          key={index}
                          className="bg-slate-50 p-3 rounded-md border border-slate-200"
                        >
                          <p className="font-medium">{medicamento.nombre}</p>
                          <p className="text-sm text-slate-600">
                            {medicamento.dosis} - {medicamento.frecuencia}
                            {medicamento.duracion &&
                              ` - ${medicamento.duracion}`}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 mt-1">
                    No se recetaron medicamentos
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium text-sm text-slate-500">
                  Signos Vitales
                </h3>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <p className="text-xs text-slate-500">Temperatura</p>
                    <p>{atencionSeleccionada.signos.temperatura} °C</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Presión Arterial</p>
                    <p>{atencionSeleccionada.signos.presionArterial} mmHg</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Frecuencia Cardíaca
                    </p>
                    <p>{atencionSeleccionada.signos.frecuenciaCardiaca} lpm</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Frecuencia Respiratoria
                    </p>
                    <p>
                      {atencionSeleccionada.signos.frecuenciaRespiratoria} rpm
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">
                      Saturación de Oxígeno
                    </p>
                    <p>{atencionSeleccionada.signos.saturacionOxigeno} %</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium text-sm text-slate-500">
                  Indicaciones
                </h3>
                <p className="mt-1">{atencionSeleccionada.indicaciones}</p>
              </div>

              {atencionSeleccionada.seguimiento && (
                <div className="mt-4">
                  <h3 className="font-medium text-sm text-slate-500">
                    Seguimiento
                  </h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                    <p>
                      {formatearFecha(
                        atencionSeleccionada.fechaSeguimiento || ""
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                className="w-full"
                onClick={() => setAtencionSeleccionada(null)}
              >
                Cerrar
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </main>
  );
}
