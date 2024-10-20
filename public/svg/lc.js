import { ToWords } from "to-words";

export const leavingcertificate = (
  school ,
  address,
  Affiliated ,
  state,
  contact,
  AffiliationNo,
  UDiseCode,
  SchoolCode,
  GRNo,
  StudentID,
  SerialNo,
  Name,
  MotherName,
  FatherName,
  DoB,
  Dobword,
  Nationality,
  Religion,
  DateofAdmission,
  AdmissionClass,
  Class,
  classinword,
  Examresult,
  lastpaiddues,
  FeeConcession,
  activites,
  GeneralConduct,
  ReasonforLeaving,
  Remarks
) => {
  return `<svg width="850" height="1200" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="850" height="1200" fill="#f5f5dc" />

  <!-- Header -->
  <text x="425" y="70" font-family="Arial" font-size="28" font-weight="bold" text-anchor="middle">
    ${school}
  </text>
  <text x="425" y="100" font-family="Arial" font-size="16" text-anchor="middle">
    ${address}
  </text>
  <text x="425" y="125" font-family="Arial" font-size="16" text-anchor="middle">
    ${Affiliated}, ${state}, Tel.: ${contact}
  </text>

  <!-- School Details -->
  <text x="50" y="170" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Affiliation No.:</tspan> ${AffiliationNo}
  </text>
  <text x="300" y="170" font-family="Arial" font-size="18">
    <tspan font-weight="bold">U-Dise Code: </tspan> ${UDiseCode}
  </text>
  <text x="600" y="170" font-family="Arial" font-size="18">
    <tspan font-weight="bold">School Code: </tspan> ${SchoolCode}
  </text>

  <!-- Student Information -->
  <text x="50" y="210" font-family="Arial" font-size="18">
    <tspan font-weight="bold">G.R. No.:</tspan> ${GRNo}
  </text>
  <text x="300" y="210" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Student ID: </tspan> ${StudentID}
  </text>
  <text x="50" y="250" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Serial No.: </tspan> ${SerialNo}
  </text>
  
  <text x="50" y="290" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Name of the student: </tspan> ${Name}
  </text>
  <text x="50" y="330" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Mother's Name: </tspan> ${MotherName}
  </text>
  <text x="450" y="330" font-family="Arial" font-size="18">
    <tspan font-weight="bold"> Father's Name:</tspan> ${FatherName}
  </text>
  <text x="50" y="370" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Date of Birth: (in figures).:</tspan> ${DoB}
  </text>
  <text x="50" y="410" font-family="Arial" font-size="18">
     <tspan font-weight="bold">(in words).:</tspan> ${Dobword}
  </text>
  <text x="50" y="450" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Nationality: </tspan> ${Nationality}
  </text>
  <text x="500" y="450" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Religion: </tspan> ${Religion}
  </text>

  <text x="50" y="490" font-family="Arial" font-size="18">
     <tspan font-weight="bold">Date of First Admission in School with Class: </tspan> ${DateofAdmission}
  </text> 
  <text x="650" y="490" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Class: </tspan> ${AdmissionClass}
  </text> 
  <text x="50" y="530" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Class in which the pupil last studied:  </tspan>${Class}  
    
  </text>
  <text x="500" y="530" font-family="Arial" font-size="18">
    <tspan font-weight="bold">(in words)</tspan> ${classinword}
  </text>
  <text x="50" y="570" font-family="Arial" font-size="18">
     <tspan font-weight="bold">School/Board Annual Exam result: </tspan> ${Examresult}
  </text>

  <text x="50" y="610" font-family="Arial" font-size="18">
   <tspan font-weight="bold"> Promoted to Class: </tspan> ${Class} 
  </text>
    <text x="500" y="610" font-family="Arial" font-size="18">
     <tspan font-weight="bold">(in words) :</tspan> ${classinword} 
  </text>
  <text x="50" y="650" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Month up to which pupil has paid dues: </tspan> ${lastpaiddues}
  </text>

  <text x="50" y="690" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Fee Concession: </tspan>${FeeConcession}
  </text>

  <text x="50" y="730" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Total No. of Working Days: </tspan> ${206}
  </text>
   <text x="500" y="730" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Present Days: </tspan> ${"Very Good"}
  </text>
  <text x="50" y="770" font-family="Arial" font-size="18">
    <tspan font-weight="bold">NCC/Boy Scout/Girl Guide: </tspan> ${activites}
  </text>

  <text x="50" y="810" font-family="Arial" font-size="18">
    <tspan font-weight="bold">General Conduct: </tspan> ${GeneralConduct}
  </text>

  <text x="50" y="850" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Date of Issue: </tspan> ${"31/08/2021"}
  </text>

  <text x="50" y="890" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Reason for Leaving: </tspan> ${ReasonforLeaving}
  </text>

  <text x="50" y="930" font-family="Arial" font-size="18">
    <tspan font-weight="bold">Remarks: </tspan> ${Remarks}
  </text>

  <!-- Footer -->
  <line x1="50" y1="980" x2="350" y2="980" stroke="black" stroke-width="1"/>
  <text x="200" y="1000" font-family="Arial" font-size="18" text-anchor="middle">Prepared by</text>

  <line x1="500" y1="980" x2="800" y2="980" stroke="black" stroke-width="1"/>
  <text x="650" y="1000" font-family="Arial" font-size="18" text-anchor="middle">Principal</text>

  <text x="50" y="1030" font-family="Arial" font-size="16">
    These entries are as per General Register based on information provided by Parent at the time of 
    Admission
  </text>
  <text x="50" y="1050" font-family="Arial" font-size="16">No change for whatsoever reason shall be accepted.</text>
</svg>
`;
};
