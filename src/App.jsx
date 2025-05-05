import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import FormSelector from './components/FormSelector/FormSelector';

const App = () => {
  return <Router>
  <Routes>
    <Route path='/salaries/' element={<FormSelector />}></Route>
    <Route path='/salaries/home' element={<FormSelector />}></Route>

    <Route path='/salaries/wps' element={<MainContainer urlLink={"/salaries/wps"} />}></Route>

    <Route path='/salaries/wps/dashboard' element={<MainContainer urlLink={"/salaries/wps/dashboard"} />}></Route>

    <Route path='/salaries/wps/employer' element={<MainContainer urlLink={"/salaries/wps/employer"} />}></Route>

    <Route  path='/salaries/wps/employees' element={<MainContainer urlLink={"/salaries/wps/employees"} />}></Route>

    <Route  path='/salaries/simplified' element={<MainContainer urlLink={"/salaries/simplified"} />}></Route>
    
    <Route  path='/salaries/simplified/dashboard' element={<MainContainer urlLink={"/salaries/simplified/dashboard"} />}></Route>

    <Route  path='/salaries/simplified/employer' element={<MainContainer urlLink={"/salaries/simplified/employer"} />}></Route>

    <Route  path='/salaries/simplified/employees' element={<MainContainer urlLink={"/salaries/simplified/employees"} />}></Route>

    <Route  path='/salaries/ministries' element={<MainContainer urlLink={"/salaries/ministries"} />}></Route>

    <Route  path='/salaries/ministries/dashboard' element={<MainContainer urlLink={"/salaries/ministries/dashboard"} />}></Route>

    <Route  path='/salaries/ministries/employer' element={<MainContainer urlLink={"/salaries/ministries/employer"} />}></Route>
    
    <Route  path='/salaries/ministries/employees' element={<MainContainer urlLink={"/salaries/ministries/employees"} />}></Route>

    <Route  path='/salaries/support' element={<MainContainer urlLink={"/salaries/support"} />}></Route>

    <Route  path='/salaries/support/how' element={<MainContainer urlLink={"/salaries/support/how"} />}></Route>

    <Route  path='/salaries/support/contact' element={<MainContainer urlLink={"/salaries/support/contact"} />}></Route>

</Routes>
</Router>
}

export default App;