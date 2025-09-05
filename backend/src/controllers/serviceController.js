import Service from "../models/Service.js";
const defaultServices = [
  { title:"Regular healthcare package", description:"Annual checkups" },
  { title:"CT-SCAN | X-RAY" }, { title:"Lab Test" },
  { title:"Gynae health" }, { title:"Ayurveda Treatment" }, { title:"Dental Checkup" }
];
export const getServices = async (req,res)=>{
  if(await Service.countDocuments()==0) await Service.insertMany(defaultServices);
  const services = await Service.find().sort({createdAt:-1});
  res.json(services);
};
