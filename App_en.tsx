
import React, { useState } from 'react';
import { SCENARIOS, FURNISHING_COST_PER_UNIT, MABAAT_SHARE_PERCENTAGE } from './constants';
import Header from './components/Header';
import { Section } from './components/DashboardComponents';
import { FadeInUp } from './components/AnimatedWrappers';
import { motion, AnimatePresence } from 'framer-motion';
import { BanknotesIcon } from './components/Icons';

const formatCurrency = (value: number) => {
    return `SAR ${Math.round(value).toLocaleString('en-US')}`;
};

type CaseType = 'worst' | 'base' | 'best';
type ModelType = 'singular' | 'divided';

// --- Apple-Style Segmented Control (Universal White Pill) ---
const SegmentedControl: React.FC<{
    name: string;
    options: { value: string | number; label: string; className?: string; activePillClassName?: string; activeTextClassName?: string }[];
    selected: string | number;
    onChange: (value: any) => void;
    dark?: boolean;
    disabled?: boolean;
}> = ({ name, options, selected, onChange, dark = false, disabled = false }) => {
    
    const containerClass = dark ? 'bg-white/10' : 'bg-[#E5E5EA]';
    const defaultActivePillClass = 'bg-white shadow-sm ring-1 ring-black/5';
    const defaultActiveTextClass = 'text-black';
    const defaultInactiveTextClass = dark ? 'text-white/60 hover:text-white' : 'text-[#8E8E93] hover:text-black';

    return (
        <div className={`p-1 rounded-full flex relative w-full sm:w-auto overflow-hidden ${containerClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {options.map((option) => {
                const isActive = selected === option.value;
                const activePillClass = option.activePillClassName || defaultActivePillClass;
                const activeTextClass = option.activeTextClassName || defaultActiveTextClass;

                return (
                    <button
                        key={option.value}
                        onClick={() => !disabled && onChange(option.value)}
                        className={`relative z-10 flex-1 px-3 sm:px-4 py-1.5 sm:py-1.5 text-xs sm:text-sm font-bold transition-colors duration-200 rounded-full whitespace-nowrap ${
                            isActive ? activeTextClass : (option.className || defaultInactiveTextClass)
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`pill-${name}`}
                                className={`absolute inset-0 rounded-full ${activePillClass}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

const DigitalLedger: React.FC<{ 
    revenue: number; 
    items: { category: string; amount: number; color?: string; highlight?: boolean; subValue?: string; subLabel?: string }[];
    unitMetrics: {
        singular: number;
        divided: number;
    };
    activeModel: ModelType;
}> = ({ revenue, items, unitMetrics, activeModel }) => {
    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5 block">Total Annual Revenue</span>
                    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">{formatCurrency(revenue)}</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-medium text-white/40 bg-white/5 px-1.5 py-0.5 rounded">Gross Potential</span>
                </div>
            </div>
            
            <div className="space-y-4">
                {items.map((item, idx) => {
                    const percent = revenue > 0 ? Math.round((item.amount / revenue) * 100) : 0;
                    
                    if (item.highlight) {
                         return (
                            <motion.div 
                                key={idx}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 p-5 sm:p-6 shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <div className="w-16 h-16 bg-emerald-400 rounded-full blur-2xl"></div>
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                             <div className={`w-2 h-2 rounded-full ${item.color || 'bg-white'} shadow-[0_0_8px_currentColor] text-emerald-400`}></div>
                                             <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">{item.category}</span>
                                        </div>
                                        <span className="text-xs font-medium text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">{percent}%</span>
                                    </div>
                                    
                                    <div className="flex flex-col relative z-20">
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="text-3xl sm:text-5xl font-black text-white tracking-tighter tabular-nums text-shadow-sm">{formatCurrency(item.amount)}</span>
                                        </div>
                                        
                                        {/* Dual Metric Display - Always Visible Comparison */}
                                        <div className="mt-6 grid grid-cols-2 gap-3">
                                            <div className={`p-3 rounded-xl border transition-all duration-300 ${activeModel === 'singular' ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10 opacity-60 grayscale'}`}>
                                                <p className="text-[9px] uppercase tracking-wider text-white/60 mb-1">Original (14 Units)</p>
                                                <p className="text-sm sm:text-lg font-bold text-white tabular-nums">SAR {unitMetrics.singular.toLocaleString()}</p>
                                                <p className="text-[9px] text-emerald-400">/ Unit Annually</p>
                                            </div>
                                            <div className={`p-3 rounded-xl border relative overflow-hidden transition-all duration-300 ${activeModel === 'divided' ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/10 opacity-60 grayscale'}`}>
                                                {activeModel === 'divided' && <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/20 rounded-full blur-lg"></div>}
                                                <p className="text-[9px] uppercase tracking-wider text-white/60 mb-1">Proposal (26 Units)</p>
                                                <p className="text-sm sm:text-lg font-bold text-white tabular-nums">SAR {unitMetrics.divided.toLocaleString()}</p>
                                                <p className="text-[9px] text-emerald-400">/ Unit Annually</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar specific to highlight */}
                                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 1.2, ease: "circOut" }}
                                            className={`h-full rounded-full ${item.color || 'bg-white'} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <div key={idx} className="group px-1 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center mb-1.5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ring-1 ring-white/10 ${item.color || 'bg-white'}`}></div>
                                    <span className="text-xs font-medium text-white/70 tracking-wide">{item.category}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-white/90 tabular-nums">{formatCurrency(item.amount)}</span>
                                </div>
                            </div>
                            {/* Apple Health Style Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full ${item.color || 'bg-white'} opacity-60`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const InventoryTable: React.FC<{ inventory: any[], activeCase: CaseType }> = ({ inventory, activeCase }) => {
    
    // Dynamic Class Logic
    const getColumnClass = (colCase: CaseType) => {
        const isActive = activeCase === colCase;
        return `py-3 text-right transition-all duration-300 ${isActive ? 'text-emerald-400 font-bold text-sm sm:text-base' : 'text-white/40 font-medium text-xs sm:text-sm'}`;
    };

    const getHeaderClass = (colCase: CaseType, align: string = "text-right") => {
        const isActive = activeCase === colCase;
        return `pb-2 ${align} transition-colors duration-300 ${isActive ? 'text-emerald-400/80 font-bold' : 'text-white/30 font-medium'}`;
    };

    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
             <div className="min-w-[600px] px-4 sm:px-0">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-[10px] uppercase tracking-wider">
                            <th className="pb-2 pl-3 text-white/30">Unit</th>
                            <th className="pb-2 text-white/30">Type</th>
                            <th className="pb-2 text-white/30">Size</th>
                            <th className={getHeaderClass('worst')}>Worst</th>
                            <th className={getHeaderClass('base')}>Base</th>
                            <th className={`${getHeaderClass('best')} pr-3`}>Best</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-2">
                        {inventory.map((unit, idx) => (
                             <motion.tr 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className="bg-white/5 hover:bg-white/10 transition-colors group"
                             >
                                 <td className="py-3 pl-3 rounded-l-lg">
                                     <div className="flex items-center gap-2">
                                         <span className="font-bold text-white text-sm">{unit.code}</span>
                                     </div>
                                 </td>
                                 <td className="py-3">
                                     <span className="text-xs text-white/70">{unit.type}</span>
                                 </td>
                                 <td className="py-3">
                                     <span className="text-xs text-white/50">{unit.size} sqm</span>
                                 </td>
                                 <td className={getColumnClass('worst')}>
                                     {unit.price.worst.toLocaleString()}
                                 </td>
                                 <td className={getColumnClass('base')}>
                                     {unit.price.base.toLocaleString()}
                                 </td>
                                 <td className={`${getColumnClass('best')} pr-3 rounded-r-lg`}>
                                     {unit.price.best.toLocaleString()}
                                 </td>
                             </motion.tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    );
};

const App_en: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const [activeCase, setActiveCase] = useState<CaseType>('base');
  const [activeModel, setActiveModel] = useState<ModelType>('divided'); 
  const [occupancyRate, setOccupancyRate] = useState<number>(0.80); 
  const [managementFee, setManagementFee] = useState<number>(MABAAT_SHARE_PERCENTAGE);
  
  const activeScenario = SCENARIOS[0]; 
  const currentModelData = activeScenario[activeModel];
  const baseFinancials = currentModelData.financials[activeCase];

  const effectiveRevenue = Math.round(baseFinancials.revenue * occupancyRate);
  const effectiveMabaat = Math.round(effectiveRevenue * managementFee);
  const effectiveNetIncome = effectiveRevenue - effectiveMabaat;
  
  const netIncomePerUnitSingular = Math.round(effectiveNetIncome / 14);
  const netIncomePerUnitDivided = Math.round(effectiveNetIncome / 26);
  
  const caseOptions = [
      { value: 'worst', label: 'Conservative' },
      { value: 'base', label: 'Realistic' },
      { value: 'best', label: 'Optimistic' },
  ];

  const modelOptions = [
      { 
          value: 'singular', 
          label: 'Original Layout (14 Units)',
          className: 'text-white/60 hover:text-white',
      },
      { 
          value: 'divided', 
          label: 'Subdivision Plan (26 Units)',
          activePillClassName: 'bg-[#8A6E99] shadow-sm',
          activeTextClassName: 'text-white'
      },
  ];

  const occupancyOptions = [
      { 
          value: 0.7, 
          label: '70%', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { 
          value: 0.8, 
          label: '80%', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { value: 0.9, label: '90%' },
  ];

  const feeOptions = [
      { value: 0.25, label: '25%' },
  ];

  const ledgerItems: { category: string; amount: number; color?: string; highlight?: boolean; subValue?: string; subLabel?: string }[] = [];
  
  ledgerItems.push({ category: `Management Fee (${Math.round(managementFee * 100)}%)`, amount: effectiveMabaat, color: 'bg-purple-400' });
  ledgerItems.push({ 
      category: 'Net Income (Owner)', 
      amount: effectiveNetIncome, 
      color: 'bg-emerald-400', 
      highlight: true,
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-x-hidden selection:bg-[#4A2C5A] selection:text-white">
      <Header onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        
        {/* Project Header */}
        <FadeInUp>
          <div className="text-center pt-8 pb-8 sm:pt-16 sm:pb-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block mb-3 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm"
            >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Property Feasibility Study</span>
            </motion.div>
            <h1 className="text-3xl sm:text-6xl font-black text-[#1D1D1F] tracking-tighter mb-4 leading-none">
              SAFA - Al Ta'awun<span className="text-[#8A6E99]">.</span>
            </h1>
            <p className="text-sm sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight px-4 mb-8">
                Analyzing the potential of transforming <span className="text-[#2A5B64]">14 Large Apartments</span> into <span className="text-[#8A6E99]">26 Boutique Units</span> for maximized occupancy and yield.
            </p>
          </div>
        </FadeInUp>

        {/* SECTION 2: INTERACTIVE DEEP DIVE (Dark Mode) */}
        <Section title="Strategy Analysis" className="!mt-0 !pt-0" titleColor="text-[#1D1D1F]">
            
            {/* The Cockpit */}
            <div className="bg-[#000000] text-white rounded-3xl sm:rounded-[2rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                {/* Control Bar - Mobile Optimized (Assumptions Only) */}
                <div className="bg-white/5 backdrop-blur-xl border-b border-white/5 p-4 sm:p-6 flex flex-col gap-4 sticky top-0 z-20">
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
                         
                         {/* Title for the bar */}
                         <div className="hidden xl:flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                             <span className="text-xs font-bold uppercase tracking-widest text-white/60">Financial Simulator</span>
                         </div>

                         {/* Sensitivity Selector */}
                        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar flex justify-center">
                            <div className="min-w-max">
                                <SegmentedControl 
                                    name="cockpit-case"
                                    selected={activeCase} 
                                    onChange={(val) => setActiveCase(val)}
                                    dark={true}
                                    options={caseOptions}
                                />
                            </div>
                        </div>

                        <div className="hidden xl:block w-[1px] h-6 bg-white/10"></div>

                         {/* Simulator Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-w-max">
                            {/* Occupancy Rate */}
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Occupancy</span>
                                <SegmentedControl 
                                    name="cockpit-occupancy"
                                    selected={occupancyRate} 
                                    onChange={(val) => setOccupancyRate(val)}
                                    dark={true}
                                    options={occupancyOptions}
                                />
                            </div>
                            
                            {/* Mabaat Share */}
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mgmt Fee</span>
                                <SegmentedControl 
                                    name="cockpit-fee"
                                    selected={managementFee} 
                                    onChange={(val) => setManagementFee(val)}
                                    dark={true}
                                    options={feeOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                    
                    {/* LEFT COLUMN: Inventory Strategy (Controlled by Toggle) */}
                    <div className="lg:col-span-7 space-y-6">
                         
                         {/* CONFIGURATION TOGGLE - Dedicated Section */}
                         <div className="bg-white/5 p-1.5 rounded-2xl border border-white/10 inline-block w-full">
                            <SegmentedControl 
                                name="cockpit-model"
                                selected={activeModel} 
                                onChange={(val) => setActiveModel(val)}
                                dark={true}
                                options={modelOptions}
                            />
                         </div>

                         {/* Strategy Note */}
                         <p className="text-xs text-emerald-400 font-medium flex items-center gap-2 pl-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                             Strategy: Dividing the inventory into 26 smaller units makes it easier to rent out.
                         </p>

                        {/* Unit Inventory & Pricing Breakdown */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeModel}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden h-[600px] flex flex-col"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                    <div className="w-40 h-40 bg-[#8A6E99] rounded-full blur-3xl"></div>
                                </div>

                                <div className="flex justify-between items-end mb-8 relative z-10 flex-shrink-0">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Inventory & Pricing</h3>
                                        <p className="text-sm text-white/50">{currentModelData.unitCount} Total Units in this configuration</p>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Total Capacity</span>
                                        <span className="text-xl font-bold text-white">{currentModelData.unitCount} Units</span>
                                    </div>
                                </div>

                                <div className="relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                     <InventoryTable inventory={currentModelData.inventory} activeCase={activeCase} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Financial Results (Updates based on selection but separate) */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {/* Projected Revenue - Top Anchor */}
                        <div className="bg-gradient-to-b from-[#2A5B64]/40 to-[#2A5B64]/10 rounded-3xl p-6 sm:p-8 border border-[#2A5B64]/30 relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                             
                             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">
                                Total Annual Revenue
                            </p>
                            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white tabular-nums mb-4">
                                {formatCurrency(effectiveRevenue)}
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-white/70 uppercase">
                                    {Math.round(occupancyRate * 100)}% Occupancy
                                </span>
                                <span className="text-[10px] text-white/40">Model: {activeModel === 'singular' ? '14 Units' : '26 Units'}</span>
                            </div>
                        </div>

                        {/* Financial Ledger */}
                        <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10">
                            <h4 className="text-sm font-bold mb-6 flex items-center gap-2 text-white">
                                <div className="p-1.5 bg-white/10 rounded-md">
                                    <BanknotesIcon className="w-4 h-4 text-white/90" />
                                </div>
                                Financial Ledger
                            </h4>
                            <DigitalLedger 
                                revenue={effectiveRevenue} 
                                items={ledgerItems}
                                unitMetrics={{
                                    singular: netIncomePerUnitSingular,
                                    divided: netIncomePerUnitDivided
                                }} 
                                activeModel={activeModel}
                            />
                        </div>

                    </div>

                </div>
            </div>
            
        </Section>

      </main>

      <footer className="py-12 text-center pb-20 sm:pb-12">
         <p className="text-sm font-semibold text-[#1D1D1F]/30 uppercase tracking-widest">
            Study by Mathwaa Property Management®
         </p>
      </footer>
    </div>
  );
};

export default App_en;
