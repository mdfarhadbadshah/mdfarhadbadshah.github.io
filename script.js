// script.js

import { db } from './firebase-config.js'; 
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// HTML এলিমেন্টগুলো সিলেক্ট করো
const addwordform = document.getElementById('addwordform');
const originalWordInput = document.getElementById('originalword');
const synonymWordInput = document.getElementById('synonymword');
const sentenceInput = document.getElementById('sentence');
const wordListContainer = document.getElementById('vocabularylist');

// নতুন শব্দ ডেটাবেসে যোগ করার জন্য
addwordform.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalWord = originalWordInput.value;
    const synonym = synonymWordInput.value;
    const sentence = sentenceInput.value;

    try {
        await addDoc(collection(db, "words"), {
            originalWord: originalWord,
            synonym: synonym,
            sentence: sentence
        });
        addwordform.reset();
        console.log("Word successfully added!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// ডেটাবেস থেকে শব্দগুলো real-time এ দেখানো
onSnapshot(collection(db, "words"), (snapshot) => {
    wordListContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const wordData = doc.data();
        // এখানে তোমার ডিজাইন অনুযায়ী ব্লক তৈরি করো
        const card = `
            <div class="project-card">
                <div class="project-image">
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="project-content">
                    <h3>${wordData.originalWord}</h3>
                    <p>${wordData.synonym}</p>
                    <p><i>"${wordData.sentence}"</i></p>
                </div>
            </div>
        `;
        wordListContainer.innerHTML += card;
    });
});
