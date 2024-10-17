export const bonafide = `<svg width="800" height="1100" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: Arial, sans-serif; }
    .title { font-size: 30px; font-weight: bold; text-anchor: middle; }
    .subtitle { font-size: 24px; font-weight: bold; text-anchor: middle; }
    .section-title { font-size: 20px; font-weight: bold; }
    .label { font-size: 20px; 
        text-align: justify;
    }
    .photo { fill: none; stroke: black; stroke-width: 2; }
  </style>

  <!-- Title -->
  <text x="400" y="50" class="title">Bonafide Certificate</text>
  <text x="400" y="100" class="subtitle">New English High School</text>

  <!-- Photo Placeholder -->
  <rect x="50" y="140" width="150" height="180" class="photo"/>

  <!-- School Details -->
  <text x="250" y="170" class="label">Address :-  ${"netaji chowk, kurla camop, ulhasnagar - 5"}</text>
  <text x="250" y="200" class="label">Established at :-  ${1980}</text>
  <text x="250" y="230" class="label">center :-  ${"ulhasnagar"}</text>
  <text x="450" y="230" class="label">Taluka :-  ${"Thane"}</text>
  <text x="250" y="260" class="label">District :-  ${"Ulhasnagar"}</text>
  <text x="450" y="260" class="label">Contact :-  ${9511286245}</text>
  <text x="250" y="290" class="label">E-mail :-  ${"vishalk74064@gmail.com"}</text>
  <text x="250" y="320" class="label">U-DISE No :-  ${"0208"}</text>
  <text x="450" y="320" class="label">Medium :-  ${"English"}</text>

  <!-- Section Divider -->
  <line x1="50" y1="350" x2="750" y2="350" stroke="black" stroke-width="1"/>

  <!-- Student Details Section -->
  <text x="400" y="380" class="section-title" text-anchor="middle">Student Details</text>

  <text x="50" y="420" class="label">Register No :-  ${"0208cs211200"}</text>
  <text x="450" y="420" class="label">UID No :-  ${"1111-2222-3333"}</text>
  <text x="50" y="450" class="label">Student ID :-  ${"15452645"}</text>
  <text x="50" y="480" class="label">Student Name :-  ${"vishal sah"}</text>
  <text x="50" y="510" class="label">Mother Name :-  ${"pramila devi"}</text>
  <text x="50" y="540" class="label">Nationality :-  ${"India"}</text>
  <text x="450" y="540" class="label">Mother tongue :-  ${"Hindi"}</text>
  <text x="50" y="570" class="label">Religion :-  ${"Hindu"}</text>
  <text x="450" y="570" class="label">Caste :-  ${"general"}</text>
  <text x="50" y="600" class="label">Birth place :-  ${"Ulhasnagar"}</text>
  <text x="50" y="630" class="label">Date of Birth :-  ${"2003/01/23"}</text>
  <text x="50" y="660" class="label">Previous standard :-  ${"7th"}</text>
  <text x="450" y="660" class="label">from when :-  ${2003}</text>

  <!-- Section Divider -->
  <line x1="50" y1="700" x2="750" y2="700" stroke="black" stroke-width="1"/>

  <!-- Confirmation Text -->
  <text x="100" y="740" class="label">A bonafide certificate is given, that all above information is from</text>
  <text x="50" y="765" class="label"> the school General Register</text>

  <!-- Date and Signatures -->
  <text x="50" y="810" class="label">Date :-  ${"17/10/2024"}</text>
  <text x="50" y="850" class="label">class Teacher Sign</text>
  <text x="600" y="850" class="label">principal</text>
  <text x="600" y="880" class="label">Stamp & sign</text>
</svg>
`