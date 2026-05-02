const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Scheme    = require('../models/Scheme');
const Law       = require('../models/Law');
const Complaint = require('../models/Complaint');
const Job       = require('../models/Job');
const Alert     = require('../models/Alert');

const SCHEMES = [
  // NATIONAL
  { id:1,  category:'Students',        ministry:'Ministry of Education',            title:'PM Scholarship Scheme',              benefit:'₹25,000 / Year',             eligibility:'BTech / BSc Students',              state:'National', tag:'Scholarship',    docs:['Aadhar Card','Marksheet (10th & 12th)','Income Certificate','Bank Passbook','College ID'],          portal:'https://scholarships.gov.in' },
  { id:2,  category:'Women',           ministry:'Ministry of WCD',                  title:'Mudra Loan for Women',                benefit:'₹10 Lakh Loan',              eligibility:'Women Entrepreneurs',                state:'National', tag:'Loan',           docs:['Aadhar Card','PAN Card','Business Plan','Bank Statement','Residence Proof'],                       portal:'https://mudra.org.in' },
  { id:3,  category:'Farmers',         ministry:'Ministry of Agriculture',          title:'PM-KISAN Samman Nidhi',               benefit:'₹6,000 / Year',              eligibility:'Small & Marginal Farmers',           state:'National', tag:'Direct Benefit', docs:['Aadhar Card','Land Records','Bank Passbook','Mobile Number'],                                     portal:'https://pmkisan.gov.in' },
  { id:4,  category:'MSME',            ministry:'Ministry of MSME',                 title:'Startup India Seed Fund 2.0',         benefit:'₹25 Lakh Grant',             eligibility:'DPIIT-Recognised Startups',          state:'National', tag:'Grant',          docs:['DPIIT Certificate','Business Registration','PAN Card','Pitch Deck'],                              portal:'https://seedfund.startupindia.gov.in' },
  { id:5,  category:'Senior Citizens', ministry:'Ministry of Social Justice',       title:'IGNOAPS Pension',                     benefit:'₹500 / Month',               eligibility:'Age 60+, BPL Category',             state:'National', tag:'Pension',        docs:['Aadhar Card','BPL Certificate','Age Proof','Bank Passbook'],                                      portal:'https://nsap.nic.in' },
  { id:6,  category:'Kids',            ministry:'Ministry of Health',               title:'Poshan Abhiyaan 2.0',                 benefit:'Free Nutrition Kit',         eligibility:'Children 0–6 Years',                 state:'National', tag:'Health',         docs:['Birth Certificate','Aadhar of Parent','Anganwadi Registration'],                                 portal:'https://poshanabhiyaan.gov.in' },
  { id:7,  category:'Artisans',        ministry:'Ministry of Textiles',             title:'PM Vishwakarma Yojana',               benefit:'₹15,000 Toolkit + ₹3L Loan', eligibility:'Traditional Artisans & Craftsmen',   state:'National', tag:'Skill & Loan',  docs:['Aadhar Card','Caste Certificate','Skill Certificate','Bank Passbook'],                            portal:'https://pmvishwakarma.gov.in' },
  { id:8,  category:'Women',           ministry:'Ministry of WCD',                  title:'Beti Bachao Beti Padhao',             benefit:'Educational Support',        eligibility:'Girl Child 0–18 Years',              state:'National', tag:'Education',      docs:['Birth Certificate','Aadhar of Parent','School Enrollment Proof'],                                portal:'https://wcd.nic.in' },
  { id:9,  category:'Farmers',         ministry:'Ministry of Agriculture',          title:'PM Fasal Bima Yojana',                benefit:'Full Crop Insurance',        eligibility:'All Farmers',                        state:'National', tag:'Insurance',      docs:['Land Records','Aadhar Card','Bank Passbook','Sowing Certificate'],                                portal:'https://pmfby.gov.in' },
  { id:10, category:'Engineers',       ministry:'DRDO / DST',                       title:'SERB Core Research Grant',            benefit:'₹35 Lakh Research Fund',     eligibility:'PhD Engineers & Scientists',         state:'National', tag:'Research Grant', docs:['Academic Credentials','Research Proposal','Institution NOC','PAN Card'],                          portal:'https://serbonline.in' },
  { id:11, category:'Women',           ministry:'Ministry of Finance',              title:'Stand-Up India Scheme',               benefit:'₹10L – ₹1 Crore Loan',      eligibility:'SC/ST & Women Entrepreneurs',        state:'National', tag:'Loan',           docs:['Aadhar Card','PAN Card','Business Plan','Caste Certificate'],                                     portal:'https://www.standupmitra.in' },
  { id:12, category:'Students',        ministry:'Ministry of Minority Affairs',     title:'PM YASASVI Scholarship 2025',         benefit:'₹75,000 – ₹1.25 Lakh',      eligibility:'OBC/EBC/DNT Students Class 9–12',    state:'National', tag:'Scholarship',    docs:['Aadhar Card','Caste Certificate','Income Certificate','Marksheet'],                               portal:'https://scholarships.gov.in' },
  { id:13, category:'Students',        ministry:'Ministry of Education',            title:'National Means-cum-Merit Scholarship', benefit:'₹12,000 / Year',            eligibility:'Class 8 Pass, Family Income < ₹3.5L', state:'National', tag:'Scholarship',   docs:['Aadhar Card','Class 8 Marksheet','Income Certificate','Bank Passbook'],                           portal:'https://scholarships.gov.in' },
  { id:14, category:'MSME',            ministry:'Ministry of MSME',                 title:'CGTMSE Credit Guarantee 2025',        benefit:'Up to ₹5 Crore Guarantee',   eligibility:'Micro & Small Enterprises',          state:'National', tag:'Guarantee',      docs:['UDYAM Registration','Bank Statement','Business Plan','ITR'],                                      portal:'https://www.cgtmse.in' },
  { id:15, category:'Farmers',         ministry:'Ministry of Agriculture',          title:'Kisan Credit Card 2025',              benefit:'₹3 Lakh @ 4% Interest',      eligibility:'All Farmers & Allied Workers',       state:'National', tag:'Credit',         docs:['Aadhar Card','Land Records','Ration Card','Passport Photo'],                                      portal:'https://pmkisan.gov.in' },
  { id:16, category:'Senior Citizens', ministry:'Ministry of Health',               title:'Ayushman Bhav — Vayo Vandana',        benefit:'Free Health Checkup + ₹5L Insurance', eligibility:'Age 70+, All Categories',      state:'National', tag:'Health',         docs:['Aadhar Card','Age Proof','Ration Card'],                                                          portal:'https://abdm.gov.in' },
  { id:17, category:'Women',           ministry:'Ministry of Labour',               title:'PM Matru Vandana Yojana 2.0',         benefit:'₹11,000 (2nd Girl Child)',   eligibility:'Pregnant & Lactating Women',         state:'National', tag:'Direct Benefit', docs:['Aadhar Card','MCP Card','Bank Passbook','Ration Card'],                                           portal:'https://pmmvy.wcd.gov.in' },
  { id:18, category:'Kids',            ministry:'Ministry of Education',            title:'Samagra Shiksha Abhiyan 2.0',         benefit:'Free Books + Uniform + Mid-Day Meal', eligibility:'Class 1–12 Students',         state:'National', tag:'Education',      docs:['Aadhar Card','School Enrollment','Ration Card'],                                                  portal:'https://samagra.mhrd.gov.in' },
  { id:19, category:'MSME',            ministry:'Ministry of Commerce',             title:'RoDTEP Scheme 2025',                  benefit:'Tax Rebate on Exports',      eligibility:'Registered Exporters',               state:'National', tag:'Export Benefit', docs:['IEC Code','GST Registration','Bank Account','Shipping Bills'],                                     portal:'https://dgft.gov.in' },
  { id:20, category:'Engineers',       ministry:'MeitY',                            title:'IndiaAI Mission — Startup Fund',      benefit:'₹50 Lakh – ₹2 Crore',       eligibility:'AI Startups & Researchers',          state:'National', tag:'AI Grant',       docs:['DPIIT Certificate','AI Project Proposal','Team Credentials','PAN Card'],                          portal:'https://indiaai.gov.in' },

  // J&K
  { id:21, category:'Students',        ministry:'J&K Government',                   title:'J&K Merit Scholarship 2025',          benefit:'₹12,000 / Year',             eligibility:'J&K Domicile, Top 10% in Class',     state:'J&K',      tag:'Scholarship',    docs:['Domicile Certificate','Aadhar Card','Marksheet','Income Certificate'],                            portal:'https://jkscholarship.nic.in' },
  { id:22, category:'MSME',            ministry:'J&K Industries Department',        title:'J&K New Industrial Policy 2024',      benefit:'30% Capital Subsidy',        eligibility:'New Industrial Units in J&K',        state:'J&K',      tag:'Subsidy',        docs:['Business Registration','Land Allotment Letter','Project Report','GST'],                          portal:'https://jkindustries.gov.in' },
  { id:23, category:'Farmers',         ministry:'J&K Agriculture Department',       title:'J&K Organic Farming Mission',         benefit:'₹10,000 / Acre Subsidy',     eligibility:'J&K Farmers with < 5 Acres',         state:'J&K',      tag:'Agriculture',    docs:['Land Records','Aadhar Card','Bank Passbook','Soil Health Card'],                                  portal:'https://jkagrisnet.nic.in' },

  // DELHI
  { id:24, category:'Students',        ministry:'Delhi Government',                 title:'Delhi Merit Scholarship 2025',        benefit:'₹2,500 / Month',             eligibility:'Delhi Govt School Students, 80%+',   state:'Delhi',    tag:'Scholarship',    docs:['Aadhar Card','School ID','Marksheet','Domicile Certificate'],                                     portal:'https://edudel.nic.in' },
  { id:25, category:'Women',           ministry:'Delhi Government',                 title:'Mukhyamantri Mahila Samman Yojana',   benefit:'₹1,000 / Month',             eligibility:'Delhi Women Age 18+',                state:'Delhi',    tag:'Direct Benefit', docs:['Aadhar Card','Voter ID','Delhi Domicile','Bank Passbook'],                                        portal:'https://delhi.gov.in' },
  { id:26, category:'MSME',            ministry:'Delhi Government',                 title:'Delhi Startup Policy 2024 Grant',     benefit:'₹20 Lakh Seed Grant',        eligibility:'Delhi-based Registered Startups',    state:'Delhi',    tag:'Grant',          docs:['Company Registration','Delhi Address Proof','PAN Card','Pitch Deck'],                             portal:'https://dipp.delhi.gov.in' },

  // PUNJAB
  { id:27, category:'Farmers',         ministry:'Punjab Agriculture Department',    title:'Punjab Kisan Karj Mafi 2024',         benefit:'Loan Waiver up to ₹2 Lakh',  eligibility:'Small & Marginal Punjab Farmers',    state:'Punjab',   tag:'Loan Waiver',    docs:['Land Records','Kisan Credit Card','Aadhar Card','Bank Statement'],                                portal:'https://punjab.gov.in' },
  { id:28, category:'Students',        ministry:'Punjab Government',                title:'Punjab Ashirwad Scholarship',         benefit:'₹21,000 One-time',           eligibility:'SC Girls, Class 1 Admission',        state:'Punjab',   tag:'Scholarship',    docs:['Birth Certificate','SC Certificate','Aadhar Card','School Enrollment'],                           portal:'https://punjabscholarships.gov.in' },
  { id:29, category:'Women',           ministry:'Punjab Government',                title:'Mata Tripta Mahila Yojana',           benefit:'₹18,500 Financial Aid',      eligibility:'Punjab Women BPL Families',          state:'Punjab',   tag:'Direct Benefit', docs:['Aadhar Card','BPL Certificate','Bank Passbook','Domicile'],                                       portal:'https://punjab.gov.in' },

  // HARYANA
  { id:30, category:'Students',        ministry:'Haryana Government',               title:'Haryana Medhavi Chhatra Yojana',      benefit:'₹5,000 – ₹11,000 / Year',   eligibility:'Haryana Students 60%+ in Class 10',  state:'Haryana',  tag:'Scholarship',    docs:['Aadhar Card','Marksheet','Domicile Certificate','Income Certificate'],                            portal:'https://haryana.gov.in' },
  { id:31, category:'Farmers',         ministry:'Haryana Agriculture',              title:'Haryana Krishi Yantra Anudan',        benefit:'40–50% Subsidy on Equipment', eligibility:'Haryana Farmers',                   state:'Haryana',  tag:'Subsidy',        docs:['Land Records','Aadhar Card','Bank Passbook','Equipment Quotation'],                                portal:'https://agriharyana.gov.in' },
];

