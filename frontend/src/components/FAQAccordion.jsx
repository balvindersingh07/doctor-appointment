import { useState } from "react";

const faqs = [
  { q: "How do I book an appointment?", a: "Login → Book Appointment → choose doctor type, date & time → attach reports → Submit." },
  { q: "Where can I see my bookings?", a: "Open My Appointments. You can filter by year from the dropdown." },
  { q: "Are reports supported?", a: "Yes, you can upload multiple PDF/JPG/PNG while booking." },
];

export default function FAQAccordion(){
  const [open,setOpen] = useState(null);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
      {faqs.map((f,i)=>(
        <div key={i} className="border rounded-lg">
          <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex justify-between items-center p-3 font-medium">
            {f.q}
            <span>{open===i?"-":"+"}</span>
          </button>
          {open===i && <div className="p-3 text-gray-600">{f.a}</div>}
        </div>
      ))}
    </div>
  );
}
