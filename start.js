const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
var mysql = require('mysql')

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

if('serviceWorker' in navigator){
	navigator.serviceWorker.serviceWorker.register('/public/sw.js')
}

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'magang'
// })

// connection.connect(function(err){
// 	if (err) throw err;

// 	console.log('connect');	
// })

app.get('/', (req, res) => res.render('/public/index.html'));
app.post("/ajax/email", function(request,response){
	
	// var sql = "insert into aktivitas values(null,'"+request.body.email+"','"+request.body.nim+"','"+request.body.nama+"','"+request.body.college+"','"+request.body.fakultas+"','"+request.body.datepicker+"','"+request.body.jam_masuk+"','"+request.body.jam_keluar+"','"+request.body.laporan+"')"
	// connection.query(sql, function (err) {
 //  	if (err) throw err

	// })
	// connection.end();

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth : {
			user: "magangbankindonesia@gmail.com",
			pass: "magangBI2020"
		},
		tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    	},
	});

	var textBody = `FROM: $(request.body.nama); EMAIL: $(request.body.email); MESSAGE: $(request.body.laporan)`;
	var mail = {
		from: "magangbankindonesia@gmail.com",
		to: "irfangamer@gmail.com",
		subject: "laporan Aktivitas Magang",
		text: textBody,
		html: "Email : "+request.body.email+"<br>Nomor Induk Mahasiwa : "+request.body.nim+"<br>Nama : "+request.body.nama+"<br>Sekolah Tinggi/Institut/Universitas : "+request.body.college+"<br>Fakultas/Jurusan : "+request.body.fakultas+"<br>Tanggal : "+request.body.datepicker+"<br>Jam Masuk : "+request.body.jam_masuk+"<br>Jam Keluar : "+request.body.jam_keluar+"<br>Laporan : "+request.body.laporan
	}

	transporter.sendMail(mail, function(err,info){
		if(err){
			console.log(err);
			response.json({message: err});
		}
		else{
			console.log(request.body)
			response.redirect('/');
		}
	});
});


app.listen(PORT, () => console.log(`app listening on port ${PORT}`))