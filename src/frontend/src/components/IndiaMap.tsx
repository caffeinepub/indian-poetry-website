import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Region {
  id: string;
  name: string;
  type: 'state' | 'unionTerritory';
  color: string;
  position: { top: string; left: string };
}

const regions: Region[] = [
  // Northern regions - adjusted positions to align with map
  { id: 'jammuAndKashmir', name: 'jammuAndKashmir', type: 'unionTerritory', color: 'bg-map-1', position: { top: '8%', left: '22%' } },
  { id: 'ladakh', name: 'ladakh', type: 'unionTerritory', color: 'bg-map-2', position: { top: '10%', left: '32%' } },
  { id: 'himachalPradesh', name: 'himachalPradesh', type: 'state', color: 'bg-map-3', position: { top: '17%', left: '28%' } },
  { id: 'punjab', name: 'punjab', type: 'state', color: 'bg-map-4', position: { top: '20%', left: '24%' } },
  { id: 'chandigarh', name: 'chandigarh', type: 'unionTerritory', color: 'bg-map-5', position: { top: '21%', left: '27%' } },
  { id: 'uttarakhand', name: 'uttarakhand', type: 'state', color: 'bg-map-6', position: { top: '22%', left: '32%' } },
  { id: 'haryana', name: 'haryana', type: 'state', color: 'bg-map-7', position: { top: '26%', left: '27%' } },
  { id: 'delhi', name: 'delhi', type: 'unionTerritory', color: 'bg-map-8', position: { top: '27%', left: '29%' } },
  
  // Western regions - adjusted positions
  { id: 'rajasthan', name: 'rajasthan', type: 'state', color: 'bg-map-9', position: { top: '32%', left: '20%' } },
  { id: 'gujarat', name: 'gujarat', type: 'state', color: 'bg-map-10', position: { top: '44%', left: '18%' } },
  { id: 'dadraAndNagarHaveliAndDamanAndDiu', name: 'dadraAndNagarHaveliAndDamanAndDiu', type: 'unionTerritory', color: 'bg-map-11', position: { top: '48%', left: '20%' } },
  
  // Central regions - adjusted positions
  { id: 'uttarPradesh', name: 'uttarPradesh', type: 'state', color: 'bg-map-12', position: { top: '32%', left: '34%' } },
  { id: 'madhyaPradesh', name: 'madhyaPradesh', type: 'state', color: 'bg-map-13', position: { top: '42%', left: '30%' } },
  { id: 'chhattisgarh', name: 'chhattisgarh', type: 'state', color: 'bg-map-14', position: { top: '46%', left: '38%' } },
  
  // Eastern regions - adjusted positions
  { id: 'bihar', name: 'bihar', type: 'state', color: 'bg-map-15', position: { top: '34%', left: '42%' } },
  { id: 'jharkhand', name: 'jharkhand', type: 'state', color: 'bg-map-16', position: { top: '42%', left: '42%' } },
  { id: 'westBengal', name: 'westBengal', type: 'state', color: 'bg-map-17', position: { top: '40%', left: '46%' } },
  { id: 'odisha', name: 'odisha', type: 'state', color: 'bg-map-18', position: { top: '48%', left: '44%' } },
  { id: 'sikkim', name: 'sikkim', type: 'state', color: 'bg-map-19', position: { top: '30%', left: '48%' } },
  
  // Northeastern regions - adjusted positions
  { id: 'arunachalPradesh', name: 'arunachalPradesh', type: 'state', color: 'bg-map-20', position: { top: '28%', left: '56%' } },
  { id: 'assam', name: 'assam', type: 'state', color: 'bg-map-21', position: { top: '36%', left: '52%' } },
  { id: 'nagaland', name: 'nagaland', type: 'state', color: 'bg-map-22', position: { top: '36%', left: '58%' } },
  { id: 'manipur', name: 'manipur', type: 'state', color: 'bg-map-23', position: { top: '40%', left: '58%' } },
  { id: 'mizoram', name: 'mizoram', type: 'state', color: 'bg-map-24', position: { top: '44%', left: '56%' } },
  { id: 'tripura', name: 'tripura', type: 'state', color: 'bg-map-25', position: { top: '44%', left: '52%' } },
  { id: 'meghalaya', name: 'meghalaya', type: 'state', color: 'bg-map-26', position: { top: '40%', left: '52%' } },
  
  // Western coastal regions - adjusted positions
  { id: 'maharashtra', name: 'maharashtra', type: 'state', color: 'bg-map-27', position: { top: '52%', left: '26%' } },
  { id: 'goa', name: 'goa', type: 'state', color: 'bg-map-28', position: { top: '60%', left: '25%' } },
  
  // Southern regions - adjusted positions
  { id: 'karnataka', name: 'karnataka', type: 'state', color: 'bg-map-29', position: { top: '62%', left: '30%' } },
  { id: 'telangana', name: 'telangana', type: 'state', color: 'bg-map-30', position: { top: '54%', left: '34%' } },
  { id: 'andhraPradesh', name: 'andhraPradesh', type: 'state', color: 'bg-map-31', position: { top: '60%', left: '37%' } },
  { id: 'tamilNadu', name: 'tamilNadu', type: 'state', color: 'bg-map-32', position: { top: '70%', left: '34%' } },
  { id: 'kerala', name: 'kerala', type: 'state', color: 'bg-map-33', position: { top: '72%', left: '29%' } },
  { id: 'puducherry', name: 'puducherry', type: 'unionTerritory', color: 'bg-map-34', position: { top: '72%', left: '35%' } },
  
  // Island territories - adjusted positions
  { id: 'lakshadweep', name: 'lakshadweep', type: 'unionTerritory', color: 'bg-map-35', position: { top: '74%', left: '16%' } },
  { id: 'andamanAndNicobarIslands', name: 'andamanAndNicobarIslands', type: 'unionTerritory', color: 'bg-map-36', position: { top: '68%', left: '60%' } },
];

export default function IndiaMap() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (region: Region) => {
    const stateOrUT = region.type === 'state' 
      ? `state-${region.id}` 
      : `unionTerritory-${region.id}`;
    navigate({ to: '/poet/$stateOrUT', params: { stateOrUT } });
  };

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: '75%' }}>
        {/* Background map image - colored and more visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assets/generated/india-map-background.dim_1200x800.png"
            alt="India Map Background"
            className="w-full h-full object-contain opacity-30"
            style={{ filter: 'saturate(1.2) brightness(1.1)' }}
          />
        </div>

        {/* Interactive regions */}
        <div className="absolute inset-0">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                hoveredRegion === region.id ? 'scale-110 z-20' : 'scale-100 z-10'
              }`}
              style={{
                top: region.position.top,
                left: region.position.left,
              }}
              aria-label={t(region.name)}
            >
              <div
                className={`${region.color} rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-white/40 flex items-center justify-center ${
                  hoveredRegion === region.id 
                    ? 'min-w-[100px] min-h-[60px] border-white/80' 
                    : 'min-w-[80px] min-h-[48px]'
                }`}
              >
                <span className={`text-white font-semibold text-center px-2 transition-all duration-300 ${
                  hoveredRegion === region.id ? 'text-sm' : 'text-xs'
                }`}>
                  {t(region.name)}
                </span>
              </div>
              {hoveredRegion === region.id && (
                <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm font-semibold border-2 border-primary/20 animate-in fade-in-0 zoom-in-95 duration-200">
                  {t(region.name)}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p className="font-medium">{t('clickRegionExplore')}</p>
      </div>
    </Card>
  );
}
