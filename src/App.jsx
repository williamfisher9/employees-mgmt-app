import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import FormSelector from './components/FormSelector/FormSelector';

const App = () => {
  return <Router>
  <Routes>
    <Route path='/salaries/' element={<FormSelector />}></Route>
    <Route path='/salaries/home' element={<FormSelector />}></Route>

    <Route path='/salaries/detailed' element={<MainContainer urlLink={"/salaries/detailed"} />}></Route>

    <Route path='/salaries/detailed/dashboard' element={<MainContainer urlLink={"/salaries/detailed/dashboard"} />}></Route>

    <Route path='/salaries/detailed/employer' element={<MainContainer urlLink={"/salaries/detailed/employer"} />}></Route>

    <Route  path='/salaries/detailed/employees' element={<MainContainer urlLink={"/salaries/detailed/employees"} />}></Route>

    <Route  path='/salaries/simplified' element={<MainContainer urlLink={"/salaries/simplified"} />}></Route>
    
    <Route  path='/salaries/simplified/dashboard' element={<MainContainer urlLink={"/salaries/simplified/dashboard"} />}></Route>

    <Route  path='/salaries/simplified/employer' element={<MainContainer urlLink={"/salaries/simplified/employer"} />}></Route>

    <Route  path='/salaries/simplified/employees' element={<MainContainer urlLink={"/salaries/simplified/employees"} />}></Route>

    <Route  path='/salaries/deductions' element={<MainContainer urlLink={"/salaries/deductions"} />}></Route>

    <Route  path='/salaries/deductions/dashboard' element={<MainContainer urlLink={"/salaries/deductions/dashboard"} />}></Route>

    <Route  path='/salaries/deductions/employer' element={<MainContainer urlLink={"/salaries/deductions/employer"} />}></Route>
    
    <Route  path='/salaries/deductions/employees' element={<MainContainer urlLink={"/salaries/deductions/employees"} />}></Route>

    <Route  path='/salaries/support' element={<MainContainer urlLink={"/salaries/support"} />}></Route>

    <Route  path='/salaries/support/how' element={<MainContainer urlLink={"/salaries/support/how"} />}></Route>

    <Route  path='/salaries/support/contact' element={<MainContainer urlLink={"/salaries/support/contact"} />}></Route>

</Routes>
</Router>
}

export default App;