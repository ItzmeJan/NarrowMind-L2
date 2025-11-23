# NarrowMind S2 - Statistical Language Model

A sophisticated statistical language model that uses multiple similarity metrics and weighting schemes for text understanding, semantic analysis, and intelligent sentence retrieval. NarrowMind S2 combines TF-IDF, character-level similarity, and word co-occurrence analysis to provide accurate and contextually relevant text search and ranking.

## 🚀 Features

### Core Capabilities
- **Multi-Metric Similarity Scoring**: Combines TF-IDF, character-level (LCS-based), and co-occurrence metrics
- **Intelligent Sentence Ranking**: Weighted combination of similarity metrics for accurate relevance scoring
- **Semantic Analysis**: Word co-occurrence analysis using Jaccard similarity and Pointwise Mutual Information (PMI)
- **Advanced Text Processing**: Custom stemming, filler word filtering, and n-gram analysis

### Key Components
- **TF-IDF Cosine Similarity**: Statistical measure of term importance
- **Character-level Similarity**: Longest Common Subsequence (LCS) based matching
- **Word Co-occurrence Matrix**: Tracks semantic relationships between words
- **Custom Stemming**: Suffix-based word normalization
- **Filler Word Filtering**: Removes common stop words for better focus
- **N-gram Analysis**: Identifies common patterns and relationships

## 📋 Requirements

- Node.js (v14 or higher)
- ES6 Modules support

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/ItzmeJan/NarrowMind-L2.git
cd NarrowMind-L2
```

2. Install dependencies (if any):
```bash
npm install
```

3. Prepare your input file:
   - Create or edit `input.txt` with the text corpus you want to analyze
   - Each sentence should be separated by punctuation (`.`, `!`, `?`, etc.)

## 🎯 Usage

### Basic Usage

Run the interactive shell:
```bash
node index.js
```

The model will:
1. Load and process `input.txt`
2. Display corpus statistics and model configuration
3. Enter an interactive query mode

### Interactive Shell

Once started, you can enter queries:
```
=> where did aria walk
```

The model will display:
- **Query Analysis**: Token statistics, TF-IDF values, co-occurrences
- **Common Co-occurrences**: Words that appear with multiple query terms
- **N-gram Analysis**: Most common tokens from matching n-grams
- **Ranked Results**: Sentences ranked by relevance with similarity scores

To exit, type: `exit`, `quit`, or `q`

### Programmatic Usage

```javascript
import { NarrowMindModel } from './model.js';
import fs from 'fs';

// Load your text corpus
const data = fs.readFileSync('./input.txt', 'utf-8');

// Initialize the model
const model = new NarrowMindModel(data);

// Rank sentences with default weights
const results = model.rankSentences("your query here");

// Custom configuration
const results = model.rankSentences(
    "your query",
    10,              // topN: return top 10 results
    0.70,            // tfidfWeight: 70%
    0.10,            // charWeight: 10%
    false,           // filterWords: don't filter fillers
    0.20,            // coOccurrenceWeight: 20%
    'jaccard'        // coOccurrenceMethod: 'jaccard' or 'pmi'
);

