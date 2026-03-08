document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("lastAnalysis", (data) => {
    if (data.lastAnalysis) {
      const result = data.lastAnalysis;
      
      // Update sentence
      document.getElementById("sentence").innerText = result.sentence;

      // Update vocabulary
      const vocabDiv = document.getElementById("vocabulary");
      vocabDiv.innerHTML = "";
      (result.vocabulary || []).forEach(item => {
        const div = document.createElement("div");
        div.className = "vocab-item";
        div.innerHTML = `
          <div class="vocab-word">${item.word} (${item.partOfSpeech})</div>
          <div class="vocab-meaning">${item.meaning}</div>
        `;
        vocabDiv.appendChild(div);
      });

      // Update grammar
      const grammarDiv = document.getElementById("grammar");
      grammarDiv.innerHTML = "";
      (result.grammar || []).forEach(item => {
        const div = document.createElement("div");
        div.className = "grammar-item";
        div.innerHTML = `
          <div class="grammar-pattern">${item.pattern}</div>
          <div class="grammar-explanation">${item.explanation}</div>
        `;
        grammarDiv.appendChild(div);
      });
    }
  });
});
