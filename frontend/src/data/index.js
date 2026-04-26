export const SCHEMES = [
  { id:1,  category:'Students',        ministry:'Ministry of Education',        title:'PM Scholarship Scheme',        benefit:'₹25,000 / Year',             eligibility:'BTech / BSc Students',            state:'National', tag:'Scholarship',   docs:['Aadhar Card','Marksheet (10th & 12th)','Income Certificate','Bank Passbook','College ID'],                 portal:'https://scholarships.gov.in' },
  { id:2,  category:'Women',           ministry:'Ministry of WCD',              title:'Mudra Loan for Women',          benefit:'₹10 Lakh Loan',              eligibility:'Women Entrepreneurs',              state:'National', tag:'Loan',          docs:['Aadhar Card','PAN Card','Business Plan','Bank Statement','Residence Proof'],                                 portal:'https://mudra.org.in' },
  { id:3,  category:'Farmers',         ministry:'Ministry of Agriculture',      title:'PM-KISAN Samman Nidhi',         benefit:'₹6,000 / Year',              eligibility:'Small & Marginal Farmers',         state:'National', tag:'Direct Benefit', docs:['Aadhar Card','Land Records','Bank Passbook','Mobile Number'],                                               portal:'https://pmkisan.gov.in' },
  { id:4,  category:'MSME',            ministry:'Ministry of MSME',             title:'Startup India Seed Fund',       benefit:'₹20 Lakh Grant',             eligibility:'DPIIT-Recognised Startups',        state:'National', tag:'Grant',         docs:['DPIIT Certificate','Business Registration','PAN Card','Pitch Deck','Aadhar Card'],                          portal:'https://seedfund.startupindia.gov.in' },
  { id:5,  category:'Senior Citizens', ministry:'Ministry of Social Justice',   title:'IGNOAPS Pension',               benefit:'₹500 / Month',               eligibility:'Age 60+, BPL Category',           state:'National', tag:'Pension',       docs:['Aadhar Card','BPL Certificate','Age Proof','Bank Passbook'],                                                portal:'https://nsap.nic.in' },
  { id:6,  category:'Kids',            ministry:'Ministry of Health',           title:'Poshan Abhiyaan',               benefit:'Free Nutrition Kit',         eligibility:'Children 0–6 Years',               state:'National', tag:'Health',        docs:['Birth Certificate','Aadhar of Parent','Anganwadi Registration'],                                           portal:'https://poshanabhiyaan.gov.in' },
  { id:7,  category:'Students',        ministry:'J&K Government',               title:'J&K Merit Scholarship',         benefit:'₹10,000 / Year',             eligibility:'J&K Resident Students',            state:'J&K',      tag:'Scholarship',   docs:['Domicile Certificate','Aadhar Card','Marksheet','Income Certificate'],                                       portal:'https://jkscholarship.nic.in' },
  { id:8,  category:'Artisans',        ministry:'Ministry of Textiles',         title:'PM Vishwakarma Yojana',         benefit:'₹15,000 Toolkit + Loan',     eligibility:'Traditional Artisans & Craftsmen', state:'National', tag:'Skill & Loan',  docs:['Aadhar Card','Caste Certificate (if applicable)','Skill Certificate','Bank Passbook'],                     portal:'https://pmvishwakarma.gov.in' },
  { id:9,  category:'Women',           ministry:'Ministry of WCD',              title:'Beti Bachao Beti Padhao',       benefit:'Educational Support',        eligibility:'Girl Child 0–18 Years',            state:'National', tag:'Education',     docs:['Birth Certificate','Aadhar of Parent','School Enrollment Proof'],                                          portal:'https://wcd.nic.in' },
  { id:10, category:'MSME',            ministry:'Ministry of Commerce',         title:'One District One Product',      benefit:'₹2.5 Crore Market Support',  eligibility:'Local Product Manufacturers',      state:'UP',       tag:'Market Access',  docs:['GSTIN','UDYAM Registration','Bank Statement','Product Sample'],                                            portal:'https://odop.in' },
  { id:11, category:'Farmers',         ministry:'Ministry of Agriculture',      title:'PM Fasal Bima Yojana',          benefit:'Full Crop Insurance',        eligibility:'All Farmers',                      state:'National', tag:'Insurance',     docs:['Land Records','Aadhar Card','Bank Passbook','Sowing Certificate'],                                          portal:'https://pmfby.gov.in' },
  { id:12, category:'Engineers',       ministry:'DRDO / DST',                   title:'SERB Core Research Grant',      benefit:'₹35 Lakh Research Fund',     eligibility:'PhD Engineers & Scientists',       state:'National', tag:'Research Grant', docs:['Academic Credentials','Research Proposal','Institution NOC','PAN Card'],                                    portal:'https://serbonline.in' },
  { id:13, category:'Women',           ministry:'Ministry of Finance',          title:'Stand-Up India Scheme',         benefit:'₹10L – ₹1 Crore Loan',      eligibility:'SC/ST & Women Entrepreneurs',      state:'National', tag:'Loan',          docs:['Aadhar Card','PAN Card','Business Plan','Bank Statement','Caste Certificate'],                              portal:'https://www.standupmitra.in' },
  { id:14, category:'Students',        ministry:'Ministry of Minority Affairs', title:'PM Yasasvi Scholarship',        benefit:'₹75,000 – ₹1.25 Lakh',      eligibility:'OBC/EBC/DNT Students Class 9-12',  state:'National', tag:'Scholarship',   docs:['Aadhar Card','Caste Certificate','Income Certificate','Marksheet'],                                          portal:'https://scholarships.gov.in' },
  { id:15, category:'Senior Citizens', ministry:'Ministry of Health',           title:'Rashtriya Vayoshri Yojana',     benefit:'Free Assistive Devices',     eligibility:'Age 60+, BPL',                     state:'National', tag:'Health Aid',    docs:['Aadhar Card','Age Proof','BPL Certificate','Disability Certificate'],                                       portal:'https://www.alimco.in' },
  { id:16, category:'Farmers',         ministry:'Ministry of Agriculture',      title:'Kisan Credit Card',             benefit:'₹3 Lakh @ 4% Interest',      eligibility:'All Farmers & Allied Workers',     state:'National', tag:'Credit',        docs:['Aadhar Card','Land Records','Ration Card','Passport Photo'],                                                portal:'https://pmkisan.gov.in' },
  { id:17, category:'MSME',            ministry:'Ministry of MSME',             title:'CGTMSE Credit Guarantee',       benefit:'Up to ₹5 Crore Guarantee',   eligibility:'Micro & Small Enterprises',        state:'National', tag:'Guarantee',     docs:['UDYAM Registration','Bank Statement','Business Plan','ITR'],                                                portal:'https://www.cgtmse.in' },
  { id:18, category:'Kids',            ministry:'Ministry of Education',        title:'Samagra Shiksha Abhiyan',       benefit:'Free Books + Uniform',       eligibility:'Class 1–12 Students',              state:'National', tag:'Education',     docs:['Aadhar Card','School Enrollment','Ration Card'],                                                            portal:'https://samagra.mhrd.gov.in' },
];

