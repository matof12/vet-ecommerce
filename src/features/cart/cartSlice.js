import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        user: null,
        items: [],
        updateDate: new Date().toLocaleString(),
        total: 0
    },
    reducers: {
         addItems : (state,action)=>{          
            const { product, quantity = 1 } = action.payload || {};
            if (!product) return;

            const productInCart = state.items.find(item => item.id === product.id);
            if (!productInCart) {
                state.items.push({ ...product, quantity });
            } else {
                productInCart.quantity += quantity;
            }
            state.updateDate = new Date().toLocaleString();
            state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        },
        removeItems : (state,action)=>{
             const idToRemove = action.payload;
             state.items = state.items.filter(item => item.id !== idToRemove);
             state.total = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
             state.updateDate = new Date().toLocaleString();
        },
        clearCart : (state,action)=>{
            state.items = [];
            state.updateDate = new Date().toLocaleString();
            state.total = 0;
        },
    }   

})

export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;