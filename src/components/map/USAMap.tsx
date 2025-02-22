import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStates } from '@/lib/supabase/client';
import type { State } from '@/lib/supabase/types';
import { Loader2 } from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

// GeoJSON URL for US states
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface USAMapProps {
  onStateSelect: (stateCode: string) => void;
  selectedState?: string | null;
}

// Map of FIPS codes to state codes
const fipsToStateCode: { [key: string]: string } = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY"
};

export function USAMap({ onStateSelect, selectedState }: USAMapProps) {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStates() {
      try {
        const data = await getStates();
        console.log('Loaded states:', data);
        setStates(data);
      } catch (err) {
        console.error('Error loading states:', err);
        setError('Failed to load state data');
      } finally {
        setLoading(false);
      }
    }

    loadStates();
  }, []);

  const handleStateClick = (geo: any) => {
    // Get state code from FIPS code
    const fipsCode = geo.id;
    const stateCode = fipsToStateCode[fipsCode];
    
    console.log('Clicked state:', {
      fipsCode,
      stateCode,
      name: geo.properties.name
    });
    
    if (stateCode) {
      console.log('Calling onStateSelect with:', stateCode);
      onStateSelect(stateCode);
    } else {
      console.warn('No state code found for FIPS code:', fipsCode);
    }
  };

  const getStateColor = (fipsCode: string) => {
    const stateCode = fipsToStateCode[fipsCode];
    
    if (selectedState === stateCode) {
      return "rgb(34, 197, 94)"; // green-500
    }
    
    const state = states.find(s => s.code === stateCode);
    return state?.has_comprehensive_law 
      ? "rgb(34, 197, 94)" // green-500
      : "rgb(31, 41, 55)"; // gray-800
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[1.6/1]">
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-full"
        role="img"
        aria-label="Map of United States showing privacy law status by state"
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              console.log('Rendering geographies:', geographies.length);
              return geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getStateColor(geo.id)}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none",
                      transition: "all 250ms",
                    },
                    hover: {
                      fill: "rgb(74, 222, 128)", // green-400
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                  onClick={() => handleStateClick(geo)}
                />
              ));
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}