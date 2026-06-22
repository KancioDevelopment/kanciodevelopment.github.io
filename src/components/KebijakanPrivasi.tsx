import React from 'react'
import { useSEO } from '../hooks/useSEO'
import './KebijakanPrivasi.css'

const KebijakanPrivasi: React.FC = () => {
  useSEO({
    title: 'Kebijakan Privasi ApotekApp - Perlindungan Data & Keamanan',
    description: 'Kebijakan privasi resmi pengumpulan dan perlindungan data pengguna, rekam medis pasien, serta berkas resep BPJS di platform ApotekApp oleh Kancio Development.',
    ogType: 'website',
  })

  return (
    <section className="kebijakan-privasi">
      <div className="container">
        <div className="kebijakan-privasi__header animate-fadeInUp">
          <h1 className="kebijakan-privasi__title">Kebijakan Privasi</h1>
          <p className="kebijakan-privasi__subtitle">
            Berlaku sejak: 22 Juni 2026 | Melindungi Kredensial & Rekam Medis Apotek Mitra
          </p>
        </div>

        <div className="kebijakan-layout">
          {/* Sticky Sidebar TOC */}
          <aside className="legal-sidebar animate-fadeInUp">
            <h3>Navigasi</h3>
            <a href="#pendahuluan" className="toc-link">1. Pendahuluan</a>
            <a href="#data-dikumpulkan" className="toc-link">2. Data yang Dikumpulkan</a>
            <a href="#penggunaan-data" className="toc-link">3. Penggunaan Data</a>
            <a href="#keamanan-isolasi" className="toc-link">4. Keamanan & Isolasi</a>
            <a href="#pihak-ketiga" className="toc-link">5. Integrasi Pihak Ketiga</a>
            <a href="#hak-pengguna" className="toc-link">6. Hak & Tanggung Jawab</a>
            <a href="#kontak" className="toc-link">7. Kontak Hubung</a>
          </aside>

          <div className="kebijakan-privasi__content">
            {/* Section 1 */}
            <section id="pendahuluan" className="kebijakan-section animate-fadeInUp animate-delay-1">
              <h2>Pendahuluan</h2>
              <p>
                Kancio Development ("Kami") sangat menghargai privasi Apotek Mitra dan seluruh pasien Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi serta operasional yang diunggah ke platform **ApotekApp** (`apotek.kancio.com`).
              </p>
              <p>
                Dalam operasional sistem ini, **Apotek Mitra bertindak sebagai Pengendali Data (Data Controller)** atas rekam resep dan data pribadi pasien yang diinput, sedangkan **Kancio Development bertindak sebagai Pengolah Data (Data Processor)** yang menyediakan infrastruktur teknologi ERP dan cloud storage untuk kebutuhan pengelolaan apotek.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-dikumpulkan" className="kebijakan-section animate-fadeInUp">
              <h2>Data yang Kami Kumpulkan</h2>
              <p>
                Untuk menjalankan fungsionalitas ERP Apotek secara optimal, ApotekApp mengumpulkan beberapa kategori data berikut:
              </p>

              <div className="info-box-grid">
                <div className="info-box-item">
                  <h4>🧑‍⚕️ Data Profil Apotek & Karyawan</h4>
                  <p>
                    Nama apotek, alamat cabang, Surat Izin Apotek (SIA), nama staf, Surat Izin Praktik Apoteker (SIPA), data presensi/absensi staf (termasuk jam masuk, keluar, dan penanda auto-checkout otomatis), serta draf rincian penggajian bulanan.
                  </p>
                </div>

                <div className="info-box-item">
                  <h4>📦 Data Inventori & Supplier</h4>
                  <p>
                    Master data obat (nama, batch fisik, tanggal kedaluwarsa), konversi satuan (misal: box ke tablet), riwayat transaksi pembelian ke supplier, dan data Harga Pokok Pembelian (HPP) untuk keperluan audit HPP Intelligence.
                  </p>
                </div>

                <div className="info-box-item">
                  <h4>🏥 Data Pasien & Berkas Resep BPJS</h4>
                  <p>
                    Nama pasien, nomor rekam medis, rincian obat yang diresepkan, rekam resep digital dalam format PDF, nomor kepesertaan BPJS Kesehatan (untuk modul Kapitasi & PRB), serta file settlement CSV BPJS untuk sinkronisasi klaim.
                  </p>
                </div>

                <div className="info-box-item">
                  <h4>💳 Data Transaksi & Pembayaran</h4>
                  <p>
                    Metode pembayaran yang dipilih (Tunai, QRIS, Transfer Bank, Tempo), nilai transaksi, biaya administrasi, audit trail pencatatan kasir, dan draf piutang jatuh tempo pasien.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="penggunaan-data" className="kebijakan-section animate-fadeInUp">
              <h2>Bagaimana Kami Menggunakan Data Anda</h2>
              <p>Kami memproses data yang dikumpulkan untuk tujuan spesifik operasional apotek Anda:</p>
              <ul>
                <li>**Operasional POS Kasir & FEFO**: Menyajikan obat dengan tanggal kedaluwarsa terdekat pada modul kasir.</li>
                <li>**Pencegahan Markup Supplier**: Memindai data transaksi beli untuk memberikan peringatan anomali HPP.</li>
                <li>**Klaim & Rekonsiliasi BPJS**: Memfasilitasi pencocokan spelling-tolerant data resep dengan file CSV BPJS Kesehatan untuk membantu administrasi klaim Kapitasi dan PRB secara presisi.</li>
                <li>**Pengelolaan Administrasi SDM**: Menghitung penggajian bulanan staf (payroll) otomatis berbasis kehadiran (presensi), denda keterlambatan, bonus Balanced Scorecard (BSC), serta cicilan hutang karyawan.</li>
                <li>**Pengingat Piutang**: Mengotomatisasi log pengingat piutang pasien yang jatuh tempo secara berkala (hari ke-7, 14, dan 30).</li>
                <li>**Perapian Database**: Menjalankan net-debt (debt netting) secara otomatis untuk menyeimbangkan hutang stok minus antar cabang.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="keamanan-isolasi" className="kebijakan-section animate-fadeInUp">
              <h2>Keamanan Data & Isolasi Database (Tenant Isolation)</h2>
              <p>
                Keamanan informasi adalah prioritas utama kami. Kami menerapkan langkah-langkah keamanan berlapis untuk melindungi data Anda dari akses, perubahan, atau penghancuran tanpa izin:
              </p>
              <ul>
                <li>**Isolasi Database Ketat**: Kami menggunakan arsitektur multi-tenant dengan isolasi data yang ketat. Data rekam medis, inventori, dan finansial dari satu organisasi Apotek Mitra tidak akan pernah bercampur atau dapat diakses oleh organisasi apotek lain.</li>
                <li>**Penyimpanan Cloud Terenkripsi**: Seluruh dokumen resep dokter, berkas klaim, dan rekam medis PDF yang diunggah oleh apoteker disimpan dengan aman pada server **MinIO Cloud Storage** menggunakan protokol enkripsi saat transfer data (HTTPS/TLS) dan enkripsi saat penyimpanan (encryption at rest).</li>
                <li>**Audit Trail Kasir**: Setiap aktivitas perubahan stok, transaksi holds, atau pembatalan kasir dicatat dalam log audit sistem untuk mencegah kecurangan internal.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="pihak-ketiga" className="kebijakan-section animate-fadeInUp">
              <h2>Integrasi Layanan Pihak Ketiga</h2>
              <p>
                Platform kami menggunakan beberapa integrasi pihak ketiga untuk memfasilitasi fungsionalitas sistem:
              </p>
              <ul>
                <li>**Server MinIO**: Digunakan sebagai tempat penyimpanan berkas digital resep dan berkas klaim PDF.</li>
                <li>**Sistem BPJS Kesehatan (Bridging/Settlement)**: Digunakan untuk memvalidasi dan memproses sinkronisasi data klaim Kapitasi dan PRB (Program Rujuk Balik). Data yang dikirimkan ke pihak BPJS sepenuhnya mengikuti protokol resmi dan tunduk pada kebijakan privasi BPJS Kesehatan.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="hak-pengguna" className="kebijakan-section animate-fadeInUp">
              <h2>Hak Pengguna & Hak Pasien</h2>
              <p>
                Pemilik Apotek Mitra memiliki kendali penuh atas data operasional yang dimasukkan ke dalam sistem. Anda memiliki hak untuk:
              </p>
              <ul>
                <li>Mengakses, memeriksa, mengunduh laporan laba rugi, dan mengekspor data transaksi apotek Anda kapan saja.</li>
                <li>Mengoreksi, memperbarui master data obat, satuan konversi, serta profil staf jika terdapat kesalahan informasi.</li>
                <li>Menghapus atau mengarsipkan data rekam medis pasien sesuai dengan masa retensi rekam medis yang diatur oleh Kementerian Kesehatan Republik Indonesia.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="kontak" className="kebijakan-section contact-section animate-fadeInUp">
              <h2>Kontak Hubung</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi data ini, cara kami mengamankan rekam medis apotek, atau ingin berkonsultasi mengenai infrastruktur server MinIO kami, silakan hubungi tim dukungan Kancio Development:
              </p>
              <div className="contact-info">
                <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                  <span>📧 kancio.indonesia@gmail.com</span>
                </a>
                <a href="tel:+6282325600996" className="contact-link">
                  <span>📞 +62 823-2560-0996</span>
                </a>
                <div className="contact-address">
                  🏢 <strong>Kancio Development Support</strong><br />
                  Tim Perlindungan Data & Kepatuhan Keamanan ERP Apotek<br />
                  Indonesia
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

export default KebijakanPrivasi
