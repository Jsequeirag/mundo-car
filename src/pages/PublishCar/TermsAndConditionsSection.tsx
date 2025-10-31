import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, FileText, CheckCircle2 } from "lucide-react";
import ModalContainer from "@/components/ModalContainer";

interface TermsAndConditionsSectionProps {
  termsText: string;
  onContinue?: () => void;
}

const TermsAndConditionsSection: React.FC<TermsAndConditionsSectionProps> = ({
  termsText,
  onContinue,
}) => {
  const [accepted, setAccepted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpenedTerms, setHasOpenedTerms] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setHasOpenedTerms(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleContinue = () => {
    if (!accepted) {
      setShowNotice(true);
      return;
    }
    if (onContinue) onContinue();
    else alert("✅ Publicación completada correctamente.");
  };

  return (
    <div className="w-full mt-10 bg-brand-form text-text-main rounded-3xl p-8 text-center border border-brand-primary/10 shadow-md mx-auto max-w-[1200px] transition-all duration-300">
      {/* 🔹 Título y explicación */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="text-brand-primary h-6 w-6" />
          <h3 className="text-xl font-semibold text-brand-primary">
            Lea los Términos y Condiciones
          </h3>
        </div>
        <p className="text-text-secondary text-sm max-w-xl">
          Antes de continuar con la publicación, es importante que revise las
          condiciones de uso. Presione el botón a continuación para verlas:
        </p>

        {/* 🔘 Botón para abrir modal */}
        <button
          onClick={openModal}
          className="mt-3 px-6 py-2 rounded-lg bg-brand-primary text-white font-semibold shadow hover:bg-brand-hover transition-all"
        >
          Presione para ver las Condiciones
        </button>
      </div>

      {/* ✅ Checkbox */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-center mt-6">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => {
            setAccepted(e.target.checked);
            setShowNotice(false);
          }}
          className="w-5 h-5 accent-brand-primary mt-1 cursor-pointer"
        />
        <p className="text-sm sm:text-base text-text-main leading-relaxed text-left max-w-3xl">
          Confirmo que he leído y acepto los Términos y Condiciones para la
          publicación de este anuncio en{" "}
          <span className="text-brand-primary font-semibold">MundoCar</span>.
        </p>
      </div>

      {/* ⚠️ Aviso si no acepta */}
      {showNotice && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-500 font-medium text-sm">
          <Info className="h-4 w-4" />
          <span>
            Debes aceptar los Términos y Condiciones antes de continuar.
          </span>
        </div>
      )}

      {/* 🧩 Estado visual de lectura */}
      {hasOpenedTerms && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
          <CheckCircle2 className="h-5 w-5" />
          <span>Has revisado los Términos y Condiciones</span>
        </div>
      )}

      {/* 💬 Nota final */}
      <p className="mt-6 text-text-secondary text-sm font-medium">
        Por favor oprima el botón{" "}
        <span className="text-brand-primary font-semibold">CONTINUAR</span> una
        sola vez después de aceptar los términos.
      </p>

      {/* 🟢 Botón continuar */}
      <div className="mt-5">
        <Button
          onClick={handleContinue}
          disabled={!accepted}
          className={`px-8 py-2 font-semibold rounded-lg text-white shadow-md transition-all ${
            accepted
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continuar
        </Button>
      </div>

      {/* 🪟 ModalContainer con texto dinámico */}
      <ModalContainer
        isOpen={isModalOpen}
        onClose={closeModal}
        showCloseButton
        width="45rem"
        maxWidth="95%"
        title="Términos y Condiciones de Uso"
      >
        <div className="p-6 text-text-main max-h-[70vh] overflow-y-auto text-justify leading-relaxed bg-brand-card rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-brand-primary text-center mb-2">
            TÉRMINOS Y CONDICIONES PARA LA PUBLICACIÓN DE ANUNCIOS EN
            MUNDOCAR.COM
          </h2>

          <p className="text-text-secondary text-sm">
            Toda la negociación entre vendedores y compradores de vehículos
            publicitados en este portal son de responsabilidad entre las partes,
            <span className="font-semibold text-brand-primary">
              {" "}
              MUNDOCAR.COM{" "}
            </span>
            no es responsable de ningún incumplimiento, malentendido o disputa
            entre los mismos. MUNDOCAR.COM es solamente una plataforma de
            anuncios en la cual se muestran vehículos de diferentes tipos y
            propietarios, por lo que sus servicios se limitan exclusivamente a
            la promoción de vehículos a través de sus mecanismos de márqueting.
          </p>

          <h3 className="text-lg font-semibold text-brand-primary mt-6 mb-2">
            TÉRMINOS Y CONDICIONES
          </h3>

          <ul className="list-disc pl-5 text-sm text-text-secondary space-y-2">
            <li>
              Solamente se permite anunciar vehículos que ya se encuentren en
              territorio costarricense, sean nuevos o usados.
            </li>
            <li>
              No se permite anunciar vehículos para repuestos, chocados,
              motores, carrocerías, chasís, etc.
            </li>
            <li>
              No se permite vehículos como: cuadriciclos, contenedores,
              go-carts, mulas, juguetes, tráiler, tractores, plataformas,
              carretas, casas de remolque, motos, maquinaria, equipo especial,
              carritos de golf, etc.
            </li>
            <li>
              Los anuncios deberán contener toda la información requerida, la
              cual deberá ser veraz. MUNDOCAR.COM no se hace responsable por
              información errónea ingresada por el anunciante.
            </li>
            <li>
              El tiempo de permanencia de un anuncio DELUXE y SUPER DELUXE en la
              página principal depende de la cantidad de anuncios de ese tipo
              publicados en el período; no se garantiza un tiempo específico de
              exposición.
            </li>
            <li>
              Un anuncio mantendrá la opción DELUXE o SUPER DELUXE hasta que
              venza o sea marcado como vendido.
            </li>
            <li>
              Un anuncio con la opción SUPER DELUXE será posteado en el muro de
              Facebook, Instagram y TikTok de MUNDOCAR.COM, aproximadamente 30
              minutos después de subir las fotografías.
            </li>
            <li>
              Cualquier vehículo vendido debe ser eliminado o marcado como
              VENDIDO por quien lo publicó.
            </li>
            <li>
              La vigencia de los planes para los anunciantes es de 1 mes. Si el
              anunciante desea renovar, podrá hacerlo desde su cuenta con la
              misma información previa.
            </li>
            <li>
              El precio de venta debe ingresarse en colones o dólares y debe
              reflejar el valor total del vehículo, incluyendo impuestos,
              financiamiento o deudas. Se permite indicar el precio antes de
              impuestos solo si se selecciona la opción correspondiente.
            </li>
            <li>
              No se permite incluir fotos o videos que no correspondan al
              vehículo en venta. Todas las imágenes deben ser propias y mostrar
              el vehículo real.
            </li>
            <li>
              Solo se permite publicar anuncios para la venta directa de
              vehículos. No se permiten anuncios de compra, remate, subasta ni
              métodos alternos.
            </li>
            <li>
              MUNDOCAR.COM se reserva el derecho de eliminar cualquier anuncio
              que considere contrario a sus políticas o perjudicial para la
              imagen del sitio, sin responsabilidad ni reembolso.
            </li>
            <li>
              Cualquier usuario que no cumpla con estos términos podrá ser
              bloqueado para futuras publicaciones. Al publicar acepta recibir
              correos informativos o publicitarios de MUNDOCAR.COM.
            </li>
            <li>
              MUNDOCAR.COM se reserva el derecho de eliminar sin reembolso
              cualquier anuncio que considere riesgoso o dañino, aunque no viole
              ninguna otra condición aquí descrita.
            </li>
            <li>
              El anunciante es responsable de la veracidad de la información y
              deberá responder ante cualquier reclamo de un comprador.
            </li>
            <li>
              Al publicar un anuncio en MUNDOCAR.COM usted acepta ser
              contactado(a) por MUNDOCAR.COM o sus afiliados, por teléfono o
              correo electrónico.
            </li>
          </ul>

          <p className="text-sm text-text-secondary mt-4">
            Cualquier anuncio que no cumpla con estos Términos y Condiciones de
            Uso será eliminado y no se reembolsará ningún monto pagado. Si tiene
            dudas sobre la publicación o los planes disponibles, contáctenos al{" "}
            <span className="font-semibold text-brand-primary">7078-7117</span>{" "}
            antes de publicar o realizar un pago.
          </p>

          <p className="text-sm text-text-secondary italic mt-3">
            Estos Términos y Condiciones pueden modificarse en cualquier momento
            sin previo aviso. Le recomendamos revisarlos antes de publicar.
          </p>
        </div>
      </ModalContainer>
    </div>
  );
};

export default TermsAndConditionsSection;
