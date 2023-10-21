import {testimonial} from '../models/testimoniales.js'

const guardarTestimonial = async (req, res) => {

    const {nombre, correo, mensaje} = req.body;

    const errores = [];
    
    // Validar...
    if(nombre.trim() === '') {
        errores.push({mensaje : 'El Nombre esta vacio'});
    }

    if(correo.trim() === '') {
        errores.push({mensaje : 'El Correo esta vacio'});
    }

    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio'});
    }

    if(errores.length > 0) {

        // Consultar Testimoniales Existentes
        const testimoniales = await testimonial.findAll()

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenar los datos
        try {
            await testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }

}

export {
    guardarTestimonial,
}