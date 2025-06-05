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

app.post('/appInicioSesion', (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    const query = 'SELECT id_usuario, correo, id_rol FROM usuarios WHERE correo = ? AND contrasena = ?';

    conexion.query(query, [correo, contrasena], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error del Servidor" });
        }
        if (results.length > 0) {
            res.json({
                message: 'Login Exitoso',
                usuario: results[0]
            });
        } else {
            res.status(401).json({ error: 'Credenciales Invalidas' });
        }
    });
});


app.get('/appObtenerAcreditados', (req,res)=>{
    const query = "SELECT * FROM t_generales"
    conexion.query(query, (error,results)=>{
        if(error) return console.error(error.message)

        if(results.length > 0 ){
            res.json(results)
        }else{
            res.json("No hay registros")
        }
    })
})

app.get('/appObtenerFechaVisita/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_visitas WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener visitas:', err);
            res.status(500).json({ error: 'Error al obtener visitas' });
        } else {
            if (results.length > 0) {
                res.json(results[0]); // Se espera solo un registro por acreditado
            } else {
                res.status(404).json({ error: 'Visitas no encontradas' });
            }
        }
    });
});

// Vivienda
app.get('/appObtenerDatosVivienda/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_vivienda WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos vivienda:', err);
            res.status(500).json({ error: 'Error al obtener datos vivienda' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos de vivienda no encontrados' });
            }
        }
    });
});

// Crédito
app.get('/appObtenerDatosCredito/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_credito WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos crédito:', err);
            res.status(500).json({ error: 'Error al obtener datos crédito' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos de crédito no encontrados' });
            }
        }
    });
});

// Reestructura
app.get('/appObtenerDatosReestructura/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_reestructura WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos reestructura:', err);
            res.status(500).json({ error: 'Error al obtener datos reestructura' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos de reestructura no encontrados' });
            }
        }
    });
});

// Cónyuge
app.get('/appObtenerDatosConyuge/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_conyuge WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos cónyuge:', err);
            res.status(500).json({ error: 'Error al obtener datos cónyuge' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos de cónyuge no encontrados' });
            }
        }
    });
});

// Familiares
app.get('/appObtenerDatosFamiliares/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_familiares WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos familiares:', err);
            res.status(500).json({ error: 'Error al obtener datos familiares' });
        } else {
            if (results.length > 0) {
                // Solo devolver el primer objeto del array
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos familiares no encontrados' });
            }
        }
    });
});


// Solicitante
app.get('/appObtenerDatosSolicitante/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_solicitante WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos solicitante:', err);
            res.status(500).json({ error: 'Error al obtener datos solicitante' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos solicitante no encontrados' });
            }
        }
    });
});

// Datos específicos cónyuge
app.get('/appObtenerDatosEspecificosConyuge/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_especiconyuge WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos específicos cónyuge:', err);
            res.status(500).json({ error: 'Error al obtener datos específicos cónyuge' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos específicos cónyuge no encontrados' });
            }
        }
    });
});

// Otros familiares
app.get('/appObtenerDatosOtrosFamiliares/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_otrosfamiliares WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos otros familiares:', err);
            res.status(500).json({ error: 'Error al obtener datos otros familiares' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos otros familiares no encontrados' });
            }
        }
    });
});

// Gastos
app.get('/appObtenerDatosGastos/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_gastos WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos gastos:', err);
            res.status(500).json({ error: 'Error al obtener datos gastos' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos gastos no encontrados' });
            }
        }
    });
});

// Familia deudas
app.get('/appObtenerDatosFamiliaDeudas/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_deudas WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos familia deudas:', err);
            res.status(500).json({ error: 'Error al obtener datos familia deudas' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos familia deudas no encontrados' });
            }
        }
    });
});

// Teléfonos
app.get('/appObtenerDatosTelefonos/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_telefonos WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos teléfonos:', err);
            res.status(500).json({ error: 'Error al obtener datos teléfonos' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos teléfonos no encontrados' });
            }
        }
    });
});

// Cobranza
app.get('/appObtenerDatosCobranza/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_cobranza WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos cobranza:', err);
            res.status(500).json({ error: 'Error al obtener datos cobranza' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos cobranza no encontrados' });
            }
        }
    });
});