const LAWS = [
  { id:1, title:'Digital Personal Data Protection Act, 2023',      date:'Aug 2023', status:'Enacted',    summary:'Your data is yours — companies must ask before collecting it.',                        bullets:['Every app must take explicit permission before storing personal data.','You can request any company to delete your data at any time.','Children\'s data gets extra protection — parents must give consent.','Fines up to ₹250 Crore for data breaches.'] },
  { id:2, title:'Telecommunications Act, 2023',                     date:'Dec 2023', status:'Enacted',    summary:'Overhauled telecom rules, replacing a 100-year-old colonial law.',                    bullets:['Government can take over telecom networks during national emergencies.','Stricter rules against spam calls and SIM fraud.','New spectrum policy paving way for 5G & 6G rollout.','Right of way for cable laying simplified for faster internet expansion.'] },
  { id:3, title:'Bharatiya Nyaya Sanhita (BNS), 2023',              date:'Jul 2024', status:'In Force',   summary:'India\'s new criminal law — replaces the 163-year-old IPC.',                          bullets:['Murder still punishable by death or life imprisonment.','New provisions for organised crime, terrorism & cyber crimes.','Faster trial mandate — must conclude within 3 years.','Better-defined provisions on sexual crimes and digital offences.'] },
  { id:4, title:'Anusandhan National Research Foundation Act, 2023', date:'2023',    status:'Active',     summary:'₹50,000 Crore fund to supercharge Indian science & research.',                        bullets:['Central funding body for all science & technology research.','Industry-academia partnerships now much easier.','Focus: AI, quantum computing, clean energy, biotech.','Open to individual researchers, not just institutions.'] },
  { id:5, title:'Forest (Conservation) Amendment Act, 2023',        date:'Aug 2023', status:'Enacted',    summary:'Streamlines forest clearances while adding conservation safeguards.',                  bullets:['Strategic projects near international borders get faster clearance.','Carbon credits can now officially be traded from Indian forests.','Eco-tourism within forests permitted under regulation.','Tribal rights and gram sabha consent remain mandatory.'] },
  { id:6, title:'Right to Repair Framework, 2024',                  date:'Apr 2024', status:'In Force',   summary:'Citizens now have the right to repair their own electronic devices.',                  bullets:['Manufacturers must provide spare parts and repair manuals.','Voids warranty clauses for third-party repairs are now illegal.','Reduces e-waste by encouraging repair over replacement.','Covers smartphones, appliances, farm equipment, and automobiles.'] },
  { id:7, title:'Indian Ports Act, 2025',                           date:'Jan 2025', status:'Enacted',    summary:'Modernises port governance replacing a law from 1908.',                               bullets:['Single regulator for all major and minor ports.','Faster environmental clearances for port expansion.','New framework for private investment in port infrastructure.','Dispute resolution mechanism for port-related conflicts.'] },
  { id:8, title:'Broadcasting Services (Regulation) Bill, 2024',    date:'Nov 2024', status:'Enacted',    summary:'Brings OTT platforms and digital news under broadcasting regulation.',                 bullets:['Netflix, Amazon Prime, YouTube now under content regulation.','Content Evaluation Committees for OTT platforms mandatory.','Self-regulation mechanism for digital news publishers.','Heavy fines for non-compliance with content standards.'] },
  { id:9, title:'Space Activities Bill, 2024',                      date:'Sep 2024', status:'Enacted',    summary:'Opens India\'s space sector to private companies for the first time.',                bullets:['Private companies can now launch satellites and rockets legally.','IN-SPACe acts as the regulator for all space activities.','Liability framework for space debris and satellite collisions.','Technology transfer from ISRO to private sector now permitted.'] },
];

