import express from 'express';
import MAIN from "./routes/MainRoutes.js";
import USER from "./routes/User.js";
import ADMIN from "./routes/Admin.js";
import LOGIN from "./routes/Login.js";
import PROFILE from "./routes/profile.js"
import UPDATERSTAT from "./routes/UpdateRideStatus.js";
import SIGNUP from "./routes/signup.js"
import ASSIGNEDRIDE from "./routes/AssignedRide.js"

const PORT = 7875;
const app = express();


app.use(express.json());


app.use("/",MAIN);
app.use("/admin",ADMIN);
app.use("/user",USER);
app.use("/login",LOGIN);
app.use("/profile",PROFILE);
app.use("/updateRideStatus",UPDATERSTAT);
app.use("/signup",SIGNUP);
app.use("/AssignedRide",ASSIGNEDRIDE);



app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`Server is running on http://localhost:${PORT}`);
});

