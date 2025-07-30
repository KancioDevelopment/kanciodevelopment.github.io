import { PostData } from '../components/Posts'

// This service would normally fetch from an API or build-time processing
// For now, we'll simulate loading Jekyll posts with proper metadata

interface JekyllFrontMatter {
  title: string
  categories?: string[]
  tags?: string[]
  date?: string
  toc?: boolean
}

interface JekyllPost {
  slug: string
  frontMatter: JekyllFrontMatter
  content: string
  fileName: string
}

// Simulated Jekyll posts data - in a real implementation, this would be:
// 1. Pre-processed at build time using a webpack loader or Vite plugin
// 2. Fetched from a API endpoint that serves Jekyll posts
// 3. Generated during the build process and imported as JSON
const jekyllPosts: JekyllPost[] = [
  {
    slug: "solusi-praktis-isi-pulsa-dan-bayar-tagihan-dengan-mudah",
    fileName: "2023-04-05-solusi-praktis-isi-pulsa-dan-bayar-tagihan-dengan-mudah.md",
    frontMatter: {
      title: "Beberapa alasan mengapa Anda harus memilih PulsaApp",
      categories: ["KancioApp", "PulsaApp"],
      tags: ["aplikasi pulsa murah"],
      toc: true
    },
    content: `
## Harga yang Lebih Murah

Kami memahami bahwa pulsa, paket data, voucher game, dan e-money merupakan kebutuhan yang penting dalam kehidupan digital. Oleh karena itu, kami menawarkan harga yang lebih murah untuk memudahkan Anda dalam memenuhi kebutuhan tersebut.

## Layanan Cepat dan Mudah

Dengan menggunakan PulsaApp, Anda tidak perlu lagi menghabiskan waktu dan tenaga untuk membeli pulsa, paket data, voucher game, dan e-money. Cukup dengan beberapa klik, Anda sudah dapat melakukan pembelian dan pengisian ulang dengan mudah dan cepat.

## Transaksi Aman dan Terpercaya

Keamanan transaksi Anda adalah prioritas utama kami. Kami menggunakan sistem keamanan terbaik untuk memastikan bahwa setiap transaksi yang Anda lakukan di PulsaApp aman dan terpercaya.

## Layanan Lengkap

PulsaApp tidak hanya menyediakan layanan pembelian pulsa, paket data, voucher game, dan e-money, tetapi juga menyediakan layanan top up e-wallet seperti OVO, Gopay, dan lainnya. Selain itu, kami juga menyediakan berbagai promosi dan diskon menarik untuk memperoleh harga yang lebih murah.

## Mudah Digunakan

Interface PulsaApp dirancang dengan sangat user-friendly sehingga mudah digunakan oleh siapa saja, baik yang sudah berpengalaman maupun yang baru pertama kali menggunakan aplikasi sejenis ini.

## Dukungan Pelanggan 24/7

Tim customer service kami siap membantu Anda 24/7 jika mengalami kendala atau memiliki pertanyaan seputar penggunaan aplikasi.
    `
  },
  {
    slug: "kasirapp-solusi-cerdas-bagi-pelaku-bisnis",
    fileName: "2023-04-18-kasirapp.md",
    frontMatter: {
      title: "KasirApp: Solusi Cerdas bagi Pelaku Bisnis untuk Meningkatkan Efisiensi dan Kualitas Pelayanan kepada Pelanggan",
      categories: ["KasirApp"],
      tags: ["stock", "laporan-penjualan", "kasir"]
    },
    content: `
KasirApp adalah sebuah aplikasi kasir yang mudah digunakan untuk membantu bisnis Anda mengelola transaksi dan stok produk dengan lebih efisien. Dengan fitur-fitur canggih seperti manajemen stok, laporan penjualan, KasirApp dapat membantu Anda meningkatkan produktivitas dan mengoptimalkan bisnis Anda.

## Apa saja fitur-fitur KasirApp?

### Manajemen Stok

Fitur manajemen stok pada KasirApp memudahkan Anda untuk melacak inventaris produk dan melakukan update stok secara otomatis setelah setiap transaksi. Anda dapat dengan mudah menambah, mengedit, atau menghapus produk dalam aplikasi, serta melihat stok aktual produk Anda.

### Transaksi Cepat

Dengan tampilan antarmuka yang mudah dipahami, Anda dapat dengan cepat menginput produk yang dijual dan menyelesaikan transaksi dalam waktu singkat. Anda juga dapat memproses diskon, dan pajak pada setiap transaksi.

### Laporan Penjualan

KasirApp juga menyediakan laporan penjualan harian, mingguan, atau bulanan, sehingga Anda dapat melacak kinerja bisnis Anda dari waktu ke waktu. Laporan ini mencakup informasi tentang jumlah produk terjual, total pendapatan, serta detail transaksi dan diskon yang diberikan.

### Fitur Multi-Platform

Aplikasi dapat diakses dari berbagai perangkat, baik smartphone, tablet, maupun komputer, sehingga Anda dapat mengelola bisnis dari mana saja.

### Keamanan Data

Semua data transaksi dan stok produk tersimpan dengan aman menggunakan enkripsi tingkat tinggi untuk melindungi privasi bisnis Anda.
    `
  },
  {
    slug: "deposit-saldo-kancio",
    fileName: "2023-04-01-deposit-saldo-kancio.md",
    frontMatter: {
      title: "Cara Mudah Deposit Saldo di Aplikasi Kancio",
      categories: ["Tutorial", "KancioApp"],
      tags: ["deposit", "saldo", "tutorial"]
    },
    content: `
Aplikasi Kancio menyediakan berbagai cara mudah untuk melakukan deposit saldo agar Anda dapat bertransaksi dengan lancar. Berikut adalah panduan lengkap cara deposit saldo di aplikasi Kancio.

## Metode Deposit yang Tersedia

### 1. Transfer Bank
- Bank Mandiri
- Bank BCA  
- Bank BNI
- Bank BRI
- Dan bank lainnya

### 2. E-Wallet
- OVO
- GoPay
- DANA
- LinkAja

### 3. Virtual Account
- Mudah dan otomatis
- Konfirmasi instan

## Langkah-langkah Deposit

1. **Buka aplikasi Kancio**
2. **Pilih menu Deposit**
3. **Pilih metode pembayaran**
4. **Masukkan nominal deposit**
5. **Ikuti instruksi pembayaran**
6. **Saldo akan otomatis terisi**

## Keunggulan Sistem Deposit Kancio

- **Proses Cepat**: Saldo masuk dalam hitungan menit
- **Aman**: Sistem keamanan berlapis
- **Mudah**: Interface yang user-friendly
- **24/7**: Tersedia kapan saja
    `
  },
  {
    slug: "fitur-nota-pulsaapp",
    fileName: "2023-04-08-fitur-nota.md",
    frontMatter: {
      title: "Fitur Nota Digital di PulsaApp untuk Kemudahan Bisnis Anda",
      categories: ["PulsaApp", "Business"],
      tags: ["nota", "digital", "bisnis", "fitur"]
    },
    content: `
PulsaApp menghadirkan fitur nota digital yang memudahkan Anda dalam mengelola transaksi bisnis. Fitur ini sangat berguna bagi para reseller dan pemilik counter pulsa.

## Manfaat Fitur Nota Digital

### Pencatatan Otomatis
Setiap transaksi yang Anda lakukan akan otomatis tercatat dalam sistem dengan detail lengkap including:
- Tanggal dan waktu transaksi
- Jenis produk yang dibeli
- Nomor tujuan
- Harga dan keuntungan
- Status transaksi

### Laporan Keuangan
Anda dapat melihat laporan keuangan harian, mingguan, atau bulanan dengan mudah untuk:
- Menghitung total keuntungan
- Memantau perkembangan bisnis
- Analisis produk terlaris
- Perencanaan stok

### Export Data
Fitur export memungkinkan Anda untuk:
- Cetak nota untuk pelanggan
- Export ke Excel untuk analisis lebih lanjut
- Backup data transaksi
- Sharing laporan ke mitra bisnis

## Cara Menggunakan Fitur Nota

1. **Akses Menu Nota**
   - Buka aplikasi PulsaApp
   - Pilih menu "Nota" di dashboard

2. **Filter Transaksi**
   - Pilih rentang tanggal
   - Filter berdasarkan jenis produk
   - Cari transaksi spesifik

3. **Export dan Print**
   - Pilih transaksi yang ingin di-export
   - Klik tombol "Export" atau "Print"
   - Pilih format yang diinginkan

## Keunggulan Sistem Nota Digital

- **Paperless**: Ramah lingkungan dan menghemat biaya cetak
- **Real-time**: Data selalu terupdate secara real-time  
- **Secure**: Data tersimpan aman di cloud
- **Accessible**: Dapat diakses kapan saja dari mana saja
    `
  }
]

