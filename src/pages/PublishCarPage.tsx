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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { X, ChevronRight, Camera, Send } from "lucide-react";
import Header from "@/components/Header";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import AdvertisementCarouselLateral from "@/components/AdvertisementCarouselLateral";
import MobileSidebar from "@/components/MobileSidebar";
import Footer from "@/components/Footer";
import { hondurasDepartment } from "@/data/hondurasDepartment";
import { useApiSend } from "../api/config/customHooks"; // Provided import
import { registerVehicle } from "../api/urls/vehicle"; // Provided import

// Define VehicleDTO interface
interface VehicleDTO {
  id: number;
  brand: string;
  model: string;
  fuel: string;
  locate: string;
  img: string;
  condition: string;
  featured: boolean;
  year: number;
  price: number;
  distance: number;
  transmission: string;
}

interface RegisterVehicleRequest {
  vehicleDTO: VehicleDTO;
  images: string[];
}

// Schema with only relevant fields
const schema = z
  .object({
    brand: z.string().min(1, "Selecciona una marca"),
    model: z.string().min(1, "Selecciona un modelo"),
    fuel: z.string().min(1, "Selecciona el combustible"),
    locate: z.string().min(1, "Indica la ubicación"),
    condition: z.enum(["New", "Used"]),
    featured: z.boolean(),
    year: z.number().min(1900, "Año inválido").max(2025, "Año inválido"),
    price: z.number().min(0, "Precio requerido"),
    distance: z.number().min(0, "Kilometraje requerido"),
    transmission: z.string().min(1, "Selecciona la transmisión"),
  })
  .refine((data) => data.condition === "Used" || !data.featured, {
    message: "Featured only applies to used cars",
    path: ["featured"],
  });

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