// Documentos
app.get('/appObtenerDatosDocumentos/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_documentos WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos documentos:', err);
            res.status(500).json({ error: 'Error al obtener datos documentos' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos documentos no encontrados' });
            }
        }
    });
});

// Datos específicos vivienda
app.get('/appObtenerDatosEspecificosVivienda/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_especivivienda WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos específicos vivienda:', err);
            res.status(500).json({ error: 'Error al obtener datos específicos vivienda' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos específicos vivienda no encontrados' });
            }
        }
    });
});

// Observaciones
app.get('/appObtenerDatosObservaciones/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const query = "SELECT * FROM t_observaciones WHERE id_acreditado = ?";

    conexion.query(query, [id_acreditado], (err, results) => {
        if (err) {
            console.error('Error al obtener datos observaciones:', err);
            res.status(500).json({ error: 'Error al obtener datos observaciones' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Datos observaciones no encontrados' });
            }
        }
    });
});


app.post('/appAgregarDatosGenerales', (req, res) => {
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
    };

    const query = 'INSERT INTO t_generales SET ?';
    conexion.query(query, acreditado, (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });

        res.json({
            success: true,
            id_acreditado: result.insertId.toString()
        });
    });
});


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
        visita3_resultado: req.body.visita3_resultado,
        id_acreditado: req.body.id_acreditado
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
        vecino_direccion: req.body.vecino_direccion,
        acreditado_vive: req.body.acreditado_vive,
        jefe_familia_nombre: req.body.jefe_familia_nombre,
        jefe_familia_relacion: req.body.jefe_familia_relacion,
        fecha_ocupacion: req.body.fecha_ocupacion,
        situacion_vivienda: req.body.situacion_vivienda,
        documento_traspaso: req.body.documento_traspaso,
        tipo_documento_traspaso: req.body.tipo_documento_traspaso,
        documento_mostrado: req.body.documento_mostrado,
        documento_copia_entregada: req.body.documento_copia_entregada,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_vivienda SET ?'
    conexion.query(query, datosVivienda, (error)=>{
        if (error) return console.error(error.message)
        
        res.json('Se insertaron los datos correctamente')
    })
})

