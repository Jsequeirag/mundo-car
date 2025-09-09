import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, ChevronRight, Camera, Send } from "lucide-react";
import Header from "@/components/Header"; // Añadido desde AppLayout
import AdvertisementCarousel from "@/components/AdvertisementCarousel"; // Publicidad inicial y final
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral"; // Publicidad lateral
import MobileSidebar from "@/components/MobileSidebar"; // Añadido desde AppLayout
import Footer from "@/components/Footer"; // Añadido desde AppLayout
import { hondurasDepartment } from "@/data/hondurasDepartment";
const EQUIPAMIENTO_GROUPS: {
  title?: string;
  items: { value: string; label: string }[];
}[] = [
  {
    items: [
      {
        value: "direccion_hidraulica",
        label: "Dirección Hidráulica/Electroasistida",
      },
      { value: "cierre_central", label: "Cierre Central" },
      { value: "asientos_electricos", label: "Asientos Eléctricos" },
      { value: "vidrios_tintados", label: "Vidrios Tintados" },
      { value: "bolsas_aire", label: "Bolsa(s) de Aire" },
      { value: "vidrios_electricos", label: "Vidrios Eléctricos" },
      { value: "espejos_electricos", label: "Espejos Eléctricos" },
      { value: "alarma", label: "Alarma" },
      { value: "frenos_abs", label: "Frenos ABS" },
      { value: "aire_acondicionado", label: "Aire Acondicionado" },
      { value: "desempannador_trasero", label: "Desempañador Trasero" },
      { value: "sunroof_panorama", label: "Sunroof/techo panorámico" },
      { value: "aros_lujo", label: "Aros de Lujo" },
    ],
  },
  {
    items: [
      { value: "turbo", label: "Turbo" },
      { value: "tapiceria_cuero", label: "Tapicería de Cuero" },
      { value: "halogenos", label: "Halógenos" },
      { value: "camara_360", label: "Cámara 360" },
      { value: "android_auto", label: "Android Auto" },
      { value: "cruise_control", label: "Cruise Control" },
      { value: "radio_usb_aux", label: "Radio con USB/AUX" },
      { value: "revision_tecnica", label: "Revisión Técnica al día" },
      {
        value: "control_estabilidad",
        label: "Control Electrónico de Estabilidad",
      },
      { value: "control_descenso", label: "Control de Descenso" },
      { value: "caja_cambios_dual", label: "Caja de Cambios Dual" },
      { value: "camara_retroceso", label: "Cámara de Retroceso" },
      { value: "sensores_retroceso", label: "Sensores de Retroceso" },
    ],
  },
  {
    items: [
      { value: "sensores_frontales", label: "Sensores Frontales" },
      { value: "radio_en_volante", label: "Control de Radio en el Volante" },
      { value: "volante_multifuncional", label: "Volante Multifuncional" },
      { value: "ac_climatizado", label: "Aire Acondicionado Climatizado" },
      { value: "asientos_memoria", label: "Asiento(s) con Memoria" },
      {
        value: "retrovisores_autoretractiles",
        label: "Retrovisores Auto-Retractibles",
      },
      { value: "luces_xenon_bixenon", label: "Luces de Xenón/Bixenón" },
      { value: "sensor_lluvia", label: "Sensor de Lluvia" },
      {
        value: "llave_inteligente",
        label: "Llave Inteligente/Botón de Arranque",
      },
      { value: "apple_carplay", label: "Apple CarPlay" },
      { value: "computadora_viaje", label: "Computadora de Viaje" },
      { value: "volante_ajustable", label: "Volante Ajustable" },
      { value: "bluetooth", label: "Bluetooth" },
    ],
  },
];

// Mock API data
const mockBrands = [
  { id: "toyota", name: "Toyota" },
  { id: "nissan", name: "Nissan" },
  { id: "honda", name: "Honda" },
];

const mockModels = {
  toyota: ["Corolla", "Camry", "RAV4"],
  nissan: ["Sentra", "Altima", "Rogue"],
  honda: ["Civic", "Accord", "CR-V"],
};

const mockSpecs = [
  { id: "cilindrada", label: "Cilindrada" },
  { id: "pasajeros", label: "Pasajeros" },
  { id: "combustible", label: "Combustible" },
  { id: "transmision", label: "Transmisión" },
  { id: "traccion", label: "Tracción" },
  { id: "colorExterior", label: "Color Exterior" },
  { id: "puertas", label: "Puertas" },
];

