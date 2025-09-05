import Appointment from "../models/Appointment.js";
export const createAppointment = async (req,res)=>{
  const { dateTime, department, comments } = req.body;
  if(!dateTime || !department) return res.status(400).json({message:"dateTime & department required"});
  const reportFiles = (req.files||[]).map(f=>`/uploads/${f.filename}`);
  const appt = await Appointment.create({ user:req.userId, dateTime, department, comments, reportFiles });
  res.status(201).json(appt);
};
export const myAppointments = async (req,res)=>{
  const qYear = req.query.year ? parseInt(req.query.year) : null;
  const filter = { user: req.userId };
  if(qYear){
    const start = new Date(Date.UTC(qYear,0,1));
    const end = new Date(Date.UTC(qYear+1,0,1));
    filter.dateTime = { $gte:start, $lt:end };
  }
  const list = await Appointment.find(filter).sort({dateTime:-1});
  res.json(list);
};