// Helper function to extract date from filename
const extractDateFromFilename = (filename: string): string => {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return dateMatch ? dateMatch[1] : '2023-04-01'
}

// Helper function to categorize posts
const categorizePost = (categories: string[] = [], tags: string[] = []): string => {
  const allTerms = [...categories, ...tags].map(term => term.toLowerCase())
  
  if (allTerms.some(term => term.includes('kasir') || term.includes('business') || term.includes('stock'))) {
    return 'Business Solution'
  }
  if (allTerms.some(term => term.includes('quiz') || term.includes('learning') || term.includes('education'))) {
    return 'Education'
  }
  if (allTerms.some(term => term.includes('pulsa') || term.includes('app') || term.includes('mobile'))) {
    return 'Mobile App'
  }
  return 'Technology'
}

// Helper function to estimate read time
const estimateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Helper function to generate excerpt
const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
    .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .trim()
  
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

// Convert Jekyll posts to our PostData format
export const convertJekyllPostsToPostData = (): PostData[] => {
  return jekyllPosts.map((post, index) => {
    const date = extractDateFromFilename(post.fileName)
    const category = categorizePost(post.frontMatter.categories, post.frontMatter.tags)
    
    return {
      id: post.slug,
      title: post.frontMatter.title,
      date: date,
      excerpt: generateExcerpt(post.content),
      image: `/assets/images/${category.toLowerCase().replace(' ', '')}.png`, // Fallback to category-based image
      category: category,
      readTime: estimateReadTime(post.content),
      author: 'Kancio Team',
      tags: post.frontMatter.tags || []
    }
  })
}