// Access model properties
console.log(model.tokens);              // All tokens
console.log(model.filteredTokens);     // Tokens without fillers
console.log(model.sentences);           // All sentences
console.log(model.coOccurrenceMatrix); // Co-occurrence data
```

## 📊 Model Configuration

### Default Scoring Weights
- **TF-IDF**: 70%
- **Character Similarity**: 10%
- **Co-occurrence**: 20% (Jaccard method)
- **Filter Fillers**: Disabled

### Available Methods

#### Similarity Metrics
- **TF-IDF Cosine Similarity**: Measures semantic similarity based on term frequency and inverse document frequency
- **Character-level Similarity**: Uses Longest Common Subsequence (LCS) for character-based matching
- **Co-occurrence Scoring**: 
  - **Jaccard**: Set-based similarity (intersection/union)
  - **PMI**: Pointwise Mutual Information (statistical association)

#### Text Processing
- **Stemming**: Custom suffix-based word normalization
- **Filler Word Filtering**: Removes common stop words (configurable via `fillers.json`)
- **N-gram Analysis**: Identifies patterns in text sequences

## 📁 Project Structure

```
NarrowMind-L2/
├── index.js          # Main entry point and interactive shell
├── model.js          # Core language model implementation
├── stem.js           # Stemming utility
├── fillers.json      # Filler/stop words list
├── input.txt         # Input text corpus
├── package.json      # Project configuration
└── README.md         # This file
```

## 🔧 API Reference

### NarrowMindModel Class

#### Constructor
```javascript
new NarrowMindModel(data: string)
```
Initializes the model with a text corpus.

#### Methods

##### `rankSentences(query, topN, tfidfWeight, charWeight, filterWords, coOccurrenceWeight, coOccurrenceMethod)`
Ranks sentences by relevance to a query.

**Parameters:**
- `query` (string): Search query
- `topN` (number, default: 0): Number of top results (0 = all)
- `tfidfWeight` (number, default: 0.95): TF-IDF weight (0-1)
- `charWeight` (number, default: 0.05): Character similarity weight (0-1)
- `filterWords` (boolean, default: false): Filter filler words
- `coOccurrenceWeight` (number, default: 0): Co-occurrence weight (0-1)
- `coOccurrenceMethod` (string, default: 'jaccard'): 'jaccard' or 'pmi'

**Returns:** `Array<[string, number]>` - Array of [sentence, score] pairs

##### `getTokenStats(token)`
Get statistics for a token (TF, IDF, stemmed form).

##### `getTopCoOccurrences(word, topN)`
Get top N words that co-occur with a given word.

##### `calculateCoOccurrenceScore(word1, word2, method)`
Calculate co-occurrence score between two words.

##### `findMostCommonTokenFromQueryNgrams(query, ngramSize, filterFillers, topN)`
Find most common tokens from query n-grams that appear in corpus.

## 🎨 Example Output

```
======================================================================
  NarrowMind S2 - Statistical Language Model
======================================================================

📊 CORPUS STATISTICS
----------------------------------------------------------------------
  Total Sentences:     21
  Total Tokens:        111
  Filtered Tokens:     67 (filler words removed)
  Unique Stemmed:      45
  Filler Words Loaded: 200+
  Co-occurrence Pairs:  1,234
  Avg Words/Sentence:  5.29

⚙️  MODEL CONFIGURATION
----------------------------------------------------------------------
  Language Model Components:
    • Statistical text analysis and understanding
    • Multi-metric similarity scoring
    • Semantic relationship modeling

  Similarity Metrics (used in scoring):
    • TF-IDF Cosine Similarity
    • Character-level Similarity (LCS-based)
    • Word Co-occurrence Scoring (Jaccard/PMI)

=> where did aria walk

======================================================================
  QUERY ANALYSIS
======================================================================

  Query: "where did aria walk"
  Tokens: 4

  Token Statistics:
----------------------------------------------------------------------
    • where [FILLER]
      Stemmed: where | TF: 0.0000 | IDF: 4.1781
    • walked
      Stemmed: walk | TF: 0.0180 | IDF: 3.0794
      Top Co-occurrences: her(2), aria(1), home(1)
    • aria
      Stemmed: aria | TF: 0.0270 | IDF: 2.7918
      Top Co-occurrences: walk(1), home(1), late(1)
```

## 🔬 How It Works

1. **Text Processing**: Input text is tokenized, stemmed, and filtered
2. **Feature Extraction**: 
   - TF-IDF vectors are computed
   - Co-occurrence matrix is built from sentence-level word pairs
   - Character-level features are extracted
3. **Similarity Calculation**: Multiple metrics are computed and combined
4. **Ranking**: Sentences are scored using weighted combination of metrics
5. **Results**: Top-ranked sentences are returned with similarity scores

## ⚙️ Configuration

### Customizing Filler Words
Edit `fillers.json` to add or remove filler/stop words.

### Adjusting Weights
Modify weights in `index.js` or when calling `rankSentences()`:
```javascript
// More emphasis on co-occurrence
model.rankSentences(query, 0, 0.50, 0.10, false, 0.40, 'jaccard');

// More emphasis on TF-IDF
model.rankSentences(query, 0, 0.90, 0.05, false, 0.05, 'jaccard');
```

## 🐛 Troubleshooting

### Empty Results
- Check that `input.txt` contains valid text
- Ensure sentences are properly separated by punctuation
- Try adjusting similarity weights

### Performance Issues
- Large corpora may take time to initialize (co-occurrence matrix building)
- Consider filtering filler words for faster processing

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For issues and questions, please use the [GitHub Issues](https://github.com/ItzmeJan/NarrowMind-L2/issues) page.

---

**NarrowMind S2** - Intelligent text understanding through statistical language modeling
