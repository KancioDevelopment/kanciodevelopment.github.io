import React from 'react'

const Posts: React.FC = () => {
  const posts = [
    {
      title: "Solusi Praktis Isi Pulsa dan Bayar Tagihan dengan Mudah",
      date: "April 5, 2023",
      excerpt: "Hemat waktu dan biaya dengan aplikasi PulsaApp..."
    },
    {
      title: "Aplikasi Kasir untuk UMKM",
      date: "April 18, 2023", 
      excerpt: "KasirApp membantu UMKM mengelola transaksi dengan mudah..."
    },
    {
      title: "Platform Quiz dan Learning",
      date: "May 2, 2023",
      excerpt: "QuizApp menyediakan platform pembelajaran interaktif..."
    }
  ]

  return (
    <section id="blog" className="posts">
      <div className="container">
        <h2>Latest Posts</h2>
        <div className="posts-grid">
          {posts.map((post, index) => (
            <article key={index} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-date">{post.date}</p>
              <p>{post.excerpt}</p>
              <a href="#" className="read-more">Read More</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Posts