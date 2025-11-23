/**
 * NarrowMind S2 (Statistical 2) Model
 * TF-IDF based sentence ranking system
 */
export class NarrowMindModel {
    constructor(data) {
        this.rawData = data;
        this.tokens = this.parseTokens(data);
        this.sentences = this.parseSentences(data);
        this.corpusDocs = this.sentences.map(s => this.parseTokensStemmed(s));
        this.idfCache = this.precomputeIDF();
    }

    /**
     * Basic word stemming - reduces words to their root form
     * @param {string} word - Word to stem
     * @returns {string} Stemmed word
     */
    stemWord(word) {
        if (!word || word.length < 3) return word;
        
        const lowerWord = word.toLowerCase();
        
        // Handle common suffixes
        // -ing, -ed, -er, -est, -ly, -s, -es, -ies
        if (lowerWord.endsWith('ies') && lowerWord.length > 4) {
            return lowerWord.slice(0, -3) + 'y';
        }
        if (lowerWord.endsWith('es') && lowerWord.length > 4) {
            return lowerWord.slice(0, -2);
        }
        if (lowerWord.endsWith('s') && lowerWord.length > 3) {
            return lowerWord.slice(0, -1);
        }
        if (lowerWord.endsWith('ing') && lowerWord.length > 5) {
            return lowerWord.slice(0, -3);
        }
        if (lowerWord.endsWith('ed') && lowerWord.length > 4) {
            return lowerWord.slice(0, -2);
        }
        if (lowerWord.endsWith('er') && lowerWord.length > 4) {
            return lowerWord.slice(0, -2);
        }
        if (lowerWord.endsWith('est') && lowerWord.length > 5) {
            return lowerWord.slice(0, -3);
        }
        if (lowerWord.endsWith('ly') && lowerWord.length > 4) {
            return lowerWord.slice(0, -2);
        }
        if (lowerWord.endsWith('tion') && lowerWord.length > 6) {
            return lowerWord.slice(0, -4);
        }
        if (lowerWord.endsWith('ness') && lowerWord.length > 6) {
            return lowerWord.slice(0, -4);
        }
        if (lowerWord.endsWith('ment') && lowerWord.length > 6) {
            return lowerWord.slice(0, -4);
        }
        
        return lowerWord;
    }

    /**
     * Parse text into tokens (words)
     * @param {string} text - Input text
     * @returns {string[]} Array of tokens
     */
    parseTokens(text) {
        if (!text || typeof text !== 'string') return [];
        return text.trim().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    }

    /**
     * Parse text into stemmed tokens (words)
     * @param {string} text - Input text
     * @returns {string[]} Array of stemmed tokens
     */
    parseTokensStemmed(text) {
        if (!text || typeof text !== 'string') return [];
        const tokens = this.parseTokens(text);
        return tokens.map(token => this.stemWord(token.toLowerCase()));
    }

    /**
     * Parse text into sentences
     * @param {string} text - Input text
     * @returns {string[]} Array of sentences
     */
    parseSentences(text) {
        if (!text || typeof text !== 'string') return [];
        return text.split(/[.!?,"""":;\n]+/)
            .map(s => s.trim())
            .filter(Boolean);
    }

    /**
     * Calculate Term Frequency
     * @param {string} token - Token to calculate TF for
     * @param {string[]} wordList - List of words
     * @returns {number} Term frequency
     */
    calculateTF(token, wordList) {
        if (!wordList || wordList.length === 0) return 0;
        const count = wordList.filter(w => w === token).length;
        return count / wordList.length;
    }

    /**
     * Calculate Inverse Document Frequency
     * @param {string} token - Token to calculate IDF for
     * @param {string[][]} documents - Array of document token arrays
     * @returns {number} Inverse document frequency
     */
    calculateIDF(token, documents) {
        if (!documents || documents.length === 0) return 0;
        const N = documents.length;
        const df = documents.filter(doc => doc.includes(token)).length;
        return Math.log((N + 1) / (df + 1)) + 1;
    }

    /**
     * Precompute IDF values for all tokens in the corpus
     * @returns {Map<string, number>} Map of token to IDF value
     */
    precomputeIDF() {
        const idfMap = new Map();
        // Get all unique stemmed tokens from corpus documents
        const allTokens = [...new Set(this.corpusDocs.flat())];
        
        for (const token of allTokens) {
            idfMap.set(token, this.calculateIDF(token, this.corpusDocs));
        }
        
        return idfMap;
    }

    /**
     * Get IDF value for a token (uses cache if available)
     * @param {string} token - Token to get IDF for
     * @returns {number} IDF value
     */
    getIDF(token) {
        if (this.idfCache.has(token)) {
            return this.idfCache.get(token);
        }
        // If token not in cache, calculate and cache it
        const idf = this.calculateIDF(token, this.corpusDocs);
        this.idfCache.set(token, idf);
        return idf;
    }

    /**
     * Calculate TF-IDF cosine similarity between two sentences
     * @param {string} sentence1 - First sentence
     * @param {string} sentence2 - Second sentence
     * @returns {number} Cosine similarity score (0-1)
     */
    calculateTFIDFSimilarity(sentence1, sentence2) {
        const words1 = this.parseTokensStemmed(sentence1);
        const words2 = this.parseTokensStemmed(sentence2);

        if (words1.length === 0 || words2.length === 0) return 0;

        const vocab = [...new Set([...words1, ...words2])];

        const vec1 = vocab.map(token => 
            this.calculateTF(token, words1) * this.getIDF(token)
        );
        const vec2 = vocab.map(token => 
            this.calculateTF(token, words2) * this.getIDF(token)
        );

        // Calculate cosine similarity
        const dot = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
        const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
        const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

        if (mag1 === 0 || mag2 === 0) return 0;
        return dot / (mag1 * mag2);
    }

    /**
     * Rank sentences by relevance to a query
     * @param {string} query - Search query
     * @param {number} topN - Number of top results to return (0 = all)
     * @returns {Array<[string, number]>} Array of [sentence, score] pairs, sorted by score
     */
    rankSentences(query, topN = 0) {
        if (!query || typeof query !== 'string') return [];

        const sentenceRanks = [];
        
        for (const sentence of this.sentences) {
            const similarity = this.calculateTFIDFSimilarity(query, sentence);
            if (similarity > 0) {
                sentenceRanks.push([sentence, similarity]);
            }
        }

        // Sort by score (descending)
        sentenceRanks.sort((a, b) => b[1] - a[1]);

        // Return top N if specified
        return topN > 0 ? sentenceRanks.slice(0, topN) : sentenceRanks;
    }

    /**
     * Get TF value for a token in the corpus
     * @param {string} token - Token to get TF for
     * @returns {number} Term frequency
     */
    getTF(token) {
        const stemmedToken = this.stemWord(token.toLowerCase());
        const stemmedTokens = this.parseTokensStemmed(this.rawData);
        return this.calculateTF(stemmedToken, stemmedTokens);
    }

    /**
     * Get statistics for a query token
     * @param {string} token - Token to analyze
     * @returns {Object} Object with TF and IDF values
     */
    getTokenStats(token) {
        const normalizedToken = token.toLowerCase();
        const stemmedToken = this.stemWord(normalizedToken);
        return {
            token: stemmedToken,
            tf: this.getTF(normalizedToken),
            idf: this.getIDF(stemmedToken)
        };
    }
}

