import { Clock, Flame } from "lucide-react";

export const UrgencyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-20"></div>

      <div className="container mx-auto flex items-center justify-center gap-3 relative z-10">
        <Flame className="w-5 h-5 animate-pulse" />
        <p className="font-bold text-sm md:text-base">
          🔥 OFERTA ESPECIAL: <span className="underline">Instalação Grátis</span> para os próximos 10 clientes!
        </p>
        <Clock className="w-5 h-5 animate-pulse" />
      </div>
    </div>
  );
};
