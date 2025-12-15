
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { ThicknessRiskSimulator, SurvivalAnalysisChart, StudyDemographics } from './components/Diagrams';
import { ArrowDown, Menu, X, FileText, AlertCircle } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-6 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-red-800/30" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-xl text-stone-900 text-center mb-2">{name}</h3>
      <div className="w-12 h-0.5 bg-red-700 mb-3 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const DisclaimerBar = () => (
  <div className="bg-stone-100 border-b border-stone-200 text-[10px] md:text-xs text-stone-600 py-2 px-4 text-center leading-tight">
    <div className="container mx-auto flex items-start justify-center gap-2">
      <AlertCircle size={14} className="mt-0.5 flex-shrink-0 text-red-700" />
      <p>
        <strong>Disclaimer:</strong> Die hier bereitgestellten Zusammenfassungen der Publikation wurden unter Verwendung eigener Darstellungen sowie teilweise mithilfe künstlicher Intelligenz erstellt. Trotz größtmöglicher Sorgfalt kann keine Gewähr für die inhaltliche Richtigkeit, Vollständigkeit oder Aktualität übernommen werden. Verbindlich sind ausschließlich die Originalpublikationen sowie deren Quellenangaben. Jegliche Haftung für Schäden oder Nachteile, die aus der Nutzung dieser Zusammenfassungen entstehen könnten, ist ausgeschlossen.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-red-900 selection:text-white font-sans">
      
      <DisclaimerBar />

      {/* Navigation */}
      <nav className={`fixed top-[auto] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-sm py-2 top-0' : 'bg-transparent py-6 top-12'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="https://www.vita-zahnfabrik.com/portal/pics/layout/vita/vita-flag.png" 
              alt="VITA Logo" 
              className="h-10 md:h-12 object-contain"
            />
            <div className={`hidden md:flex flex-col ${scrolled ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
               <span className="font-serif font-bold text-sm tracking-wide text-stone-900">RESEARCH REVIEW</span>
               <span className="text-[10px] text-stone-500 uppercase tracking-widest">Dental Materials 2025</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-red-700 transition-colors cursor-pointer uppercase text-xs font-bold">Die Studie</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-red-700 transition-colors cursor-pointer uppercase text-xs font-bold">Ergebnisse</a>
            <a href="#clinical" onClick={scrollToSection('clinical')} className="hover:text-red-700 transition-colors cursor-pointer uppercase text-xs font-bold">Klinische Relevanz</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-red-700 transition-colors cursor-pointer uppercase text-xs font-bold">Autoren</a>
            <a 
              href="https://doi.org/10.1016/j.dental.2024.12.016" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-red-800 transition-colors shadow-sm cursor-pointer text-xs font-bold"
            >
              Original Paper
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#intro" onClick={scrollToSection('intro')} className="hover:text-red-700 transition-colors cursor-pointer">Die Studie</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-red-700 transition-colors cursor-pointer">Ergebnisse</a>
            <a href="#clinical" onClick={scrollToSection('clinical')} className="hover:text-red-700 transition-colors cursor-pointer">Klinische Relevanz</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-red-700 transition-colors cursor-pointer">Autoren</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroScene />
        
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.85)_0%,rgba(249,248,244,0.5)_60%,rgba(249,248,244,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center mt-8">
          <div className="inline-block mb-6 px-4 py-1.5 border border-red-800/30 text-red-900 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/40 shadow-sm">
            Dental Materials • 2025
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6 text-stone-900 drop-shadow-sm max-w-5xl mx-auto">
            Die One-Step No-Prep Technik <br/>
            <span className="font-light italic text-stone-600 text-2xl md:text-4xl block mt-4">
              9-Jahres-Ergebnisse mit PICN CAD-CAM Restaurationen
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-stone-700 font-light leading-relaxed mb-10">
            Eine prospektive und retrospektive klinische Studie zur minimalinvasiven Gesamtrehabilitation des abgenutzten Gebisses (Tooth Wear) mit Polymer-infiltrierter Keramik.
          </p>
          
          <div className="flex justify-center gap-4">
             <a href="#intro" onClick={scrollToSection('intro')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span className="uppercase tracking-widest text-xs">Studie entdecken</span>
                <span className="p-3 border border-stone-300 rounded-full group-hover:border-red-700 group-hover:text-red-700 transition-all bg-white/50 shadow-sm">
                    <ArrowDown size={18} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="intro" className="py-24 bg-white relative">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-red-700 uppercase">Hintergrund</div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight text-stone-900">Das Problem: Tooth Wear</h2>
              <div className="w-16 h-1 bg-red-700 mb-6"></div>
              <p className="text-sm text-stone-500 italic">
                Zahnverschleiß (Erosion, Attrition) nimmt besonders bei jungen Patienten zu, bedingt durch Lebensstil, säurehaltige Ernährung und Bruxismus.
              </p>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-stone-300">D</span>ie Rehabilitation von Patienten mit schwerem Zahnverschleiß (Tooth Wear) stellt eine große Herausforderung dar. Herkömmliche Methoden erfordern oft invasive Präparationen.
              </p>
              <p>
                Die von Prof. Mainjot eingeführte <strong>"One-Step No-Prep" Technik</strong> nutzt Polymer-infiltrierte Keramik-Netzwerke (PICN, z.B. Vita Enamic), um verlorene Zahnsubstanz minimalinvasiv zu ersetzen. Diese Studie präsentiert Langzeitergebnisse von bis zu 9 Jahren und bestätigt die Eignung des Materials für extrem dünne Schichtstärken ohne Präparation der Zahnsubstanz.
              </p>
            </div>
          </div>
        </section>

        {/* Study Design Visualization */}
        <section className="py-20 bg-stone-50 border-t border-stone-200">
          <div className="container mx-auto px-6">
             <div className="text-center mb-12">
                <h2 className="font-serif text-3xl text-stone-900 mb-4">Studiendesign & Kohorte</h2>
                <p className="text-stone-500">Untersuchungszeitraum: 2014 - 2023</p>
             </div>
             <StudyDemographics />
          </div>
        </section>

        {/* The Science: Material */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-blue-900 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-red-900 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                     <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            Das Material
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">PICN: Hybrid-Keramik</h2>
                        <p className="text-lg text-stone-300 mb-6 leading-relaxed">
                            PICN (Polymer-Infiltrated Ceramic Network) besteht aus einem porösen Keramikgerüst (86 Gew.-%), das mit Polymer (14 Gew.-%) infiltriert ist.
                        </p>
                        <ul className="space-y-4 text-stone-400">
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                            <span><strong>Elastizitätsmodul:</strong> Ähnlich dem von Dentin (ca. 30 GPa), erlaubt Verformung unter Last und Stressabsorption.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                            <span><strong>Verarbeitung:</strong> Fräsbar zu extrem dünnen Schichtstärken ("Auslaufende Ränder") ohne Chipping während der Herstellung.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                            <span><strong>Klebverbund:</strong> Exzellente Haftwerte mit Komposit-Zement.</span>
                          </li>
                        </ul>
                     </div>
                </div>
            </div>
        </section>

        {/* Results: Survival */}
        <section id="results" className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-red-700 uppercase">Ergebnisse</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Überlebensraten</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                       Trotz extremer Bedingungen (Bruxismus, dünne Schichtstärken) zeigte die Studie exzellente Langzeitergebnisse.
                       Die Kaplan-Meier Überlebensrate lag nach 9 Jahren bei 98,4%.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <SurvivalAnalysisChart />
                </div>
            </div>
        </section>

        {/* Clinical Relevance: Thickness */}
        <section id="clinical" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Klinische Implikation</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Der Risikofaktor: Schichtstärke</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Die Cox-Regressionsanalyse identifizierte eine kritische Schwelle. Restaurationen sollten im Seitenzahnbereich, insbesondere an okklusalen Kontaktpunkten, eine Mindeststärke nicht unterschreiten.
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        Minor Chipping (kleine Absplitterungen) war die häufigste Komplikation, oft wenn die Ränder zu dünn ausgearbeitet waren. Diese konnten jedoch meist einfach poliert werden.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-red-800">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Jeder Zuwachs von 0,1 mm in der Dicke reduziert das Ausfallrisiko um 23%."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Oudkerk et al., 2025</span>
                    </div>
                </div>
                <div>
                    <ThicknessRiskSimulator />
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">Forschungsteam</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Autoren der Studie</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Dental Biomaterials Research Unit (d-BRU), Universität Lüttich (ULiège), Belgien.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap">
                    <AuthorCard 
                        name="Julie Oudkerk" 
                        role="Hauptautorin" 
                        delay="0s" 
                    />
                    <AuthorCard 
                        name="Prof. Amélie Mainjot" 
                        role="Studienleitung & Konzept" 
                        delay="0.1s" 
                    />
                    <AuthorCard 
                        name="Christelle Sanchez" 
                        role="Co-Autorin" 
                        delay="0.2s" 
                    />
                     <AuthorCard 
                        name="Alain Vanheusden" 
                        role="Co-Autor" 
                        delay="0.3s" 
                    />
                </div>
                <div className="text-center mt-12 text-sm text-stone-500">
                    <p>Veröffentlicht in <em>Dental Materials</em>, 2025.</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">VITA Enamic Research</div>
                <p className="text-sm max-w-md">Visualisierung der Studienergebnisse: "The One-step No-prep technique for non-invasive full-mouth rehabilitation..."</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
               <img src="https://www.vita-zahnfabrik.com/portal/pics/layout/vita/vita-flag.png" alt="VITA" className="h-8 opacity-80 mb-4 grayscale hover:grayscale-0 transition-all" />
               <p className="text-xs">© 2025 Visualisierung basierend auf Open Access Daten.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
