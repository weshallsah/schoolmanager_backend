export const progress = (
  name,
  enroll,
  school,
  standard,
  Devision,
  sub,
  marks,
  feedback
) => {
  const header = `<svg xmlns="http://www.w3.org/2000/svg" width="595" height="842" viewBox="0 0 800 1000">
  <!-- Background -->
  <rect width="595" height="842" fill="#ffffff"/>
  
  <!-- Header -->
  <rect width="800" height="100" fill="#1a3a5c"/>
  <text x="400" y="50" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle" font-weight="bold">REPORT CARD</text>
  <text x="400" y="85" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle">${school}</text>
  
  <!-- Student Info -->
  <text x="50" y="140" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">Name:</text>
  <text x="100" y="140" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">${name}</text>
  <line x1="100" y1="145" x2="390" y2="145" stroke="#1a3a5c" stroke-width="1"/>
  
  <text x="410" y="140" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">Roll No:</text>
  <text x="470" y="140" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">${enroll}</text>
  <line x1="450" y1="145" x2="740" y2="145" stroke="#1a3a5c" stroke-width="1"/>
  
  <text x="50" y="180" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">Standard:</text>
  <text x="120" y="180" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">${standard}th</text>
  <line x1="110" y1="185" x2="390" y2="185" stroke="#1a3a5c" stroke-width="1"/>
  
  <text x="410" y="180" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">Division:</text>
  <text x="520" y="180" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">${Devision}</text>
  <line x1="520" y1="185" x2="740" y2="185" stroke="#1a3a5c" stroke-width="1"/>
  
  <!-- Table Header -->
  <rect x="50" y="220" width="233" height="30" fill="#1a3a5c"/>
  <rect x="283" y="220" width="233" height="30" fill="#1a3a5c"/>
  <rect x="516" y="220" width="234" height="30" fill="#1a3a5c"/>
  
  <text x="166" y="242" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">SUBJECT</text>
  <text x="399" y="242" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">GRADE</text>
  <text x="633" y="242" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">FEEDBACK</text>
`;

  const bottom = `<!-- Grading Scale -->
  <text x="50" y="600" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c" font-weight="bold">GRADING SCALE:</text>
  <text x="50" y="625" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">A+ = 96-100    C = 76-80</text>
  <text x="50" y="645" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">A = 91-95      D = 75 - 70</text>
  <text x="50" y="665" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">B+ = 86-90    FAIL = 69 and below</text>
  <text x="50" y="685" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">B = 81-85</text>
  
  <!-- school signature -->
  <text x="400" y="600" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c" font-weight="bold">SCHOOL SIGNATURE:</text>
  <text x="400" y="625" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">Teacher Signe:</text>
  <line x1="510" y1="630" x2="740" y2="630" stroke="#1a3a5c" stroke-width="1"/>
  <text x="400" y="650" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c">School Stamp:</text>
  
</svg>`;

  let fullsvg = header;
  let y = 250,
    y1 = 270;
  for (let i = 0; i < sub.length; i++) {
    const grade = givegrade(marks[i]);
    const temp = subject(y, y1, feedback[i], grade, sub[i]);
    fullsvg += temp;
    y = y1 + 10;
    y1 = y + 20;
  }
  // console.log(fullsvg);
  return fullsvg + bottom;
};

const subject = (y1, y2, feedback, grade, subjects) => {
  const sub = `<rect x="50" y="${y1}" width="233" height="30" fill="#f2f2f2"/>
  <rect x="283" y="${y1}" width="233" height="30" fill="#f2f2f2"/>
  <rect x="516" y="${y1}" width="234" height="30" fill="#f2f2f2"/>
  <text x="166" y="${y2}" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c" text-anchor="middle">${subjects}</text>
  <text x="399" y="${y2}" font-family="Arial, sans-serif" font-size="14" fill="#1a3a5c" text-anchor="middle">${grade}</text>
  <text x="633" y="${y2}" font-family="Arial, sans-serif" font-size="12" fill="#1a3a5c" text-anchor="middle">${feedback}</text>`;
  return sub;
};

const givegrade = (mark) => {
  if (mark >= 91 && mark <= 100) {
    return "A+";
  } else if (mark >= 81 && mark < 91) {
    return "A";
  } else if (mark >= 71 && mark < 81) {
    return "B+";
  } else if (mark >= 61 && mark < 71) {
    return "B";
  } else if (mark >= 51 && mark < 61) {
    return "C+";
  } else if (mark >= 41 && mark < 51) {
    return "C";
  } else if (mark >= 33 && mark < 41) {
    return "D+";
  } else if (mark >= 21 && mark < 33) {
    return "D";
  } else {
    return "E";
  }
};
