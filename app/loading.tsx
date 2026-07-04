import Image from "next/image";

const BASE_PATH = "/covaitechpark";
const prefix = (url: string) => `${BASE_PATH}${url}`;

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-pulse">
        {/* Logo Placeholder */}
        <div className="w-48 h-16 relative">
          <Image
            src={prefix("/covai-tech-park-logo.png")}
            alt="CovaiTech Park Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Loading Spinner / Bar */}
        <div className="w-full space-y-4">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-orange w-1/2 rounded-full animate-[progress_1.5s_ease-in-out_infinite_alternate]"></div>
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
}
