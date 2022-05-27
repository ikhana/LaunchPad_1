import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import LaunchPad from './pages/LaunchPad'
import PreSaleDetail from './pages/PreSaleDetail'
import Product from './pages/Product'
import Admin from './pages/Admin'
import Footer from './components/Footer'
import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/createLaunchPad" element={<LaunchPad />}></Route>
                <Route path="/viewLaunchPad" element={<PreSaleDetail />}></Route>
                <Route path="/viewAllLaunchPad" element={<Product />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
            </Routes>
            <Footer />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    )
}

export default App
