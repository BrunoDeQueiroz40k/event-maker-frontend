export function Header() {
   return (
     <header className="border-b-2 border-primary/30 bg-card">
       <div className="container mx-auto px-4 py-3">
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-primary/20 border-2 border-primary flex items-center justify-center">
               <svg
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="2"
                 className="w-5 h-5 text-primary"
               >
                 <path d="M12 2L2 7l10 5 10-5-10-5z" />
                 <path d="M2 17l10 5 10-5" />
                 <path d="M2 12l10 5 10-5" />
               </svg>
             </div>
             <div>
               <h1 className="text-base font-bold text-primary font-mono tracking-wider">
                 {"WARHAMMER 40K BRASIL - CALENDÁRIO DE EVENTOS"}
               </h1>
               <p className="text-[10px] text-muted-foreground font-mono tracking-wide">
                 {"VRCHAT CRIADOR DE EVENTOS"}
               </p>
             </div>
           </div>
           <div className="text-right">
             <p className="text-[10px] text-muted-foreground font-mono">{"CLEARANCE: OMEGA"}</p>
             <p className="text-[10px] text-primary font-mono">{"STATUS: OPERATIONAL"}</p>
           </div>
         </div>
       </div>
     </header>
   )
 }
 