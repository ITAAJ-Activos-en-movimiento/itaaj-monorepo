// utils/mapUtils.ts

export const initializeMap = () => {
    return new Promise<void>((resolve) => {
      window.initMap = () => {
        resolve();
      };
    });
  };
  
  declare global {
    interface Window {
      initMap: () => void;
    }
  }