/**
 * data.js — EDIT FILE INI UNTUK MENGUBAH KONTEN PORTOFOLIO
 * Semua konten terpusat di sini agar mudah diperbarui.
 */

const PORTFOLIO = {

  /* ── PROFIL ─────────────────────────────────────────────── */
  profile: {
    nama: "Iqbal Mahdi Bisyafaa",
    inisial: "IMB",
    jabatan: "Fresh Graduate S1 Informatika",
    tagline: "Siap berkontribusi sebagai Web Developer, IT Support, atau Data Analyst.",
    status: "Open to Work 🟢",
    lokasi: "Bekasi, Indonesia",
    email: "iqbalmahdi2002@gmail.com",
    telepon: "+62 812-8007-7238",
    linkedin: "https://www.linkedin.com/in/iqbal-mahdi-397459347",
    github: "https://github.com/YMIR789",
    instagram: "https://instagram.com/iqbal._hs",
    cvPath: "public/CV Iqbal Mahdi Bisyafaa.pdf",
    fotoProfil: "public/Profil.jpg",    // Foto profil resmi
  },

  /* ── TENTANG ─────────────────────────────────────────────── */
  about: {
    paragraf: [
      "Saya adalah lulusan S1 Informatika yang bersemangat membangun solusi digital yang berdampak nyata. Selama kuliah saya aktif mengerjakan proyek berbasis web, mengelola sistem informasi, dan belajar mandiri di luar kurikulum.",
      "Saya menikmati bekerja di lingkungan kolaboratif, cepat beradaptasi dengan teknologi baru, dan terbiasa mendokumentasikan pekerjaan secara rapi agar mudah dipelihara oleh tim.",
    ],
    stats: [
      { angka: "3.58", satuan: "/4.00", label: "IPK Kelulusan" },
      { angka: "3+", satuan: "", label: "Proyek & Pencapaian Selesai" },
      { angka: "3", satuan: "", label: "Pengalaman Kerja & Magang" },
      { angka: "6", satuan: "+", label: "Sertifikasi & Pelatihan" },
    ],
    info: [
      { icon: "graduation-cap", label: "Pendidikan", value: "S1 Informatika" },
      { icon: "map-pin", label: "Lokasi", value: "Bekasi, Jawa Barat" },
      { icon: "languages", label: "Bahasa", value: "Indonesia (native), Inggris (pasif)" },
      { icon: "briefcase", label: "Tersedia", value: "Full-time · Hybrid · Remote" },
    ],
  },

  /* ── KEAHLIAN ─────────────────────────────────────────────── */
  skills: [
    {
      kategori: "Frontend",
      icon: "monitor",
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design"],
    },
    {
      kategori: "Backend",
      icon: "server",
      tags: ["PHP", "Laravel", "CodeIgniter", "REST API", "MVC Pattern"],
    },
    {
      kategori: "Database",
      icon: "database",
      tags: ["MySQL", "PostgreSQL", "phpMyAdmin", "SQL Query"],
    },
    {
      kategori: "Tools & Perangkat",
      icon: "wrench",
      tags: ["Google Earth", "Git", "GitHub", "VS Code", "Linux", "XAMPP", "Postman"],
    },
    {
      kategori: "Data, BOQ & Office",
      icon: "chart-bar",
      tags: ["Microsoft Excel (Expert / Macro VBA)", "Pivot Tables & Dashboard", "BOQ Mapping", "Google Sheets", "Power BI (dasar)"],
    },
    {
      kategori: "Soft Skills",
      icon: "users",
      tags: ["Quality Control", "Ketelitian", "Problem Solving", "Kerja Tim", "Komunikasi"],
    },
  ],

  /* ── PENGALAMAN ─────────────────────────────────────────────── */
  experience: [
    {
      role: "Planning & Design - Magang",
      company: "PT Trans Indonesia Superkoridor (Supercorridor)",
      period: "Februari 2025 – April 2025",
      deskripsi: [
        "Membantu perencanaan dan pemetaan jaringan WiFi sesuai kebutuhan lokasi.",
        "Melakukan pemetaan area dan penentuan titik perangkat menggunakan Google Earth.",
        "Membantu membuat desain serta dokumentasi jaringan untuk kebutuhan instalasi.",
        "Mengisi dan memperbarui BOQ (Bill of Quantity) kebutuhan pemasangan menggunakan Microsoft Excel.",
        "Melakukan pengecekan data BOQ dengan tingkat ketelitian ±99%."
      ],
      tags: ["Network Planning", "Google Earth", "WiFi Mapping", "BOQ", "Microsoft Excel"],
    },
    {
      role: "Quality Control - Daily Worker",
      company: "DSV Contract Logistics",
      period: "Agustus 2021 – November 2021",
      deskripsi: [
        "Membantu melakukan inspeksi kualitas produk sesuai standar yang ditetapkan perusahaan.",
        "Melakukan pengecekan kondisi dan kualitas produk dengan tingkat ketelitian hingga 98%.",
        "Membantu mengidentifikasi dan memisahkan produk yang tidak sesuai dengan standar kualitas.",
        "Melakukan pencatatan hasil pemeriksaan dan temuan selama proses quality control."
      ],
      tags: ["Quality Control", "Quality Inspection", "Standard Compliance", "Reporting"],
    },
    {
      role: "Produksi - Magang",
      company: "PT Kayu Permata (Permata Door)",
      period: "Januari 2020 – Maret 2020",
      deskripsi: [
        "Melakukan pengecekan kualitas kayu sebagai tahap awal proses produksi pintu.",
        "Mengidentifikasi bagian kayu yang berlubang atau memiliki cacat permukaan.",
        "Melakukan proses pendempulan pada bagian kayu yang berlubang atau tidak rata.",
        "Memastikan permukaan kayu siap untuk diproses ke tahap produksi berikutnya."
      ],
      tags: ["Quality Control", "Produksi", "Standar Mutu", "Ketelitian"],
    },
  ],

  /* ── PENDIDIKAN ─────────────────────────────────────────────── */
  education: [
    {
      degree: "S1 Informatika",
      institution: "Universitas Bhayangkara Jakarta Raya",
      period: "2021 – 2025",
      detail: "Fokus studi pada Rekayasa Perangkat Lunak, Sistem Basis Data, dan Jaringan Komputer.",
      ipk: "3.58 / 4.00",
    },
    {
      degree: "Rekayasa Perangkat Lunak (RPL)",
      institution: "SMKN 6 KOTA BEKASI",
      period: "2018 – 2021",
      detail: "Kompetensi keahlian Software Engineering: pemrograman web, basis data, dan algoritma.",
      ipk: null,
    },
    {
      degree: "Pendidikan Menengah Pertama",
      institution: "SMP AL-MUHADJIRIN BEKASI",
      period: "2015 – 2018",
      detail: "Menyelesaikan pendidikan tingkat menengah pertama dengan aktif pada kegiatan sekolah.",
      ipk: null,
    },
    {
      degree: "Pendidikan Dasar",
      institution: "SDN SUKABUMI UTARA 07 PAGI JAKARTA",
      period: "2009 – 2015",
      detail: "Menyelesaikan pendidikan tingkat dasar formal.",
      ipk: null,
    },
  ],

  /* ── PROYEK & PENCAPAIAN ─────────────────────────────────── */
  projects: [
    {
      nama: "Sistem Informasi Penjadwalan & Pelaporan Kegiatan Satlinmas",
      tipe: "Skripsi / Web App",
      deskripsi: "Sistem informasi berbasis web yang dikembangkan sebagai Tugas Akhir (Skripsi) S1 Informatika di Universitas Bhayangkara Jakarta Raya. Memfasilitasi Kelurahan Marga Mulya dalam pengelolaan 30 anggota Satlinmas, otomasi penjadwalan patroli wilayah, rekap absensi, serta pelaporan kegiatan keamanan lingkungan secara terintegrasi.",
      stack: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
      gambar: "public/satlinmas/Satlinmas.png",
      emoji: "🛡️",
      github: "https://github.com/iqbalmahdi",
      demo: "",
    },
  ],

  certificates: [],

  /* ── PENCAPAIAN ───────────────────────────────────────────── */
  achievements: [
    {
      nama: "Juara 3 E-Sport MLBB Piala Dekan Universitas Bhayangkara",
      penyelenggara: "BEM Fasilkom Universitas Bhayangkara Jakarta Raya",
      periode: "Februari 2023",
      deskripsi: "Meraih Juara 3 dalam kompetisi E-Sport Mobile Legends: Bang Bang (MLBB) tingkat fakultas pada ajang Piala Dekan.",
      gambar: "public/E-Sport.jpeg",
      icon: "award",
    },
    {
      nama: "Juara 1 Futsal Piala Dekan Universitas Bhayangkara",
      penyelenggara: "BEM Fasilkom Universitas Bhayangkara Jakarta Raya",
      periode: "Februari 2023",
      deskripsi: "Menjuarai Piala Dekan Yang Diadakan Oleh BEM Fasilkom Di Universitas Bhayangkara Jakarta Raya",
      gambar: "public/Futsal.jpeg",
      icon: "award",
    },
  ],

  /* ── PELATIHAN & BOOTCAMP ────────────────────────────────────── */
  training: [
    {
      nama: "Bootcamp Microsoft Office Excel, Word & PowerPoint Specialist",
      penyelenggara: "KarirNex by PT Ebiz Karisma Internasional",
      predikat: "EXPERT",
      durasi: "25 Jam Pelatihan",
      periode: "Oktober 2026 · Berlaku s.d. 24 Okt 2027",
      nomor: "No. 844/B-10/34MST10/KRX/X/2026",
      deskripsi: "Pelatihan intensif 25 Jam dengan predikat kelulusan EXPERT. Mencakup Advanced Excel Formulas, VLOOKUP & INDEX-MATCH, Pivot Tables, Dashboard Laporan & Interaktif, serta Macro VBA.",
      tags: ["Excel Expert", "VLOOKUP & Index Match", "Pivot Tables", "Dashboard Interaktif", "Macro VBA", "PowerPoint"],
      icon: "chart-bar",
      file: "public/Iqbal_Mahdi_Bisyafaa-bootcamp-microsoft-office-excel-word-power-point-specialist.pdf",
    },
    {
      nama: "Bimbingan Teknis LSP P1 – Skema Software Engineer (SE)",
      penyelenggara: "Fakultas Ilmu Komputer Universitas Bhayangkara Jakarta Raya",
      predikat: "LSP P1",
      durasi: "9 JP",
      periode: "19 – 21 Mei 2026",
      nomor: "No. 017/SE/V/2026/FASILKOM-UBJ",
      deskripsi: "Bimbingan Teknis berbasis SKKNI: Merancang UI, Merancang Struktur Software, Spesifikasi Kebutuhan Software, Dokumentasi, serta Identifikasi & Klasifikasi Kebutuhan Sistem.",
      tags: ["Software Engineering", "UI Design", "Software Architecture", "SKKNI", "LSP P1"],
      icon: "monitor",
      file: "public/017-Iqbal Mahdi Bisyafaa-Sertifikat Bimtek Skema Software Engineer (SE) Genap 2526_17 (1).pdf",
    },
    {
      nama: "Seminar Nasional Bela Negara",
      penyelenggara: "Universitas Bhayangkara Jakarta Raya",
      predikat: "Sertifikat Pelatihan",
      durasi: "",
      periode: "Pelatihan Mahasiswa",
      nomor: "",
      deskripsi: "Program pembinaan kesadaran bela negara, kedisiplinan mental, integritas moral, dan kepemimpinan.",
      tags: ["Leadership", "Kedisiplinan", "Kerja Tim"],
      icon: "award",
      file: "public/E-Sertifikat Seminar Nasional Bela Negara Iqbal Mahdi Bisyafaa.pdf",
    },
    {
      nama: "Lokakarya (Workshop)",
      penyelenggara: "Universitas Bhayangkara Jakarta Raya",
      predikat: "Sertifikat Kegiatan",
      durasi: "",
      periode: "Kegiatan Kampus",
      nomor: "",
      deskripsi: "Partisipasi aktif dalam kegiatan lokakarya akademik dan pengembangan keterampilan praktis.",
      tags: ["Workshop", "Skill Development"],
      icon: "wrench",
      file: "public/ESertifikat Lokakarya Iqbal Mahdi Bisyafaa.pdf",
    },
    {
      nama: "Kuliah Umum Fasilkom Series #3",
      penyelenggara: "Universitas Bhayangkara Jakarta Raya",
      predikat: "Sertifikat Partisipasi",
      durasi: "",
      periode: "Seminar & Wawasan",
      nomor: "",
      deskripsi: "Partisipasi dalam seminar dan kuliah umum mengenai tren industri teknologi terkini.",
      tags: ["Industry Insights", "Seminar"],
      icon: "users",
      file: "public/Iqbal mahdi bisyafaa - Sertifikat Kuliah Umum Fasilkom Series 3.pdf",
    },
  ],
};
