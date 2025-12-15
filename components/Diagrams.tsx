
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, ShieldCheck, AlertTriangle, Layers, Users } from 'lucide-react';

// --- THICKNESS RISK SIMULATOR ---
export const ThicknessRiskSimulator: React.FC = () => {
  const [thickness, setThickness] = useState(0.8); // mm
  const threshold = 0.6; // 0.56mm in paper, rounded for UI

  // Paper states: Increase in 0.1mm reduces failure risk by 23%.
  // We model risk arbitrarily normalized around 1.0 at 0.56mm.
  // Formula approximation: Risk ~ (0.56 / thickness)^2.5
  
  const calculateRisk = (t: number) => {
     if (t >= threshold) return "Niedrig";
     if (t >= 0.4) return "Moderat";
     return "Hoch";
  };

  const riskLevel = calculateRisk(thickness);
  
  // Calculate a visual percentage for the bar
  const riskValue = Math.min(100, Math.max(5, Math.pow(0.56 / thickness, 3) * 50));
  
  return (
    <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg border border-stone-200 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="text-stone-400" size={20} />
        <h3 className="font-serif text-xl text-stone-800">Interaktiv: Schichtstärke & Risiko</h3>
      </div>
      
      <p className="text-sm text-stone-500 mb-8 leading-relaxed">
        Simulieren Sie den Einfluss der Restaurationsdicke auf das Frakturrisiko (insb. bei Molaren). Die Studie zeigt einen kritischen Schwellenwert bei ca. 0,6 mm.
      </p>

      {/* Visualization Area */}
      <div className="relative h-48 bg-stone-100 rounded-lg border border-stone-200 mb-8 flex items-end justify-center overflow-hidden">
         {/* Tooth Base */}
         <div className="w-32 h-16 bg-stone-300 rounded-t-sm absolute bottom-0"></div>
         
         {/* Restoration Layer */}
         <motion.div 
            className={`w-32 absolute bottom-16 rounded-t-md border-t border-x transition-colors duration-300 ${riskLevel === 'Hoch' ? 'bg-red-200 border-red-300' : riskLevel === 'Moderat' ? 'bg-yellow-100 border-yellow-200' : 'bg-blue-100 border-blue-200'}`}
            animate={{ height: thickness * 40 }} // Visual scale
         >
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-stone-600 opacity-60">
                PICN
            </div>
         </motion.div>

         {/* Force Arrow */}
         <div className="absolute top-4 flex flex-col items-center animate-bounce opacity-20">
            <span className="text-[10px] uppercase font-bold text-stone-500">Kau-Kraft</span>
            <ArrowDownFilled />
         </div>

         {/* Grid lines for measurement */}
         <div className="absolute right-4 top-0 bottom-0 flex flex-col justify-end text-[9px] text-stone-400 font-mono py-16 gap-[18px]">
            <span>1.0mm</span>
            <span>0.5mm</span>
         </div>
      </div>

      {/* Controls */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold text-stone-500 uppercase mb-2">
            <span>Dicke: {thickness.toFixed(2)} mm</span>
            <span className={`${riskLevel === 'Hoch' ? 'text-red-600' : riskLevel === 'Moderat' ? 'text-yellow-600' : 'text-green-600'}`}>
                Risiko: {riskLevel}
            </span>
        </div>
        <input 
            type="range" 
            min="0.3" 
            max="1.5" 
            step="0.1" 
            value={thickness} 
            onChange={(e) => setThickness(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-800"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>0.3 mm</span>
            <span>0.6 mm (Threshold)</span>
            <span>1.5 mm</span>
        </div>
      </div>

      <div className={`p-4 rounded-lg border text-sm ${riskLevel === 'Hoch' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-stone-50 border-stone-200 text-stone-600'}`}>
         {riskLevel === 'Hoch' 
            ? <div className="flex gap-2"><AlertTriangle size={16}/> <span><strong>Warnung:</strong> Unter 0,56 mm steigt das Frakturrisiko signifikant an.</span></div>
            : <div className="flex gap-2"><ShieldCheck size={16}/> <span><strong>Sicherer Bereich:</strong> Über 0,6 mm zeigte die Studie exzellente Überlebensraten (94% frakturfrei nach 7 Jahren).</span></div>
         }
      </div>
    </div>
  );
};

// --- SURVIVAL CHART ---
export const SurvivalAnalysisChart: React.FC = () => {
    // Data from Table 2 in paper
    // Year 1 to 9
    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const survivalRate = [100, 100, 99.8, 99.4, 99.4, 99.4, 99.4, 98.4, 98.4];
    const successRate2 = [99.6, 98.6, 97.2, 96.3, 95.1, 94.0, 90.1, 86.7, 86.7]; // Excluding minor polishable chips

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-200 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="font-serif text-2xl text-stone-900">Langzeit-Überleben (Kaplan-Meier)</h3>
                    <p className="text-sm text-stone-500">Vergleich: Survival vs. Success (ohne minor Chipping)</p>
                </div>
                <div className="flex gap-4 text-xs font-bold uppercase">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-sm"></div> Survival (98.4%)
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-sm"></div> Success (86.7%)
                    </div>
                </div>
            </div>
            
            <div className="relative h-64 md:h-80 w-full flex items-end justify-between px-2 md:px-6 pb-6 border-b border-l border-stone-300 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:40px_40px]">
                {years.map((year, i) => (
                    <div 
                        key={year} 
                        className="relative flex flex-col items-center justify-end h-full flex-1 group"
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                         {/* Hover Tooltip */}
                         {hoverIndex === i && (
                             <div className="absolute bottom-full mb-2 bg-stone-900 text-white text-xs p-2 rounded shadow-lg z-10 w-32 text-center pointer-events-none">
                                 <div className="font-bold mb-1">Jahr {year}</div>
                                 <div className="text-blue-200">Survival: {survivalRate[i]}%</div>
                                 <div className="text-red-200">Success: {successRate2[i]}%</div>
                             </div>
                         )}

                         {/* Lines visualization using simplified bars for stability */}
                         <div className="w-2 md:w-4 bg-blue-600 rounded-t-sm transition-all duration-500 relative" style={{ height: `${(survivalRate[i] - 70) * 3}%` }}></div>
                         <div className="w-2 md:w-4 bg-red-400/80 rounded-t-sm absolute bottom-0 transition-all duration-500" style={{ height: `${(successRate2[i] - 70) * 3}%` }}></div>
                         
                         {/* X-Axis Label */}
                         <div className="absolute -bottom-8 text-xs font-mono text-stone-500">{year}J</div>
                    </div>
                ))}

                {/* Y-Axis Labels (Custom scale starts at 70% to emphasize top range) */}
                <div className="absolute -left-12 bottom-0 top-0 flex flex-col justify-between text-xs font-mono text-stone-400 py-0">
                    <span>100%</span>
                    <span>90%</span>
                    <span>80%</span>
                    <span>70%</span>
                </div>
            </div>
            <div className="mt-4 text-center text-xs text-stone-400 italic">
                Hinweis: Skala beginnt bei 70% zur besseren Darstellung der Unterschiede.
            </div>
        </div>
    )
}

// --- DEMOGRAPHICS ---
export const StudyDemographics: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col items-center text-center hover:border-red-200 transition-colors">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-700">
                    <Users size={24} />
                </div>
                <h4 className="font-serif text-3xl text-stone-900 mb-1">24</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Patienten</p>
                <p className="text-sm text-stone-400 mt-2">Durchschnittsalter: 44 Jahre</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col items-center text-center hover:border-red-200 transition-colors">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-700">
                    <Layers size={24} />
                </div>
                <h4 className="font-serif text-3xl text-stone-900 mb-1">580</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Restaurationen</p>
                <p className="text-sm text-stone-400 mt-2">Vita Enamic (Mono & MultiColor)</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex flex-col items-center text-center hover:border-red-200 transition-colors">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-700">
                    <Activity size={24} />
                </div>
                <h4 className="font-serif text-3xl text-stone-900 mb-1">9 Jahre</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Max. Follow-up</p>
                <p className="text-sm text-stone-400 mt-2">Prospektiv & Retrospektiv</p>
            </div>
        </div>
    );
}

const ArrowDownFilled = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-stone-400 mt-1">
        <path d="M12 21l-12-18h24z" />
    </svg>
);
