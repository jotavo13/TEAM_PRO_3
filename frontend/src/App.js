import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Videos from './pages/Videos';
import NewVideo from './pages/NewVideo';
import UpdateVideo from './pages/UpdateVideo';
import Navbar from './components/Navbar';
import Signup from './pages/Signup'

function App() {

  let routes;

  routes = (
    <>

      {/* should the Navbar be here or in the return inside the main element but above the routes? */}
      <Navbar />

      <Routes>

        <Route exact={true} path='/' element={<Videos />} />

        <Route path="/auth/signup" element={<Signup/>}/>

        <Route path='/new' element={<NewVideo />} />

        <Route path='/:id/edit' element={<UpdateVideo />} />

        {/* fallback/catch-all route */}
        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>

    </>
  )

  return (
    <div className="App">

      <header>
        <h1>Header</h1>
      </header>

      <main>
        {routes}
      </main>
      
    </div>
  );
}

export default App;