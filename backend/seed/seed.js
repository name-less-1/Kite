const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Scheme    = require('../models/Scheme');
const Law       = require('../models/Law');
const Complaint = require('../models/Complaint');
const Job       = require('../models/Job');
const Alert     = require('../models/Alert');

const SCHEMES = [
  { id:1,  category:'Students',        ministry:'Ministry of Education',        title:'PM Scholarship Scheme',        benefit:'₹25,000 / Year',             eligibility:'BTech / BSc Students',            state:'National', tag:'Scholarship',    docs:['Aadhar Card','Marksheet (10th & 12th)','Income Certificate','Bank Passbook','College ID'],      portal:'https://scholarships.gov.in' },
  { id:2,  category:'Women',           ministry:'Ministry of WCD',              title:'Mudra Loan for Women',          benefit:'₹10 Lakh Loan',              eligibility:'Women Entrepreneurs',              state:'National', tag:'Loan',           docs:['Aadhar Card','PAN Card','Business Plan','Bank Statement','Residence Proof'],                   portal:'https://mudra.org.in' },
  { id:3,  category:'Farmers',         ministry:'Ministry of Agriculture',      title:'PM-KISAN Samman Nidhi',         benefit:'₹6,000 / Year',              eligibility:'Small & Marginal Farmers',         state:'National', tag:'Direct Benefit', docs:['Aadhar Card','Land Records','Bank Passbook','Mobile Number'],                                 portal:'https://pmkisan.gov.in' },
  { id:4,  category:'MSME',            ministry:'Ministry of MSME',             title:'Startup India Seed Fund',       benefit:'₹20 Lakh Grant',             eligibility:'DPIIT-Recognised Startups',        state:'National', tag:'Grant',          docs:['DPIIT Certificate','Business Registration','PAN Card','Pitch Deck','Aadhar Card'],             portal:'https://seedfund.startupindia.gov.in' },
  { id:5,  category:'Senior Citizens', ministry:'Ministry of Social Justice',   title:'IGNOAPS Pension',               benefit:'₹500 / Month',               eligibility:'Age 60+, BPL Category',           state:'National', tag:'Pension',        docs:['Aadhar Card','BPL Certificate','Age Proof','Bank Passbook'],                                  portal:'https://nsap.nic.in' },
  { id:6,  category:'Kids',            ministry:'Ministry of Health',           title:'Poshan Abhiyaan',               benefit:'Free Nutrition Kit',         eligibility:'Children 0–6 Years',               state:'National', tag:'Health',         docs:['Birth Certificate','Aadhar of Parent','Anganwadi Registration'],                             portal:'https://poshanabhiyaan.gov.in' },
  { id:7,  category:'Students',        ministry:'J&K Government',               title:'J&K Merit Scholarship',         benefit:'₹10,000 / Year',             eligibility:'J&K Resident Students',            state:'J&K',      tag:'Scholarship',    docs:['Domicile Certificate','Aadhar Card','Marksheet','Income Certificate'],                        portal:'https://jkscholarship.nic.in' },
  { id:8,  category:'Artisans',        ministry:'Ministry of Textiles',         title:'PM Vishwakarma Yojana',         benefit:'₹15,000 Toolkit + Loan',     eligibility:'Traditional Artisans & Craftsmen', state:'National', tag:'Skill & Loan',  docs:['Aadhar Card','Caste Certificate (if applicable)','Skill Certificate','Bank Passbook'],         portal:'https://pmvishwakarma.gov.in' },
  { id:9,  category:'Women',           ministry:'Ministry of WCD',              title:'Beti Bachao Beti Padhao',       benefit:'Educational Support',        eligibility:'Girl Child 0–18 Years',            state:'National', tag:'Education',      docs:['Birth Certificate','Aadhar of Parent','School Enrollment Proof'],                            portal:'https://wcd.nic.in' },
  { id:10, category:'MSME',            ministry:'Ministry of Commerce',         title:'One District One Product',      benefit:'₹2.5 Crore Market Support',  eligibility:'Local Product Manufacturers',      state:'UP',       tag:'Market Access',  docs:['GSTIN','UDYAM Registration','Bank Statement','Product Sample'],                               portal:'https://odop.in' },
  { id:11, category:'Farmers',         ministry:'Ministry of Agriculture',      title:'PM Fasal Bima Yojana',          benefit:'Full Crop Insurance',        eligibility:'All Farmers',                      state:'National', tag:'Insurance',      docs:['Land Records','Aadhar Card','Bank Passbook','Sowing Certificate'],                            portal:'https://pmfby.gov.in' },
  { id:12, category:'Engineers',       ministry:'DRDO / DST',                   title:'SERB Core Research Grant',      benefit:'₹35 Lakh Research Fund',     eligibility:'PhD Engineers & Scientists',       state:'National', tag:'Research Grant', docs:['Academic Credentials','Research Proposal','Institution NOC','PAN Card'],                      portal:'https://serbonline.in' },
  { id:13, category:'Women',           ministry:'Ministry of Finance',          title:'Stand-Up India Scheme',         benefit:'₹10L – ₹1 Crore Loan',      eligibility:'SC/ST & Women Entrepreneurs',      state:'National', tag:'Loan',           docs:['Aadhar Card','PAN Card','Business Plan','Bank Statement','Caste Certificate'],                portal:'https://www.standupmitra.in' },
  { id:14, category:'Students',        ministry:'Ministry of Minority Affairs', title:'PM Yasasvi Scholarship',        benefit:'₹75,000 – ₹1.25 Lakh',      eligibility:'OBC/EBC/DNT Students Class 9-12',  state:'National', tag:'Scholarship',    docs:['Aadhar Card','Caste Certificate','Income Certificate','Marksheet'],                           portal:'https://scholarships.gov.in' },
  { id:15, category:'Senior Citizens', ministry:'Ministry of Health',           title:'Rashtriya Vayoshri Yojana',     benefit:'Free Assistive Devices',     eligibility:'Age 60+, BPL',                     state:'National', tag:'Health Aid',     docs:['Aadhar Card','Age Proof','BPL Certificate','Disability Certificate'],                         portal:'https://www.alimco.in' },
  { id:16, category:'Farmers',         ministry:'Ministry of Agriculture',      title:'Kisan Credit Card',             benefit:'₹3 Lakh @ 4% Interest',      eligibility:'All Farmers & Allied Workers',     state:'National', tag:'Credit',         docs:['Aadhar Card','Land Records','Ration Card','Passport Photo'],                                  portal:'https://pmkisan.gov.in' },
  { id:17, category:'MSME',            ministry:'Ministry of MSME',             title:'CGTMSE Credit Guarantee',       benefit:'Up to ₹5 Crore Guarantee',   eligibility:'Micro & Small Enterprises',        state:'National', tag:'Guarantee',      docs:['UDYAM Registration','Bank Statement','Business Plan','ITR'],                                  portal:'https://www.cgtmse.in' },
  { id:18, category:'Kids',            ministry:'Ministry of Education',        title:'Samagra Shiksha Abhiyan',       benefit:'Free Books + Uniform',       eligibility:'Class 1–12 Students',              state:'National', tag:'Education',      docs:['Aadhar Card','School Enrollment','Ration Card'],                                              portal:'https://samagra.mhrd.gov.in' },
];

