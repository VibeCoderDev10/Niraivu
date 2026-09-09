import { HelpCenter } from '../types'

export interface Coordinates {
  lat: number
  lng: number
}

// Default fallback coordinates: Chennai, Tamil Nadu
export const TAMIL_NADU_CENTER: Coordinates = {
  lat: 13.0827,
  lng: 80.2707,
}

export const DISTRICT_COORDINATES: Record<string, Coordinates> = {
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Coimbatore: { lat: 11.0168, lng: 76.9558 },
  Madurai: { lat: 9.9252, lng: 78.1198 },
  Tiruchirappalli: { lat: 10.7905, lng: 78.7047 },
  Salem: { lat: 11.6643, lng: 78.146 },
  Tirunelveli: { lat: 8.7139, lng: 77.7567 },
  Vellore: { lat: 12.9165, lng: 79.1325 },
  Erode: { lat: 11.341, lng: 77.7172 },
  Thanjavur: { lat: 10.787, lng: 79.1378 },
  Kanyakumari: { lat: 8.0883, lng: 77.5385 },
}

/**
 * Calculates Haversine distance in kilometers between two geographical points
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return Math.round(distance * 10) / 10 // 1 decimal place
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/**
 * Requests user browser geolocation
 */
export function getUserLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  })
}

/**
 * Sorts help centers by distance to given coordinates
 */
export function sortCentersByDistance(
  centers: HelpCenter[],
  userCoords: Coordinates
): HelpCenter[] {
  return centers
    .map((center) => ({
      ...center,
      distanceKm: calculateDistanceKm(
        userCoords.lat,
        userCoords.lng,
        center.lat,
        center.lng
      ),
    }))
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
}
