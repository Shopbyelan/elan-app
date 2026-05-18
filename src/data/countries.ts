export interface CountryData {
  code: string;
  name: string;
  states: string[];
}

export const COUNTRIES: CountryData[] = [
  // ── Africa ──────────────────────────────────────────────────────
  {
    code: "NG",
    name: "Nigeria",
    states: [
      "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
      "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
      "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
      "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
      "Yobe","Zamfara",
    ],
  },
  {
    code: "GH",
    name: "Ghana",
    states: [
      "Ahafo","Ashanti","Bono","Bono East","Central","Eastern","Greater Accra",
      "North East","Northern","Oti","Savannah","Upper East","Upper West","Volta",
      "Western","Western North",
    ],
  },
  {
    code: "ZA",
    name: "South Africa",
    states: [
      "Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo",
      "Mpumalanga","North West","Northern Cape","Western Cape",
    ],
  },
  {
    code: "KE",
    name: "Kenya",
    states: [
      "Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa",
      "Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi",
      "Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos",
      "Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a",
      "Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu",
      "Siaya","Taita-Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana",
      "Uasin Gishu","Vihiga","Wajir","West Pokot",
    ],
  },
  {
    code: "ET",
    name: "Ethiopia",
    states: [
      "Addis Ababa","Afar","Amhara","Benishangul-Gumuz","Dire Dawa","Gambela",
      "Harari","Oromia","Sidama","Somali","South West Ethiopia Peoples","Southern Nations",
      "Tigray",
    ],
  },
  {
    code: "EG",
    name: "Egypt",
    states: [
      "Alexandria","Assiut","Aswan","Beheira","Beni Suef","Cairo","Dakahlia",
      "Damietta","El Wadi El Gedid","Fayoum","Gharbia","Giza","Ismailia",
      "Kafr El Sheikh","Luxor","Matruh","Minya","Monufia","North Sinai",
      "Port Said","Qalyubia","Qena","Red Sea","Sharqia","Sohag","South Sinai","Suez",
    ],
  },
  { code: "CM", name: "Cameroon", states: ["Adamawa","Centre","East","Far North","Littoral","North","North West","South","South West","West"] },
  { code: "SN", name: "Senegal", states: ["Dakar","Diourbel","Fatick","Kaffrine","Kaolack","Kédougou","Kolda","Louga","Matam","Saint-Louis","Sédhiou","Tambacounda","Thiès","Ziguinchor"] },
  { code: "CI", name: "Côte d'Ivoire", states: [] },
  { code: "TZ", name: "Tanzania", states: [] },
  { code: "UG", name: "Uganda", states: [] },
  { code: "RW", name: "Rwanda", states: ["Eastern","Kigali","Northern","Southern","Western"] },
  { code: "MA", name: "Morocco", states: ["Béni Mellal-Khénifra","Casablanca-Settat","Drâa-Tafilalet","Fès-Meknès","Guelmim-Oued Noun","Laâyoune-Sakia El Hamra","Marrakech-Safi","Oriental","Rabat-Salé-Kénitra","Souss-Massa","Tanger-Tétouan-Al Hoceïma"] },
  { code: "TN", name: "Tunisia", states: [] },
  { code: "DZ", name: "Algeria", states: [] },
  { code: "LY", name: "Libya", states: [] },
  { code: "SD", name: "Sudan", states: [] },
  { code: "AO", name: "Angola", states: [] },
  { code: "MZ", name: "Mozambique", states: [] },
  { code: "ZM", name: "Zambia", states: ["Central","Copperbelt","Eastern","Luapula","Lusaka","Muchinga","Northern","North-Western","Southern","Western"] },
  { code: "ZW", name: "Zimbabwe", states: [] },
  { code: "BW", name: "Botswana", states: [] },
  { code: "NA", name: "Namibia", states: [] },
  { code: "SZ", name: "Eswatini", states: [] },
  { code: "LS", name: "Lesotho", states: [] },
  { code: "MG", name: "Madagascar", states: [] },
  { code: "MU", name: "Mauritius", states: [] },
  { code: "SC", name: "Seychelles", states: [] },
  { code: "CV", name: "Cape Verde", states: [] },
  { code: "MR", name: "Mauritania", states: [] },
  { code: "ML", name: "Mali", states: [] },
  { code: "BF", name: "Burkina Faso", states: [] },
  { code: "NE", name: "Niger", states: [] },
  { code: "TD", name: "Chad", states: [] },
  { code: "TG", name: "Togo", states: [] },
  { code: "BJ", name: "Benin", states: [] },
  { code: "GN", name: "Guinea", states: [] },
  { code: "GW", name: "Guinea-Bissau", states: [] },
  { code: "SL", name: "Sierra Leone", states: [] },
  { code: "LR", name: "Liberia", states: [] },
  { code: "GM", name: "Gambia", states: [] },
  { code: "GA", name: "Gabon", states: [] },
  { code: "CG", name: "Republic of Congo", states: [] },
  { code: "CD", name: "DR Congo", states: [] },
  { code: "CF", name: "Central African Republic", states: [] },
  { code: "GQ", name: "Equatorial Guinea", states: [] },
  { code: "ST", name: "São Tomé and Príncipe", states: [] },
  { code: "BI", name: "Burundi", states: [] },
  { code: "SS", name: "South Sudan", states: [] },
  { code: "SO", name: "Somalia", states: [] },
  { code: "DJ", name: "Djibouti", states: [] },
  { code: "ER", name: "Eritrea", states: [] },
  { code: "MW", name: "Malawi", states: [] },

  // ── Americas ─────────────────────────────────────────────────────
  {
    code: "US",
    name: "United States",
    states: [
      "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
      "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
      "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
      "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
      "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
      "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
      "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
      "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
      "Washington D.C.",
    ],
  },
  {
    code: "CA",
    name: "Canada",
    states: [
      "Alberta","British Columbia","Manitoba","New Brunswick",
      "Newfoundland and Labrador","Northwest Territories","Nova Scotia",
      "Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon",
    ],
  },
  {
    code: "MX",
    name: "Mexico",
    states: [
      "Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas",
      "Chihuahua","Ciudad de México","Coahuila","Colima","Durango","Guanajuato",
      "Guerrero","Hidalgo","Jalisco","México","Michoacán","Morelos","Nayarit",
      "Nuevo León","Oaxaca","Puebla","Querétaro","Quintana Roo","San Luis Potosí",
      "Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas",
    ],
  },
  {
    code: "BR",
    name: "Brazil",
    states: [
      "Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal",
      "Espírito Santo","Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul",
      "Minas Gerais","Pará","Paraíba","Paraná","Pernambuco","Piauí",
      "Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondônia",
      "Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins",
    ],
  },
  {
    code: "AR",
    name: "Argentina",
    states: [
      "Buenos Aires","Catamarca","Chaco","Chubut","Córdoba","Corrientes",
      "Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja","Mendoza",
      "Misiones","Neuquén","Río Negro","Salta","San Juan","San Luis",
      "Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego",
      "Tucumán","CABA",
    ],
  },
  { code: "CO", name: "Colombia", states: [] },
  { code: "CL", name: "Chile", states: [] },
  { code: "PE", name: "Peru", states: [] },
  { code: "VE", name: "Venezuela", states: [] },
  { code: "EC", name: "Ecuador", states: [] },
  { code: "BO", name: "Bolivia", states: [] },
  { code: "PY", name: "Paraguay", states: [] },
  { code: "UY", name: "Uruguay", states: [] },
  { code: "GY", name: "Guyana", states: [] },
  { code: "SR", name: "Suriname", states: [] },
  { code: "TT", name: "Trinidad and Tobago", states: [] },
  { code: "JM", name: "Jamaica", states: [] },
  { code: "CU", name: "Cuba", states: [] },
  { code: "DO", name: "Dominican Republic", states: [] },
  { code: "HT", name: "Haiti", states: [] },
  { code: "BB", name: "Barbados", states: [] },
  { code: "LC", name: "Saint Lucia", states: [] },
  { code: "VC", name: "Saint Vincent and the Grenadines", states: [] },
  { code: "GD", name: "Grenada", states: [] },
  { code: "AG", name: "Antigua and Barbuda", states: [] },
  { code: "KN", name: "Saint Kitts and Nevis", states: [] },
  { code: "BS", name: "Bahamas", states: [] },
  { code: "GT", name: "Guatemala", states: [] },
  { code: "BZ", name: "Belize", states: [] },
  { code: "SV", name: "El Salvador", states: [] },
  { code: "HN", name: "Honduras", states: [] },
  { code: "NI", name: "Nicaragua", states: [] },
  { code: "CR", name: "Costa Rica", states: [] },
  { code: "PA", name: "Panama", states: [] },

  // ── Europe ───────────────────────────────────────────────────────
  {
    code: "GB",
    name: "United Kingdom",
    states: ["England","Scotland","Wales","Northern Ireland"],
  },
  {
    code: "DE",
    name: "Germany",
    states: [
      "Baden-Württemberg","Bavaria","Berlin","Brandenburg","Bremen","Hamburg",
      "Hesse","Lower Saxony","Mecklenburg-Vorpommern","North Rhine-Westphalia",
      "Rhineland-Palatinate","Saarland","Saxony","Saxony-Anhalt",
      "Schleswig-Holstein","Thuringia",
    ],
  },
  {
    code: "FR",
    name: "France",
    states: [
      "Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Bretagne",
      "Centre-Val de Loire","Corse","Grand Est","Hauts-de-France",
      "Île-de-France","Normandie","Nouvelle-Aquitaine","Occitanie",
      "Pays de la Loire","Provence-Alpes-Côte d'Azur",
    ],
  },
  {
    code: "IT",
    name: "Italy",
    states: [
      "Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna",
      "Friuli-Venezia Giulia","Lazio","Liguria","Lombardy","Marche","Molise",
      "Piedmont","Puglia","Sardinia","Sicily","Trentino-Alto Adige",
      "Tuscany","Umbria","Valle d'Aosta","Veneto",
    ],
  },
  {
    code: "ES",
    name: "Spain",
    states: [
      "Andalusia","Aragon","Asturias","Balearic Islands","Basque Country",
      "Canary Islands","Cantabria","Castile and León","Castile-La Mancha",
      "Catalonia","Extremadura","Galicia","La Rioja","Madrid","Murcia",
      "Navarre","Valencia",
    ],
  },
  { code: "PT", name: "Portugal", states: [] },
  { code: "NL", name: "Netherlands", states: [] },
  { code: "BE", name: "Belgium", states: [] },
  { code: "CH", name: "Switzerland", states: [] },
  { code: "AT", name: "Austria", states: [] },
  { code: "PL", name: "Poland", states: [] },
  { code: "SE", name: "Sweden", states: [] },
  { code: "NO", name: "Norway", states: [] },
  { code: "DK", name: "Denmark", states: [] },
  { code: "FI", name: "Finland", states: [] },
  { code: "IE", name: "Ireland", states: [] },
  { code: "GR", name: "Greece", states: [] },
  { code: "CZ", name: "Czech Republic", states: [] },
  { code: "HU", name: "Hungary", states: [] },
  { code: "RO", name: "Romania", states: [] },
  { code: "BG", name: "Bulgaria", states: [] },
  { code: "HR", name: "Croatia", states: [] },
  { code: "RS", name: "Serbia", states: [] },
  { code: "SK", name: "Slovakia", states: [] },
  { code: "SI", name: "Slovenia", states: [] },
  { code: "LT", name: "Lithuania", states: [] },
  { code: "LV", name: "Latvia", states: [] },
  { code: "EE", name: "Estonia", states: [] },
  { code: "UA", name: "Ukraine", states: [] },
  { code: "RU", name: "Russia", states: [] },
  { code: "BY", name: "Belarus", states: [] },
  { code: "MD", name: "Moldova", states: [] },
  { code: "AL", name: "Albania", states: [] },
  { code: "MK", name: "North Macedonia", states: [] },
  { code: "BA", name: "Bosnia and Herzegovina", states: [] },
  { code: "ME", name: "Montenegro", states: [] },
  { code: "XK", name: "Kosovo", states: [] },
  { code: "IS", name: "Iceland", states: [] },
  { code: "LU", name: "Luxembourg", states: [] },
  { code: "MT", name: "Malta", states: [] },
  { code: "CY", name: "Cyprus", states: [] },
  { code: "MC", name: "Monaco", states: [] },
  { code: "LI", name: "Liechtenstein", states: [] },
  { code: "SM", name: "San Marino", states: [] },

  // ── Asia & Middle East ───────────────────────────────────────────
  {
    code: "IN",
    name: "India",
    states: [
      "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
      "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
      "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
      "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
      "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
      "Chandigarh","Delhi","Jammu and Kashmir","Ladakh","Puducherry",
    ],
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    states: ["Abu Dhabi","Ajman","Dubai","Fujairah","Ras Al Khaimah","Sharjah","Umm Al Quwain"],
  },
  { code: "SA", name: "Saudi Arabia", states: ["Riyadh","Mecca","Medina","Eastern Province","Asir","Tabuk","Hail","Northern Borders","Jazan","Najran","Al Bahah","Al Jawf","Qassim"] },
  { code: "QA", name: "Qatar", states: [] },
  { code: "KW", name: "Kuwait", states: [] },
  { code: "BH", name: "Bahrain", states: [] },
  { code: "OM", name: "Oman", states: [] },
  { code: "JO", name: "Jordan", states: [] },
  { code: "LB", name: "Lebanon", states: [] },
  { code: "IL", name: "Israel", states: [] },
  { code: "TR", name: "Turkey", states: [] },
  { code: "IR", name: "Iran", states: [] },
  { code: "IQ", name: "Iraq", states: [] },
  { code: "PK", name: "Pakistan", states: ["Azad Kashmir","Balochistan","Gilgit-Baltistan","Islamabad Capital Territory","Khyber Pakhtunkhwa","Punjab","Sindh"] },
  { code: "BD", name: "Bangladesh", states: [] },
  { code: "LK", name: "Sri Lanka", states: [] },
  { code: "NP", name: "Nepal", states: [] },
  { code: "CN", name: "China", states: [] },
  {
    code: "JP",
    name: "Japan",
    states: [
      "Aichi","Akita","Aomori","Chiba","Ehime","Fukui","Fukuoka","Fukushima",
      "Gifu","Gunma","Hiroshima","Hokkaido","Hyogo","Ibaraki","Ishikawa","Iwate",
      "Kagawa","Kagoshima","Kanagawa","Kochi","Kumamoto","Kyoto","Mie","Miyagi",
      "Miyazaki","Nagano","Nagasaki","Nara","Niigata","Oita","Okayama","Okinawa",
      "Osaka","Saga","Saitama","Shiga","Shimane","Shizuoka","Tochigi","Tokushima",
      "Tokyo","Tottori","Toyama","Wakayama","Yamagata","Yamaguchi","Yamanashi",
    ],
  },
  { code: "KR", name: "South Korea", states: [] },
  { code: "SG", name: "Singapore", states: [] },
  { code: "MY", name: "Malaysia", states: [] },
  { code: "TH", name: "Thailand", states: [] },
  { code: "VN", name: "Vietnam", states: [] },
  { code: "PH", name: "Philippines", states: [] },
  { code: "ID", name: "Indonesia", states: [] },
  { code: "HK", name: "Hong Kong", states: [] },
  { code: "TW", name: "Taiwan", states: [] },
  { code: "KZ", name: "Kazakhstan", states: [] },
  { code: "UZ", name: "Uzbekistan", states: [] },
  { code: "GE", name: "Georgia", states: [] },
  { code: "AM", name: "Armenia", states: [] },
  { code: "AZ", name: "Azerbaijan", states: [] },

  // ── Oceania ──────────────────────────────────────────────────────
  {
    code: "AU",
    name: "Australia",
    states: [
      "Australian Capital Territory","New South Wales","Northern Territory",
      "Queensland","South Australia","Tasmania","Victoria","Western Australia",
    ],
  },
  {
    code: "NZ",
    name: "New Zealand",
    states: [
      "Auckland","Bay of Plenty","Canterbury","Gisborne","Hawke's Bay",
      "Manawatu-Whanganui","Marlborough","Nelson","Northland","Otago","Southland",
      "Taranaki","Tasman","Waikato","Wellington","West Coast",
    ],
  },
  { code: "FJ", name: "Fiji", states: [] },
  { code: "PG", name: "Papua New Guinea", states: [] },
];