const COMPLAINTS = [
  { id:'TKT-2341', category:'Pothole',        location:'MG Road, Sector 4, Jammu',          status:'Resolved', date:'Apr 20' },
  { id:'TKT-2298', category:'Illegal Dump',   location:'Near Bus Stand, Jammu',             status:'Assigned', date:'Apr 22' },
  { id:'TKT-2187', category:'Broken Light',   location:'Gandhi Nagar Crossing, Jammu',      status:'Pending',  date:'Apr 24' },
  { id:'TKT-2156', category:'Waterlogging',   location:'Sector 7, Dwarka, Delhi',           status:'Resolved', date:'Apr 18' },
  { id:'TKT-2134', category:'Damaged Road',   location:'GT Road, Amritsar, Punjab',         status:'Assigned', date:'Apr 15' },
];

const JOBS = [
  { id:1,  title:'Junior Engineer (Civil)',       org:'DRDO',              location:'Delhi',        type:'Government',  category:'Engineer',  deadline:'Jun 2025', link:'https://drdo.gov.in' },
  { id:2,  title:'Agniveer (Army)',               org:'Indian Army',       location:'PAN India',    type:'Defence',     category:'Defence',   deadline:'May 2025', link:'https://joinindianarmy.nic.in' },
  { id:3,  title:'Constable Recruit',             org:'Delhi Police',      location:'Delhi',        type:'Police',      category:'Police',    deadline:'Jun 2025', link:'https://delhipolice.gov.in' },
  { id:4,  title:'Agricultural Field Officer',    org:'NABARD',            location:'Mumbai',       type:'Government',  category:'Farmer',    deadline:'May 2025', link:'https://nabard.org' },
  { id:5,  title:'Staff Nurse',                   org:'AIIMS Delhi',       location:'Delhi',        type:'Healthcare',  category:'Nurse',     deadline:'Jul 2025', link:'https://aiims.edu' },
  { id:6,  title:'Primary Teacher (PRT)',         org:'KVS',               location:'PAN India',    type:'Education',   category:'Teacher',   deadline:'Jun 2025', link:'https://kvsangathan.nic.in' },
  { id:7,  title:'Data Entry Operator',           org:'NIC',               location:'PAN India',    type:'Government',  category:'Engineer',  deadline:'May 2025', link:'https://nic.in' },
  { id:8,  title:'Scientist B (Computer Science)',org:'ISRO',              location:'Bengaluru',    type:'Space',       category:'Engineer',  deadline:'Aug 2025', link:'https://isro.gov.in' },
  { id:9,  title:'Assistant Commandant',          org:'CRPF',              location:'PAN India',    type:'Paramilitary', category:'Defence',  deadline:'Jun 2025', link:'https://crpf.gov.in' },
  { id:10, title:'Junior Hindi Translator',       org:'SSC',               location:'PAN India',    type:'Government',  category:'Teacher',   deadline:'May 2025', link:'https://ssc.nic.in' },
  { id:11, title:'Forest Guard',                  org:'Forest Department', location:'Uttarakhand',  type:'Government',  category:'Defence',   deadline:'Jul 2025', link:'https://uttarakhand.gov.in' },
  { id:12, title:'Research Associate (AI/ML)',    org:'C-DAC',             location:'Pune',         type:'Tech',        category:'Engineer',  deadline:'Jun 2025', link:'https://cdac.in' },
  { id:13, title:'Agniveer (Navy)',               org:'Indian Navy',       location:'PAN India',    type:'Defence',     category:'Defence',   deadline:'May 2025', link:'https://joinindiannavy.gov.in' },
  { id:14, title:'Pharmacist Grade II',           org:'ESIC',              location:'PAN India',    type:'Healthcare',  category:'Nurse',     deadline:'Jun 2025', link:'https://esic.nic.in' },
];

