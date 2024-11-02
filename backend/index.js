const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConection = require('./dbConnection/dbConnection.js');
const adminrouter = require('./routers/adminRoles.js');
const userRouter = require("./routers/userRoles.js")
const cookieParser = require('cookie-parser');
const { adminLogin, adminRegister } = require('./controllers/adminController.js');
const authenticateAdmin = require('./middleware/adminToken.js');

dotenv.config();
dbConection();

const app = express();
const router = express.Router();
app.use(cors(
    {
        origin:"https://silver-essence-admin.vercel.app",
        credentials:true
    }
));

app.use(cookieParser());
app.use(express.json());

router.post('/adminLogin', adminLogin);
router.post('/adminRegister', authenticateAdmin, adminRegister);
router.post('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.status(200).json({ message: 'Logout successful' });
});

app.use('/api', router);
app.use('/user',userRouter);
app.use('/admin', authenticateAdmin, adminrouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error starting the server: ${error}`);
  } else {
    console.log(`Server is started at PORT: ${PORT}`);
  }
});