app.post('/appAgregarDatosFechaCredito', (req,res)=>{
    const datosCredito = {
        credito_fecha_entrega: req.body.credito_fecha_entrega,
        credito_monto: req.body.credito_monto,
        credito_sueldo_otorgado: req.body.credito_sueldo_otorgado,
        credito_fecha_ultimo_pago: req.body.credito_fecha_ultimo_pago,
        credito_recibo_pago: req.body.credito_recibo_pago,
        credito_pago_actual: req.body.credito_pago_actual,
        credito_deuda_actual: req.body.credito_deuda_actual,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_credito SET ?'
    conexion.query(query, datosCredito, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosReestructura', (req,res)=>{
    const datosReestructura ={
        reestructura_motivo: req.body.reestructura_motivo,
        reestructura_documento: req.body.reestructura_documento,
        reestructura_tipo_documento: req.body.reestructura_tipo_documento,
        reestructura_solicitante_es_acred: req.body.reestructura_solicitante_es_acred,
        reestructura_solicitante_nombre: req.body.reestructura_solicitante_nombre,
        reestructura_parentesco: req.body.reestructura_parentesco,
        reestructura_motivo_personal: req.body.reestructura_motivo_personal,
        reestructura_sexo: req.body.reestructura_sexo,
        reestructura_fecha_nacimiento: req.body.reestructura_fecha_nacimiento,
        reestructura_edad: req.body.reestructura_edad,
        reestructura_lugar_nacimiento: req.body.reestructura_lugar_nacimiento,
        reestructura_grado_estudios: req.body.reestructura_grado_estudios,
        reestructura_conocimiento_comp: req.body.reestructura_conocimiento_comp,
        reestructura_discapacidad: req.body.reestructura_discapacidad,
        reestructura_dictamen: req.body.reestructura_dictamen,
        reestructura_institucion_dictamen: req.body.reestructura_institucion_dictamen,
        reestructura_fecha_dictamen: req.body.reestructura_fecha_dictamen,
        reestructura_porcentaje_discapacidad: req.body.reestructura_porcentaje_discapacidad,
        reestructura_estado_civil: req.body.reestructura_estado_civil,
        reestructura_fecha_estado_civil: req.body.reestructura_fecha_estado_civil,
        reestructura_exesposo_aportacion: req.body.reestructura_exesposo_aportacion,
        reestructura_exesposo_monto: req.body.reestructura_exesposo_monto,
        reestructura_regimen_conyugal: req.body.reestructura_regimen_conyugal,
        reestructura_vive_con_conyuge: req.body.reestructura_vive_con_conyuge,
        reestructura_fecha_no_convive: req.body.reestructura_fecha_no_convive,
        
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_reestructura SET ?'
    conexion.query(query, datosReestructura, (error)=>{
        if(error) return console.error(error.message)
        
        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosGeneralesConyuge', (req,res)=>{
    const datosGeneralesConyuge ={
        conyuge_nombre: req.body.conyuge_nombre,
        conyuge_sexo: req.body.conyuge_sexo,
        conyuge_fecha_nacimiento: req.body.conyuge_fecha_nacimiento,
        conyuge_edad: req.body.conyuge_edad,
        conyuge_grado_estudios: req.body.conyuge_grado_estudios,
        conyuge_comp_computo: req.body.conyuge_comp_computo,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_conyuge SET ?'
    conexion.query(query, datosGeneralesConyuge, (error)=>{
        if(error) return console.error(error.message)
        
        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosFamilia', (req, res)=>{
    const datosFamilia ={
        familia_integrantes: req.body.familia_integrantes,
        familia_total_ocupantes: req.body.familia_total_ocupantes,
        familia_tipo: req.body.familia_tipo,
        edad_0_5_hombres: req.body.edad_0_5_hombres,
        edad_0_5_mujeres: req.body.edad_0_5_mujeres,
        edad_6_12_hombres: req.body.edad_6_12_hombres,
        edad_6_12_mujeres: req.body.edad_6_12_mujeres,
        edad_13_18_hombres: req.body.edad_13_18_hombres,
        edad_13_18_mujeres: req.body.edad_13_18_mujeres,
        edad_19_35_hombres: req.body.edad_19_35_hombres,
        edad_19_35_mujeres: req.body.edad_19_35_mujeres,
        edad_36_59_hombres: req.body.edad_36_59_hombres,
        edad_36_59_mujeres: req.body.edad_36_59_mujeres,
        edad_60_mas_hombres: req.body.edad_60_mas_hombres,
        edad_60_mas_mujeres: req.body.edad_60_mas_mujeres,
        escuela_asistencia: req.body.escuela_asistencia,
        escolaridad_niveles: req.body.escolaridad_niveles,
        familiares_enfermedad: req.body.familiares_enfermedad,
        familiares_enfermedad_cuantos: req.body.familiares_enfermedad_cuantos,
        familiares_enfermedad_quien: req.body.familiares_enfermedad_quien,
        comprobante_enfermedad: req.body.comprobante_enfermedad,
        tratamiento_recibido: req.body.tratamiento_recibido,
        tratamiento_lugar: req.body.tratamiento_lugar,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_familiares SET ?'
    conexion.query(query, datosFamilia, (error)=>{
        if(error) return console.error(error.message)
        
        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosSolicitante', (req,res)=>{
    const datosSolicitante={
        hogar_integrantes_trabajando: req.body.hogar_integrantes_trabajando,
        solicitante_activo: req.body.solicitante_activo,
        solicitante_ocupacion_actual: req.body.solicitante_ocupacion_actual,
        solicitante_desempleado_tiempo: req.body.solicitante_desempleado_tiempo,
        solicitante_empresa_previa: req.body.solicitante_empresa_previa,
        solicitante_antiguedad_trabajo_anterior: req.body.solicitante_antiguedad_trabajo_anterior,
        institucion_trabajo_solicitante: req.body.institucion_trabajo_solicitante,
        actividad_remunerada_solicitante: req.body.actividad_remunerada_solicitante,
        contrato_laboral_solicitante: req.body.contrato_laboral_solicitante,
        solicitante_ingreso_mensual: req.body.solicitante_ingreso_mensual,
        solicitante_empresa: req.body.solicitante_empresa,
        solicitante_antiguedad: req.body.solicitante_antiguedad,
        comprobante_ingresos_solicitante: req.body.comprobante_ingresos_solicitante,
        institucion_cotizacion_solicitante: req.body.institucion_cotizacion_solicitante,
        ingresos_conceptos_solicitante: req.body.ingresos_conceptos_solicitante,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_solicitante SET ?'
    conexion.query(query, datosSolicitante, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosEspecificosConyuge', (req,res)=>{
    const datosEspecificosConyuge ={
        conyuge_activo: req.body.conyuge_activo,
        conyuge_ocupacion_actual: req.body.conyuge_ocupacion_actual,
        institucion_trabajo_conyuge: req.body.institucion_trabajo_conyuge,
        conyuge_actividad_remunerada: req.body.conyuge_actividad_remunerada,
        conyuge_contrato_laboral: req.body.conyuge_contrato_laboral,
        conyuge_ingreso_mensual: req.body.conyuge_ingreso_mensual,
        conyuge_empresa: req.body.conyuge_empresa,
        conyuge_antiguedad: req.body.conyuge_antiguedad,
        institucion_cotizacion_conyuge: req.body.institucion_cotizacion_conyuge,
        ingresos_conceptos_conyuge: req.body.ingresos_conceptos_conyuge,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_especiconyuge SET ?'
    conexion.query(query, datosEspecificosConyuge, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosOtrosFamiliares', (req,res)=>{
    const datosOtrosFamiliares = {
        otros_habitantes_actividad: req.body.otros_habitantes_actividad,
        hijo_numero: req.body.hijo_numero,
        hijo_actividad: req.body.hijo_actividad,
        hijo_aportacion: req.body.hijo_aportacion,
        padre_numero: req.body.padre_numero,
        padre_actividad: req.body.padre_actividad,
        padre_aportacion: req.body.padre_aportacion,
        madre_numero: req.body.madre_numero,
        madre_actividad: req.body.madre_actividad,
        madre_aportacion: req.body.madre_aportacion,
        suegros_numero: req.body.suegros_numero,
        suegros_actividad: req.body.suegros_actividad,
        suegros_aportacion: req.body.suegros_aportacion,
        hermanos_numero: req.body.hermanos_numero,
        hermanos_actividad: req.body.hermanos_actividad,
        hermanos_aportacion: req.body.hermanos_aportacion,
        nietos_numeros: req.body.nietos_numeros,
        nietos_actividad: req.body.nietos_actividad,
        nietos_aportacion: req.body.nietos_aportacion,
        yernos_nueras_numero: req.body.yernos_nueras_numero,
        yernos_nueras_actividad: req.body.yernos_nueras_actividad,
        yernos_nueras_aportacion: req.body.yernos_nueras_aportacion,
        otros_familiares_numero: req.body.otros_familiares_numero,
        otros_familiares_actividad: req.body.otros_familiares_actividad,
        otros_familiares_aportacion: req.body.otros_familiares_aportacion,
        no_familiares_numero: req.body.no_familiares_numero,
        no_familiares_actividad: req.body.no_familiares_actividad,
        no_familiares_aportacion: req.body.no_familiares_aportacion,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_otrosfamiliares SET ?'
    conexion.query(query, datosOtrosFamiliares, (error)=>{
        if(error) return console.error(error.message)
        
        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosGastos', (req,res)=>{
    const datosGastos = {
        gasto_despensa_alimentacion: req.body.gasto_despensa_alimentacion,
        gasto_despensa_motivo: req.body.gasto_despensa_motivo,
        gasto_gas: req.body.gasto_gas,
        gasto_gas_motivo: req.body.gasto_gas_motivo,
        gasto_luz: req.body.gasto_luz,
        gasto_luz_motivo: req.body.gasto_luz_motivo,
        gasto_agua: req.body.gasto_agua,
        gasto_agua_motivo: req.body.gasto_agua_motivo,
        gasto_servicio_telefonico: req.body.gasto_servicio_telefonico,
        gasto_servicio_telefonico_motivo: req.body.gasto_servicio_telefonico_motivo,
        gasto_mantenimiento_vivienda: req.body.gasto_mantenimiento_vivienda,
        gasto_mantenimiento_motivo: req.body.gasto_mantenimiento_motivo,
        gasto_transporte_publico: req.body.gasto_transporte_publico,
        gasto_transporte_motivo: req.body.gasto_transporte_motivo,
        gasto_gasolina: req.body.gasto_gasolina,
        gasto_gasolina_motivo: req.body.gasto_gasolina_motivo,
        gasto_servicios_salud: req.body.gasto_servicios_salud,
        gasto_salud_motivo: req.body.gasto_salud_motivo,
        gasto_educacion: req.body.gasto_educacion,
        gasto_educacion_motivo: req.body.gasto_educacion_motivo,
        gasto_recreacion: req.body.gasto_recreacion,
        gasto_recreacion_motivo: req.body.gasto_recreacion_motivo,
        gasto_comidas_fuera: req.body.gasto_comidas_fuera,
        gasto_comidas_fuera_motivo: req.body.gasto_comidas_fuera_motivo,
        gasto_vestido_calzado: req.body.gasto_vestido_calzado,
        gasto_vestido_calzado_motivo: req.body.gasto_vestido_calzado_motivo,
        gasto_pension_vehiculo: req.body.gasto_pension_vehiculo,
        gasto_pension_vehiculo_motivo: req.body.gasto_pension_vehiculo_motivo,
        gasto_telefono_celular: req.body.gasto_telefono_celular,
        gasto_telefono_celular_motivo: req.body.gasto_telefono_celular_motivo,
        gasto_television_pago: req.body.gasto_television_pago,
        gasto_television_pago_motivo: req.body.gasto_television_pago_motivo,
        gasto_pago_creditos: req.body.gasto_pago_creditos,
        gasto_pago_creditos_motivo: req.body.gasto_pago_creditos_motivo,
        gasto_otros_descripcion: req.body.gasto_otros_descripcion,
        gasto_otros_motivo: req.body.gasto_otros_motivo,
        gasto_metodo_pago: req.body.gasto_metodo_pago,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_gastos SET ?'
    conexion.query(query, datosGastos, (error)=>{
        if(error) return console.error(error.message)
        
        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosFamiliaDeudas', (req,res)=>{
    const datosFamiliaDeudas = {
        familia_tiene_deudas: req.body.familia_tiene_deudas,
        familia_cantidad_deudas: req.body.familia_cantidad_deuda,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_deudas SET ?'
    conexion.query(query, datosFamiliaDeudas, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosTelefono', (req,res)=>{
    const datosTelefonicos = {
        telefono1_lada: req.body.telefono1_lada,
        telefono1_numero: req.body.telefono1_numero,
        telefono1_extension: req.body.telefono1_extension,
        telefono1_tipo: req.body.telefono1_tipo,
        telefono2_lada: req.body.telefono2_lada,
        telefono2_numero: req.body.telefono2_numero,
        telefono2_extension: req.body.telefono2_extension,
        telefono2_tipo: req.body.telefono2_tipo,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_telefonos SET ?'
    conexion.query(query, datosTelefonicos, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosCobranza', (req,res)=>{
    const datosCobranza = {
        cobranza_visita: req.body.cobranza_visita,
        cobranza_numero_visitas: req.body.cobranza_numero_visitas,
        cobranza_ultima_fecha_visita: req.body.cobranza_ultima_fecha_visita,
        cobranza_despacho: req.body.cobranza_despacho,
        cobranza_calificacion: req.body.cobranza_calificacion,
        cobranza_comentario: req.body.cobranza_comentario,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_cobranza SET ?'
    conexion.query(query, datosCobranza, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron correctamente los datos')
    })
})

app.post('/appAgregarDatosDocumentos', (req,res)=>{
    const datosDocumentos = {
        doc_credencial_votar_cuenta: req.body.doc_credencial_votar_cuenta,
        doc_credencial_votar_mostro: req.body.doc_credencial_votar_mostro,
        doc_credencial_votar_entrego_copia: req.body.doc_credencial_votar_entrego_copia,
        doc_poder_amplio_cuenta: req.body.doc_poder_amplio_cuenta,
        doc_poder_amplio_mostro: req.body.doc_poder_amplio_mostro,
        doc_poder_amplio_entrego_copia: req.body.doc_poder_amplio_entrego_copia,
        doc_comprobante_ingresos_cuenta: req.body.doc_comprobante_ingresos_cuenta,
        doc_comprobante_ingresos_mostro: req.body.doc_comprobante_ingresos_mostro,
        doc_comprobante_ingresos_entrego_copia: req.body.doc_comprobante_ingresos_entrego_copia,
        id_acreditado: req.body.id_acreditado
    }

    const query = 'INSERT INTO t_documentos SET ?'
    conexion.query(query, datosDocumentos, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron los datos correctamente')
    })
})

app.post('/appAgregarDatosEspecificiosVivienda', (req,res)=>{
    const datosEspecificosVivienda = {
        vivienda_numero_habitaciones: req.body.vivienda_numero_habitaciones,
        vivienda_tipo_piso: req.body.vivienda_tipo_piso,
        vivienda_tipo_piso_otro: req.body.vivienda_tipo_piso_otro,
        vivienda_tipo_techo: req.body.vivienda_tipo_techo,
        vivienda_cuenta_bano: req.body.vivienda_cuenta_bano,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_especivivienda SET ?'
    conexion.query(query, datosEspecificosVivienda, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron los datos correctamente')
    })
})

app.post('/appAgregarObservaciones', (req,res)=>{
    const datosObservaciones = {
        observaciones_entrevistador: req.body.observaciones_entrevistador,
        id_acreditado: req.body.id_acreditado
    }
    const query = 'INSERT INTO t_observaciones SET ?'
    conexion.query(query, datosObservaciones, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el comentario')
    })
})

app.put('/appActualizarDatosGenerales/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_generales SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos generales actualizados' });
    });
});

app.put('/appActualizarFechaVisita/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_visitas SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Fechas de visita actualizadas' });
    });
});

app.put('/appActualizarDatosVivienda/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_vivienda SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de vivienda actualizados' });
    });
});

app.put('/appActualizarDatosFechaCredito/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_credito SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de crédito actualizados' });
    });
});

app.put('/appActualizarDatosReestructura/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_reestructura SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de reestructura actualizados' });
    });
});