const LAWS = [
  { id:1, title:'Digital Personal Data Protection Act, 2023', date:'Aug 2023', status:'Enacted',  summary:"Your data is yours — companies must ask before collecting it.",           bullets:["Every app must take your explicit permission before storing personal data.","You can request any company to delete your data at any time.","Children's data gets extra protection — parents must give consent.","Fines up to ₹250 Crore for data breaches by companies."] },
  { id:2, title:'Telecommunications Act, 2023',               date:'Dec 2023', status:'Enacted',  summary:"Overhauled telecom rules, replacing a 100-year-old colonial law.",         bullets:["Government can take over telecom networks during national emergencies.","Stricter rules against spam calls and SIM fraud — harsh penalties.","New spectrum allocation policy paving way for 5G & 6G rollout.","Right of way for cable laying simplified for faster internet expansion."] },
  { id:3, title:'Bharatiya Nyaya Sanhita (BNS), 2023',        date:'Jul 2024', status:'In Force', summary:"India's new criminal law — replaces the 163-year-old IPC.",                bullets:["Murder still punishable by death or life imprisonment.","New provision for organised crime, terrorism & cyber crimes.","Faster trial mandate — must conclude within 3 years.","Better-defined provisions on sexual crimes and digital offences."] },
  { id:4, title:'Anusandhan National Research Foundation',     date:'2023',     status:'Active',   summary:"₹50,000 Crore fund to supercharge Indian science & research.",             bullets:["Central funding body for all science & technology research in India.","Industry-academia partnerships now much easier to form.","Focus areas: AI, quantum computing, clean energy, biotech.","Open to individual researchers, not just large institutions."] },
  { id:5, title:'Forest (Conservation) Amendment Act, 2023',  date:'Aug 2023', status:'Enacted',  summary:"Streamlines forest clearances while adding conservation safeguards.",       bullets:["Strategic projects near international borders get faster clearance.","Carbon credits can now officially be traded from Indian forests.","Eco-tourism within forests is now permitted under regulation.","Tribal rights and gram sabha consent remain mandatory."] },
];

