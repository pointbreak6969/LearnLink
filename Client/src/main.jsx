import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/AllCourses.jsx';
import Contact from './pages/Contact';
import About from './pages/About';
import Profile from './pages/Profile';
import Classroom from './pages/Classroom';
import SingleClass from './pages/SingleClass';
import SearchNotes from './pages/SearchNotes';
import Reward from './pages/Reward';
import Protected from './components/Protected';
import Canvas from './components/canvas/Canvas.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { 
        path: '/login', 
        element: (
            <Login />
        ),
      },
      { 
        path: '/canvas', 
        element: (
            <Canvas />
        ),
      },
      { 
        path: '/signup', 
        element: (
             <Signup />
        ),
      },
      
      { path: '/courses', element: <Courses /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      
      // Protected Routes
      { 
        path: '/profile', 
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        ),
      },
      
      { 
        path: '/classroom', 
        element: (
          <Protected authentication>
            <Classroom />
          </Protected>
        ),
      },
      { 
        path: '/classroom/:classCode', 
        element: (
          <Protected authentication>
            <SingleClass />
          </Protected>
        ),
      },
      { 
        path: '/searchnotes', 
        element: (
          <Protected authentication>
            <SearchNotes />
          </Protected>
        ),
      },
      { 
        path: '/reward', 
        element: (
          <Protected authentication>
            <Reward />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
