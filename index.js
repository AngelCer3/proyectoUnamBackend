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

app.post('/appAgregarFechaVisita', (req,res)=>{
    const fechaVisita ={
        visita1_fecha: req.body.visita1_fecha,
        visita1_hora: req.body.visita1_hora,
        visita1_resultado: req.body.visita1_resultado,
        visita2_fecha: req.body.visita2_fecha,
        visita2_hora: req.body.visita2_hora,
        visita2_resultado: req.body.visita2_resultado,
        visita3_fecha: req.body.visita3_fecha,
        visita3_hora: req.body.visita3_hora,
        visita3_resultado: req.body.visita3_resultado
    }
    const query = 'INSERT INTO t_visitas SET ?'
    conexion.query(query, fechaVisita, (error)=>{
        if (error) return console.error(error.message)
        
        res.json('Se insertaron los datos correctamente')
    })
})

app.post('/appAgregarDatosVivienda', (req,res)=>{
    const datosVivienda = {
        vivienda_localizada: req.body.vivienda_localizada,
        vivienda_habitada: req.body.vivienda_habitada,
        verificacion_metodo: req.body.verificacion_metodo,
        verificacion_otro: req.body.verificacion_otro,
        vecino_nombre: req.body.vecino_nombre,
        acreditado_vive: req.body.acreditado_vive,
        jefe_familia_nombre: req.body.jefe_familia_nombre,
        jefe_familia_relacion: req.body.jefe_familia_relacion,
        fecha_ocupacion: req.body.fecha_ocupacion,
        situacion_vivienda: req.body.situacion_vivienda,
        documento_traspaso: req.body.documento_traspaso,
        tipo_documento_traspaso: req.body.tipo_documento,
        documento_mostrado: req.body.documento_mostrado,
        documento_copia_entregada: req.body.documento_copia_entregada
    }
    const query = 'INSERT INTO t_vivienda SET ?'
    conexion.query(query, datosVivienda, (error)=>{
        if (error) return console.error(error.message)
        
        res.json('Se insertaron los datos correctamente')
    })
})