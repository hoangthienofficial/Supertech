import { RouterProvider } from 'react-router-dom'

import './App.css'
import { router } from './router/router.config'
import { setSocket } from './redux/socket/socker.slice';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import UseSocket from './socket/useSocket';

function App() {
  UseSocket()
  return (

    <RouterProvider router={router} />
  )
}

export default App
