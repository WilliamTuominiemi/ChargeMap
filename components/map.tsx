'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useState, useRef } from 'react';

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const range = 50000;

const defaultMapCenter = new google.maps.LatLng(60.192059, 24.945831);

const defaultMapZoom = 7;

const defaultMapOptions = {
  mapId: process.env.MAP_ID,
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = () => {
  const [markerCoord, setMarkerCoord] = useState<google.maps.LatLng | null>(null);
  const [circle, setCircle] = useState<google.maps.Circle | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [placeMarkers, setPlaceMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);

  const getChargingStation = async (coordinates: google.maps.LatLng, map: google.maps.Map) => {
    const { Place, SearchNearbyRankPreference } = (await google.maps.importLibrary(
      'places'
    )) as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    placeMarkers.forEach((marker) => (marker.map = null));
    setPlaceMarkers([]);

    const request = {
      fields: ['displayName', 'location', 'businessStatus'],
      locationRestriction: {
        center: coordinates,
        radius: range,
      },
      includedPrimaryTypes: ['electric_vehicle_charging_station'],
      maxResultCount: 20,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: 'en-US',
      region: 'us',
    };

    const { places } = await Place.searchNearby(request);

    if (places.length) {
      const newPlaceMarkers = places.map((place: google.maps.Place) => {
        const stationIcon = document.createElement('img');
        stationIcon.src =
          'https://uxwing.com/wp-content/themes/uxwing/download/transportation-automotive/electric-vehicle-charging-station-icon.png';
        stationIcon.className = 'station-icon';

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.placeId,
          content: stationIcon,
        });

        return marker;
      });

      setPlaceMarkers(newPlaceMarkers);
    }

    return places;
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const coordinate = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());

      setMarkerCoord(coordinate);

      if (circle) {
        circle.setMap(null);
      }

      const newCircle = new window.google.maps.Circle({
        strokeColor: '#949494',
        strokeOpacity: 0.5,
        strokeWeight: 0.5,
        fillColor: '#AA98A9',
        fillOpacity: 0.1,
        radius: range,
        center: coordinate,
        clickable: false,
        map: mapRef.current,
      });

      setCircle(newCircle);

      getChargingStation(coordinate, mapRef.current!);
    }
  };

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
        onClick={onMapClick}
        onLoad={onLoad}
      >
        {markerCoord && (
          <>
            <Marker
              position={markerCoord}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(26, 26),
              }}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
