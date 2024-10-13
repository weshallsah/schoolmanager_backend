export const progress = () => {
  return `<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Border -->
  <rect x="10" y="10" width="780" height="980" fill="none" stroke="#000" stroke-width="2" />

  <!-- Header -->
  <text x="400" y="60" font-family="Arial, sans-serif" font-size="32" fill="#000" font-weight="bold" text-anchor="middle">
    Progress CARD
  </text>
  <text x="400" y="100" font-family="Arial, sans-serif" font-size="20" fill="#000" text-anchor="middle">
    New English High School
  </text>

  <!-- Student Information -->
  <text x="40" y="150" font-family="Arial, sans-serif" font-size="18" fill="#000">Student Name:</text>
  <line x1="170" y1="150" x2="370" y2="150" stroke="#000" stroke-width="1" />
  <text x="400" y="150" font-family="Arial, sans-serif" font-size="18" fill="#000">Roll no:</text>
  <line x1="480" y1="150" x2="680" y2="150" stroke="#000" stroke-width="1" />

  <text x="40" y="190" font-family="Arial, sans-serif" font-size="18" fill="#000">Standard: </text>
  <text x="200" y="190" font-family="Arial, sans-serif" font-size="18" fill="#000">2024 </text>
  <line x1="130" y1="190" x2="350" y2="190" stroke="#000" stroke-width="1" />
  <text x="400" y="190" font-family="Arial, sans-serif" font-size="18" fill="#000">Division:</text>
  <text x="580" y="190" font-family="Arial, sans-serif" font-size="18" fill="#000">2024 </text>
  <line x1="500" y1="190" x2="720" y2="190" stroke="#000" stroke-width="1" />

  <!-- Subject Table -->
  <text x="40" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">SUBJECTS</text>
  <text x="260" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">1st Term</text>
  <text x="360" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">2nd Term</text>
  <text x="460" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">3rd Term</text>
  <text x="560" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">Total</text>
  <text x="660" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">Obtained</text>
  <text x="740" y="230" font-family="Arial, sans-serif" font-size="18" fill="#000">Grade</text>

  <!-- Table Rows -->
  <g font-family="Arial, sans-serif" font-size="18" fill="#000">
    <text x="40" y="270">Math</text>
    <text x="40" y="310">Science</text>
    <text x="40" y="350">English</text>
    <text x="40" y="390">Foreign Language</text>
    <text x="40" y="430">Reading</text>
    <text x="40" y="470">Spelling</text>
    <text x="40" y="510">Social Studies</text>
    <text x="40" y="550">Physical Education</text>
  </g>

  <!-- Vertical Grid Lines -->
  <line x1="240" y1="240" x2="240" y2="560" stroke="#000" stroke-width="1" />
  <text x="260" y="270" font-size="18">Math</text>
  <line x1="340" y1="240" x2="340" y2="560" stroke="#000" stroke-width="1" />
  <line x1="440" y1="240" x2="440" y2="560" stroke="#000" stroke-width="1" />
  <line x1="540" y1="240" x2="540" y2="560" stroke="#000" stroke-width="1" />
  <line x1="640" y1="240" x2="640" y2="560" stroke="#000" stroke-width="1" />
  <line x1="720" y1="240" x2="720" y2="560" stroke="#000" stroke-width="1" />

  <!-- Horizontal Grid Lines -->
  <line x1="40" y1="240" x2="780" y2="240" stroke="#000" stroke-width="1" />
  <line x1="40" y1="280" x2="780" y2="280" stroke="#000" stroke-width="1" />
  <line x1="40" y1="320" x2="780" y2="320" stroke="#000" stroke-width="1" />
  <line x1="40" y1="360" x2="780" y2="360" stroke="#000" stroke-width="1" />
  <line x1="40" y1="400" x2="780" y2="400" stroke="#000" stroke-width="1" />
  <line x1="40" y1="440" x2="780" y2="440" stroke="#000" stroke-width="1" />
  <line x1="40" y1="480" x2="780" y2="480" stroke="#000" stroke-width="1" />
  <line x1="40" y1="520" x2="780" y2="520" stroke="#000" stroke-width="1" />
  <line x1="40" y1="560" x2="780" y2="560" stroke="#000" stroke-width="1" />

  <!-- Grades Summary -->
  <rect x="40" y="580" width="340" height="100" fill="none" stroke="#000" stroke-width="1" />
  <text x="60" y="610" font-family="Arial, sans-serif" font-size="18" fill="#000">Terms Based Grade</text>
  <text x="60" y="640" font-family="Arial, sans-serif" font-size="16" fill="#000">1st</text>
  <text x="140" y="640" font-family="Arial, sans-serif" font-size="16" fill="#000">2nd</text>
  <text x="220" y="640" font-family="Arial, sans-serif" font-size="16" fill="#000">3rd</text>

  <!-- Feedback Section -->
  <text x="40" y="720" font-family="Arial, sans-serif" font-size="18" fill="#000">Teacher's Feedback</text>
  <line x1="40" y1="740" x2="780" y2="740" stroke="#000" stroke-width="1" />
  <line x1="40" y1="780" x2="780" y2="780" stroke="#000" stroke-width="1" />
  <line x1="40" y1="820" x2="780" y2="820" stroke="#000" stroke-width="1" />

  <!-- Attendance Section -->
  <text x="40" y="860" font-family="Arial, sans-serif" font-size="18" fill="#000">Total School Days:</text>
  <line x1="240" y1="855" x2="380" y2="855" stroke="#000" stroke-width="1" />
  <text x="400" y="860" font-family="Arial, sans-serif" font-size="18" fill="#000">Attendance:</text>
  <line x1="520" y1="855" x2="720" y2="855" stroke="#000" stroke-width="1" />
</svg>`;
};