export const LAWS = [
  { id:1, title:'Digital Personal Data Protection Act, 2023', date:'Aug 2023', status:'Enacted',  summary:"Your data is yours — companies must ask before collecting it.",           bullets:["Every app must take your explicit permission before storing personal data.","You can request any company to delete your data at any time.","Children's data gets extra protection — parents must give consent.","Fines up to ₹250 Crore for data breaches by companies."] },
  { id:2, title:'Telecommunications Act, 2023',               date:'Dec 2023', status:'Enacted',  summary:"Overhauled telecom rules, replacing a 100-year-old colonial law.",         bullets:["Government can take over telecom networks during national emergencies.","Stricter rules against spam calls and SIM fraud — harsh penalties.","New spectrum allocation policy paving way for 5G & 6G rollout.","Right of way for cable laying simplified for faster internet expansion."] },
  { id:3, title:'Bharatiya Nyaya Sanhita (BNS), 2023',        date:'Jul 2024', status:'In Force', summary:"India's new criminal law — replaces the 163-year-old IPC.",                bullets:["Murder still punishable by death or life imprisonment.","New provision for organised crime, terrorism & cyber crimes.","Faster trial mandate — must conclude within 3 years.","Better-defined provisions on sexual crimes and digital offences."] },
  { id:4, title:'Anusandhan National Research Foundation',     date:'2023',     status:'Active',   summary:"₹50,000 Crore fund to supercharge Indian science & research.",             bullets:["Central funding body for all science & technology research in India.","Industry-academia partnerships now much easier to form.","Focus areas: AI, quantum computing, clean energy, biotech.","Open to individual researchers, not just large institutions."] },
  { id:5, title:'Forest (Conservation) Amendment Act, 2023',  date:'Aug 2023', status:'Enacted',  summary:"Streamlines forest clearances while adding conservation safeguards.",       bullets:["Strategic projects near international borders get faster clearance.","Carbon credits can now officially be traded from Indian forests.","Eco-tourism within forests is now permitted under regulation.","Tribal rights and gram sabha consent remain mandatory."] },
];

