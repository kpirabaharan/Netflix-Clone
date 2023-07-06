'use client';

import { SessionProvider as Provider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

interface SessionProviderProps extends PropsWithChildren {}

const SessionProvider = ({ children }: SessionProviderProps) => {
  return <Provider>{children}</Provider>;
};

export default SessionProvider;