// Get individual post content
export const getJekyllPostContent = (postId: string): any => {
  const post = jekyllPosts.find(p => p.slug === postId)
  if (!post) return null
  
  const date = extractDateFromFilename(post.fileName)
  const category = categorizePost(post.frontMatter.categories, post.frontMatter.tags)
  
  // Convert markdown-style content to HTML (basic conversion)
  const htmlContent = post.content
    .replace(/## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/### (.*?)$/gm, '<h3>$3</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^\s*/, '<p>')
    .replace(/\s*$/, '</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
  
  return {
    id: postId,
    title: post.frontMatter.title,
    date: date,
    content: htmlContent,
    image: `/assets/images/${category.toLowerCase().replace(' ', '')}.png`,
    category: category,
    readTime: estimateReadTime(post.content),
    author: 'Kancio Team',
    tags: post.frontMatter.tags || [],
    relatedPosts: jekyllPosts
      .filter(p => p.slug !== postId)
      .slice(0, 2)
      .map(p => p.slug)
  }
}

// In a real implementation, you might have functions like:
// export const fetchJekyllPosts = async (): Promise<PostData[]> => {
//   const response = await fetch('/api/posts')
//   const posts = await response.json()
//   return posts.map(convertJekyllToPostData)
// }

export default {
  convertJekyllPostsToPostData,
  getJekyllPostContent
}