import { useContext } from 'react';

import authContext from '../contexts/index.jsx';
import SocketContext from '../contexts/socketContext.jsx';

const useAuth = () => useContext(authContext);
export const useSocket = () => useContext(SocketContext);

export default useAuth;