export default function PublishCarPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode?: string }>();
  const getCountryPath = (path: string) => {
    if (!countryCode || path === "/") return path;
    if (path.startsWith("/")) return `/${countryCode}${path}`;
    return `/${countryCode}/${path}`;
  };

  const [brands, setBrands] = useState(mockBrands);
  const [models, setModels] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [photoType, setPhotoType] = useState<"normal" | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      brand: "",
      model: "",
      fuel: "",
      locate: "",
      condition: "New",
      featured: false,
      year: 2020,
      price: 0,
      distance: 0,
      transmission: "",
    },
  });

  const brand = form.watch("brand");
  const condition = form.watch("condition");

  useEffect(() => {
    setBrands(mockBrands);
  }, []);

  useEffect(() => {
    if (brand) {
      setModels([
        ...(mockModels[brand as keyof typeof mockModels] || []),
        "other",
      ]);
      form.setValue("model", "");
    } else {
      setModels([]);
    }
  }, [brand, form]);

  // Convert images to base64
  const convertImagesToBase64 = (files: File[]): Promise<string[]> => {
    return Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      convertImagesToBase64(files)
        .then((base64Images) => {
          if (!isPremium) {
            const allowed = Math.max(0, 3 - images.length);
            const nextImages = base64Images.slice(0, allowed);
            if (base64Images.length > allowed) {
              toast({
                title: "Límite alcanzado",
                description:
                  "Plan Gratis permite máximo 3 imágenes. Mejora a Premium para subir más.",
                variant: "destructive",
              });
            }
            setImages((prev) => [...prev, ...nextImages]);
          } else {
            setImages((prev) => [...prev, ...base64Images]);
          }
        })
        .catch((error) => {
          toast({
            title: "❌ Error",
            description: "Hubo un problema al subir las imágenes.",
            variant: "destructive",
          });
          console.error("Image conversion error:", error);
        });
      setIsModalOpen(false);
      setPhotoType(null);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutate: registerVehicleMutation } = useApiSend(
    (data: RegisterVehicleRequest, isPending, isSuccess) =>
      registerVehicle(data),
    (response) => {
      toast({
        title: "✅ Publicación creada",
        description: "Tu auto ha sido publicado correctamente.",
      });
      navigate(getCountryPath("/dashboard"));
    },
    (error) => {
      toast({
        title: "❌ Error",
        description: "Hubo un problema al publicar tu vehículo.",
        variant: "destructive",
      });
      console.error("API error:", error);
    }
  );

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const vehicleDTO: VehicleDTO = {
        id: 0, // Will be generated by the backend
        brand: values.brand,
        model: values.model,
        fuel: values.fuel,
        locate: values.locate,
        img: images.length > 0 ? images[0] : "",
        condition: values.condition,
        featured: values.featured,
        year: values.year,
        price: values.price,
        distance: values.distance,
        transmission: values.transmission,
      };

      const requestBody: RegisterVehicleRequest = {
        vehicleDTO,
        images,
      };

      registerVehicleMutation(requestBody);
    } catch (error) {
      toast({
        title: "❌ Error",
        description: "Hubo un problema al publicar tu vehículo.",
        variant: "destructive",
      });
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={toggleMobileMenu} currentCountryCode={countryCode} />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <div className="pt-[80px]">
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
            </CardHeader>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <div className="lg:col-span-1 space-y-8">
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
                />
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
            </div>
            <div className="lg:col-span-2 xl:col-span-3">
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Relevant VehicleDTO Fields */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Datos del Vehículo
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="brand"
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
                                  {mockBrands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.id}>
                                      {brand.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Modelo</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccione el Modelo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {models.map((model) => (
                                    <SelectItem key={model} value={model}>
                                      {model}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="fuel"
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
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="locate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ubicación</FormLabel>
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
                                  {hondurasDepartment.map((dept) => (
                                    <SelectItem
                                      key={dept}
                                      value={dept.toLowerCase()}
                                    >
                                      {dept}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condición</FormLabel>
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
                                  <SelectItem value="New">Nuevo</SelectItem>
                                  <SelectItem value="Used">Usado</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <FormField
                          control={form.control}
                          name="featured"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destacado</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />*/}
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Año</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Ej. 2020"
                                  value={
                                    field.value === null ||
                                    field.value === undefined
                                      ? ""
                                      : field.value
                                  }
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio (L)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="L (total del vehículo)"
                                  value={
                                    field.value === null ||
                                    field.value === undefined
                                      ? ""
                                      : field.value
                                  }
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="distance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kilometraje</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Ej. 85000"
                                  value={
                                    field.value === null ||
                                    field.value === undefined
                                      ? ""
                                      : field.value
                                  }
                                  onChange={(e) =>
                                    field.onChange(
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="transmission"
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
                      </div>
                    </div>

                    {/* Disabled Unused Fields */}
                    <div className="bg-white p-6 rounded-lg shadow-md opacity-50 pointer-events-none">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Campos No Utilizados
                      </h3>
                      <p className="text-sm text-gray-500">
                        Estos campos no se envían al servidor.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="titulo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Título</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej. Toyota Corolla 2020"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="descripcion"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descripción</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Descripción del vehículo"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="estado"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                        <FormField
                          control={form.control}
                          name="publicarInmediatamente"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Publicar Inmediatamente</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="precioNegociable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Precio Negociable</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="specs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Especificaciones</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Especificaciones"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="equipamiento"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Equipamiento</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Equipamiento"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="servicios.opcion1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opción 1</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                  disabled
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op1-no" />
                                    <label htmlFor="op1-no" className="text-sm">
                                      NO
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="si" id="op1-si" />
                                    <label htmlFor="op1-si" className="text-sm">
                                      SÍ
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="servicios.opcion2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opción 2</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                  disabled
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op2-no" />
                                    <label htmlFor="op2-no" className="text-sm">
                                      NO
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
                                      Destacado
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
                                      Súper Destacado
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="servicios.opcion3"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opción 3</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                  disabled
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op3-no" />
                                    <label htmlFor="op3-no" className="text-sm">
                                      NO
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="si" id="op3-si" />
                                    <label htmlFor="op3-si" className="text-sm">
                                      SÍ
                                    </label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="servicios.opcion4"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opción 4</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value ?? "no"}
                                  onValueChange={field.onChange}
                                  disabled
                                >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no" id="op4-no" />
                                    <label htmlFor="op4-no" className="text-sm">
                                      NO
                                    </label>
                                  </div>
                                  {[
                                    "ganga",
                                    "full",
                                    "financ",
                                    "urge",
                                    "km",
                                    "unico",
                                    "parainsc",
                                    "ofertas",
                                    "economico",
                                    "recibo",
                                    "us",
                                    "record",
                                    "impecable",
                                    "garantia",
                                    "edicion",
                                    "vendo",
                                    "llame",
                                    "perfecto",
                                    "tras",
                                    "negociable",
                                  ].map((opt) => (
                                    <div
                                      key={opt}
                                      className="flex items-center gap-2"
                                    >
                                      <RadioGroupItem
                                        value={opt}
                                        id={`op4-${opt}`}
                                      />
                                      <label
                                        htmlFor={`op4-${opt}`}
                                        className="text-sm"
                                      >
                                        {opt}
                                      </label>
                                    </div>
                                  ))}
                                  {[
                                    "ganga-fin-recibo",
                                    "ganga-full",
                                    "ganga-par-impec",
                                    "escucho-muyeco",
                                    "par-econo-recibo",
                                    "recibo-escucho-impec",
                                    "km-impec-econo",
                                    "urge-escucho-ganga",
                                  ].map((opt) => (
                                    <div
                                      key={opt}
                                      className="flex items-center gap-2 col-span-2"
                                    >
                                      <RadioGroupItem
                                        value={opt}
                                        id={`op4-${opt}`}
                                      />
                                      <label
                                        htmlFor={`op4-${opt}`}
                                        className="text-sm"
                                      >
                                        {opt}
                                      </label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="estilo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estilo</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                        <FormField
                          control={form.control}
                          name="numPasajeros"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de pasajeros</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                        <FormField
                          control={form.control}
                          name="colorExterior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color Exterior</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej. Blanco"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="colorInterior"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color Interior</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ej. Negro"
                                  {...field}
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pagoImpuestos"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ya pagó impuestos</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                        <FormField
                          control={form.control}
                          name="recibeVehiculo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Se recibe vehículo</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="numPuertas"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de puertas</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                        <FormField
                          control={form.control}
                          name="provincia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Municipio</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled
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
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Imágenes del Vehículo
                      </h3>
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
                                <Camera className="w-4 h-4" /> Subir Imágenes
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Seleccionar tipo de archivo
                                </DialogTitle>
                              </DialogHeader>
                              <RadioGroup
                                value={photoType || undefined}
                                onValueChange={(v) =>
                                  setPhotoType(v as "normal")
                                }
                                className="space-y-2"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="normal" id="normal" />
                                  <label htmlFor="normal">Imágenes</label>
                                </div>
                              </RadioGroup>
                              {photoType === "normal" && (
                                <div className="mt-4">
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                  />
                                </div>
                              )}
                              <DialogFooter>
                                <Button onClick={() => setIsModalOpen(false)}>
                                  Cerrar
                                </Button>
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
                                  <Button variant="outline">Ver Todas</Button>
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
                                    <DialogTitle>Editar Imágenes</DialogTitle>
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
                                      onChange={handleImageUpload}
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-[#034651] hover:bg-[#045166] text-white flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" /> Publicar
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </div>
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
              />
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
              />
            </div>
          </div>
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
        </main>
      </div>
      <Footer />
    </div>
  );
}
