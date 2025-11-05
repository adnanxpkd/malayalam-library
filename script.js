const CONFIG = { TG_BOT: 'alifdrivebot' };
const API_URL = '/api/books';

let allBooks = [];
let filteredBooks = [];
let currentFilter = 'all';
let currentView = 'grid';
let offset = 0;
const LIMIT = 50;
let currentQuery = '';
let isLoading = false;

const elements = {
  searchInput: document.getElementById('searchInput'),
  sortSelect: document.getElementById('sortSelect'),
  clearBtn: document.getElementById('clearBtn'),
  retryBtn: document.getElementById('retryBtn'),
  loadingEl: document.getElementById('loadingEl'),
  errorEl: document.getElementById('errorEl'),
  resultsGrid: document.getElementById('resultsGrid'),
  resultsHeader: document.getElementById('resultsHeader'),
  resultsCount: document.getElementById('resultsCount'),
  totalBooks: document.getElementById('totalBooks'),
  totalSize: document.getElementById('totalSize'),
  endMessage: document.getElementById('endMessage')
};

const formatSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
};

const esc = (str) => (str || '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const getFileIcon = (mimeType) => {
  if (!mimeType) return '📄';
  mimeType = mimeType.toLowerCase();
  if (mimeType.includes('pdf')) return '📕';
  if (mimeType.includes('epub')) return '📱';
  return '📄';
};

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span><span>${esc(message)}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const copyLink = (id) => {
  const url = `https://t.me/${CONFIG.TG_BOT}?start=filep_${id}`;
  navigator.clipboard.writeText(url)
    .then(() => showToast('Link copied!'))
    .catch(() => showToast('Failed to copy link.'));
};
window.copyLink = copyLink;

// main loader
async function loadBooks(query = '', append = false) {
  if (isLoading) return;
  isLoading = true;

  if (!append) {
    offset = 0;
    elements.resultsGrid.innerHTML = '';
    elements.endMessage.style.display = 'none';
  }

  elements.loadingEl.style.display = append ? 'none' : 'block';
  elements.errorEl.style.display = 'none';

  try {
    const response = await fetch(`${API_URL}?search=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}`);
    const { data } = await response.json();

    if (!append) filteredBooks = [];
    filteredBooks.push(...data);

    if (data.length < LIMIT) {
      elements.endMessage.style.display = 'block';
    } else {
      offset += LIMIT;
    }

    renderBooks();
    elements.loadingEl.style.display = 'none';
    elements.resultsHeader.style.display = 'flex';
    elements.resultsCount.textContent = `${filteredBooks.length} results`;
  } catch (error) {
    console.error(error);
    elements.errorEl.style.display = 'block';
  } finally {
    isLoading = false;
  }
}

const renderBooks = () => {
  if (filteredBooks.length === 0) {
    elements.resultsGrid.innerHTML = '<div class="empty">📭<br><br>No books found</div>';
    return;
  }

  const html = filteredBooks.map(book => `
    <div class="card">
      <div class="card-header">
        <span class="file-icon">${getFileIcon(book.mime_type)}</span>
        <h3 class="card-title">${esc(book.file_name)}</h3>
      </div>
      <div class="card-meta">
        <div class="meta-item"><span>💾</span><span>${formatSize(book.file_size)}</span></div>
        ${book.mime_type ? `<div class="meta-item"><span>📋</span><span>${esc(book.mime_type.split('/')[1]?.toUpperCase() || '')}</span></div>` : ''}
      </div>
      ${book.caption ? `<div class="caption">${esc(book.caption)}</div>` : ''}
      <div class="card-actions">
        <a class="btn btn-primary" href="https://t.me/${CONFIG.TG_BOT}?start=filep_${encodeURIComponent(book._id)}" target="_blank">📥 Get on Telegram</a>
        <button class="btn btn-secondary" onclick="copyLink('${book._id}')">🔗 Copy Link</button>
      </div>
    </div>`).join('');

  elements.resultsGrid.insertAdjacentHTML('beforeend', html);
};

// search debounce
let searchTimeout;
elements.searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  const query = elements.searchInput.value.trim();
  searchTimeout = setTimeout(() => {
    currentQuery = query;
    loadBooks(query);
  }, 400);
});

// infinite scroll
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !isLoading) {
    loadBooks(currentQuery, true);
  }
}, { rootMargin: '800px' });
observer.observe(elements.endMessage);

elements.clearBtn.addEventListener('click', () => {
  elements.searchInput.value = '';
  loadBooks('');
});

if (elements.retryBtn) elements.retryBtn.addEventListener('click', () => loadBooks());

loadBooks();
