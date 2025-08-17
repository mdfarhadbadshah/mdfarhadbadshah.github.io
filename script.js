import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// HTML এলিমেন্টগুলো সিলেক্ট করা
const addwordform = document.getElementById('addwordform');
// সঠিক কোড
const originalWordInput = document.getElementById('originalword');
const synonymWordInput = document.getElementById('synonymword');
const sentenceInput = document.getElementById('sentence');
const wordListContainer = document.getElementById('vocabularyList');
const searchInput = document.getElementById('searchInput');

// শব্দগুলো রিয়েল-টাইমে দেখানোর ফাংশন
function renderVocabularyList(words) {
    wordListContainer.innerHTML = '';
    if (words.length === 0) {
        wordListContainer.innerHTML = '<p class="no-words-message">কোনো শব্দ পাওয়া যায়নি।</p>';
        return;
    }
    words.forEach((wordData, index) => {
        const card = `
            <div class="project-card">
                <div class="project-image">
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="project-content">
                    <h3 class="word-original">${wordData.originalWord}</h3>
                    <p class="word-synonym">${wordData.synonym}</p>
                    <p class="word-sentence">${wordData.sentence}</p>
                </div>
                <span class="word-number">${index + 1}</span>
            </div>
        `;
        wordListContainer.innerHTML += card;
    });
}

// নতুন শব্দ ডেটাবেসে যোগ করার জন্য
addwordform.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalWord = originalWordInput.value;
    const synonym = synonymWordInput.value;
    const sentence = sentenceInput.value;

    try {
        const timestamp = new Date(); 
    await addDoc(collection(db, "words"), {
        originalWord: originalWord,
        synonym: synonym,
        sentence: sentence,
        createdAt: timestamp 
        });

        addwordform.reset();
        console.log("Word successfully added!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// Firebase থেকে রিয়েল-টাইম ডেটা লোড করা এবং সার্চ ফাংশন
onSnapshot(query(collection(db, "words"), orderBy("createdAt", "desc")), (snapshot) => {
    const allWords = snapshot.docs.map(doc => doc.data());
    let filteredWords = allWords;

    // সার্চ ইনপুট থাকলে ফিল্টার করা
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredWords = allWords.filter(word => 
            word.originalWord.toLowerCase().includes(searchTerm) ||
            word.synonym.toLowerCase().includes(searchTerm) ||
            word.sentence.toLowerCase().includes(searchTerm)
        );
    }

    renderVocabularyList(filteredWords);
});

// সার্চ ইনপুটের জন্য ইভেন্ট লিসেনার
searchInput.addEventListener('input', () => {
    // onSnapshot লিসেনার স্বয়ংক্রিয়ভাবে ডেটা ফিল্টার করে রেন্ডার করবে
});