export const ISRO_DATA = [
  { mission:'Gaganyaan',       status:'2025 Launch',   detail:"India's first crewed spaceflight — 3 astronauts to 400 km orbit",                        icon:'🚀' },
  { mission:'Chandrayaan-4',   status:'2026 Planned',  detail:'Lunar sample return mission — bringing moon rock back to Earth for analysis',              icon:'🌕' },
  { mission:'NISAR Satellite', status:'Launched 2024', detail:'NASA-ISRO joint Earth observation satellite for climate & disaster monitoring',            icon:'🛰️' },
  { mission:'Shukrayaan-1',    status:'2028 Planned',  detail:"India's Venus orbiter — studying the planet's thick toxic atmosphere",                     icon:'🪐' },
  { mission:'Aditya-L1',       status:'Operational',   detail:"Solar observation satellite studying sun's corona from the Lagrange-1 point",              icon:'☀️' },
  { mission:'XPoSat',          status:'Operational',   detail:"India's first X-ray polarimetry satellite — studying black holes and neutron stars",       icon:'🔭' },
];

export const INVENTIONS = [
  { title:'Krutrim AI',                org:'Ola / IIT Madras', year:'2024', icon:'🤖', desc:"India's first homegrown LLM, pre-trained on 20+ Indian languages and dialects." },
  { title:'PARAM Rudra Supercomputer', org:'C-DAC',            year:'2024', icon:'💻', desc:'Deployed at IISc & IUAC — delivering 990 teraflops of AI-grade compute power.' },
  { title:'NavIC 2.0',                 org:'ISRO',             year:'2023', icon:'🛰️', desc:'Upgraded Indian navigation with L1 civilian signal — accuracy under 1.5 metres.' },
  { title:'iCET Quantum Lab',          org:'DRDO / IIT Delhi', year:'2024', icon:'⚛️', desc:"India's first quantum communication node — hackproof encrypted military links." },
];

export const DEFENSE_DATA = [
  { name:'HAL Tejas Mk2',          type:'Light Combat Aircraft',    specs:{ Engine:'GE F414 Turbofan', Speed:'Mach 1.8',    Range:'3,000 km',  Payload:'5,300 kg'   }, status:'Development', accent:'#f59e0b' },
  { name:'INS Vikrant',            type:'Aircraft Carrier',         specs:{ Length:'262 metres',       Displacement:'45,000 T', Aircraft:'30 jets', Speed:'28 knots' }, status:'Active',       accent:'#10b981' },
  { name:'Arjun Mk1A',             type:'Main Battle Tank',         specs:{ Engine:'MTU MB 838',       Speed:'67 km/h',     Range:'450 km',    Armour:'Kanchan'     }, status:'Active',       accent:'#10b981' },
  { name:'BrahMos-NG',             type:'Supersonic Cruise Missile',specs:{ Speed:'Mach 3.5',          Range:'500 km',      Weight:'1,400 kg', Launch:'Air/Sea/Land' }, status:'Testing',      accent:'#3b82f6' },
  { name:'DRDO Rustom-2 (Tapas)',  type:'Medium-Altitude UAV',      specs:{ Endurance:'24 hours',      Altitude:'30,000 ft',Payload:'350 kg',  Speed:'250 km/h'     }, status:'Trials',       accent:'#f59e0b' },
];

