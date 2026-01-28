import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string, removeAll?: boolean) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === item.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                            isOpen: true, // Auto open cart on add
                        };
                    }
                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                        isOpen: true,
                    };
                });
            },

            removeItem: (id, removeAll = false) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.id === id);
                    if (!existingItem) return state;

                    if (removeAll || existingItem.quantity === 1) {
                        return { items: state.items.filter((i) => i.id !== id) };
                    }
                    // Decrease quantity
                    return {
                        items: state.items.map((i) =>
                            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                        )
                    };
                });
            },

            updateQuantity: (id, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    items: state.items.map(i => i.id === id ? { ...i, quantity } : i)
                }));
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
        {
            name: 'paradise-cart-storage',
            partialize: (state) => ({ items: state.items }), // Only persist items, not UI state like isOpen
        }
    )
);
