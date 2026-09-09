import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import {
  MapPin,
  Compass,
  Phone,
  Clock,
  CheckCircle2,
  Navigation,
  Filter,
  ArrowUpDown,
  Building2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Search,
} from 'lucide-react'
import { HelpCenter } from '../../types'
import {
  HELP_CENTERS_DATA,
  TN_DISTRICTS,
  EMERGENCY_NUMBERS,
} from '../../data/centersData'
import {
  getUserLocation,
  sortCentersByDistance,
  DISTRICT_COORDINATES,
  TAMIL_NADU_CENTER,
  Coordinates,
} from '../../services/geolocation'
import { Modal } from '../common/Modal'

export const MapLocator: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'nearest' | 'recommended' | 'government'>('recommended')
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null)
  const [isLocating, setIsLocating] = useState<boolean>(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCenter, setSelectedCenter] = useState<HelpCenter | null>(null)

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  // Categories list
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'government', label: 'Government Hospitals' },
    { id: 'de-addiction', label: 'De-Addiction Units' },
    { id: 'rehabilitation', label: 'Residential Rehab' },
    { id: 'counseling', label: 'Psychological Counseling' },
    { id: 'mental-health', label: 'Mental Health Clinics' },
  ]

  // Filter and sort centers
  const filteredCenters = React.useMemo(() => {
    let list = [...HELP_CENTERS_DATA]

    // District filter
    if (selectedDistrict !== 'All Districts') {
      list = list.filter((c) => c.district === selectedDistrict)
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((c) => c.category === selectedCategory)
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.services.some((s) => s.toLowerCase().includes(q))
      )
    }

    // Distances
    const centerPoint = userLocation || (selectedDistrict !== 'All Districts' && DISTRICT_COORDINATES[selectedDistrict] ? DISTRICT_COORDINATES[selectedDistrict] : TAMIL_NADU_CENTER)
    list = sortCentersByDistance(list, centerPoint)

    // Sort order
    if (sortBy === 'government') {
      list.sort((a, b) => (b.governmentAffiliated ? 1 : 0) - (a.governmentAffiliated ? 1 : 0))
    } else if (sortBy === 'recommended') {
      list.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0))
    }
    // 'nearest' is already sorted by sortCentersByDistance

    return list
  }, [selectedDistrict, selectedCategory, searchQuery, userLocation, sortBy])

  // Handle Location Request
  const handleUseLocation = async () => {
    setIsLocating(true)
    setLocationError(null)

    try {
      const coords = await getUserLocation()
      setUserLocation(coords)
      setSortBy('nearest')
      setIsLocating(false)

      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([coords.lat, coords.lng], 11, { duration: 1.5 })
      }
    } catch (err: any) {
      setIsLocating(false)
      setLocationError(
        'Location access was not granted. Showing standard Tamil Nadu centers; you can also select your district manually.'
      )
    }
  }

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [TAMIL_NADU_CENTER.lat, TAMIL_NADU_CENTER.lng],
        zoom: 7,
        scrollWheelZoom: false,
      })

      // Dark Mode Tile Layer (CartoDB Dark Matter)
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 19,
        }
      ).addTo(map)

      mapInstanceRef.current = map
    }

    return () => {
      // Map instance preserved
    }
  }, [viewMode])

  // Update Map Markers when filteredCenters change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear old markers
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    // Custom Icon
    const customIcon = L.divIcon({
      className: 'custom-pin',
      html: `<div style="background: linear-gradient(135deg, #0d9488, #06b6d4); width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5); border: 2px solid #ffffff;">
        <span style="transform: rotate(45deg); color: #ffffff; font-weight: bold; font-size: 13px;">+</span>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    const bounds = L.latLngBounds([])

    filteredCenters.forEach((center) => {
      const marker = L.marker([center.lat, center.lng], { icon: customIcon }).addTo(map)

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; max-width: 240px; padding: 4px;">
          <h4 style="font-weight: 700; color: #14b8a6; margin-bottom: 4px;">${center.name}</h4>
          <p style="color: #94a3b8; font-size: 11px; margin-bottom: 6px;">${center.address}</p>
          <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px;">
            <a href="tel:${center.phone}" style="background: #0d9488; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; text-decoration: none; font-size: 11px;">Call: ${center.phone}</a>
          </div>
        </div>
      `
      marker.bindPopup(popupContent)
      markersRef.current.push(marker)
      bounds.extend([center.lat, center.lng])
    })

    if (filteredCenters.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
    }
  }, [filteredCenters])

  return (
    <section className="space-y-8">
      {/* Header & Controls Bar */}
      <div className="bg-[#0b132b] rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Tamil Nadu De-Addiction Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Help Is Closer Than You Think
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Find verified government hospitals, DMHP clinics, and residential rehabilitation centers across Tamil Nadu.
            </p>
          </div>

          {/* Use My Location CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleUseLocation}
              disabled={isLocating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:from-teal-400 hover:to-cyan-400 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-95 transition-all"
            >
              <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Detecting Location...' : 'Use My Location'}</span>
            </button>
          </div>
        </div>

        {locationError && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}

        {/* Filters & District Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* District Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              District
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
              >
                {TN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Facility Type
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
            >
              <option value="recommended">Recommended & Verified</option>
              <option value="nearest">Nearest to Location</option>
              <option value="government">Government Services First</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Search Facilities
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital, ward..."
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-sm focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View Toggle Buttons (Visible only on screens below lg) */}
      <div className="lg:hidden flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 shadow-lg">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            viewMode === 'list'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-teal-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Center Directory ({filteredCenters.length})</span>
        </button>
        <button
          onClick={() => {
            setViewMode('map')
            setTimeout(() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.invalidateSize()
              }
            }, 150)
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            viewMode === 'map'
              ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-teal-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Interactive Map</span>
        </button>
      </div>

      {/* Dual Layout: Interactive Map + Center Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map Column */}
        <div
          className={`lg:col-span-5 bg-[#0b132b] rounded-2xl border border-slate-800 p-3 shadow-xl lg:sticky lg:top-24 ${
            viewMode === 'map' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Tamil Nadu Network Map
              </span>
            </div>
            <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
              {filteredCenters.length} centers found
            </span>
          </div>

          {/* Map Leaflet Container */}
          <div
            ref={mapContainerRef}
            className="w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-xl overflow-hidden shadow-inner border border-slate-800"
          />

          <div className="mt-3 px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Tap any pin to view center contact</span>
            <span className="text-teal-400 font-medium">OpenStreetMap • Leaflet</span>
          </div>
        </div>

        {/* Center List Column */}
        <div
          className={`lg:col-span-7 space-y-4 ${
            viewMode === 'list' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Showing {filteredCenters.length} Support & Care Centers
            </h3>
            {userLocation && (
              <span className="text-xs text-teal-400 font-semibold flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>Distances calculated from your detected GPS</span>
              </span>
            )}
          </div>

          {filteredCenters.length === 0 ? (
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-10 text-center space-y-3">
              <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No centers found matching criteria</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try clearing your search query or selecting "All Districts" to view facilities across Tamil Nadu.
              </p>
              <button
                onClick={() => {
                  setSelectedDistrict('All Districts')
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold hover:bg-teal-500/30 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCenters.map((center) => (
                <div
                  key={center.id}
                  className="bg-[#0c1532] hover:bg-[#0f1b40] rounded-2xl border border-slate-800/90 hover:border-teal-500/40 p-5 sm:p-6 transition-all duration-200 shadow-md group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {center.district}
                        </span>
                        {center.governmentAffiliated ? (
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Govt Medical Care</span>
                          </span>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            Recognized Non-Profit
                          </span>
                        )}
                        {center.distanceKm !== undefined && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                            ~{center.distanceKm} km away
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                        {center.name}
                      </h4>

                      <p className="text-xs text-slate-400 mt-1 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{center.address}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${center.phone}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-bold transition-colors active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Center</span>
                      </a>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 mr-1">Services:</span>
                    {center.services.map((service, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] bg-slate-900 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Hours & Details Action */}
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/40">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{center.hours}</span>
                    </div>

                    <button
                      onClick={() => setSelectedCenter(center)}
                      className="text-teal-400 hover:text-teal-300 font-bold hover:underline transition-all"
                    >
                      View Full Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Details Modal */}
      {selectedCenter && (
        <Modal
          isOpen={!!selectedCenter}
          onClose={() => setSelectedCenter(null)}
          title={selectedCenter.name}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-teal-300 border border-teal-500/30">
                {selectedCenter.district}
              </span>
              {selectedCenter.governmentAffiliated && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Government Health Facility
                </span>
              )}
              {selectedCenter.verified && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Verified De-Addiction Unit
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              {selectedCenter.description}
            </p>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{selectedCenter.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${selectedCenter.phone}`}
                  className="font-bold text-teal-300 hover:underline"
                >
                  {selectedCenter.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{selectedCenter.hours}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Available Clinical Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCenter.services.map((serv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{serv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCenter(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              <a
                href={`tel:${selectedCenter.phone}`}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Center Directly</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}
