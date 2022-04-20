import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import LaunchPad from './pages/LaunchPad'
import PreSaleDetail from './pages/PreSaleDetail'
import Product from './pages/Product'
import Admin from './pages/Admin'
import Footer from './components/Footer'

import {Route, Routes} from 'react-router-dom'
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/createLaunchPad" element={<LaunchPad />}></Route>
                <Route path="/project" element={<PreSaleDetail />}></Route>
                <Route path="/product" element={<Product />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App