// Delivery zones (for international shipping in NGN)
const WEST_AFRICA = new Set(["GH","SN","CI","TG","BJ","NE","BF","ML","MR","GN","GW","LR","SL","GM","CV"]);
const AFRICA = new Set(["ZA","KE","ET","EG","CM","TZ","UG","RW","MA","TN","DZ","AO","MZ","ZM","ZW","BW","NA","SZ","LS","MG","MU","SC","TD","GA","CG","CD","CF","GQ","ST","BI","SS","SO","DJ","ER","MW","LY","SD"]);
const MIDDLE_EAST = new Set(["AE","SA","QA","KW","BH","OM","JO","LB","IL","IQ","IR"]);
const EUROPE = new Set(["GB","DE","FR","IT","ES","PT","NL","BE","CH","AT","PL","SE","NO","DK","FI","IE","GR","CZ","HU","RO","BG","HR","RS","SK","SI","LT","LV","EE","UA","RU","BY","MD","AL","MK","BA","ME","XK","IS","LU","MT","CY","MC","LI","SM","TR"]);
const NORTH_AMERICA = new Set(["US","CA","MX"]);

const NIGERIAN_DELIVERY: Record<string, number> = {
  Lagos: 3000, FCT: 3500, Ogun: 4000, Oyo: 4500, Edo: 5000, Delta: 5000, Rivers: 5500, default: 6000,
};

export function getInternationalDeliveryFee(countryCode: string, state?: string): number {
  if (countryCode === "NG") {
    return NIGERIAN_DELIVERY[state ?? ""] ?? NIGERIAN_DELIVERY.default;
  }
  if (WEST_AFRICA.has(countryCode)) return 15000;
  if (AFRICA.has(countryCode))      return 25000;
  if (MIDDLE_EAST.has(countryCode)) return 45000;
  if (EUROPE.has(countryCode))      return 55000;
  if (NORTH_AMERICA.has(countryCode)) return 60000;
  return 50000; // Rest of World
}

export function getDeliveryLabel(countryCode: string): string {
  if (countryCode === "NG") return "Delivery fee";
  if (WEST_AFRICA.has(countryCode)) return "West Africa shipping";
  if (AFRICA.has(countryCode))      return "Africa shipping";
  return "International shipping";
}
