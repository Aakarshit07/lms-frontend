import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem('data') || {}
    // HAS TO CONVER THE DATA INTO json.parse() object =>  data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
}

// signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create acoount"
        });

        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});

// login
export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        // here not using await for res. because it will delay the toast too.
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login"
        });
        // we used await for response on here so that first it will show toast then it wait and take the data from response and return it.
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});
// Logout
export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to logout"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

// update profile
export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Profile update in progress..",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

// get user data after updating prfile
export const getUserData = createAsyncThunk("/user/detailes", async (id, data) => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;