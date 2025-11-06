import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info, FileText, CheckCircle2 } from "lucide-react";
import ModalContainer from "@/components/Modals/ModalContainer";

interface TermsAndConditionsSectionProps {
  onContinue?: () => void;
}

const TermsAndConditionsSection: React.FC<TermsAndConditionsSectionProps> = ({
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
      {/* 🔹 Encabezado */}
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

      {showNotice && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-500 font-medium text-sm">
          <Info className="h-4 w-4" />
          <span>
            Debes aceptar los Términos y Condiciones antes de continuar.
          </span>
        </div>
      )}

      {hasOpenedTerms && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
          <CheckCircle2 className="h-5 w-5" />
          <span>Has revisado los Términos y Condiciones</span>
        </div>
      )}

      <p className="mt-6 text-text-secondary text-sm font-medium">
        Por favor oprima el botón{" "}
        <span className="text-brand-primary font-semibold">CONTINUAR</span> una
        sola vez después de aceptar los términos.
      </p>

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

      {/* 🪟 Modal */}
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

          <h3 className="text-lg font-semibold text-brand-primary mt-6 mb-2">
            TÉRMINOS Y CONDICIONES
          </h3>

          <ol className="list-decimal pl-6 text-sm text-text-secondary space-y-3">
            <li>
              Solamente se permite anunciar vehículos que ya se encuentren en
              territorio costarricense, ya que sean nuevos o usados.
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
              Los anuncios deberán contener TODA la información requerida; la
              misma deberá ser fehaciente y verdadera. MUNDOCAR.COM no se hace
              responsable por cualquier información errónea que el anunciante
              haya ingresado.
            </li>
            <li>
              El tiempo de permanencia de un anuncio DELUXE y SUPER DELUXE en la
              página principal depende de la cantidad de anuncios DELUXE y SUPER
              DELUXE que ingresen en determinado período de tiempo, por lo cual
              no se garantiza ningún tiempo específico de exposición en esa
              posición.
            </li>
            <li>
              Un anuncio mantendrá la opción de DELUXE o SUPER DELUXE hasta que
              el mismo venza o sea marcado como vendido.
            </li>
            <li>
              Un anuncio con la opción de SUPER DELUXE será posteado en el muro
              de Facebook e Instagram de MUNDOCAR.COM, aproximadamente 30
              minutos después de que el usuario suba las fotografías del mismo.
            </li>
            {/* 🔹 Eliminado el punto 8 */}
            <li>
              La vigencia de los planes para los anunciantes es de 1 mes. Si el
              anunciante desea publicarse nuevamente, su información estará
              disponible en su cuenta y podrá activarlo en la misma si desea
              contratar 1 mes adicional.
            </li>
            <li>
              El precio de venta debe ser ingresado en colones o dólares y debe
              ser del precio TOTAL del vehículo; no puede ser una prima o un
              valor inferior al precio real de venta que tendrá que pagar el
              comprador por el vehículo, incluyendo cualquier deuda o
              financiamiento pendiente, aunque se agreguen comentarios
              adicionales.
            </li>
            <li>
              Se permite ingresar el precio del vehículo antes de pagar
              impuestos siempre y cuando se seleccione el botón que indica que
              el vehículo aún NO ha pagado dichos impuestos.
            </li>
            <li>
              No se permite incluir fotos o videos en ningún anuncio que no
              correspondan a las del vehículo que está siendo anunciado para la
              venta. Además, TODAS las fotos o videos deben mostrar alguna parte
              del vehículo, y TODAS las fotos o videos deben ser propias y no de
              terceros.
            </li>
            <li>
              Solamente se permite publicar anuncios para la VENTA DIRECTA de
              vehículos. No se permite publicar anuncios para la COMPRA de un
              vehículo, ni vehículos en REMATE, SUBASTA, o cualquier otro método
              que no sea una venta directa entre vendedor y comprador.
            </li>
            <li>
              MUNDOCAR.COM se reserva el derecho de eliminar CUALQUIER anuncio
              que considere va en contra de sus políticas o pueda ser
              perjudicial para la imagen del sitio, sin responsabilidad de su
              parte y sin reembolso de efectivo.
            </li>
            <li>
              Cualquier usuario que no cumpla con los Términos y Condiciones
              aquí descritos podrá ser bloqueado de publicar anuncios en el
              futuro.
            </li>
            <li>
              MUNDOCAR.COM se reserva el derecho de eliminar sin reembolso
              cualquier anuncio que considere va en contra de su imagen, la
              seguridad de sus usuarios o el funcionamiento normal del sitio,
              aunque éste no incumpla con ninguna de las otras condiciones aquí
              descritas.
            </li>
            <li>
              Al anunciar un vehículo en MUNDOCAR.COM, el anunciante es el
              responsable de que toda la información esté correcta y deberá
              responder ante cualquier reclamo de un comprador.
            </li>
            <li>
              Al publicar un anuncio en MUNDOCAR.COM usted acepta ser
              contactado(a) por MUNDOCAR.COM o cualquiera de sus afiliados, ya
              sea a su número de teléfono o su dirección de correo electrónico.
            </li>
          </ol>
        </div>

        <div className="flex justify-center mt-6 mb-3">
          <button
            onClick={() => {
              setHasOpenedTerms(true);
              setIsModalOpen(false);
            }}
            className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-hover transition-all"
          >
            Cerrar
          </button>
        </div>
      </ModalContainer>
    </div>
  );
};

export default TermsAndConditionsSection;
