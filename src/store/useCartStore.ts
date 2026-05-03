import { create } from 'zustand';

export type ItemType = 'plan' | 'service' | 'addon';

export interface CartItem {
  id: string;
  title: string;
  type: ItemType;
  minPrice: number;
  maxPrice: number;
  isMonthly: boolean;
}

interface CartStore {
  items: CartItem[];
  isWomenEntrepreneur: boolean;
  isYearly: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  toggleWomenEntrepreneur: (value: boolean) => void;
  toggleYearly: (value: boolean) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isWomenEntrepreneur: false,
  isYearly: false,
  addItem: (item) => set((state) => {
    // If it's a plan, maybe replace existing plan? We'll allow multiple for now or just standard add
    if (state.items.find((i) => i.id === item.id)) return state;
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clearCart: () => set({ items: [] }),
  isInCart: (id) => get().items.some((i) => i.id === id),
  toggleWomenEntrepreneur: (value) => set({ isWomenEntrepreneur: value }),
  toggleYearly: (value) => set({ isYearly: value }),
}));
