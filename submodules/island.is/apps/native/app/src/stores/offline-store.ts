import createUse from 'zustand'
import create from 'zustand/vanilla'
import { isDefined } from '../utils/is-defined'

interface OfflineState {
  pastIsConnected: boolean
  isConnected: boolean | null
  bannerVisible: boolean
  bannerHasBeenShown: boolean
}

interface OfflineActions {
  toggleBanner(show: boolean): void
  setIsConnected(isConnected: boolean): void
  setNetInfoNoConnection(): void
  setBannerHasBeenShown(bannerHasBeenShown: boolean): void
  resetConnectionState(): void
}

export type OfflineStore = OfflineState & {
  actions: OfflineActions
}

export const offlineStore = create<OfflineStore>((set) => ({
  pastIsConnected: true,
  isConnected: true,
  bannerVisible: false,
  bannerHasBeenShown: false,

  actions: {
    setIsConnected: (isConnected) =>
      set((state) => ({ isConnected, pastIsConnected: !!state.isConnected })),

    setNetInfoNoConnection: () =>
      set(({ isConnected }) => ({
        pastIsConnected: isDefined(isConnected) ? !isConnected : true,
        isConnected: false,
        bannerVisible: true,
      })),

    toggleBanner: (show) => set((state) => ({ bannerVisible: show })),

    setBannerHasBeenShown: (bannerHasBeenShown) =>
      set((state) => ({ bannerHasBeenShown })),

    resetConnectionState: () =>
      set((state) => ({
        pastIsConnected: true,
        isConnected: true,
        bannerVisible: false,
        bannerHasBeenShown: false,
      })),
  },
}))

export const useOfflineStore = createUse(offlineStore)
export const useOfflineActions = () => useOfflineStore(({ actions }) => actions)
