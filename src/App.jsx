import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import FormSelector from './components/FormSelector/FormSelector';
import Login from './components/Login/Login';
import WpsEmployees from './components/WpsEmployees/WpsEmployees';
import WpsEmployer from './components/WpsEmployer/WpsEmployer';
import Dashboard from './components/Dashboard/Dashboard';
import SimplifiedEmployer from './components/SimplifiedEmployer/SimplifiedEmployer';
import SimplifiedEmployees from './components/SimplifiedEmployees/SimplifiedEmployees';
import MinistriesEmployer from './components/MinistriesEmployer/MinistriesEmployer';
import MinistriesEmployees from './components/MinistriesEmployees/MinistriesEmployees';
import ContactUs from './components/Support/contact';
import HowTo from './components/Support/how';

const App = () => {
  return <Router>
  <Routes>
    
    <Route path='/salaries/login' element={<Login />}></Route>

    <Route path='/salaries/' element={<MainContainer />}>
      <Route index path='/salaries/' element={<FormSelector />}></Route>
      <Route path='/salaries/home' element={<FormSelector />}></Route>

    <Route path='/salaries/detailed' element={<Dashboard formType={"detailed"} />}></Route>

    <Route path='/salaries/detailed/dashboard' element={<Dashboard formType={"detailed"} />}></Route>

    <Route path='/salaries/detailed/employer' element={<WpsEmployer />}></Route>

    <Route  path='/salaries/detailed/employees' element={<WpsEmployees />}></Route>

    <Route  path='/salaries/simplified' element={<Dashboard formType={"simplified"} />}></Route>
    
    <Route  path='/salaries/simplified/dashboard' element={<Dashboard formType={"simplified"} />}></Route>

    <Route  path='/salaries/simplified/employer' element={<SimplifiedEmployer />}></Route>

    <Route  path='/salaries/simplified/employees' element={<SimplifiedEmployees />}></Route>

    <Route  path='/salaries/deductions' element={<Dashboard formType={"deductions"} />}></Route>

    <Route  path='/salaries/deductions/dashboard' element={<Dashboard formType={"deductions"} />}></Route>

    <Route  path='/salaries/deductions/employer' element={<MinistriesEmployer />}></Route>
    
    <Route  path='/salaries/deductions/employees' element={<MinistriesEmployees />}></Route>

    <Route  path='/salaries/support' element={<ContactUs />}></Route>

    <Route  path='/salaries/support/how' element={<HowTo />}></Route>

    <Route  path='/salaries/support/contact' element={<ContactUs />}></Route>
    </Route>

</Routes>
</Router>
}

export default App;