const ALERTS = [
  { city:'Jammu',     type:'Power Cut',  msg:'Scheduled outage in Sectors 3–7: 10 AM – 1 PM today.',                          icon:'⚡' },
  { city:'Jammu',     type:'Startup',    msg:'New Incubation Centre launching at Jammu University — registrations open.',      icon:'🏢' },
  { city:'Delhi',     type:'Water',      msg:'Supply disruption in Dwarka Sector 12: 6 AM – 11 AM tomorrow.',                  icon:'💧' },
  { city:'Delhi',     type:'Alert',      msg:'Air Quality Index hits 310 (Very Poor) — avoid outdoor activity after 8 PM.',    icon:'🌫️' },
  { city:'Mumbai',    type:'Transit',    msg:'Metro Line 3 partial suspension — use BEST bus on alternate route today.',        icon:'🚇' },
  { city:'Bengaluru', type:'Road',       msg:'ORR flyover closed for repair: Marathahalli to Silk Board, next 3 days.',         icon:'🚧' },
  { city:'Punjab',    type:'Farming',    msg:'Paddy stubble burning ban in effect — violators face ₹2,500 fine per acre.',      icon:'🌾' },
  { city:'Haryana',   type:'Alert',      msg:'Haryana Board results releasing May 10 — check bhiwani.bseh.org.in.',             icon:'📋' },
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

  console.log(`Seeded:
  - ${SCHEMES.length} Schemes
  - ${LAWS.length} Laws
  - ${COMPLAINTS.length} Complaints
  - ${JOBS.length} Jobs
  - ${ALERTS.length} Alerts`);

  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
