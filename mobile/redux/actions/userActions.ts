import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from '@/api/client'
import { ApiResponse, changePasswordFormData, editProfileFormData, forgotPasswordFormData, loginFormData, QuestionnaireFormData, resetPasswordFormData, signupFormData, User, verifyCodeFormData } from '@/types/authFormData'
import * as SecureStore from 'expo-secure-store'


interface InitializeAuth {
    token: string | null,
    user: User | null
}

export const signUp = createAsyncThunk<ApiResponse, signupFormData>('auth/signUp', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('auth/signUp', formData)
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const login = createAsyncThunk<ApiResponse, loginFormData>('auth/login', async(formData, thunkAPI) => {
    try{
        const response = await axios.post('auth/login', formData)
        await SecureStore.setItemAsync("token", response.data.token);
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getOwnProfile = createAsyncThunk<User>('auth/getOwnProfile', async(_, thunkAPI) => {
    try{
        const response = await axios.get('user/profile')
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const getAllCounselors = createAsyncThunk<User[]>('auth/getCounselors', async(_, thunkAPI) => {
    try{
        const response = await axios.get('user/counselors')
        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
      await SecureStore.deleteItemAsync("token"); 
    } catch (error) {
      return thunkAPI.rejectWithValue('Logout failed');
    }
});

export const initializeAuth = createAsyncThunk<InitializeAuth>("auth/initialize", async(_, thunkAPI) => {
    try {
      const token = await SecureStore.getItemAsync("token");
  
      if(!token){
        return { token: null, user: null };
      }

      const response = await axios.get('user/profile')
      return {token, user: response.data}
    } catch (error) {
      return thunkAPI.rejectWithValue({ token: null, user: null })
    }
}); 

export const changePassword = createAsyncThunk<ApiResponse, changePasswordFormData>("auth/changePassword", async (formData, thunkAPI) => {
    try {
      const response = await axios.post('user/change_pass', formData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
});

export const editProfile = createAsyncThunk<User, editProfileFormData>("user/editProfile", async (formData, thunkAPI) => {
    try {
      const response = await axios.patch('user/', formData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
});

export const submitQuestionnaire = createAsyncThunk<{supportGroup:{name:string, id:string}}, QuestionnaireFormData>("user/questionnaire", async (formData, thunkAPI) => {
  try {
    const response = await axios.post('user/questionnaire', formData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const requestCode = createAsyncThunk<{code:string, email:string}, forgotPasswordFormData>("user/requestCode", async (formData, thunkAPI) => {
  try {
    const response = await axios.post('user/requestCode', formData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const verifyCode = createAsyncThunk<ApiResponse, verifyCodeFormData>("user/verifyCode", async (formData, thunkAPI) => {
  try {
    const response = await axios.post('user/verifyCode', formData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetPassword = createAsyncThunk<ApiResponse, resetPasswordFormData>("user/resetPassword", async (formData, thunkAPI) => {
  try {
    const response = await axios.post('user/reset_pass', formData)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
  