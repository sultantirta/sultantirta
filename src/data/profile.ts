/**
 * ============================================================
 *  SEMUA KONTEN LANDING PAGE ADA DI FILE INI.
 *  Field berbentuk { id: '...', en: '...' } = versi Indonesia & English.
 * ============================================================
 */

export type L = { id: string; en: string };

export type Assignment = {
  /** nama tim / unit penugasan */
  team: string;
  role: L;
  points: L[];
};

export type Experience = {
  company: string;
  role: L;
  type: L;
  location: string;
  /** format 'YYYY-MM' */
  start: string;
  /** 'YYYY-MM' atau null jika masih bekerja di sini */
  end: string | null;
  summary?: L;
  points: L[];
  tags: string[];
  /** penugasan tambahan di perusahaan yang sama (opsional) */
  assignments?: Assignment[];
};

export type Education = {
  school: string;
  degree: L;
  location?: string;
  start: string;
  end: string;
  gpa?: string;
  note?: L;
};

export type CoreSkill = {
  title: L;
  desc: L;
};

export type ToolGroup = {
  group: string;
  desc?: L;
  /** string biasa, atau { id, en } kalau namanya beda per bahasa */
  items: (string | L)[];
};

export type Certificate = {
  title: string;
  issuer: string;
  /** 'YYYY-MM' */
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  /** path gambar di /public, mis. '/images/certificates/aws.jpg'. Kosongkan untuk kartu otomatis. */
  image?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: L;
  summary: L;
  description: L;
  role: L;
  tools: string[];
  /** path gambar di /public, mis. '/images/portfolio/dashboard.jpg'. Kosongkan untuk cover otomatis. */
  cover?: string;
  gallery?: string[];
  /** link demo / website. Kosongkan ('') untuk menyembunyikan tombol. */
  liveUrl?: string;
  /** link repository / dokumen. Kosongkan ('') untuk menyembunyikan tombol. */
  repoUrl?: string;
  /** warna aksen untuk cover otomatis */
  accent: string;
};

