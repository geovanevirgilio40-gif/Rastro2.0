import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Asset, Geofence, TrajectoryPoint } from '../types';
import { useApp } from '../context/AppContext';

interface LeafletMapProps {
  assets?: Asset[];
  selectedAssetId?: string | null;
  onSelectAsset?: (id: string) => void;
  geofences?: Geofence[];
  trajectoryPoints?: TrajectoryPoint[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showDetailsOverlay?: boolean;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  assets: propAssets,
  selectedAssetId: propSelectedAssetId,
  onSelectAsset,
  geofences: propGeofences,
  trajectoryPoints,
  center,
  zoom = 13,
  height = '100%',
  showDetailsOverlay = false,
}) => {
  const { assets: ctxAssets, selectedAssetId: ctxSelectedId, setSelectedAssetId, geofences: ctxGeofences, theme } = useApp();
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const geofencesGroupRef = useRef<L.LayerGroup | null>(null);
  const trajectoryGroupRef = useRef<L.LayerGroup | null>(null);

  const assets = propAssets || ctxAssets;
  const selectedAssetId = propSelectedAssetId !== undefined ? propSelectedAssetId : ctxSelectedId;
  const geofences = propGeofences || ctxGeofences;

  const handleSelectAsset = (id: string) => {
    if (onSelectAsset) {
      onSelectAsset(id);
    } else {
      setSelectedAssetId(id);
    }
  };

  // Initialize map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const defaultCenter: [number, number] = center || (assets.length > 0 ? [assets[0].lat, assets[0].lng] : [-23.5505, -46.6333]);
      
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: zoom,
        zoomControl: false,
        attributionControl: true,
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);

      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
      geofencesGroupRef.current = L.layerGroup().addTo(map);
      trajectoryGroupRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Tile layer update based on theme
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl =
      theme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map);
  }, [theme]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    assets.forEach(asset => {
      const isSelected = asset.id === selectedAssetId;

      // Color mapping
      let colorClass = '#10b981'; // online green
      if (asset.status === 'offline') colorClass = '#ef4444'; // red
      if (asset.status === 'alert') colorClass = '#f59e0b'; // amber

      if (asset.type === 'phone') colorClass = '#3b82f6'; // blue
      if (asset.type === 'motorcycle') colorClass = '#a855f7'; // purple
      if (asset.type === 'backpack') colorClass = '#10b981'; // emerald
      if (asset.type === 'truck') colorClass = '#f97316'; // orange

      // SVG Icon string
      let svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="10" x="4" y="5" rx="2"/><path d="M12 15v3"/><path d="m8 21 8 0"/><path d="M2 9h20"/></svg>`;

      if (asset.type === 'car') {
        svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
      } else if (asset.type === 'phone') {
        svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`;
      } else if (asset.type === 'motorcycle') {
        svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="16" r="3"/><circle cx="19" cy="16" r="3"/><path d="M12 16h4l2-4h-5l-2-3H8l-2 3h4z"/></svg>`;
      } else if (asset.type === 'backpack') {
        svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"/><path d="M8 10h8"/></svg>`;
      } else if (asset.type === 'truck') {
        svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`;
      }

      const pulseBg = asset.status === 'online' ? '#10b981' : asset.status === 'alert' ? '#f59e0b' : '#ef4444';

      const customIconHtml = `
        <div class="relative flex items-center justify-center">
          ${
            asset.status === 'online'
              ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-30" style="background-color: ${pulseBg};"></div>`
              : ''
          }
          <div class="relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${
            isSelected ? 'scale-125 ring-4 ring-white shadow-emerald-500/50' : 'hover:scale-110'
          }" style="background-color: ${colorClass}; border: 2px solid white;">
            ${svgIcon}
          </div>
          <div class="absolute -bottom-5 bg-slate-900/90 text-slate-100 text-[10px] font-bold px-1.5 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap">
            ${asset.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customIconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([asset.lat, asset.lng], { icon: customIcon }).addTo(markersGroup);

      marker.on('click', () => {
        handleSelectAsset(asset.id);
      });
    });

    if (selectedAssetId) {
      const selectedAsset = assets.find(a => a.id === selectedAssetId);
      if (selectedAsset && map) {
        map.panTo([selectedAsset.lat, selectedAsset.lng], { animate: true, duration: 0.8 });
      }
    }
  }, [assets, selectedAssetId]);

  // Update Geofences
  useEffect(() => {
    const map = mapInstanceRef.current;
    const geofencesGroup = geofencesGroupRef.current;
    if (!map || !geofencesGroup) return;

    geofencesGroup.clearLayers();

    geofences.forEach(geo => {
      if (geo.status !== 'active') return;

      if (geo.type === 'circle') {
        L.circle([geo.centerLat, geo.centerLng], {
          radius: geo.radius,
          color: geo.color,
          fillColor: geo.color,
          fillOpacity: 0.15,
          weight: 2,
          dashArray: '6, 6',
        }).addTo(geofencesGroup);
      }
    });
  }, [geofences]);

  // Update Trajectory Polyline
  useEffect(() => {
    const map = mapInstanceRef.current;
    const trajectoryGroup = trajectoryGroupRef.current;
    if (!map || !trajectoryGroup) return;

    trajectoryGroup.clearLayers();

    if (trajectoryPoints && trajectoryPoints.length > 0) {
      const latLngs: [number, number][] = trajectoryPoints.map(p => [p.lat, p.lng]);

      // Route polyline
      const line = L.polyline(latLngs, {
        color: '#10b981',
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1,
      }).addTo(trajectoryGroup);

      // Add Start & End Markers
      if (latLngs.length > 0) {
        L.circleMarker(latLngs[0], {
          radius: 6,
          color: '#10b981',
          fillColor: '#ffffff',
          fillOpacity: 1,
        }).addTo(trajectoryGroup);

        L.circleMarker(latLngs[latLngs.length - 1], {
          radius: 8,
          color: '#ef4444',
          fillColor: '#ef4444',
          fillOpacity: 1,
        }).addTo(trajectoryGroup);

        map.fitBounds(line.getBounds(), { padding: [40, 40] });
      }
    }
  }, [trajectoryPoints]);

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800/80 shadow-2xl" style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Selected Asset Overlay Details Card (Image 1 bottom card match) */}
      {showDetailsOverlay && selectedAsset && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-xl p-4 shadow-2xl text-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl">
              {selectedAsset.type === 'car' && '🚗'}
              {selectedAsset.type === 'phone' && '📱'}
              {selectedAsset.type === 'motorcycle' && '🏍️'}
              {selectedAsset.type === 'backpack' && '🎒'}
              {selectedAsset.type === 'truck' && '🚚'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">{selectedAsset.name}</h3>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    selectedAsset.status === 'online'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      selectedAsset.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}
                  />
                  {selectedAsset.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">{selectedAsset.address}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Última atualização: {selectedAsset.lastUpdate}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 divide-x divide-slate-800 text-center">
            <div className="px-3">
              <span className="block text-xl font-bold text-slate-100">{selectedAsset.speed}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">km/h Velocidade</span>
            </div>

            <div className="px-3">
              <span className="block text-xl font-bold text-slate-100">{selectedAsset.battery}%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Bateria</span>
            </div>

            <div className="px-3">
              <span className="block text-xl font-bold text-emerald-400">{selectedAsset.direction}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Direção</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