const schema = z
  .object({
    titulo: z.string().min(5, "El título es obligatorio"),
    descripcion: z.string().min(10, "Agrega una descripción"),
    precio: z.string().min(1, "Precio requerido"),
    marca: z.string().min(1, "Selecciona una marca"),
    modelo: z.string().min(1, "Selecciona un modelo"),
    modeloPersonalizado: z.string().optional(),
    tipo: z.enum(["nuevo", "usado"]),
    estado: z.enum(["excelente", "bueno", "regular"]).optional(),
    ubicacion: z.string().min(1, "Indica la ubicación"),
    publicarInmediatamente: z.boolean(),
    precioNegociable: z.boolean(),
    specs: z.record(z.string()).optional(),
  })
  .refine((data) => data.tipo === "nuevo" || data.estado, {
    message: "El estado es requerido para autos usados",
    path: ["estado"],
  })
  .refine((data) => data.modelo !== "other" || data.modeloPersonalizado, {
    message: "El modelo personalizado es requerido si seleccionas 'Otro'",
    path: ["modeloPersonalizado"],
  });

export default function PublishCarPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const getCountryPath = (path: string) => {
    const { countryCode } = useParams<{ countryCode?: string }>();
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const [brands, setBrands] = useState(mockBrands);
  const [models, setModels] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [photoType, setPhotoType] = useState<"normal" | "personalizada" | null>(
    null
  );
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Añadido desde AppLayout

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      precio: "",
      marca: "",
      modelo: "",
      modeloPersonalizado: "",
      tipo: "nuevo",
      estado: undefined,
      ubicacion: "",
      publicarInmediatamente: true,
      precioNegociable: false,
      specs: {},
    },
  });

  const tipo = form.watch("tipo");
  const marca = form.watch("marca");
  const modelo = form.watch("modelo");

  useEffect(() => {
    setBrands(mockBrands);
  }, []);

  useEffect(() => {
    if (marca) {
      setModels([
        ...(mockModels[marca as keyof typeof mockModels] || []),
        "other",
      ]);
      form.setValue("modelo", "");
      form.setValue("modeloPersonalizado", "");
    } else {
      setModels([]);
    }
  }, [marca, form]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
      setIsModalOpen(false);
      setPhotoType(null);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (photoType === "personalizada") {
      navigate(getCountryPath("/CarImageUploadAndDrag"));
    }
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values, images);
    toast({
      title: "✅ Publicación creada",
      description: "Tu auto ha sido publicado correctamente.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuClick={toggleMobileMenu}
        currentCountryCode={useParams<{ countryCode?: string }>().countryCode}
      />{" "}
      {/* Añadido Header con props */}
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <div className="pt-[80px]">
        {" "}
        {/* Ajuste para evitar solapamiento con el Header */}
        {/* Encabezado visual */}
        <div className="relative bg-gradient-to-r from-[#034651] to-[#045166] text-white py-12 md:py-16 flex flex-col items-center text-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 bg-white/20"
            style={{ backgroundImage: `url('/assets/mundo/publishImage.png')` }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <img
              src="/assets/mundocar-logo.png"
              alt="MundoCar"
              className="h-16 md:h-20 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-fadeIn"
            />
            <h1 className="text-3xl md:text-5xl font-extrabold mt-6 tracking-tight">
              Publica tu vehículo
            </h1>
            <p className="mt-3 text-base md:text-lg opacity-90 max-w-xl px-4">
              Llega a miles de compradores en tu región en minutos.
            </p>
          </div>
        </div>
        {/* Publicidad al inicio */}{" "}
        <main className="mx-auto px-6 py-10">
          <div className="mb-8">
            <AdvertisementCarousel
              slides={[
                {
                  src: "/assets/bridgestone.png",
                  ctaText: "",
                  ctaHref: "https://www.bridgestone.com/",
                  badge: "",
                },
                {
                  src: "/assets/texaco.png",
                  ctaText: "",
                  ctaHref: "https://www.toyota.com/",
                  badge: "",
                },
              ]}
            />
          </div>

          <Link to={`${getCountryPath("inicio")}`}>
            <button className="mb-6 px-4 py-2 bg-[#034651] text-white rounded-md hover:bg-[#045166] transition-colors duration-300 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Regresar
            </button>
          </Link>
          <Card className="shadow-lg border border-gray-200 mb-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#034651]">
                Publica tu vehículo
              </CardTitle>
            </CardHeader>{" "}
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <div className="lg:col-span-1 space-y-8">
              {" "}
              <div className="lg:col-span-1 hidden lg:block space-y-8">
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/meguiarSpray.jpg",

                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/meguiar.jpg",

                      ctaHref: "https://meguiarsdirect.com/",
                    },
                  ]}
                />{" "}
                <AdvertisementCarouselLateral
                  ads={[
                    {
                      src: "/assets/castrolOil.png",

                      ctaHref: "https://www.bridgestone.co.cr/",
                    },
                    {
                      src: "/assets/castrol.png",

                      ctaHref: "https://www.toyota.com/",
                    },
                  ]}
                />
              </div>
            </div>{" "}
            {/* Columna Central: Grid de Carros (ocupa más espacio) */}
            <div className="lg:col-span-2 xl:col-span-3">
              <CardContent>
                {" "}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Datos Generales */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Datos Generales
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Marca */}
                        <FormField
                          control={form.control}
                          name="marca"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marca</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione la Marca" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="toyota">Toyota</SelectItem>
                                  <SelectItem value="honda">Honda</SelectItem>
                                  <SelectItem value="hyundai">
                                    Hyundai
                                  </SelectItem>
                                  <SelectItem value="nissan">Nissan</SelectItem>
                                  <SelectItem value="kia">Kia</SelectItem>
                                  <SelectItem value="otra">Otra</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Modelo */}
                        <FormField
                          control={form.control}
                          name="modelo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Modelo</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej. Corolla, Sentra, Elantra"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Cilindrada (c.c.) */}
                        <FormField
                          control={form.control}
                          name="cilindradaCc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cilindrada</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="c.c. (0 para eléctricos)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Estilo */}
                        <FormField
                          control={form.control}
                          name="estilo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estilo</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione el Estilo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sedan">Sedán</SelectItem>
                                  <SelectItem value="hatchback">
                                    Hatchback
                                  </SelectItem>
                                  <SelectItem value="suv">SUV</SelectItem>
                                  <SelectItem value="pickup">Pickup</SelectItem>
                                  <SelectItem value="coupe">Coupé</SelectItem>
                                  <SelectItem value="convertible">
                                    Convertible
                                  </SelectItem>
                                  <SelectItem value="van">Van</SelectItem>
                                  <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Número de pasajeros */}
                        <FormField
                          control={form.control}
                          name="numPasajeros"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de pasajeros</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                    <SelectItem key={n} value={String(n)}>
                                      {n}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Año */}
                        <FormField
                          control={form.control}
                          name="anio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Año</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Ej. 2020"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Estado */}
                        <FormField
                          control={form.control}
                          name="estado"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione el estado" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="excelente">
                                    Excelente
                                  </SelectItem>
                                  <SelectItem value="bueno">Bueno</SelectItem>
                                  <SelectItem value="regular">
                                    Regular
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Precio (Lempiras) */}
                        <FormField
                          control={form.control}
                          name="precio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio (L)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="L (total del vehículo en lempiras)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Precio es Negociable */}
                        <FormField
                          control={form.control}
                          name="negociable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio es Negociable</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="NO / SÍ" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="no">NO</SelectItem>
                                  <SelectItem value="si">SÍ</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Color Exterior */}
                        <FormField
                          control={form.control}
                          name="colorExterior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color Exterior</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej. Blanco" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Color Interior */}
                        <FormField
                          control={form.control}
                          name="colorInterior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color Interior</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej. Negro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Combustible */}
                        <FormField
                          control={form.control}
                          name="combustible"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Combustible</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gasolina">
                                    Gasolina
                                  </SelectItem>
                                  <SelectItem value="diesel">Diésel</SelectItem>
                                  <SelectItem value="hibrido">
                                    Híbrido
                                  </SelectItem>
                                  <SelectItem value="electrico">
                                    Eléctrico
                                  </SelectItem>
                                  <SelectItem value="otro">Otro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Transmisión */}
                        <FormField
                          control={form.control}
                          name="transmision"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transmisión</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="automatica">
                                    Automática
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Kilometraje + unidad */}
                        <FormField
                          control={form.control}
                          name="kilometraje"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kilometraje</FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-4">
                                  <Input
                                    type="number"
                                    placeholder="Ej. 85000"
                                    {...field}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="kilometrajeUnidad"
                                    render={({ field: unidadField }) => (
                                      <RadioGroup
                                        className="flex gap-6"
                                        onValueChange={unidadField.onChange}
                                        defaultValue={
                                          unidadField.value || "kms"
                                        }
                                      >
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <RadioGroupItem value="kms" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Kms
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                            <RadioGroupItem value="millas" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Millas
                                          </FormLabel>
                                        </FormItem>
                                      </RadioGroup>
                                    )}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Ya pagó impuestos */}
                        <FormField
                          control={form.control}
                          name="pagoImpuestos"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ya pagó impuestos</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="si">SÍ</SelectItem>
                                  <SelectItem value="no">NO</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Se recibe vehículo */}
                        <FormField
                          control={form.control}
                          name="recibeVehiculo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Se recibe vehículo</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="si">SÍ</SelectItem>
                                  <SelectItem value="no">NO</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Placa */}
                        <FormField
                          control={form.control}
                          name="placa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Placa</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Número de placa (uso interno)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Número de puertas */}
                        <FormField
                          control={form.control}
                          name="numPuertas"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de puertas</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[2, 3, 4, 5].map((n) => (
                                    <SelectItem key={n} value={String(n)}>
                                      {n}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Provincia */}
                        <FormField
                          control={form.control}
                          name="provincia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Municipio</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {hondurasDepartment.map((municipality) => (
                                    <SelectItem
                                      key={municipality}
                                      value={municipality.toLowerCase()}
                                    >
                                      {municipality}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Comentario adicional */}
                        <FormField
                          control={form.control}
                          name="comentario"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Comentario adicional</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="(no poner números de teléfono en el comentario)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Equipamiento (Características del Auto) */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Equipamiento
                      </h3>

                      {/* Campo del formulario: equipamiento -> string[] */}
                      <FormField
                        control={form.control}
                        name="equipamiento"
                        render={({ field }) => {
                          const value: string[] = field.value ?? [];

                          const toggle = (val: string, checked: boolean) => {
                            const next = checked
                              ? Array.from(new Set([...(value || []), val]))
                              : (value || []).filter((v) => v !== val);
                            field.onChange(next);
                          };

                          return (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {EQUIPAMIENTO_GROUPS.map((grp, i) => (
                                  <div key={i} className="space-y-2">
                                    {grp.title ? (
                                      <h4 className="text-sm font-semibold text-gray-700">
                                        {grp.title}
                                      </h4>
                                    ) : null}

                                    <div className="divide-y rounded-md border">
                                      {grp.items.map((opt, j) => (
                                        <label
                                          key={opt.value}
                                          className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50"
                                        >
                                          <Checkbox
                                            checked={value.includes(opt.value)}
                                            onCheckedChange={(ck) =>
                                              toggle(opt.value, Boolean(ck))
                                            }
                                          />
                                          <span className="text-sm text-gray-800">
                                            {opt.label}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    {/* Sus Datos */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Sus Datos
                      </h3>

                      {/* grid responsive: 1 col (mobile) / 2 cols (md+) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nombre */}
                        <FormField
                          control={form.control}
                          name="contacto.nombre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nombre completo"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* E-mail */}
                        <FormField
                          control={form.control}
                          name="contacto.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="tu@correo.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Confirmar E-mail */}
                        <FormField
                          control={form.control}
                          name="contacto.confirmarEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar E-mail</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Repite tu correo"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Nota (ocupa ambas columnas en md+) */}
                        <div className="text-sm text-amber-600 font-medium md:col-span-2">
                          Nota: su dirección de correo <strong>NO</strong>{" "}
                          aparecerá visible en el anuncio. <br />
                          Favor ingresar por lo menos 1 número de teléfono (sólo
                          números).
                        </div>

                        {/* Teléfono 1 */}
                        <FormField
                          control={form.control}
                          name="contacto.telefono1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono 1</FormLabel>
                              <FormControl>
                                <Input
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Ej. 88888888"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Teléfono 2 */}
                        <FormField
                          control={form.control}
                          name="contacto.telefono2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono 2</FormLabel>
                              <FormControl>
                                <Input
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Opcional"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Teléfono 3 */}
                        <FormField
                          control={form.control}
                          name="contacto.telefono3"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono 3</FormLabel>
                              <FormControl>
                                <Input
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Opcional"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Teléfono Whatsapp */}
                        <FormField
                          control={form.control}
                          name="contacto.whatsapp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono Whatsapp</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Número asociado a WhatsApp"
                                    {...field}
                                  />
                                  {/* Ícono/indicador (puedes reemplazar por tu SVG/ícono real) */}
                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                                    ●
                                  </span>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* (Opcional) Comentario que ocupe ambas columnas
    <FormField
      control={form.control}
      name="contacto.comentario"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Comentario</FormLabel>
          <FormControl>
            <Textarea placeholder="Información adicional..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}
                      </div>
                    </div>

                    {/* Servicios */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Servicios
                      </h3>

                      {/* Barra informativa como en la imagen */}
                      <div className="rounded-md bg-blue-50 border border-blue-200 p-3 text-sm text-blue-900 mb-4">
                        Los siguientes servicios son <strong>opcionales</strong>{" "}
                        y tienen el costo indicado.{" "}
                        <strong>PRECIOS INCLUYEN IVA</strong>.
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* OPCIÓN 1: Confirmación automática */}
                        <FormField
                          control={form.control}
                          name="servicios.opcion1"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4 shadow-sm bg-gray-50">
                              <div className="flex items-start gap-3 mb-2">
                                <div className="shrink-0 mt-1 w-2 h-2 rounded-full bg-blue-500" />
                                <div>
                                  <FormLabel className="text-base">
                                    Opción 1
                                  </FormLabel>
                                  <p className="text-sm text-gray-700">
                                    <strong>
                                      Confirmación automática de anuncio
                                    </strong>
                                    . Precio: <strong>L 2,260</strong>.
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Seleccione esta opción si desea que su
                                    anuncio aparezca de inmediato sin esperar
                                    confirmación telefónica. No es necesaria si
                                    elige la Opción 2 o 3.
                                  </p>
                                </div>
                              </div>

                              <FormControl>
                                <RadioGroup
                                  className="space-y-2"
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op1-no" />
                                    <label htmlFor="op1-no" className="text-sm">
                                      NO deseo esta opción — L 0
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="si" id="op1-si" />
                                    <label htmlFor="op1-si" className="text-sm">
                                      SÍ deseo esta opción — L 2,260
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* OPCIÓN 2: Destacado / Súper Destacado */}
                        <FormField
                          control={form.control}
                          name="servicios.opcion2" // valores: "no" | "destacado" | "super"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4 shadow-sm bg-yellow-50">
                              <div className="flex items-start gap-3 mb-2">
                                <div className="shrink-0 mt-1 w-2 h-2 rounded-full bg-yellow-500" />
                                <div>
                                  <FormLabel className="text-base">
                                    Opción 2
                                  </FormLabel>
                                  <p className="text-sm text-gray-800">
                                    <strong>Destacado / Súper Destacado</strong>{" "}
                                    y <strong>confirmación automática</strong>.
                                  </p>
                                  <ul className="text-sm text-gray-700 list-disc pl-5 mt-1 space-y-1">
                                    <li>
                                      Destacado en la página del resultado según
                                      criterios de búsqueda.
                                    </li>
                                    <li>
                                      Aparece temporalmente en la página
                                      principal dependiendo de la cantidad de
                                      destacados.
                                    </li>
                                    <li>
                                      La opción{" "}
                                      <strong>“Súper Destacado”</strong> incluye
                                      un <em>post</em> en nuestro muro de
                                      Facebook (≈ 110,000 seguidores) con costo
                                      adicional de{" "}
                                      <strong>L 2,500 + IVA</strong>.
                                    </li>
                                    <li>
                                      Ambas permiten subir{" "}
                                      <strong>8 fotografías</strong> de su
                                      anuncio (en vez de 5).
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <FormControl>
                                <RadioGroup
                                  className="space-y-2"
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op2-no" />
                                    <label htmlFor="op2-no" className="text-sm">
                                      NO deseo esta opción — L 0
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                      value="destacado"
                                      id="op2-dest"
                                    />
                                    <label
                                      htmlFor="op2-dest"
                                      className="text-sm"
                                    >
                                      SÍ, deseo la opción de{" "}
                                      <strong>DESTACADO</strong> — L 9,605
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem
                                      value="super"
                                      id="op2-super"
                                    />
                                    <label
                                      htmlFor="op2-super"
                                      className="text-sm"
                                    >
                                      SÍ, deseo la opción de{" "}
                                      <strong>SÚPER DESTACADO</strong> — L
                                      12,430
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>

                              <div className="mt-2 inline-flex items-center gap-2 text-green-700 text-xs font-semibold">
                                <span className="inline-block rounded-full bg-green-600 w-2 h-2" />
                                RECOMENDADO
                              </div>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* OPCIÓN 3: Mensaje de "nuevo" + confirmación automática */}
                        <FormField
                          control={form.control}
                          name="servicios.opcion3"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4 shadow-sm bg-amber-50 md:col-span-2">
                              <div className="flex items-start gap-3 mb-2">
                                <div className="shrink-0 mt-1 w-2 h-2 rounded-full bg-amber-500" />
                                <div>
                                  <FormLabel className="text-base">
                                    Opción 3
                                  </FormLabel>
                                  <p className="text-sm text-gray-800">
                                    <strong>Mensaje de “nuevo”</strong> y
                                    confirmación automática. Precio:{" "}
                                    <strong>L 2,825</strong>.
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">
                                    El anuncio mostrará la etiqueta “Nuevo”
                                    durante los primeros 4 días. No aparecerá
                                    entre los destacados más recientes en la
                                    página principal.
                                  </p>
                                </div>
                              </div>

                              <FormControl>
                                <RadioGroup
                                  className="space-y-2"
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op3-no" />
                                    <label htmlFor="op3-no" className="text-sm">
                                      NO deseo esta opción — L 0
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="si" id="op3-si" />
                                    <label htmlFor="op3-si" className="text-sm">
                                      SÍ deseo esta opción — L 2,825
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* OPCIÓN 4: Mensaje ESPECIAL */}
                        <FormField
                          control={form.control}
                          name="servicios.opcion4"
                          render={({ field }) => (
                            <FormItem className="rounded-lg border p-4 shadow-sm bg-yellow-50 md:col-span-2">
                              <div className="flex items-start gap-3 mb-2">
                                <div className="shrink-0 mt-1 w-2 h-2 rounded-full bg-yellow-500" />
                                <div>
                                  <FormLabel className="text-base">
                                    Opción 4
                                  </FormLabel>
                                  <p className="text-sm text-gray-800">
                                    <strong>Mensaje ESPECIAL</strong> y
                                    confirmación automática de anuncio.
                                    <br />
                                    Precio: <strong>L 5,085</strong> o{" "}
                                    <strong>L 6,215</strong> dependiendo de la
                                    opción seleccionada.
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">
                                    Con esta opción, su anuncio aparecerá con el
                                    mensaje ESPECIAL que escoja durante todo el
                                    tiempo que esté publicado.
                                  </p>
                                </div>
                              </div>

                              <FormControl>
                                <RadioGroup
                                  className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2"
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                >
                                  {/* NO */}
                                  <div className="flex items-center gap-2 col-span-2">
                                    <RadioGroupItem value="no" id="op4-no" />
                                    <label htmlFor="op4-no" className="text-sm">
                                      NO deseo esta opción — L 0
                                    </label>
                                  </div>

                                  {/* Opciones individuales (L 5,085) */}
                                  {[
                                    { v: "ganga", l: "GAN (GANGA)" },
                                    { v: "full", l: "Full extras" },
                                    { v: "financ", l: "Financiamiento" },
                                    { v: "urge", l: "Urge vender" },
                                    { v: "km", l: "Poco kilometraje" },
                                    { v: "unico", l: "Un solo dueño" },
                                    { v: "parainsc", l: "Para inscribir" },
                                    { v: "ofertas", l: "Escucho ofertas" },
                                    { v: "economico", l: "Muy económico" },
                                    { v: "recibo", l: "Recibo" },
                                    { v: "us", l: "Versión USA" },
                                    { v: "record", l: "Record de agencia" },
                                    { v: "impecable", l: "Impecable" },
                                    { v: "garantia", l: "Con garantía" },
                                    { v: "edicion", l: "Edición limitada" },
                                    { v: "vendo", l: "Vendo por viaje" },
                                    { v: "llame", l: "Llámeme ya!" },
                                    { v: "perfecto", l: "Perfecto estado" },
                                    { v: "tras", l: "Traspaso incluido" },
                                    { v: "negociable", l: "Negociable" },
                                  ].map((opt) => (
                                    <div
                                      key={opt.v}
                                      className="flex items-center gap-2"
                                    >
                                      <RadioGroupItem
                                        value={opt.v}
                                        id={`op4-${opt.v}`}
                                      />
                                      <label
                                        htmlFor={`op4-${opt.v}`}
                                        className="text-sm"
                                      >
                                        SÍ deseo esta opción ({opt.l}) — L 5,085
                                      </label>
                                    </div>
                                  ))}

                                  {/* Combinaciones (L 6,215) */}
                                  {[
                                    {
                                      v: "ganga-fin-recibo",
                                      l: "GANGA + Financ + Recibo",
                                    },
                                    {
                                      v: "ganga-full",
                                      l: "GANGA + Full extras",
                                    },
                                    {
                                      v: "ganga-par-impec",
                                      l: "GANGA + Para inscribir + Impecable",
                                    },
                                    {
                                      v: "escucho-muyeco",
                                      l: "Escucho ofertas + Muy económico",
                                    },
                                    {
                                      v: "par-econo-recibo",
                                      l: "Para inscribir + Muy económico + Recibo",
                                    },
                                    {
                                      v: "recibo-escucho-impec",
                                      l: "Recibo + Escucho ofertas + Impecable",
                                    },
                                    {
                                      v: "km-impec-econo",
                                      l: "Poco km + Impecable + Muy económico",
                                    },
                                    {
                                      v: "urge-escucho-ganga",
                                      l: "Urge vender + Escucho ofertas + GANGA",
                                    },
                                  ].map((opt) => (
                                    <div
                                      key={opt.v}
                                      className="flex items-center gap-2 col-span-2"
                                    >
                                      <RadioGroupItem
                                        value={opt.v}
                                        id={`op4-${opt.v}`}
                                      />
                                      <label
                                        htmlFor={`op4-${opt.v}`}
                                        className="text-sm"
                                      >
                                        SÍ deseo esta opción ({opt.l}) — L 6,215
                                      </label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* BLOQUE DE IMÁGENES con límite Gratis=3; Premium desbloquea + imágenes y video */}
                        <FormItem className="md:col-span-2">
                          <FormLabel>Imágenes del vehículo</FormLabel>
                          <div className="space-y-4">
                            {images.length === 0 ? (
                              <p className="text-sm text-gray-500">
                                No hay imágenes subidas aún.
                              </p>
                            ) : (
                              <div className="relative">
                                <img
                                  src={images[0]}
                                  alt="Principal"
                                  className="w-full h-48 object-cover rounded-lg"
                                />
                                {images.length > 1 && (
                                  <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded">
                                    +{images.length - 1}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Límite y CTA Premium */}
                            {!isPremium && (
                              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
                                Plan Gratis: puedes subir hasta{" "}
                                <strong>5 imágenes</strong>. Para subir{" "}
                                <strong>más imágenes y video</strong>, mejora a{" "}
                                <strong>Premium</strong>.
                                <div className="mt-2">
                                  <Button
                                    onClick={() => {}}
                                    size="sm"
                                    className="bg-[#034651] hover:bg-[#045166] text-white"
                                  >
                                    Mejorar a Premium
                                  </Button>
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3">
                              <Dialog
                                open={isModalOpen}
                                onOpenChange={setIsModalOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                  >
                                    <Camera className="w-4 h-4" /> Subir
                                    Imágenes
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Seleccionar tipo de archivo
                                    </DialogTitle>
                                  </DialogHeader>

                                  {/* Radio: Normal (imágenes) / Personalizada (tu flujo) / Video (sólo Premium) */}
                                  <RadioGroup
                                    value={photoType || undefined}
                                    onValueChange={(v) =>
                                      setPhotoType(v as "normal" | "video")
                                    }
                                    className="space-y-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="normal"
                                        id="normal"
                                      />
                                      <label htmlFor="normal">Imágenes</label>
                                    </div>

                                    <div className="flex items-center space-x-2 opacity-100">
                                      <RadioGroupItem
                                        value="video"
                                        id="video"
                                        disabled={!isPremium}
                                      />
                                      <label
                                        htmlFor="video"
                                        className={
                                          !isPremium ? "text-gray-400" : ""
                                        }
                                      >
                                        Video{" "}
                                        {!isPremium && (
                                          <span className="ml-1 text-xs text-amber-600">
                                            (Premium)
                                          </span>
                                        )}
                                      </label>
                                    </div>
                                  </RadioGroup>

                                  {/* Inputs según selección */}
                                  {photoType === "normal" && (
                                    <div className="mt-4">
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                          const files = Array.from(
                                            e.target.files || []
                                          );
                                          if (!isPremium) {
                                            const allowed = Math.max(
                                              0,
                                              3 - images.length
                                            );
                                            const next = files.slice(
                                              0,
                                              allowed
                                            );
                                            if (files.length > allowed) {
                                              // muestra aviso si intenta pasar el límite
                                              toast({
                                                title: "Límite alcanzado",
                                                description:
                                                  "Plan Gratis permite máximo 3 imágenes. Mejora a Premium para subir más.",
                                                variant: "destructive",
                                              });
                                            }
                                            if (next.length)
                                              handleImageUploadFromFiles(next);
                                            return;
                                          }
                                          handleImageUploadFromFiles(files);
                                        }}
                                      />
                                    </div>
                                  )}

                                  {photoType === "video" && (
                                    <div className="mt-4">
                                      <Input
                                        type="file"
                                        accept="video/*"
                                        disabled={!isPremium}
                                        onChange={(e) => handleVideoUpload(e)}
                                      />
                                    </div>
                                  )}

                                  <DialogFooter>
                                    <Button
                                      onClick={() => setIsModalOpen(false)}
                                    >
                                      Cerrar
                                    </Button>
                                    {photoType === "personalizada" && (
                                      <Link
                                        to={`${getCountryPath(
                                          "/CarImageUploadAndDrag"
                                        )}`}
                                      >
                                        <Button className="bg-[#034651] hover:bg-[#045166] text-white flex items-center gap-2">
                                          Siguiente{" "}
                                          <ChevronRight className="w-5 h-5" />
                                        </Button>
                                      </Link>
                                    )}
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {images.length > 0 && (
                                <>
                                  <Dialog
                                    open={isViewAllOpen}
                                    onOpenChange={setIsViewAllOpen}
                                  >
                                    <DialogTrigger asChild>
                                      <Button variant="outline">
                                        Ver Todas
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                      <DialogHeader>
                                        <DialogTitle>
                                          Todas las Imágenes
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="grid grid-cols-3 gap-4">
                                        {images.map((img, i) => (
                                          <img
                                            key={i}
                                            src={img}
                                            alt={`Imagen ${i + 1}`}
                                            className="w-full h-32 object-cover rounded"
                                          />
                                        ))}
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Dialog
                                    open={isEditOpen}
                                    onOpenChange={setIsEditOpen}
                                  >
                                    <DialogTrigger asChild>
                                      <Button variant="outline">Editar</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                      <DialogHeader>
                                        <DialogTitle>
                                          Editar Imágenes
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="grid grid-cols-3 gap-4">
                                        {images.map((img, index) => (
                                          <div key={index} className="relative">
                                            <img
                                              src={img}
                                              alt={`Imagen ${index + 1}`}
                                              className="w-full h-32 object-cover rounded"
                                            />
                                            <Button
                                              variant="destructive"
                                              size="icon"
                                              className="absolute top-0 right-0"
                                              onClick={() =>
                                                handleDeleteImage(index)
                                              }
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-4">
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          multiple
                                          onChange={(e) => {
                                            const files = Array.from(
                                              e.target.files || []
                                            );
                                            if (!isPremium) {
                                              const allowed = Math.max(
                                                0,
                                                3 - images.length
                                              );
                                              const next = files.slice(
                                                0,
                                                allowed
                                              );
                                              if (files.length > allowed) {
                                                toast({
                                                  title: "Límite alcanzado",
                                                  description:
                                                    "Plan Gratis permite máximo 3 imágenes. Mejora a Premium para subir más.",
                                                  variant: "destructive",
                                                });
                                              }
                                              if (next.length)
                                                handleImageUploadFromFiles(
                                                  next
                                                );
                                              return;
                                            }
                                            handleImageUploadFromFiles(files);
                                          }}
                                        />
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              type="submit"
                              className="bg-[#034651] hover:bg-[#045166] text-white flex items-center gap-2"
                            >
                              <Send className="w-4 h-4" /> Publicar
                            </Button>
                          </div>
                        </FormItem>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>{" "}
            </div>
            {/* Columna Derecha: Anuncio Lateral 2 */}
            <div className="lg:col-span-1 hidden lg:block space-y-8">
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/castrolOil.png",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/castrol.png",
                    ctaHref: "https://www.toyota.com/",
                  },
                ]}
              />{" "}
              <AdvertisementCarouselLateral
                ads={[
                  {
                    src: "/assets/meguiarSpray.jpg",
                    ctaHref: "https://www.bridgestone.co.cr/",
                  },
                  {
                    src: "/assets/meguiar.jpg",
                    ctaHref: "https://meguiarsdirect.com/",
                  },
                ]}
              />{" "}
            </div>
          </div>

          {
            <div className="mt-8">
              <AdvertisementCarousel
                slides={[
                  {
                    src: "/assets/tesla.svg",
                    ctaHref: "https://www.bridgestone.co.cr/",
                    badge: "",
                  },
                  {
                    src: "/assets/toyotaxl.png",
                    ctaHref: "https://www.toyota.com/",
                    badge: "",
                  },
                ]}
              />
            </div>
          }
        </main>
      </div>
      <Footer />
    </div>
  );
}
