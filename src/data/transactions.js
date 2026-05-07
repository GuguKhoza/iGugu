export const TRANSACTIONS = [
  { id:1,  date:'2026-05-06', name:'MTN Airtime',          cat:'airtime', type:'debit',  amt:50,   fee:0,   icon:'📱', bg:'#EEF4FF', ic:'#1A4FBF', ref:'AIR-8821', channel:'App' },
  { id:2,  date:'2026-05-05', name:'Checkers Sixty60',     cat:'shopping',type:'debit',  amt:340,  fee:1.5, icon:'🛒', bg:'#FDECEA', ic:'#C0392B', ref:'EFT-3340', channel:'PayShap' },
  { id:3,  date:'2026-05-04', name:'PayShap — Sipho M.',   cat:'payshap', type:'debit',  amt:200,  fee:2,   icon:'⚡', bg:'#EAF8F3', ic:'#0F8A60', ref:'PSP-9921', channel:'PayShap' },
  { id:4,  date:'2026-05-03', name:'Eskom Electricity',    cat:'bill',    type:'debit',  amt:650,  fee:1.5, icon:'💡', bg:'#FDECEA', ic:'#C0392B', ref:'BIL-4421', channel:'App' },
  { id:5,  date:'2026-05-01', name:'Salary — Shoprite',    cat:'salary',  type:'credit', amt:8500, fee:0,   icon:'💼', bg:'#EAF8F3', ic:'#17A876', ref:'SAL-0011', channel:'EFT' },
  { id:6,  date:'2026-04-30', name:'DStv Subscription',    cat:'bill',    type:'debit',  amt:899,  fee:1.5, icon:'📺', bg:'#FDECEA', ic:'#C0392B', ref:'BIL-3312', channel:'Debit Order' },
  { id:7,  date:'2026-04-28', name:'Vodacom Data Bundle',  cat:'airtime', type:'debit',  amt:149,  fee:0,   icon:'📶', bg:'#EEF4FF', ic:'#1A4FBF', ref:'AIR-7723', channel:'App' },
  { id:8,  date:'2026-04-27', name:'PayShap — Nomsa D.',   cat:'payshap', type:'credit', amt:500,  fee:0,   icon:'⚡', bg:'#EAF8F3', ic:'#17A876', ref:'PSP-8834', channel:'PayShap' },
  { id:9,  date:'2026-04-25', name:'KFC Soweto',           cat:'food',    type:'debit',  amt:186,  fee:1.5, icon:'🍗', bg:'#FDECEA', ic:'#C0392B', ref:'EFT-2219', channel:'Card' },
  { id:10, date:'2026-04-22', name:'Pep Stores',           cat:'shopping',type:'debit',  amt:420,  fee:1.5, icon:'🛍️', bg:'#FDECEA', ic:'#C0392B', ref:'EFT-5521', channel:'Card' },
  { id:11, date:'2026-04-20', name:'Home Deposit Pocket',  cat:'pocket',  type:'debit',  amt:1000, fee:0,   icon:'🏠', bg:'#E8F0FE', ic:'#1A4FBF', ref:'PKT-1120', channel:'Internal' },
  { id:12, date:'2026-04-18', name:'MTN Airtime',          cat:'airtime', type:'debit',  amt:100,  fee:0,   icon:'📱', bg:'#EEF4FF', ic:'#1A4FBF', ref:'AIR-6612', channel:'App' },
  { id:13, date:'2026-04-15', name:'iGugu Admin Fee',      cat:'fee',     type:'debit',  amt:69,   fee:0,   icon:'🏦', bg:'#E8F0FE', ic:'#1340A0', ref:'FEE-4401', channel:'System' },
  { id:14, date:'2026-04-14', name:'PayShap — Lungelo K.', cat:'payshap', type:'debit',  amt:350,  fee:2,   icon:'⚡', bg:'#EAF8F3', ic:'#0F8A60', ref:'PSP-7712', channel:'PayShap' },
  { id:15, date:'2026-04-01', name:'Salary — Shoprite',    cat:'salary',  type:'credit', amt:8500, fee:0,   icon:'💼', bg:'#EAF8F3', ic:'#17A876', ref:'SAL-0010', channel:'EFT' },
  { id:16, date:'2026-03-31', name:'Capitec Loan Repay',   cat:'bill',    type:'debit',  amt:1200, fee:0,   icon:'🏛️', bg:'#FDECEA', ic:'#C0392B', ref:'LON-9900', channel:'Debit Order' },
  { id:17, date:'2026-03-28', name:'Woolworths Food',      cat:'food',    type:'debit',  amt:876,  fee:1.5, icon:'🥑', bg:'#FDECEA', ic:'#C0392B', ref:'EFT-1123', channel:'Card' },
  { id:18, date:'2026-03-26', name:'PayShap — Zanele P.',  cat:'payshap', type:'credit', amt:250,  fee:0,   icon:'⚡', bg:'#EAF8F3', ic:'#17A876', ref:'PSP-5521', channel:'PayShap' },
  { id:19, date:'2026-03-22', name:'Telkom Fibre',         cat:'bill',    type:'debit',  amt:599,  fee:1.5, icon:'🌐', bg:'#FDECEA', ic:'#C0392B', ref:'BIL-2211', channel:'Debit Order' },
  { id:20, date:'2026-03-20', name:'Holiday Pocket',       cat:'pocket',  type:'debit',  amt:500,  fee:0,   icon:'✈️', bg:'#EAF8F3', ic:'#17A876', ref:'PKT-0880', channel:'Internal' },
  { id:21, date:'2026-03-15', name:'iGugu Admin Fee',      cat:'fee',     type:'debit',  amt:69,   fee:0,   icon:'🏦', bg:'#E8F0FE', ic:'#1340A0', ref:'FEE-4400', channel:'System' },
  { id:22, date:'2026-03-10', name:'Makro Bulk Buy',       cat:'shopping',type:'debit',  amt:1240, fee:1.5, icon:'🛒', bg:'#FDECEA', ic:'#C0392B', ref:'EFT-0091', channel:'Card' },
  { id:23, date:'2026-03-01', name:'Salary — Shoprite',    cat:'salary',  type:'credit', amt:8500, fee:0,   icon:'💼', bg:'#EAF8F3', ic:'#17A876', ref:'SAL-0009', channel:'EFT' },
];

export const POCKETS = [
  { id:1, name:'Home Deposit', icon:'🏠', bg:'#E8F0FE', ic:'#1A4FBF', goal:30000, saved:12450, rate:7.5, type:'Fixed' },
  { id:2, name:'Holiday Fund', icon:'✈️', bg:'#EAF8F3', ic:'#17A876', goal:8000,  saved:5200,  rate:6.5, type:'Flexi' },
  { id:3, name:'Education',    icon:'📚', bg:'#EEF4FF', ic:'#1340A0', goal:15000, saved:3800,  rate:8.0, type:'Fixed' },
];

export const BENEFICIARIES = [
  { id:1, name:'Sipho M.',   initials:'SM', color1:'#17A876', color2:'#0F8A60', acct:'4002 3341 8821', bank:'FNB' },
  { id:2, name:'Nomsa D.',   initials:'ND', color1:'#1A4FBF', color2:'#1340A0', acct:'7812 0091 2233', bank:'Capitec' },
  { id:3, name:'Lungelo K.', initials:'LK', color1:'#0F8A60', color2:'#0D2E7A', acct:'5544 2290 1100', bank:'Standard Bank' },
  { id:4, name:'Zanele P.',  initials:'ZP', color1:'#1340A0', color2:'#0D2E7A', acct:'3301 8821 4456', bank:'Absa' },
];
