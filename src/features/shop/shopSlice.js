import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name:"shop",
    initialState:{
        categories: [],
        products: [],
        categorySelected:"",
        productsFilteredByCategory: [],
        productSelected: {}
    },
    reducers:{
        setCategorieSelected: (state,action)=>{
            state.categorySelected = action.payload
        },
        filterProducts: (state,action)=>{
            state.productsFilteredByCategory = state.products.filter(product=>product.category.toLowerCase()===state.categorySelected.toLowerCase())
        },
        setProductSelect: (state,action)=>{
            state.productSelected=action.payload
        }
    }
})

export const {setCategorieSelected,filterProducts,setProductSelect} = shopSlice.actions

export default shopSlice.reducer