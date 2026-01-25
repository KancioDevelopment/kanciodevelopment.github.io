const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '../public/articles');
const outputFile = path.join(__dirname, '../public/articles.json');

// Ensure articles directory exists
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
  console.log('Created public/articles directory');
}

// Get all markdown files
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));

const articles = files.map(filename => {
  const filePath = path.join(articlesDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  // Use filename as ID (remove extension)
  const id = filename.replace(/\.md$/, '');

  return {
    id,
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    excerpt: data.excerpt || '',
    image: data.image || '/assets/images/default-blog.jpg',
    category: data.category || 'General',
    readTime: data.readTime || '5 min read',
    author: data.author || 'Kancio Team',
    tags: data.tags || [],
    ...data
  };
});

// Sort by date (newest first)
articles.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2));
console.log(`Successfully indexed ${articles.length} articles to public/articles.json`);
