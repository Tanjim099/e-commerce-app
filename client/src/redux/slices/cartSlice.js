import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
};

const saveCartItems = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
};
const findItemIndex = (items, itemId) => {
    return items.findIndex(item => item.id === itemId);
};

const initialState = {
    items: loadCartItems(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, itemQuantity } = action.payload;
            const existingItemIndex = findItemIndex(state.items, id);

            if (existingItemIndex !== -1) {
                // If the item is already in the cart, increment the quantity
                state.items[existingItemIndex].itemQuantity += itemQuantity;
            } else {
                // If the item is not in the cart, add it
                state.items.push(action.payload);
            }

            saveCartItems(state.items);
        },

        incrementQuantity: (state, action) => {
            const { id } = action.payload;
            const itemIndex = findItemIndex(state.items, id);

            if (itemIndex !== -1) {
                state.items[itemIndex].itemQuantity += 1;
                saveCartItems(state.items);
            }
        },

        decrementQuantity: (state, action) => {
            const { id } = action.payload;
            const itemIndex = findItemIndex(state.items, id);

            if (itemIndex !== -1) {
                state.items[itemIndex].itemQuantity -= 1;

                // If quantity becomes 0, remove the item from the cart
                if (state.items[itemIndex].itemQuantity === 0) {
                    state.items.splice(itemIndex, 1);
                }

                saveCartItems(state.items);
            }
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            const updatedItems = state.items.filter(item => item.id !== id);
            state.items = updatedItems;
            saveCartItems(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCartItems(state.items);
        },
    },
});

export const { addItem, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
