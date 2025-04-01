const express = require('express')
const mysql  = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const puerto = 3000

app.use(bodyParser.json())


const conexion = mysql.createConnection(
    {
        host: 'localhost',
        database: 'unamregistros',
        user: 'root',
        password: ''
    }
)

app.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto 3000')
})

conexion.connect(error =>{
    if (error) throw error
    console.log('Conexion exitosa a la base de datos')
})

app.post('/appAgregarDatosGenerales', (req, res) =>{
    const acreditado = {
        entidad_federativa: req.body.entidad_federativa,
        ciudad_municipio_delegacion: req.body.ciudad_municipio_delegacion,
        apellido_paterno: req.body.apellido_paterno,
        apellido_materno: req.body.apellido_materno,
        nombres: req.body.nombres,
        domicilio_calle: req.body.domicilio_calle,
        domicilio_condominio: req.body.domicilio_condominio,
        domicilio_it: req.body.domicilio_it,
        domicilio_mz: req.body.domicilio_mz,
        domicilio_no_ext: req.body.domicilio_no_ext,
        domicilio_no_int: req.body.domicilio_no_int,
        domicilio_edif: req.body.domicilio_edif,
        domicilio_colonia: req.body.domicilio_colonia,
        domicilio_cp: req.body.domicilio_cp,
        domicilio_curp: req.body.domicilio_curp
    }
    const query = 'INSERT INTO t_generales SET ?'
    conexion.query(query, acreditado, (error)=>{
        if (error) return console.error(error.message)
        
        res.json('Se insertaron los datos correctamente')
    })
})