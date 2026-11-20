/**
 * ============================================================
 *  SEMUA KONTEN LANDING PAGE ADA DI FILE INI.
 *  Field berbentuk { id: '...', en: '...' } = versi Indonesia & English.
 * ============================================================
 */

export type L = { id: string; en: string }

export type Assignment = {
  /** nama tim / unit penugasan */
  team: string
  role: L
  points: L[]
}

export type Experience = {
  company: string
  role: L
  type: L
  location: string
  /** format 'YYYY-MM' */
  start: string
  /** 'YYYY-MM' atau null jika masih bekerja di sini */
  end: string | null
  summary?: L
  points: L[]
  tags: string[]
  /** penugasan tambahan di perusahaan yang sama (opsional) */
  assignments?: Assignment[]
}

export type Education = {
  school: string
  degree: L
  location?: string
  start: string
  end: string
  gpa?: string
  note?: L
}

export type CoreSkill = {
  title: L
  desc: L
}

export type ToolGroup = {
  group: string
  desc?: L
  /** string biasa, atau { id, en } kalau namanya beda per bahasa */
  items: (string | L)[]
}

export type Certificate = {
  title: string
  issuer: string
  /** 'YYYY-MM' */
  date: string
  credentialId?: string
  credentialUrl?: string
  /** path gambar di /public, mis. '/images/certificates/aws.jpg'. Kosongkan untuk kartu otomatis. */
  image?: string
}

export type Project = {
  slug: string
  title: string
  year: string
  category: L
  summary: L
  description: L
  role: L
  tools: string[]
  /** path gambar di /public, mis. '/images/portfolio/dashboard.jpg'. Kosongkan untuk cover otomatis. */
  cover?: string
  gallery?: string[]
  /** link demo / website. Kosongkan ('') untuk menyembunyikan tombol. */
  liveUrl?: string
  /** link repository / dokumen. Kosongkan ('') untuk menyembunyikan tombol. */
  repoUrl?: string
  /** warna aksen untuk cover otomatis */
  accent: string
}

