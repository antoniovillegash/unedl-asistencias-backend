// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const axios = require("axios");


function sendAttendanceEmail(name, shift, lesson, subject, links, res) {

    // FORMATTING EXAMPLE
    //   name: 'Luis Antonio Villegas Hernández',
    //   shift: 'matutino',
    //   lesson: matemaáticas III,
    //   subject: 'derivadas',
    //   links: [
    //     {
    //       link: 'https://www.brandsoftheworld.com/logo/universidad-enrique-diaz-de-leon',
    //       isPermanent: true
    //     },
    //     {
    //       link: 'https://www.brandsoftheworld.com/logo/universidad-enrique-diaz-de-leon',
    //       isPermanent: false
    //     }
    //   ]


        try{
            
            let linkListItem=''
            links.map( linkObj =>{
                if(linkObj.isPermanent){
                    linkListItem+=`<li><a style="text-decoration: none; display: inline-block; 
                    font-size: 19px; padding: 7px; border:1px solid #445359 ; border-radius: 10px; background-color: #20396A ;
                     color:white ; margin-bottom: 5px;" href="${linkObj.link}">Enlace Permanente</a></li>`;
                }
                else{
                    linkListItem+=`<li><a style="text-decoration: none; display: inline-block; 
                    font-size: 19px; padding: 7px; border:1px solid #445359 ; border-radius: 10px; background-color: #20396A ;
                     color:white ; margin-bottom: 5px;" href="${linkObj.link}">Enlace No Permanente</a></li>`;
                }
            })
            let linksList=`<ul style="list-style: none;text-align: center; padding:0;">${linkListItem}</ul>`;


            let htmlTemplate = `<!DOCTYPE html><html><head> <title>Tarea Efectuada</title> 
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body 
            bgcolor="#e8e8e8" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0"> 
            <table style="margin-top: 10%;" align="center" id="Tabla_01" width="60%" height="0" 
            border="0" cellpadding="0" cellspacing="0"> <tr bgcolor="#20396A" height="100px"> 
            <td align="center" > <img style="width: 100px; margin-top: 10px; " 
            src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012018/untitled-3_21.png?b05RprP0nPyIHMjzdNdAgmkRGKOcui37&itok=2gghXYcl" 
            width="40%" alt="" align="center" cellpadding="20%"> </td></tr><tr bgcolor="#20396A" 
            height="100px"> <td align="center" style="color: white; font-size: 20px; 
            font-weight: bold;" > <p align="center; color: white;"> El profesor ${name} del turno ${shift}
            <br>realizo el formulario para la materia ${lesson} del tema ${subject}</p></td></tr><tr> <td colspan="7" 
            bgcolor="#FFFFFF"> <p align="center"> <font color="#445359" size="+1" face="Trebuchet MS Regular, Arial, Ms Sans Serif"> 
            <br>Links de la tarea <br></font> </p><p align="center"> ${linksList} </p></td></tr><tr> <td colspan="7" 
             bgcolor="#F2B705"> <p align="center" style="margin: 4px;"> <font color="#FFFFFF" size="2" face="Trebuchet MS Regular, Arial, 
             Ms Sans Serif"> Derechos reservados © 2020 UNEDL Ing. Software </font> </p></td></tr></table></body></html>`;
             
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SG_API_KEY);
            const msg = {
                to: 'tonyvllegas@gmail.com',
                from: 'mainsaw_12@live.com.mx',
                subject: 'Asistencia',
                html: htmlTemplate,
            };
            sgMail.send(msg)
            return { success: true, message: 'Se ha enviado el registro de asistencia' }
        }catch(error){
            console.log(error)
            return { success: false, message: 'No se ha podido enviar el registro de asistencia' }
        }
        
}


function sendResetPasswordEmail(linkToReset, email, res) {
    try {
        let htmlTemplate = `<!DOCTYPE html><html><head> <title>Restablecer contraseña</title> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body bgcolor="#e8e8e8" leftmargin="0" 
        topmargin="0" marginwidth="0" marginheight="0"> <table style="margin-top: 10%;" align="center" id="Tabla_01" width="60%" 
        height="0" border="0" cellpadding="0" cellspacing="0"> <tr bgcolor="#20396A" height="100px"> <td align="center" style=
        "font-size: 25px; color: white;" > UNEDL Ing. Software </td></tr><tr> <td colspan="7" bgcolor="#FFFFFF"> <p align="center"> 
        <font color="#445359" size="+1" face="Trebuchet MS Regular, Arial, Ms Sans Serif"> <br>
        Hace poco solicitaste que se restableciera la contraseña de esta cuenta. Para actualizar tu contraseña haz clic en el siguiente 
        botón:<br><br></font> <br><br><a href="${linkToReset}" 
        style="text-decoration: none; cursor: pointer;" target="_blank"> <font style="background-color:#20396A; padding: 2% 7%; 
        border-radius:1000px;" color="#FFFFFF" size="3" 
        face="Trebuchet MS Regular, Arial, Ms Sans Serif"> Restablecer contaseña</font> </a> 
        <br><br><br><br><br><font style="float: left; text-align: left; margin-left: 4em;" 
        color="#445359" size="4" face="Trebuchet MS Regular, Arial, Ms Sans Serif"> Saludos <br>${email}.</font> 
        </font><br><br></p></td></tr><tr> <td colspan="7" bgcolor="#F2B705"> <p align="center" style="margin: 4px;"> 
        <font color="#FFFFFF" size="2" face="Trebuchet MS Regular, Arial, Ms Sans Serif"> 
        Derechos reservados © 2020 UNEDL Ing. Software </font> </p></td></tr></table></body></html>`;
        
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SG_API_KEY);
        const msg = {
            to: email,
            from: 'mainsaw_12@live.com.mx',
            subject: 'Cambio de contraseña',
            html: htmlTemplate,
        };
        sgMail.send(msg)
        return { success: true, message: 'Se ha enviado el correo de recuperación' }
    } catch (err) {
        return { success: false, message: 'No se ha podido enviar el correo de recuperación' }
    }
}




module.exports = { sendAttendanceEmail, sendResetPasswordEmail };