const COMPLAINTS = [
  { id:'TKT-2341', category:'Pothole',      location:'MG Road, Sector 4, Jammu', status:'Resolved', date:'Apr 20' },
  { id:'TKT-2298', category:'Illegal Dump', location:'Near Bus Stand, Jammu',    status:'Assigned', date:'Apr 22' },
  { id:'TKT-2187', category:'Broken Light', location:'Gandhi Nagar Crossing',    status:'Pending',  date:'Apr 24' },
];

const JOBS = [
  { id:1, title:'Junior Engineer',     org:'DRDO',        location:'Delhi',    type:'Government', category:'Engineer' },
  { id:2, title:'Agniveer (Army)',      org:'Indian Army', location:'PAN India', type:'Defence',   category:'Farmer' },
  { id:3, title:'Constable Recruit',   org:'Delhi Police', location:'Delhi',   type:'Police',     category:'Engineer' },
  { id:4, title:'Agricultural Officer',org:'NABARD',       location:'Mumbai',  type:'Government', category:'Farmer' },
  { id:5, title:'Staff Nurse',         org:'AIIMS',        location:'Delhi',   type:'Healthcare', category:'Nurse' },
  { id:6, title:'Primary Teacher',     org:'KVS',          location:'PAN India', type:'Education', category:'Teacher' },
];

const ALERTS = [
  { city:'Jammu',     type:'Power Cut', msg:'Scheduled outage in Sectors 3–7: 10 AM – 1 PM today.',                         icon:'⚡' },
  { city:'Jammu',     type:'Startup',   msg:'New Incubation Centre launching at Jammu University — registrations now open.', icon:'🏢' },
  { city:'Delhi',     type:'Water',     msg:'Supply disruption in Dwarka Sector 12: 6 AM – 11 AM tomorrow.',                 icon:'💧' },
  { city:'Mumbai',    type:'Transit',   msg:'Metro Line 3 partial suspension — use BEST bus on alternate route today.',       icon:'🚇' },
  { city:'Bengaluru', type:'Road',      msg:'ORR flyover closed for repair: Marathahalli to Silk Board, next 3 days.',        icon:'🚧' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Promise.all([
    Scheme.deleteMany({}),
    Law.deleteMany({}),
    Complaint.deleteMany({}),
    Job.deleteMany({}),
    Alert.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  await Promise.all([
    Scheme.insertMany(SCHEMES),
    Law.insertMany(LAWS),
    Complaint.insertMany(COMPLAINTS),
    Job.insertMany(JOBS),
    Alert.insertMany(ALERTS),
  ]);

  console.log('Seeded: Schemes, Laws, Complaints, Jobs, Alerts');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
