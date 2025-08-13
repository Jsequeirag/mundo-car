import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, Link } from "react-router-dom";

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
import { X } from "lucide-react";

// Mock API data (replace with actual CarsXE API calls in production)
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

// Validación con Zod
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
    // Imágenes no se validan en Zod ya que se manejan en estado local
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

  const getCountryPath = (path: string) => {
    const { countryCode } = useParams<{ countryCode?: string }>();
    if (!countryCode || path === "/") {
      return path;
    }
    if (path.startsWith("/")) {
      return `/${countryCode}${path}`;
    }
    return `/${countryCode}/${path}`;
  };
  const [brands, setBrands] = useState(mockBrands);
  const [models, setModels] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]); // URLs de previsualización
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoType, setPhotoType] = useState<"normal" | "personalizada" | null>(
    null
  );
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      precio: "",
      marca: "",
      modelo: "",
      modeloPersonalizado: "",
      tipo: "usado",
      estado: undefined,
      ubicacion: "",
      publicarInmediatamente: true,
      precioNegociable: false,
    },
  });

  const tipo = form.watch("tipo");
  const marca = form.watch("marca");
  const modelo = form.watch("modelo");

  // Simulate fetching brands
  useEffect(() => {
    setBrands(mockBrands);
  }, []);

  // Fetch models when brand changes
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

  const onSubmit = (values: z.infer<typeof schema>) => {
    // Aquí iría la lógica para enviar las imágenes al backend
    console.log(values, images);
    toast({
      title: "✅ Publicación creada",
      description: "Tu auto ha sido publicado correctamente.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado visual */}
      <div className="relative bg-gray-900 text-white py-12 md:py-16 flex flex-col items-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/mundo/publishImage.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>{" "}
          {/* Overlay for text readability */}
        </div>

        {/* Content */}
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
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Comienza Ahora
          </button>
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div className="container mx-auto py-10 px-4">
        <Link to={`${getCountryPath("inicio")}`}>
          <button className="mb-6 px-4 py-2 bg-[#034651] text-white rounded-md hover:bg-[#023a44] transition-colors duration-300 flex items-center gap-2">
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
            Atrás
          </button>
        </Link>
        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#034651]">
              Detalles del anuncio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* ... Campos existentes ... */}
                {/* Título */}
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del anuncio</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Toyota Corolla 2020 impecable"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Descripción */}
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Especifica detalles importantes..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Precio */}
                <FormField
                  control={form.control}
                  name="precio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="₡" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Precio Negociable */}
                <FormField
                  control={form.control}
                  name="precioNegociable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Precio negociable</FormLabel>
                        <p className="text-sm text-gray-500">
                          Indica si el precio es negociable con el comprador.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

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
                            <SelectValue placeholder="Selecciona una marca" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands.map((brand) => (
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

                {/* Modelo */}
                <FormField
                  control={form.control}
                  name="modelo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!marca}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un modelo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {models.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model === "other" ? "Otro" : model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Modelo Personalizado */}
                {modelo === "other" && (
                  <FormField
                    control={form.control}
                    name="modeloPersonalizado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo personalizado</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa el modelo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Tipo */}
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="nuevo" />
                          </FormControl>
                          <FormLabel className="font-normal">Nuevo</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="usado" />
                          </FormControl>
                          <FormLabel className="font-normal">Usado</FormLabel>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estado (Condicional) */}
                {tipo === "usado" && (
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado del vehículo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="excelente">Excelente</SelectItem>
                            <SelectItem value="bueno">Bueno</SelectItem>
                            <SelectItem value="regular">Regular</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Ubicación */}
                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicación</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. San José, Costa Rica"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sección de Imágenes */}
                <FormItem>
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
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                            +{images.length - 1}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex space-x-4">
                      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Subir Imágenes</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Seleccionar tipo de foto</DialogTitle>
                          </DialogHeader>
                          <Alert variant="warning" className="mb-4">
                            <AlertTitle>En desarrollo</AlertTitle>
                            <AlertDescription>
                              Esta funcionalidad está en desarrollo.
                            </AlertDescription>
                          </Alert>
                          <RadioGroup
                            value={photoType || undefined}
                            onValueChange={(value) =>
                              setPhotoType(value as "normal" | "personalizada")
                            }
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="normal" id="normal" />
                              <label htmlFor="normal">Normal</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="personalizada"
                                id="personalizada"
                              />
                              <label htmlFor="personalizada">
                                Personalizada
                              </label>
                            </div>
                          </RadioGroup>
                          {photoType && (
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
                              Cancelar
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
                                <DialogTitle>Todas las Imágenes</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-3 gap-4">
                                {images.map((img, index) => (
                                  <img
                                    key={index}
                                    src={img}
                                    alt={`Imagen ${index + 1}`}
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
                                      onClick={() => handleDeleteImage(index)}
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
                </FormItem>

                {/* Publicar inmediatamente */}
                <FormField
                  control={form.control}
                  name="publicarInmediatamente"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Publicar inmediatamente</FormLabel>
                        <p className="text-sm text-gray-500">
                          Si está desactivado, se guardará como borrador.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Botón */}
                <Button
                  type="submit"
                  className="w-full bg-[#034651] hover:bg-[#045166] text-white"
                >
                  Publicar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
