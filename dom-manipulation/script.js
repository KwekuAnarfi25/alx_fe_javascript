
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity", category: "Inspiration" },
  { text: "Happiness depends upon ourselves.", category: "Philosophy" }
];

let lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';

// ✅ Function: Show a random quote
function showRandomQuote() {
  const category = document.getElementById('categoryFilter').value;
  const filteredQuotes = category === 'all'
    ? quotes
    : quotes.filter(q => q.category.toLowerCase() === category.toLowerCase());

  if (filteredQuotes.length === 0) {
    document.getElementById('quoteDisplay').innerHTML = `<p>No quotes available for this category.</p>`;
    return;
  }

  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  document.getElementById('quoteDisplay').innerHTML =
    `<p>"${randomQuote.text}" - <em>${randomQuote.category}</em></p>`;
}

// ✅ Function: Populate category dropdown dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
  categoryFilter.value = lastSelectedCategory;
}

// ✅ Function: Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastSelectedCategory', selectedCategory);
  showRandomQuote();
}

// ✅ Function: Add a new quote
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    syncWithServer(); // 🔄 Sync after adding
    alert('Quote added successfully!');
    textInput.value = '';
    categoryInput.value = '';
  } else {
    alert('Please enter both quote text and category.');
  }
}
// ✅ Function: Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ✅ Function: Export quotes as JSON file
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
}

// ✅ Function: Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    syncWithServer(); // 🔄 Sync after import
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ Function: Create Add Quote Form (required by earlier checker)
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const textInput = document.createElement('input');
  textInput.id = 'newQuoteText';
  textInput.placeholder = 'Enter a new quote';
  formDiv.appendChild(textInput);

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';
  formDiv.appendChild(categoryInput);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}




