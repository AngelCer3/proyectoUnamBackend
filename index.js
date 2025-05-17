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

app.post('/appAgregarDatosFechaCredito', (req,res)=>{
    const datosCredito = {
        credito_fecha_entrega: req.body.credito_fecha_entrega,
        credito_monto: req.body.credito_monto,
        credito_suelto_otorgado: req.body.credito_suelto_otorgado,
        credito_fecha_ultimo_pago: req.body.credito_fecha_ultimo_pago,
        credito_recibo_pago: req.body.credito_recibo_pago,
        credito_pago_actual: req.body.credito_pago_actual,
        credito_deuda_actual: req.body.credito_deuda_actual
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
        reestructura_fecha_no_convive: req.body.reestructura_fecha_no_convive
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
        conyuge_comp_computo: req.body.conyuge_comp_computo
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
        comprobante_enfermedad: req.body.comprobante_enfermedad,
        tratamiento_recibido: req.body.tratamiento_recibido,
        tratamiento_lugar: req.body.tratamiento_lugar
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
        ingresos_conceptos_solicitante: req.body.ingresos_conceptos_solicitante
    }
    const query = 'INSERT INTO t_solicitante SET ?'
    conexion.query(query, datosSolicitante, (error)=>{
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
        padre_numero: req.bodq.padre_numero,
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
        no_familiares_aportacion: req.body.no_familiares_aportacion
    }
    const query = 'INSERT INTO t_otrosFamiliares SET ?'
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
        gasto_metodo_pago: req.body.gasto_metodo_pago
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
        familia_cantidad_deuda: req.body.familia_cantidad_deuda
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
        cobranza_comentario: req.body.cobranza_comentario
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
        doc_comprobante_ingreso_entrego_copia: req.body.doc_comprobante_ingreso_entrego_copia
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
        viviendo_cuenta_bano: req.body.viviendo_cuenta_bano
    }
    const query = 'INSERT INTO t_especivivienda SET ?'
    conexion.query(query, datosEspecificosVivienda, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se insertaron los datos correctamente')
    })
})

app.post('/appAgregarObservaciones', (req,res)=>{
    const datosObservaciones = {
        observaciones_entrevistador: req.body.observaciones_entrevistador
    }
    const query = 'INSERT INTO t_observaciones SET ?'
    conexion.query(query, datosObservaciones, (error)=>{
        if(error) return console.error(error.message)

        res.json('Se inserto correctamente el comentario')
    })
})