export const profile = {
  firstName: "Sultan",
  lastName: "Tirta",
  role: {
    id: "Research Operations Staff",
    en: "Research Operations Staff",
  } as L,
  company: "PT Riset Perkebunan Nusantara",
  location: { id: "Bogor, Indonesia", en: "Bogor, Indonesia" } as L,
  timezone: "Asia/Jakarta",
  timezoneLabel: "WIB",
  /** TODO: ganti dengan nomor aslimu (tampil di halaman) */
  phone: "+62 812-8341-5519",
  /** TODO: nomor WhatsApp tanpa '+' atau spasi, dipakai untuk link wa.me */
  whatsapp: "6281283415519",
  /** TODO: ganti dengan email aslimu */
  email: "sultantirtaa@gmail.com",
  openToWork: true,
  /** foto profil di /public, mis. '/images/me.jpg'. Kosongkan untuk sampul inisial. */
  photo: "/images/me.jpg",

  /** TODO: ganti link media sosial */
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "GitHub", url: "https://github.com/" },
    { label: "Instagram", url: "https://www.instagram.com/" },
  ],

  summary: {
    id: "Berpengalaman dalam pengelolaan data, pengarsipan dokumen, serta penyusunan laporan secara sistematis. Mampu melakukan analisis dan visualisasi data serta mengembangkan sistem sederhana untuk mendukung efisiensi proses kerja. Memiliki ketelitian tinggi, kemampuan problem solving yang baik, serta mampu bekerja secara mandiri maupun dalam tim untuk mencapai target organisasi.",
    en: "Experienced in data management, document archiving, and systematic report preparation. Able to analyze and visualize data and to build simple systems that make work processes more efficient. Highly detail-oriented with strong problem-solving skills, and comfortable working independently or as part of a team to reach organizational goals.",
  } as L,

  experience: [
    {
      company: "PT Riset Perkebunan Nusantara",
      role: {
        id: "Research Operations Staff",
        en: "Research Operations Staff",
      },
      type: { id: "Penuh waktu", en: "Full-time" },
      location: "Bogor, Indonesia",
      start: "2024-07",
      end: null,
      summary: {
        id: "Mendukung operasional riset perusahaan, dari monitoring kegiatan penelitian, administrasi dokumen, hingga analisis data untuk pengambilan keputusan.",
        en: "Supporting the company’s research operations, from monitoring research activities and managing documents to analyzing data for decision-making.",
      },
      points: [
        {
          id: "Monitoring dan evaluasi kegiatan penelitian untuk memastikan pencapaian target dan ketepatan waktu.",
          en: "Monitor and evaluate research activities to make sure targets and timelines are met.",
        },
        {
          id: "Mengelola dokumen administrasi penelitian secara sistematis untuk memastikan akurasi dan kemudahan akses data.",
          en: "Manage research administration documents systematically for accuracy and easy access to data.",
        },
        {
          id: "Membuat surat resmi dan memo internal guna mendukung kelancaran operasional.",
          en: "Draft official letters and internal memos to keep operations running smoothly.",
        },
        {
          id: "Melakukan analisis data penelitian sebagai dasar pengambilan keputusan strategis.",
          en: "Analyze research data as a basis for strategic decision-making.",
        },
        {
          id: "Melakukan review dokumen untuk memastikan kepatuhan terhadap standar dan regulasi.",
          en: "Review documents to ensure compliance with standards and regulations.",
        },
        {
          id: "Mengidentifikasi dan memitigasi risiko dalam proses penelitian guna menjaga keberlanjutan dan integritas data.",
          en: "Identify and mitigate risks in the research process to protect data continuity and integrity.",
        },
        {
          id: "Mengoperasikan SAP dan berbagai aplikasi internal perusahaan untuk mendukung kegiatan operasional dan administrasi.",
          en: "Operate SAP and various internal company applications to support operations and administration.",
        },
        {
          id: "Berkoordinasi dengan lintas divisi/unit kerja dalam proses rekonsiliasi data, sinkronisasi informasi, serta mendukung kelancaran operasional perusahaan.",
          en: "Coordinate across divisions and work units on data reconciliation and information sync to keep company operations running smoothly.",
        },
        {
          id: "Menginisiasi dan mengembangkan sistem digital berbasis AI secara real-time untuk meningkatkan monitoring kinerja dan efisiensi operasional.",
          en: "Initiated and built a real-time, AI-based digital system to improve performance monitoring and operational efficiency.",
        },
      ],
      tags: [
        "SAP",
        "Data Analysis",
        "Monitoring & Evaluation",
        "Document Management",
        "AI",
      ],
      assignments: [
        {
          team: "Tim Kajian Internal — PT Riset Perkebunan Nusantara",
          role: { id: "Sekretariat", en: "Secretariat" },
          points: [
            {
              id: "Mengelola register kajian dan memonitor progresnya melalui dashboard, sehingga status kajian dapat dipantau Direksi dan tim secara real-time.",
              en: "Manage the study register and track its progress through a dashboard, so the Board of Directors and the team can follow each study in real time.",
            },
            {
              id: "Mengoordinasikan kebutuhan data dan jadwal pembahasan antara tim kajian dan unit kerja terkait.",
              en: "Coordinate data needs and discussion schedules between the study team and related work units.",
            },
            {
              id: "Menyusun, merevisi, dan memfinalisasi SOP dan Instruksi Kerja hingga siap ditetapkan.",
              en: "Draft, revise, and finalize SOPs and Work Instructions until they are ready to be approved.",
            },
            {
              id: "Menyiapkan rapat pembahasan kajian, termasuk bahan rapat dan notulensi.",
              en: "Prepare study review meetings, including meeting materials and minutes.",
            },
            {
              id: "Mendokumentasikan dan mengarsipkan data, working paper, notulensi, dan hasil kajian secara sistematis.",
              en: "Document and archive data, working papers, minutes, and study results systematically.",
            },
            {
              id: "Menginisiasi dan mengembangkan platform dashboard untuk pelaporan manajemen.",
              en: "Initiated and built a dashboard platform for management reporting.",
            },
          ],
        },
      ],
    },
  ] as Experience[],

  education: [
    {
      school: "Universitas Bina Sarana Informatika",
      degree: {
        id: "D3 Sistem Informasi",
        en: "Diploma (D3) in Information Systems",
      },
      location: "Bogor",
      start: "2020",
      end: "2023",
      gpa: "3,61 / 4,00",
      note: {
        id: "Tugas Akhir: Front-End Web Perhitungan Nutrisi Ibu Hamil untuk Mencegah Stunting menggunakan Progressive Web App di Dicoding Academy.",
        en: "Final project: a front-end web app that calculates nutrition for pregnant women to help prevent stunting, built as a Progressive Web App at Dicoding Academy.",
      },
    },
  ] as Education[],

  /** kompetensi utama (tampil sebagai kartu bernomor) */
  coreSkills: [
    {
      title: {
        id: "Manajemen & Analisis Data",
        en: "Data Management & Analysis",
      },
      desc: {
        id: "Pengelolaan, pengolahan, analisis, dan visualisasi data serta pembuatan dashboard.",
        en: "Managing, processing, analyzing, and visualizing data, and building dashboards.",
      },
    },
    {
      title: { id: "Monitoring & Evaluasi", en: "Monitoring & Evaluation" },
      desc: {
        id: "Pemantauan, evaluasi, dan pelaporan kegiatan serta kinerja.",
        en: "Monitoring, evaluating, and reporting on activities and performance.",
      },
    },
    {
      title: {
        id: "Administrasi & Manajemen Dokumen",
        en: "Administrative & Document Management",
      },
      desc: {
        id: "Pengelolaan dokumen, pengarsipan, administrasi, dan korespondensi resmi.",
        en: "Document management, archiving, administration, and official correspondence.",
      },
    },
    {
      title: { id: "Penyusunan Laporan & SOP", en: "Report & SOP Development" },
      desc: {
        id: "Penyusunan laporan, prosedur operasional standar (SOP), dan instruksi kerja.",
        en: "Writing reports, standard operating procedures (SOPs), and work instructions.",
      },
    },
    {
      title: {
        id: "Koordinasi & Manajemen Risiko",
        en: "Coordination & Risk Management",
      },
      desc: {
        id: "Koordinasi lintas fungsi, manajemen risiko, dan dukungan administrasi kegiatan.",
        en: "Cross-functional coordination, risk management, and administrative support for activities.",
      },
    },
  ] as CoreSkill[],

  /** tools & aplikasi (tampil sebagai chip) */
  tools: [
    {
      group: "Microsoft Office",
      items: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"],
    },
    {
      group: "Google Workspace",
      desc: {
        id: "Untuk otomasi pekerjaan dan pelaporan",
        en: "For work automation and reporting",
      },
      items: ["Google Docs", "Google Sheets", "Google Apps Script"],
    },
    {
      group: "Business Applications",
      items: [
        "SAP",
        {
          id: "Sistem informasi manajemen",
          en: "Management information systems",
        },
        { id: "Aplikasi perkantoran digital", en: "Digital office apps" },
        { id: "Sistem monitoring", en: "Monitoring systems" },
      ],
    },
    {
      group: "Digital Tools & AI",
      desc: {
        id: "Untuk produktivitas, otomasi, dan pengembangan solusi kerja",
        en: "For productivity, automation, and building work solutions",
      },
      items: ["Canva", { id: "AI generatif", en: "Generative AI" }],
    },
  ] as ToolGroup[],

  /** TODO: ganti dengan sertifikat aslimu (ini masih contoh) */
  certificates: [
    {
      title: "Software Development",
      issuer: "Indonesian Professional Certification Authority",
      date: "2022-08",
      credentialUrl:
        "https://drive.google.com/file/d/1ZLkYVHnanmr9L5oilpWkCXscT9JBK8vs/view?usp=sharing",
      image: "/images/certificates/bnsp.jpg",
    },
    {
      title: "Menjadi Front-End Web Developer Expert",
      issuer: "Dicoding Academy",
      date: "2022-11",
      credentialUrl: "https://www.dicoding.com/certificates/72ZD99R8QPYW",
      image: "/images/certificates/fe-web-expert-dicoding.jpg",
    },
  ] as Certificate[],

  /**
   * Proyek diambil dari CV. Isi liveUrl / repoUrl dengan link-mu,
   * dan sesuaikan tahun & tools kalau perlu.
   */
  portfolio: [
    {
      slug: "monitoring-riset-dan-peneliti",
      title: "Monitoring Riset dan Peneliti",
      year: "2026",
      category: {
        id: "Sistem Digital Berbasis AI",
        en: "AI-based Digital System",
      },
      summary: {
        id: "Web app untuk memantau seluruh riset di Direktorat Riset, Inovasi, dan Sustainability, baik riset internal maupun eksternal. Satu dashboard menampilkan progres fisik, realisasi anggaran, tingkat kesiapan teknologi, dan perjalanan setiap riset.",
        en: "A web app for monitoring every research project in the Directorate of Research, Innovation, and Sustainability, both internal and externally funded. One dashboard shows each project's physical progress, budget spending, technology readiness, and history.",
      },
      description: {
        id: "Dashboard ini menggantikan pemantauan riset yang sebelumnya tersebar di banyak file. Data tersimpan di Google Sheets dan ditampilkan lewat web app yang ringan dan responsif. Pimpinan dan peneliti bisa melihat tanpa login, sedangkan admin memakai kode akses untuk menambah dan memperbarui data.",
        en: "The dashboard replaces research tracking that used to be spread across many files. Data is stored in Google Sheets and presented through a lightweight, responsive web app. Leaders and researchers can view it without logging in, while admins use an access code to add and update records.",
      },
      role: { id: "Inisiator & Pengembang", en: "Initiator & Developer" },
      tools: ["Google Sheets", "Google Apps Script", "HTML/CSS/JS"],
      cover: "/images/portfolio/dashboard-monitoring-riset-dan-peneliti.png",
      gallery: [
        "/images/portfolio/dashboard-monitoring-riset-dan-peneliti-2.png",
        "/images/portfolio/dashboard-monitoring-riset-dan-peneliti-3.png",
        "/images/portfolio/dashboard-monitoring-riset-dan-peneliti-4.png",
      ],
      liveUrl:
        "https://script.google.com/macros/s/AKfycbxCF_WzQqih2p1bIQPylErkIyeNetDNyk-4owNVWKmCWoxRl5BQDD_0ESKrh28ecKAtyA/exec",
      repoUrl: "",
      accent: "#c9824a",
    },
    {
      slug: "tim-kajian-internal",
      title: "Tim Kajian Internal",
      year: "2026",
      category: {
        id: "Sistem Digital Berbasis AI",
        en: "AI-based Digital System",
      },
      summary: {
        id: "Dashboard web untuk sekretariat Tim Kajian Internal PT RPN, yang memantau setiap kajian dari permohonan sampai rekomendasi ke Direksi.",
        en: "A web app for monitoring every research project in the Directorate of Research, Innovation, and Sustainability, both internal and externally funded. One dashboard shows each project's physical progress, budget spending, technology readiness, and history.",
      },
      description: {
        id: "Dashboard ini menggantikan pencatatan kajian yang sebelumnya tersebar di banyak tempat. Fiturnya meliputi register kajian per tahapan, rekomendasi dan keputusan Direksi, jadwal rapat, register SOP, arsip dokumen, survei kepuasan divisi pemohon, dan ekspor evidence ke Excel. Ada dua peran, yaitu Admin dan Direksi, serta pilihan tampilan Light/Dark. Dibangun dengan Vite dan JavaScript, lalu di-deploy ke GitHub Pages. Data di versi demo adalah data fiktif.",
        en: "TThe dashboard replaces scattered review records with a single workspace. It covers a stage-based review register, board recommendations and decisions, meetings, an SOP register, a document archive, satisfaction surveys for requesting divisions, and Excel export of report evidence. It has two roles, Admin and Director, plus Light/Dark themes. Built with Vite and JavaScript and deployed to GitHub Pages. The demo uses fictional data.",
      },
      role: { id: "Inisiator & Pengembang", en: "Initiator & Developer" },
      tools: ["Google Sheets", "Google Apps Script", "HTML/CSS/JS"],
      cover: "/images/portfolio/tim-kajian-internal-1.png",
      gallery: [
        "/images/portfolio/tim-kajian-internal-2-dark.png",
        "/images/portfolio/tim-kajian-internal-2-light.png",
        "/images/portfolio/tim-kajian-internal-3.png",
        "/images/portfolio/tim-kajian-internal-4.png",
      ],
      liveUrl: "https://sultantirta.github.io/tkin-rpn/",
      repoUrl: "",
      accent: "#c9824a",
    },
  ] as Project[],
};
