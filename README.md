# NarrowMind S2

<div align="center">

**Statistical Language Model for Intelligent Text Search & Analysis**

[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## 🎯 What It Does

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Text      │ --> │   Language   │ --> │   Ranked    │
│   Corpus    │     │    Model     │     │  Sentences  │
└─────────────┘     └──────────────┘     └─────────────┘
```

**Multi-metric similarity scoring** combining:
- 🔤 **TF-IDF** - Term frequency analysis
- 📝 **Character-level** - LCS-based matching  
- 🔗 **Co-occurrence** - Semantic relationships

---

## ⚡ Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/ItzmeJan/NarrowMind-L2.git
cd NarrowMind-L2

# 2. Add your text to input.txt
echo "Your text corpus here..." > input.txt

# 3. Run
node index.js
```

```
=> your query here
```

---

## 📊 Features

| Feature | Description |
|--------|-------------|
| 🧠 **Multi-Metric Scoring** | TF-IDF + Character + Co-occurrence |
| 🔍 **Semantic Analysis** | Word co-occurrence & n-gram patterns |
| ✂️ **Text Processing** | Custom stemming & filler word filtering |
| 📈 **Interactive Shell** | Real-time query analysis |

---

## 🎨 Usage

### Interactive Mode
```bash
node index.js
```

```
======================================================================
  NarrowMind S2 - Statistical Language Model
======================================================================

=> where did aria walk

📊 QUERY ANALYSIS
  • walked → TF: 0.0180 | IDF: 3.0794
  • aria → TF: 0.0270 | IDF: 2.7918

🔗 Common Co-occurrences
  • aria - co-occurs with 2 query tokens

📈 RANKING RESULTS
  1. [Score: 0.2639] ████████████
     "Aria walked home late after her evening class"
```

### Programmatic
```javascript
import { NarrowMindModel } from './model.js';

const model = new NarrowMindModel(textData);

// Rank sentences
const results = model.rankSentences(
    "your query",
    10,        // top N results
    0.70,      // TF-IDF weight
    0.10,      // Character weight
    false,     // filter fillers
    0.20,      // Co-occurrence weight
    'jaccard'  // method
);
```

---

## ⚙️ Configuration

### Default Weights
```
TF-IDF:         ████████████████████ 70%
Character:      ████ 10%
Co-occurrence:  ██████ 20%
```

### Methods
- **Jaccard** - Set-based similarity (intersection/union)
- **PMI** - Pointwise Mutual Information

---

## 📁 Structure

```
NarrowMind-L2/
├── 🚀 index.js       # Interactive shell
├── 🧠 model.js       # Core language model
├── ✂️ stem.js        # Stemming utility
├── 📋 fillers.json   # Stop words
└── 📄 input.txt      # Your corpus
```

---

## 🔧 API

```javascript
// Main methods
model.rankSentences(query, topN, ...weights)
model.getTokenStats(token)
model.getTopCoOccurrences(word, topN)
model.calculateCoOccurrenceScore(word1, word2, method)
```

---

## 📈 How It Works

```
1. Text Processing
   └─> Tokenize → Stem → Filter

2. Feature Extraction
   └─> TF-IDF vectors
   └─> Co-occurrence matrix
   └─> Character features

3. Similarity Calculation
   └─> Multi-metric scoring

4. Ranking
   └─> Weighted combination → Results
```

---

## 📝 License

ISC

---

<div align="center">

**Built with ❤️ for intelligent text understanding**

[Report Bug](https://github.com/ItzmeJan/NarrowMind-L2/issues) · [Request Feature](https://github.com/ItzmeJan/NarrowMind-L2/issues)

</div>
