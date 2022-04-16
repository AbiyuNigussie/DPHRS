const express = require('express');
const app = express();
const Hospitalsrouter = require('./routes/Hospitals');
const Doctorsrouter = require('./routes/doctors');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const port = 3000;

app.get('/', (req, res) => {
    res.send("This is Home Page!")
})
app.use('/Hospitals',Hospitalsrouter);
app.use('/Doctors', Doctorsrouter);

app.listen(port, () => {
    console.log("Server Running on port "+ port + "...");
})