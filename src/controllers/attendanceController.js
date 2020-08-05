const attendancesController = {};
const { sendAttendanceEmail } = require('../functions/mailing');



attendancesController.createAttendance = (req, res) => {
  const { name, shift, lesson, subject, links,date } = req.body;
  // console.log({ name, shift, lesson, subject, links })
  const result= sendAttendanceEmail(name, shift, lesson, subject, links, date)
    res.json(result)
  
  // const newattendance = new attendanceModel({
  //   name,
  //   description,
  //   price,
  //   category,
  //   sizes,
  //   images
  // })
  // newattendance.save()
  //   .then(response => {
      
  //         res.json({ success: true, message: 'Se ha guardado la asistencia' })
        
  //   })
  //   .catch(error => {
  //       return res.json({ success: false, message: 'No se pudo guardar la asistencia' });
      
  //   })

}



module.exports = attendancesController;