import React from 'react'
import { useSEO } from '../hooks/useSEO'
import './SyaratLayanan.css'

const SyaratLayanan: React.FC = () => {
  useSEO({
    title: 'Syarat Layanan ApotekApp - Software Apotek & Kasir Terbaik',
    description: 'Syarat dan ketentuan layanan resmi penggunaan software manajemen apotek ApotekApp (apotek.kancio.com) oleh Kancio Development.',
    ogType: 'website',
  })

  return (
    <section className="syarat-layanan">
      <div className="container">
        <div className="syarat-layanan__header animate-fadeInUp">
          <h1 className="syarat-layanan__title">Syarat Layanan</h1>
          <p className="syarat-layanan__subtitle">
            Terakhir diperbarui: 22 Juni 2026 | Berlaku Efektif untuk apotek.kancio.com
          </p>
        </div>

        <div className="syarat-layout">
          {/* Sticky Sidebar TOC */}
          <aside className="legal-sidebar animate-fadeInUp">
            <h3>Daftar Isi</h3>
            <a href="#persetujuan" className="toc-link">1. Ketentuan Umum</a>
            <a href="#fitur-sistem" className="toc-link">2. Deskripsi & Otomatisasi</a>
            <a href="#kewajiban" className="toc-link">3. Kewajiban Pengguna</a>
            <a href="#data-minio" className="toc-link">4. Data & Penyimpanan</a>
            <a href="#pembayaran" className="toc-link">5. Lisensi & Langganan</a>
            <a href="#tanggung-jawab" className="toc-link">6. Batasan Tanggung Jawab</a>
            <a href="#hukum" className="toc-link">7. Hukum & Kontak</a>
          </aside>

          <div className="syarat-layanan__content">
            {/* Section 1 */}
            <section id="persetujuan" className="syarat-section animate-fadeInUp animate-delay-1">
              <h2>Ketentuan Umum & Penerimaan Layanan</h2>
              <p>
                Selamat datang di **ApotekApp** (diakses melalui `apotek.kancio.com`), sebuah platform ERP manajemen apotek terpadu yang dikembangkan oleh **Kancio Development**.
              </p>
              <p>
                Dengan mendaftar, mengakses, atau menggunakan ApotekApp, Anda selaku Pemilik Apotek, Apoteker Penanggung Jawab (APJ), maupun Staf Apotek ("Apotek Mitra" atau "Pengguna") menyatakan telah membaca, memahami, dan menyetujui untuk terikat dengan seluruh syarat dan ketentuan yang tertulis di dalam halaman ini.
              </p>
              <p>
                Jika Anda tidak menyetujui bagian apa pun dari Syarat Layanan ini, Anda tidak diperkenankan untuk menggunakan layanan kami. Ketentuan ini dapat berubah sewaktu-waktu sesuai dengan pembaruan sistem dan regulasi kefarmasian di Indonesia.
              </p>
            </section>

            {/* Section 2 */}
            <section id="fitur-sistem" className="syarat-section animate-fadeInUp">
              <h2>Deskripsi Fitur & Sistem Otomatisasi 24/7</h2>
              <p>
                ApotekApp menyediakan perangkat lunak manajemen apotek berbasis cloud untuk merampingkan operasional harian melalui otomatisasi terintegrasi. Ketentuan khusus mengenai fitur utama sistem adalah sebagai berikut:
              </p>

              <div className="feature-list-grid">
                <div className="feature-list-item">
                  <h4>🧠 HPP Intelligence (AI-Powered)</h4>
                  <p>
                    Sistem mendeteksi anomali Harga Pokok Pembelian (HPP) secara real-time untuk mendeteksi kenaikan harga supplier di luar batas wajar. Analisis ini bersifat rekomendasi berdasarkan algoritma data historis; keputusan akhir pengadaan barang tetap berada pada persetujuan Manager Apotek.
                  </p>
                </div>

                <div className="feature-list-item">
                  <h4>🛒 POS Kasir & Otomasi FEFO/FIFO</h4>
                  <p>
                    Pencatatan transaksi kasir menggunakan antrean otomatis berbasis tanggal kedaluwarsa terdekat (First Expired, First Out). Pengguna bertanggung jawab penuh atas keakuratan penginputan nomor batch fisik dan tanggal kedaluwarsa obat saat proses stock opname.
                  </p>
                </div>

                <div className="feature-list-item">
                  <h4>🏥 Integrasi BPJS Kapitasi & PRB (Kronis)</h4>
                  <p>
                    Modul pengolahan resep BPJS Kapitasi dan Program Rujuk Balik (PRB) mendukung sinkronisasi resep, proteksi target klaim, auto-discount, dan pencocokan e-spelling nama obat yang toleran terhadap salt-name. Kancio Development tidak bertanggung jawab atas penolakan klaim oleh verifikator BPJS Kesehatan akibat ketidakcocokan data administratif inputan pengguna.
                  </p>
                </div>

                <div className="feature-list-item">
                  <h4>⏱️ Otomatisasi Absensi Staf</h4>
                  <p>
                    Sistem absensi dilengkapi dengan fitur auto-checkout otomatis. Apabila staf apotek lupa melakukan pencatatan checkout (pulang) setelah shift berakhir, sistem secara otomatis mencatat kepulangan setelah 7 jam kerja demi keadilan laporan kinerja SDM.
                  </p>
                </div>

                <div className="feature-list-item">
                  <h4>💰 Penggajian Otomatis (Payroll 2 Tahap)</h4>
                  <p>
                    Sistem payroll melakukan kalkulasi penggajian bulanan dua tahap (tahap 1 tanggal 10, tahap 2 tanggal 25) secara terjadwal. Penghitungan otomatis mencakup bonus berbasis Balanced Scorecard (BSC) untuk BPJS & Umum, denda keterlambatan presensi pro-rata, potongan pinjaman staf, dan cicilan yang disepakati. Seluruh data penggajian berstatus draft sebelum disetujui secara manual oleh Pemilik Apotek.
                  </p>
                </div>

                <div className="feature-list-item">
                  <h4>🔄 Multi-Cabang & Piutang Stok</h4>
                  <p>
                    Fitur transfer obat antar cabang mencatat utang-piutang stok secara otomatis di latar belakang. Pengguna berkewajiban menyetujui tanda terima fisik transfer stok guna menghindari selisih data audit inventori multi-cabang.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="kewajiban" className="syarat-section animate-fadeInUp">
              <h2>Kewajiban & Tanggung Jawab Pengguna</h2>
              <p>Dalam menggunakan ApotekApp, Anda berkewajiban untuk:</p>
              <ul>
                <li>Menjaga keamanan kredensial login akun staf dan pemilik dari akses pihak ketiga yang tidak berwenang.</li>
                <li>Memastikan keakuratan data obat, konversi satuan kemasan (misal: box ke tablet), dan harga jual yang dimasukkan ke dalam sistem.</li>
                <li>Mematuhi seluruh regulasi kefarmasian yang berlaku di Republik Indonesia, termasuk kewajiban memiliki Surat Izin Apotek (SIA) dan Surat Izin Praktik Apoteker (SIPA) yang sah.</li>
                <li>Menggunakan sistem secara sah dan dilarang keras melakukan manipulasi transaksi keuangan, pemalsuan data klaim BPJS, atau tindakan fraud lainnya.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="data-minio" className="syarat-section animate-fadeInUp">
              <h2>Unggah Dokumen & Penyimpanan Cloud (MinIO)</h2>
              <p>
                ApotekApp memfasilitasi penyimpanan digital dokumen resep dokter dan berkas klaim BPJS dalam format PDF yang disimpan secara terenkripsi di server penyimpanan awan **MinIO Cloud Storage**.
              </p>
              <p>
                Pengguna bertanggung jawab penuh untuk memastikan bahwa dokumen resep yang diunggah tidak melanggar hak privasi pasien dan mematuhi undang-undang perlindungan data pribadi medis. Kancio Development menjamin isolasi database yang ketat antar apotek mitra, sehingga data transaksi dan rekam resep Anda tidak akan diakses oleh cabang atau badan usaha apotek lain di luar organisasi Anda.
              </p>
            </section>

            {/* Section 5 */}
            <section id="pembayaran" className="syarat-section animate-fadeInUp">
              <h2>Ketentuan Lisensi & Biaya Langganan</h2>
              <p>
                ApotekApp didistribusikan dalam bentuk Software-as-a-Service (SaaS). Ketentuan lisensi meliputi:
              </p>
              <ul>
                <li>**Demo Gratis**: Kancio menyediakan versi demonstrasi bebas biaya untuk uji coba awal operasional sistem.</li>
                <li>**Paket Berbayar**: Akses penuh ke modul premium seperti HPP Intelligence, integrasi BPJS PRB, payroll otomatis, dan multi-cabang tunduk pada biaya langganan bulanan atau tahunan yang disepakati.</li>
                <li>**Pembatalan Layanan**: Kancio berhak menangguhkan akses sistem jika terjadi keterlambatan pembayaran biaya langganan setelah melewati masa tenggang yang ditentukan.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="tanggung-jawab" className="syarat-section animate-fadeInUp">
              <h2>Batasan Tanggung Jawab</h2>
              <p>
                Kancio Development senantiasa berupaya menjaga ketersediaan layanan ApotekApp sebesar 99.9% uptime. Namun, sistem ini disediakan atas dasar "SEBAGAIMANA ADANYA" dan "SEBAGAIMANA TERSEDIA".
              </p>
              
              <div className="disclaimer-box">
                <h4>Pernyataan Sangkalan Penting (Disclaimer)</h4>
                <p>
                  Kancio Development tidak memikul tanggung jawab hukum atas:
                  <br />
                  1. Kesalahan dosis, racikan obat, atau dispensing obat yang dilakukan oleh apoteker/staf apotek Pengguna.
                  <br />
                  2. Kerugian material akibat supplier yang menaikkan harga jika Pengguna mengabaikan notifikasi atau peringatan HPP Intelligence.
                  <br />
                  3. Kegagalan pembayaran upah staf akibat kesalahan input Balanced Scorecard (BSC) atau denda presensi pada draf payroll yang langsung disetujui manager.
                  <br />
                  4. Kehilangan data akibat kelalaian Pengguna dalam menjaga keamanan password akun admin utama.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="hukum" className="syarat-section contact-section animate-fadeInUp">
              <h2>Hukum yang Mengatur & Kontak</h2>
              <p>
                Syarat Layanan ini diatur dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul dari penggunaan layanan ini akan diselesaikan secara musyawarah mufakat sebelum menempuh jalur hukum.
              </p>
              <p>
                Jika Anda memiliki pertanyaan mengenai penggunaan sistem, integrasi BPJS, atau memerlukan bantuan teknis, silakan hubungi tim kami:
              </p>
              <div className="contact-info">
                <a href="mailto:kancio.indonesia@gmail.com" className="contact-link">
                  <span>📧 kancio.indonesia@gmail.com</span>
                </a>
                <a href="tel:+6282325600996" className="contact-link">
                  <span>📞 +62 823-2560-0996</span>
                </a>
                <div className="contact-address">
                  🏢 <strong>Kancio Development</strong><br />
                  Layanan Integrasi AI & Solusi ERP Apotek Cerdas<br />
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

export default SyaratLayanan
