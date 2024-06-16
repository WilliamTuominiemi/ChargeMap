'use client';

import { GoogleMap } from '@react-google-maps/api';

export const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const MapComponent = () => {
  const defaultMapCenter = {
    lat: 60.192059,
    lng: 24.945831,
  };

  const defaultMapZoom = 7;

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
  };
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>{' '}
    </div>
  );
};

export { MapComponent };
