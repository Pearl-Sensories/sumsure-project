import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Questionnaire from './pages/Questionnaire'
import Question2 from './pages/Question2'
import Question3 from './pages/Question3.jsx'
import Question4 from './pages/Question4.jsx'
import Question5 from './pages/Question5.jsx'
import Question6 from './pages/Question6.jsx'
import Question7 from './pages/Question7.jsx'
import Question8 from './pages/Question8.jsx'
import Question9 from './pages/Question9.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import SuccessMessage from './pages/SuccessMessage.jsx'

function App() {
 

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route>
      <Route path='/' element={<Home/>}/>
      <Route path='/questionnaire' element={<Questionnaire/>}/>
      <Route path='/question2' element={<Question2/>}/>
      <Route path='/question3' element={<Question3/>}/>
      <Route path='/question4' element={<Question4/>}/>
      <Route path='/question5' element={<Question5/>}/>
      <Route path='/question6' element={<Question6/>}/>
       <Route path='/question7' element={<Question7/>}/>
       <Route path='/question8' element={<Question8/>}/>
       <Route path='/question9' element={<Question9/>}/>
       <Route path='/admin' element={<Admin/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/success' element={<SuccessMessage/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