app.put('/appActualizarDatosGeneralesConyuge/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_conyuge SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos del cónyuge actualizados' });
    });
});

app.put('/appActualizarDatosFamilia/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_familiares SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos familiares actualizados' });
    });
});

app.put('/appActualizarDatosSolicitante/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_solicitante SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos del solicitante actualizados' });
    });
});

app.put('/appActualizarDatosEspecificosConyuge/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_especiconyuge SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos específicos del cónyuge actualizados' });
    });
});

app.put('/appActualizarDatosOtrosFamiliares/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_otrosfamiliares SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de otros familiares actualizados' });
    });
});

app.put('/appActualizarDatosGastos/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_gastos SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de gastos actualizados' });
    });
});

app.put('/appActualizarDatosFamiliaDeudas/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_deudas SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de deudas actualizados' });
    });
});

app.put('/appActualizarDatosTelefono/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_telefonos SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos telefónicos actualizados' });
    });
});

app.put('/appActualizarDatosCobranza/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_cobranza SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de cobranza actualizados' });
    });
});

app.put('/appActualizarDatosDocumentos/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_documentos SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos de documentos actualizados' });
    });
});

app.put('/appActualizarDatosEspecificiosVivienda/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_especivivienda SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Datos específicos de vivienda actualizados' });
    });
});

app.put('/appActualizarObservaciones/:id', (req, res) => {
    const id_acreditado = req.params.id;
    const nuevosDatos = req.body;

    const query = 'UPDATE t_observaciones SET ? WHERE id_acreditado = ?';
    conexion.query(query, [nuevosDatos, id_acreditado], (error, result) => {
        if (error) return res.status(500).json({ success: false, error: error.message });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'No se encontró el acreditado' });
        }
        
        res.json({ success: true, message: 'Observaciones actualizadas' });
    });
});