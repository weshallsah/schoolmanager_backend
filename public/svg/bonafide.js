export const bonafide = (
  school,
  address,
  establish,
  center,
  Taluka,
  District,
  contact,
  Mail,
  Udiseno,
  medium,
  GRno,
  UID,
  studentID,
  name,
  mothername,
  Nationality,
  Mothertongue,
  religion,
  caste,
  BOP,
  DOB,
  standard,
  addmissiontime,
  today
) => `<svg width="800" height="1100" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: Arial, sans-serif; }
    .title { font-size: 30px; font-weight: bold; text-anchor: middle; }
    .subtitle { font-size: 24px; font-weight: bold; text-anchor: middle; }
    .section-title { font-size: 20px; font-weight: bold; }
    .label { font-size: 20px; text-align: justify; }
    .photo { fill: none; stroke: black; stroke-width: 2; }
  </style>

  <!-- Background -->
  <rect width="800" height="1100" fill="#EDFEFF"/>

  <!-- Title -->
  <text x="400" y="50" class="title">Bonafide Certificate</text>
  <text x="400" y="100" class="subtitle">${school}</text>

  <!-- Photo Placeholder -->
  <rect x="50" y="140" width="150" height="180" class="photo"/>

  <!-- School Details -->
  <text x="250" y="170" class="label">Address :-  ${address}</text>
  <text x="250" y="200" class="label">Established at :-  ${establish}</text>
  <text x="250" y="230" class="label">center :-  ${center}</text>
  <text x="500" y="230" class="label">Taluka :-  ${Taluka}</text>
  <text x="250" y="260" class="label">District :-  ${District}</text>
  <text x="500" y="260" class="label">Contact :-  ${contact}</text>
  <text x="250" y="290" class="label">E-mail :-  ${Mail}</text>
  <text x="250" y="320" class="label">U-DISE No :-  ${Udiseno}</text>
  <text x="550" y="320" class="label">Medium :-  ${medium}</text>

  <!-- Section Divider -->
  <line x1="50" y1="350" x2="750" y2="350" stroke="black" stroke-width="1"/>

  <!-- Student Details Section -->
  <text x="400" y="380" class="section-title" text-anchor="middle">Student Details</text>

  <text x="50" y="420" class="label">G.R No :-  ${GRno}</text>
  <text x="450" y="420" class="label">UID No :-  ${UID}</text>
  <text x="50" y="450" class="label">Student ID :-  ${studentID}</text>
  <text x="50" y="480" class="label">Student Name :-  ${name}</text>
  <text x="50" y="510" class="label">Mother Name :-  ${mothername}</text>
  <text x="50" y="540" class="label">Nationality :-  ${Nationality}</text>
  <text x="450" y="540" class="label">Mother tongue :-  ${Mothertongue}</text>
  <text x="50" y="570" class="label">Religion :-  ${religion}</text>
  <text x="450" y="570" class="label">Caste :-  ${caste}</text>
  <text x="50" y="600" class="label">Birth place :-  ${BOP}</text>
  <text x="50" y="630" class="label">Date of Birth :-  ${DOB}</text>
  <text x="50" y="660" class="label">Previous standard :-  ${standard} th</text>
  <text x="450" y="660" class="label">from when :-  ${addmissiontime}</text>

  <!-- Section Divider -->
  <line x1="50" y1="700" x2="750" y2="700" stroke="black" stroke-width="1"/>

  <!-- Confirmation Text -->
  <text x="100" y="740" class="label">A bonafide certificate is given, that all above information is from</text>
  <text x="50" y="765" class="label"> the school General Register</text>

  <!-- Date and Signatures -->
  <text x="50" y="810" class="label">Date :-  ${today}</text>
  <text x="50" y="850" class="label">class Teacher Sign</text>
  <text x="600" y="850" class="label">principal</text>
  <text x="600" y="880" class="label">Stamp & sign</text>
</svg>
`;