export const RECRUITMENT = [
  { exam:'NDA I 2025',    date:'Apr 13, 2025', status:'Closed'    },
  { exam:'CDS I 2025',    date:'Apr 13, 2025', status:'Closed'    },
  { exam:'NDA II 2025',   date:'Sep 2025',     status:'Open Soon' },
  { exam:'Agniveer Army', date:'Rolling',      status:'Open'      },
  { exam:'Agniveer Navy', date:'May 2025',     status:'Open'      },
];

export const CITY_ALERTS = [
  { city:'Jammu',     type:'Power Cut', msg:'Scheduled outage in Sectors 3–7: 10 AM – 1 PM today.',                              icon:'⚡' },
  { city:'Jammu',     type:'Startup',   msg:'New Incubation Centre launching at Jammu University — registrations now open.',      icon:'🏢' },
  { city:'Delhi',     type:'Water',     msg:'Supply disruption in Dwarka Sector 12: 6 AM – 11 AM tomorrow.',                      icon:'💧' },
  { city:'Mumbai',    type:'Transit',   msg:'Metro Line 3 partial suspension — use BEST bus on alternate route today.',            icon:'🚇' },
  { city:'Bengaluru', type:'Road',      msg:'ORR flyover closed for repair: Marathahalli to Silk Board, next 3 days.',             icon:'🚧' },
];

export const COMPLAINTS = [
  { id:'TKT-2341', category:'Pothole',      location:'MG Road, Sector 4, Jammu', status:'Resolved', date:'Apr 20' },
  { id:'TKT-2298', category:'Illegal Dump', location:'Near Bus Stand, Jammu',    status:'Assigned', date:'Apr 22' },
  { id:'TKT-2187', category:'Broken Light', location:'Gandhi Nagar Crossing',    status:'Pending',  date:'Apr 24' },
];

export const STATES = ['National','J&K','Delhi','Punjab','Haryana','Maharashtra','UP','Karnataka','Gujarat','Rajasthan','Tamil Nadu','MP','West Bengal'];

export const CATEGORY_FILTERS = ['All','Students','Women','Farmers','MSME','Senior Citizens','Kids','Artisans','Engineers'];

export const NAV_ITEMS = [
  { id:'home',        label:'Home',        short:'Home',  emoji:'⌂' },
  { id:'schemes',     label:'Schemes',     short:'Schm',  emoji:'⊞' },
  { id:'jobs',        label:'Jobs',        short:'Jobs',  emoji:'⊕' },
  { id:'janseva',     label:'Jan-Seva',    short:'Seva',  emoji:'⊗' },
  { id:'antariksh',   label:'Antariksh',   short:'Space', emoji:'◎' },
  { id:'raksha',      label:'Raksha',      short:'Def',   emoji:'◆' },	
  { id:'legislative', label:'Legislative', short:'Laws',  emoji:'⊙' },
];

export const JOB_CATEGORIES = ['Farmer','Engineer','Artisan','Teacher','Vendor','Doctor','Nurse','Artist'];

export const STATUS_COLOR = { Resolved:'#10b981', Assigned:'#f59e0b', Pending:'#ef4444' };

export const TAG_BG = {
  Scholarship:'#1e3a5f', Loan:'#1a2e1a', Grant:'#2d1a2e', Pension:'#1a1a2e',
  Insurance:'#1e1a0f', 'Direct Benefit':'#0f2e1a', Health:'#1a0f1a',
  'Health Aid':'#1a0f1a', Education:'#1a1a0f', 'Skill & Loan':'#2e1a0f',
  'Research Grant':'#0f1a2e', 'Market Access':'#1c1c1e', Credit:'#1c1a0f', Guarantee:'#1a1c2e',
};