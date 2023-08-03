'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, ReactNode, useEffect } from 'react';

import { API_AUTH_URL } from '@/configs/url.configs';
import { useActions } from '@/hooks/use-actions';
import { saveTokens } from '@/lib/helpers/token.helper';
import { AuthService } from '@/services/auth.service';

type LayoutProps = {
  children: ReactNode;
};

// const UserProvider: FC<LayoutProps> = ({ children }) => {
//   const { setUser } = useActions();

//   useEffect(() => {
//     let expiresIn = 0;
//     let isValid = true;

//     const initialize = async () => {
//       try {
//         const tokens = await AuthService.getNewTokens();
//         saveTokens(tokens);

//         if (tokens.accessToken) {
//           const user = await AuthService.getUser();
//           setUser(user);
//         }

//         expiresIn = tokens.expiresIn;
//       } catch (error) {
//         isValid = false;

//         saveTokens({
//           accessToken: '',
//           refreshToken: '',
//           expiresIn: 0,
//         });
//         setUser(null);
//       }
//     };

//     initialize();
//   }, []);

//   return <div>{children}</div>;
// };

// export default UserProvider;
