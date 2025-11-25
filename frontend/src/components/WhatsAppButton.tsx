import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Número do WhatsApp (formato: 5511999999999)
  // Substitua pelo número real da empresa
  const phoneNumber = "5511999999999";
  const message = encodeURIComponent(
    "Olá! Vi o site e gostaria de mais informações sobre energia solar."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <>
      {/* Tooltip/Balão de mensagem */}
      {showTooltip && !isHovered && (
        <div className="fixed bottom-28 right-6 z-[9999] animate-bounce">
          <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-[280px] border-2 border-primary/20">
            {/* Botão de fechar */}
            <button
              onClick={handleCloseTooltip}
              className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Conteúdo */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">
                  Precisa de ajuda?
                </p>
                <p className="text-sm text-gray-600">
                  Fale com um especialista agora! 💬
                </p>
              </div>
            </div>

            {/* Triângulo do balão */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
            </div>
          </div>
        </div>
      )}

      {/* Botão Flutuante do WhatsApp */}
      <Button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />

        {/* Efeito de pulso */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
      </Button>

      {/* Label que aparece no hover */}
      {isHovered && (
        <div className="fixed bottom-6 right-24 z-[9999] bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap animate-fade-in">
          <span className="font-semibold">Fale com um especialista</span>
          {/* Triângulo apontando para o botão */}
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900"></div>
          </div>
        </div>
      )}
    </>
  );
};
