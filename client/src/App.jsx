import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Subjects from './pages/Subjects'
import Home from './pages/Home'
import { Routes, Route, Link } from 'react-router-dom'
import AllChapters from './pages/AllChapters'
import CreateNew from './pages/CreateNew/CreateNew'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <header className='p-4 text-xl font-bold shadow-sm flex items-center'>
        <Link to={'/'} className='mx-4' > Home </Link>
        <Link to={'/subjects'} className='mx-4' > See all Subjects </Link>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/subjects/' element={<Subjects />}>

        </Route>
        <Route path='subjects/:subjectid' element={<AllChapters />} />
        <Route path='/createnew/:subjectid/:chapterid' element={<CreateNew />} />
      </Routes>
    </div>
  )
}

export default App
