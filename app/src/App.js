import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Error from './Components/Error/Error';
import Register from './Components/Register/Register';
import Caregories from './Components/Caregories/Caregories';
import NotFound from './Components/NotFound/NotFound';
import UserContextProvider from './Context/userContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Offline, Online } from "react-detect-offline";
import CartContextProvider from './Context/cartContext';
import OnlinePayment from './Components/OnlinePayment/OnlinePayment';
import Allorders from './Components/Allorders/Allorders';



let routers = createBrowserRouter([
  {
    path: '/', element: <LayOut />, children: [
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute>  },
      { path: 'products', element: <ProtectedRoute>  <Products /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'caregories', element: <ProtectedRoute><Caregories /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: 'onlinePayment', element: <ProtectedRoute><OnlinePayment /></ProtectedRoute> },
      { path: 'caregories', element: <ProtectedRoute><Error /> </ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
function App() {

  let queryClient = new QueryClient()

  return <>
    <UserContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routers} ></RouterProvider>
          <Offline>
            <div className='netwark'> <i className=' fa fa-wifi'></i> you are offline ! </div>
          </Offline>
        </QueryClientProvider>
      </CartContextProvider>
    </UserContextProvider>

  </>
}

export default App;
