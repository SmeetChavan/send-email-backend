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
})

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(cors({
    credentials: true,
    origin: "https://youtube-api-frontend.vercel.app/",
    methods: ["GET", "POST"],
}));

app.get('/' , (req , res) => {
    res.send("Backend is Working");
});

app.post("/sendemail" , async (req , res) => {

    const {name , phone} = req.body;

    try {

        const info = await transporter.sendMail({
            from: {
                name: "Smeet Chavan",
                address: "smeet.br.chavan7@gmail.com"
            },
            // to: "ravi@anchors.in",
            to: "smeetchavan567@gmail.com",
            subject: "Requesting a call back",
            html: `<div><h3>Name : ${name}</h3></div><div><h3>Phone : ${phone}</h3></div>`
        })

        res.status(200).json(info);

    } catch (error) {
        res.status(500).json({error : error});
    }
})

app.listen(process.env.PORT , () => console.log(`Listening on port ${process.env.PORT}`));