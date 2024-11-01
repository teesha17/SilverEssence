import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomePage from './Components/Home/Home'
import AdminPage from './Components/Admin/Admin'
import AdminLogin from './Components/Admin/AdminLogin'
import EditAdmin from './Components/Admin/EditAdmin'
import AddAdmin from './Components/Admin/AddAdmin'
import Users from './Components/Users/Users'
import Orders from './Components/Orders/Orders'
import Items from './Components/Items/Items'
import AddItem from './Components/Items/AddItems'
import Category from './Components/Category/Category'
import EditCategory from './Components/Category/EditCategory'
import AddCategory from './Components/Category/AddCategory'
import Subcategories from './Components/SubCategory/SubCategory'
import AddSubCategory from './Components/SubCategory/AddSubCategory'
import EditSubcategory from './Components/SubCategory/EditSubCategory'
import EditItems from './Components/Items/EditItems'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/admins' element={<AdminPage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path="/admin/edit/:id" element={< EditAdmin />} />
        <Route path='/addadmin' element={<AddAdmin/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/items' element={<Items/>}/>
        <Route path='/additem' element={<AddItem/>}/>
        <Route path='/categories' element={<Category/>}/>
        <Route path='/addcategory' element={<AddCategory/>}/>
        <Route path='/:id/categoryupdate' element={<EditCategory/>}/>
        <Route path='/subcategories' element={<Subcategories/>}/>
        <Route path='/addsubcategory' element={<AddSubCategory/>}/>
        <Route path='/:subcategoryId/subcategoryupdate' element={<EditSubcategory/>}/>
        <Route path='/:itemId/itemupdate' element={<EditItems/>}/>
      </Routes>
    </Router>
    </>
  )
}
export default App
