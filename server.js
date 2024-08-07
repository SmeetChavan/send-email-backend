import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config({
    path: './.env',
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "smeet.br.chavan7@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
    },
});

const app = express();
app.use(cors());

app.use(express.json());
app.use(urlencoded({extended: true}));

app.get('/' , (req , res) => {
    res.send("Backend is Working Fine");
});

app.post("/sendemail" , async (req , res) => {

    const {name , phone , address} = req.body;

    try {

        const info = await transporter.sendMail({
            from: {
                name: name,
                address: 'smeet.br.chavan7@gmail.com'
            },
            to: "smeetchavan567@gmail.com",
            subject: "Requesting a call back (youtube earning project of smeet)",
            html: `<div><h3>Name : ${name}</h3></div><div><h3>Phone : ${phone}</h3></div><div><h3>Email : ${address}</h3></div>`
        })

        res.status(200).json(info);

    } catch (error) {
        res.status(500).json({error : error});
    }
})

app.listen(process.env.PORT , () => console.log(`Listening on port ${process.env.PORT}`));