export const profile = {
  firstName: 'Sultan',
  lastName: 'Tirta',
  role: { id: 'Research Operations Staff', en: 'Research Operations Staff' } as L,
  company: 'PT Riset Perkebunan Nusantara',
  location: { id: 'Bogor, Indonesia', en: 'Bogor, Indonesia' } as L,
  timezone: 'Asia/Jakarta',
  timezoneLabel: 'WIB',
  /** TODO: ganti dengan nomor aslimu (tampil di halaman) */
  phone: '+62 812-0000-0000',
  /** TODO: nomor WhatsApp tanpa '+' atau spasi, dipakai untuk link wa.me */
  whatsapp: '6281200000000',
  /** TODO: ganti dengan email aslimu */
  email: 'hello@example.com',
  openToWork: true,
  /** foto profil di /public, mis. '/images/me.jpg'. Kosongkan untuk sampul inisial. */
  photo: '/images/me.jpg',

  /** TODO: ganti link media sosial */
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'Instagram', url: 'https://www.instagram.com/' },
  ],

  summary: {
    id: 'Berpengalaman dalam pengelolaan data, pengarsipan dokumen, serta penyusunan laporan secara sistematis. Mampu melakukan analisis dan visualisasi data serta mengembangkan sistem sederhana untuk mendukung efisiensi proses kerja. Memiliki ketelitian tinggi, kemampuan problem solving yang baik, serta mampu bekerja secara mandiri maupun dalam tim untuk mencapai target organisasi.',
    en: 'Experienced in data management, document archiving, and systematic report preparation. Able to analyze and visualize data and to build simple systems that make work processes more efficient. Highly detail-oriented with strong problem-solving skills, and comfortable working independently or as part of a team to reach organizational goals.',
  } as L,

  experience: [
    {
      company: 'PT Riset Perkebunan Nusantara',
      role: { id: 'Research Operations Staff', en: 'Research Operations Staff' },
      type: { id: 'Penuh waktu', en: 'Full-time' },
      location: 'Bogor, Indonesia',
      start: '2024-07',
      end: null,
      summary: {
        id: 'Mendukung operasional riset perusahaan, dari monitoring kegiatan penelitian, administrasi dokumen, hingga analisis data untuk pengambilan keputusan.',
        en: 'Supporting the company’s research operations, from monitoring research activities and managing documents to analyzing data for decision-making.',
      },
      points: [
        {
          id: 'Monitoring dan evaluasi kegiatan penelitian untuk memastikan pencapaian target dan ketepatan waktu.',
          en: 'Monitor and evaluate research activities to make sure targets and timelines are met.',
        },
        {
          id: 'Mengelola dokumen administrasi penelitian secara sistematis untuk memastikan akurasi dan kemudahan akses data.',
          en: 'Manage research administration documents systematically for accuracy and easy access to data.',
        },
        {
          id: 'Membuat surat resmi dan memo internal guna mendukung kelancaran operasional.',
          en: 'Draft official letters and internal memos to keep operations running smoothly.',
        },
        {
          id: 'Melakukan analisis data penelitian sebagai dasar pengambilan keputusan strategis.',
          en: 'Analyze research data as a basis for strategic decision-making.',
        },
        {
          id: 'Melakukan review dokumen untuk memastikan kepatuhan terhadap standar dan regulasi.',
          en: 'Review documents to ensure compliance with standards and regulations.',
        },
        {
          id: 'Mengidentifikasi dan memitigasi risiko dalam proses penelitian guna menjaga keberlanjutan dan integritas data.',
          en: 'Identify and mitigate risks in the research process to protect data continuity and integrity.',
        },
        {
          id: 'Mengoperasikan SAP dan berbagai aplikasi internal perusahaan untuk mendukung kegiatan operasional dan administrasi.',
          en: 'Operate SAP and various internal company applications to support operations and administration.',
        },
        {
          id: 'Berkoordinasi dengan lintas divisi/unit kerja dalam proses rekonsiliasi data, sinkronisasi informasi, serta mendukung kelancaran operasional perusahaan.',
          en: 'Coordinate across divisions and work units on data reconciliation and information sync to keep company operations running smoothly.',
        },
        {
          id: 'Menginisiasi dan mengembangkan sistem digital berbasis AI secara real-time untuk meningkatkan monitoring kinerja dan efisiensi operasional.',
          en: 'Initiated and built a real-time, AI-based digital system to improve performance monitoring and operational efficiency.',
        },
      ],
      tags: ['SAP', 'Data Analysis', 'Monitoring & Evaluation', 'Document Management', 'AI'],
      assignments: [
        {
          team: 'Tim Kajian Internal — PT Riset Perkebunan Nusantara',
          role: { id: 'Sekretariat', en: 'Secretariat' },
          points: [
            {
              id: 'Mengelola register kajian dan memonitor progresnya melalui dashboard, sehingga status kajian dapat dipantau Direksi dan tim secara real-time.',
              en: 'Manage the study register and track its progress through a dashboard, so the Board of Directors and the team can follow each study in real time.',
            },
            {
              id: 'Mengoordinasikan kebutuhan data dan jadwal pembahasan antara tim kajian dan unit kerja terkait.',
              en: 'Coordinate data needs and discussion schedules between the study team and related work units.',
            },
            {
              id: 'Menyusun, merevisi, dan memfinalisasi SOP dan Instruksi Kerja hingga siap ditetapkan.',
              en: 'Draft, revise, and finalize SOPs and Work Instructions until they are ready to be approved.',
            },
            {
              id: 'Menyiapkan rapat pembahasan kajian, termasuk bahan rapat dan notulensi.',
              en: 'Prepare study review meetings, including meeting materials and minutes.',
            },
            {
              id: 'Mendokumentasikan dan mengarsipkan data, working paper, notulensi, dan hasil kajian secara sistematis.',
              en: 'Document and archive data, working papers, minutes, and study results systematically.',
            },
            {
              id: 'Menginisiasi dan mengembangkan platform dashboard untuk pelaporan manajemen.',
              en: 'Initiated and built a dashboard platform for management reporting.',
            },
          ],
        },
      ],
    },
  ] as Experience[],

  education: [
    {
      school: 'Universitas Bina Sarana Informatika',
      degree: { id: 'D3 Sistem Informasi', en: 'Diploma (D3) in Information Systems' },
      location: 'Bogor',
      start: '2020',
      end: '2023',
      gpa: '3,61 / 4,00',
      note: {
        id: 'Tugas Akhir: Front-End Web Perhitungan Nutrisi Ibu Hamil untuk Mencegah Stunting menggunakan Progressive Web App di Dicoding Academy.',
        en: 'Final project: a front-end web app that calculates nutrition for pregnant women to help prevent stunting, built as a Progressive Web App at Dicoding Academy.',
      },
    },
  ] as Education[],

  /** kompetensi utama (tampil sebagai kartu bernomor) */
  coreSkills: [
    {
      title: { id: 'Manajemen & Analisis Data', en: 'Data Management & Analysis' },
      desc: {
        id: 'Pengelolaan, pengolahan, analisis, dan visualisasi data serta pembuatan dashboard.',
        en: 'Managing, processing, analyzing, and visualizing data, and building dashboards.',
      },
    },
    {
      title: { id: 'Monitoring & Evaluasi', en: 'Monitoring & Evaluation' },
      desc: {
        id: 'Pemantauan, evaluasi, dan pelaporan kegiatan serta kinerja.',
        en: 'Monitoring, evaluating, and reporting on activities and performance.',
      },
    },
    {
      title: { id: 'Administrasi & Manajemen Dokumen', en: 'Administrative & Document Management' },
      desc: {
        id: 'Pengelolaan dokumen, pengarsipan, administrasi, dan korespondensi resmi.',
        en: 'Document management, archiving, administration, and official correspondence.',
      },
    },
    {
      title: { id: 'Penyusunan Laporan & SOP', en: 'Report & SOP Development' },
      desc: {
        id: 'Penyusunan laporan, prosedur operasional standar (SOP), dan instruksi kerja.',
        en: 'Writing reports, standard operating procedures (SOPs), and work instructions.',
      },
    },
    {
      title: { id: 'Koordinasi & Manajemen Risiko', en: 'Coordination & Risk Management' },
      desc: {
        id: 'Koordinasi lintas fungsi, manajemen risiko, dan dukungan administrasi kegiatan.',
        en: 'Cross-functional coordination, risk management, and administrative support for activities.',
      },
    },
  ] as CoreSkill[],

  /** tools & aplikasi (tampil sebagai chip) */
  tools: [
    { group: 'Microsoft Office', items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'] },
    {
      group: 'Google Workspace',
      desc: { id: 'Untuk otomasi pekerjaan dan pelaporan', en: 'For work automation and reporting' },
      items: ['Google Docs', 'Google Sheets', 'Google Apps Script'],
    },
    {
      group: 'Business Applications',
      items: [
        'SAP',
        { id: 'Sistem informasi manajemen', en: 'Management information systems' },
        { id: 'Aplikasi perkantoran digital', en: 'Digital office apps' },
        { id: 'Sistem monitoring', en: 'Monitoring systems' },
      ],
    },
    {
      group: 'Digital Tools & AI',
      desc: {
        id: 'Untuk produktivitas, otomasi, dan pengembangan solusi kerja',
        en: 'For productivity, automation, and building work solutions',
      },
      items: ['Canva', { id: 'AI generatif', en: 'Generative AI' }],
    },
  ] as ToolGroup[],

  /** TODO: ganti dengan sertifikat aslimu (ini masih contoh) */
  certificates: [
    {
      title: 'Software Development',
      issuer: 'Indonesian Professional Certification Authority',
      date: '2022-08',
      credentialUrl: 'https://drive.google.com/file/d/1ZLkYVHnanmr9L5oilpWkCXscT9JBK8vs/view?usp=sharing',
    },
    {
      title: 'Menjadi Front-End Web Developer Expert',
      issuer: 'Dicoding Academy',
      date: '2022-11',
      credentialUrl: 'https://www.dicoding.com/certificates/72ZD99R8QPYW',
    },
  ] as Certificate[],

  /**
   * Proyek diambil dari CV. Isi liveUrl / repoUrl dengan link-mu,
   * dan sesuaikan tahun & tools kalau perlu.
   */
  portfolio: [
    {
      slug: 'monitoring-kinerja-ai',
      title: 'Monitoring Kinerja AI',
      year: '2024',
      category: { id: 'Sistem Digital Berbasis AI', en: 'AI-based Digital System' },
      summary: {
        id: 'Sistem real-time untuk memonitor kinerja dan efisiensi operasional.',
        en: 'A real-time system for monitoring performance and operational efficiency.',
      },
      description: {
        id: 'Sistem digital berbasis AI yang saya inisiasi dan kembangkan di PT Riset Perkebunan Nusantara. Sistem ini memantau kinerja secara real-time sehingga progres kegiatan lebih mudah dipantau dan proses operasional menjadi lebih efisien.',
        en: 'An AI-based digital system I initiated and built at PT Riset Perkebunan Nusantara. It tracks performance in real time, making progress easier to follow and day-to-day operations more efficient.',
      },
      role: { id: 'Inisiator & Pengembang', en: 'Initiator & Developer' },
      tools: ['Google Sheets', 'Google Apps Script', 'AI'],
      liveUrl: '',
      repoUrl: '',
      accent: '#c9824a',
    },
    {
      slug: 'dashboard-register-kajian',
      title: 'Dashboard Register Kajian',
      year: '2025',
      category: { id: 'Dashboard Pelaporan Manajemen', en: 'Management Reporting Dashboard' },
      summary: {
        id: 'Pantau status kajian internal secara real-time oleh Direksi dan tim.',
        en: 'Real-time tracking of internal studies for the Board and the team.',
      },
      description: {
        id: 'Platform dashboard untuk Tim Kajian Internal. Register kajian dan progresnya ditampilkan dalam satu dashboard, sehingga Direksi dan tim dapat memantau status setiap kajian secara real-time dan pelaporan manajemen menjadi lebih cepat.',
        en: 'A dashboard platform for the Internal Study Team. The study register and its progress live in one dashboard, so the Board and the team can follow each study in real time and management reporting gets faster.',
      },
      role: { id: 'Sekretariat & Pengembang', en: 'Secretariat & Developer' },
      tools: ['Google Sheets', 'Google Apps Script', 'Dashboard'],
      liveUrl: '',
      repoUrl: '',
      accent: '#5f7a94',
    },
    {
      slug: 'nutrisi-ibu-hamil',
      title: 'Nutrisi Ibu Hamil',
      year: '2023',
      category: { id: 'Progressive Web App', en: 'Progressive Web App' },
      summary: {
        id: 'Kalkulator nutrisi ibu hamil untuk membantu mencegah stunting.',
        en: 'A nutrition calculator for pregnant women to help prevent stunting.',
      },
      description: {
        id: 'Tugas Akhir D3 Sistem Informasi: front-end web untuk menghitung kebutuhan nutrisi ibu hamil sebagai langkah pencegahan stunting. Dibangun sebagai Progressive Web App di Dicoding Academy sehingga bisa dipasang dan diakses seperti aplikasi.',
        en: 'My diploma final project: a front-end web app that calculates nutritional needs for pregnant women as a step toward preventing stunting. Built as a Progressive Web App at Dicoding Academy, so it can be installed and used like an app.',
      },
      role: { id: 'Front-End Developer', en: 'Front-End Developer' },
      tools: ['HTML', 'CSS', 'JavaScript', 'PWA'],
      liveUrl: '',
      repoUrl: '',
      accent: '#7d8f6a',
    },
  ] as Project[],
}
