import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface authState {
  authenticated: boolean;
  errorMessage: string;
  resourse: string;
}

interface signUpData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface signInData {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  'users/signin',
  async (data: signInData) => {
    const response = await axios.post(
      'https://mernauthapp.herokuapp.com/signin',
      data
    );
    return response;
  }
);

export const signUp = createAsyncThunk(
  'users/signup',
  async (data: signUpData) => {
    const response = await axios.post(
      'https://mernauthapp.herokuapp.com/signup',
      data
    );
    return response;
  }
);

export const fetchSecretResours = createAsyncThunk(
  'users/fetchSecretResours',
  async () => {
    const response = await axios.get(
      'https://mernauthapp.herokuapp.com/secret',
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    return response;
  }
);

const initialState: authState = {
  authenticated: localStorage.getItem('token') ? true : false,
  errorMessage: '',
  resourse: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem('token');
      state.authenticated = false;
    },
    passwordConfirmValidation: (state) => {
      state.errorMessage = 'Passwords must match';
    },
    clearErrorMessages: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (auth) => {
    auth.addCase(signIn.pending, (state) => {
      state.errorMessage = '';
    });
    auth.addCase(signIn.fulfilled, (state, action) => {
      state.errorMessage = '';
      state.authenticated = true;
      localStorage.setItem('token', action.payload.data.token);
    });
    auth.addCase(signIn.rejected, (state, action) => {
      state.errorMessage = action.error.message as string;
    });

    auth.addCase(signUp.pending, (state) => {
      state.errorMessage = '';
    });
    auth.addCase(signUp.fulfilled, (state, action) => {
      state.errorMessage = '';
      state.authenticated = true;
      localStorage.setItem('token', action.payload.data.token);
    });
    auth.addCase(signUp.rejected, (state, action) => {
      state.errorMessage = action.error.message as string;
    });
    auth.addCase(fetchSecretResours.fulfilled, (state, action) => {
      state.resourse = action.payload.data.secret;
    });
    auth.addCase(fetchSecretResours.rejected, (state, action) => {
      state.errorMessage = action.error.message as string;
    });
  },
});

export default authSlice.reducer;
export const {
  signOut,
  passwordConfirmValidation,
  clearErrorMessages,
} = authSlice.actions;
