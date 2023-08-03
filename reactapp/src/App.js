import LandingScreen from './screens/LandingScreen';
import DashboardScreen from './screens/DashboardScreen';
import AccountScreen from "./screens/AccountScreen";
import ReportScreen from './screens/ReportScreen';
import GoalScreen from './screens/GoalScreen';
import {Route, Routes, Navigate, HashRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import TransactionScreen from './screens/TransactionScreen';
import ProfileScreen from './screens/ProfileScreen';
import BudgetScreen from "./screens/BudgetScreen";
import {changeIsMobile} from "./features/userSlice";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const handleResize = () => {
            dispatch(changeIsMobile(window.innerWidth <= 768)); // Adjust the breakpoint as needed
        };

        // Add event listener on component mount
        window.addEventListener('resize', handleResize);

        // Call handleResize once on component mount
        handleResize();
        console.log(window.innerWidth <= 768)
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [window]);

  return (
      <HashRouter>
          <Routes>
              <Route exact path='/' element={<AlreadyLoggedin><LandingScreen></LandingScreen></AlreadyLoggedin>} />
              <Route path='/dashboard' element={<RequireAuth><DashboardScreen/></RequireAuth>}/>
              <Route path='/account' element={<RequireAuth><AccountScreen/></RequireAuth>}/>
              <Route path='/report' element={<RequireAuth><ReportScreen/></RequireAuth>}/>
              <Route path='/goal' element={<RequireAuth><GoalScreen/></RequireAuth>}/>
              <Route path='/transaction' element={<RequireAuth><TransactionScreen/></RequireAuth>}/>
              <Route path='/profile' element={<RequireAuth><ProfileScreen/></RequireAuth>}/>
              <Route path='/budget' element={<RequireAuth><BudgetScreen/></RequireAuth>}/>
              <Route path="/*" element={<p>Page not found</p>} />
          </Routes>
      </HashRouter>
  );
}

function RequireAuth({children}) {
    const token = useSelector(state => state.user.token)
    if(token === null){
        return <Navigate to="/"/>
    }else{
        return children
    }
}

function AlreadyLoggedin({children}){
    const token = useSelector(state => state.user.token)
    return token!==null ? <Navigate to="/dashboard"/> : children
}

export default App;
