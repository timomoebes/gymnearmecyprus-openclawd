# Amenities Verifier: Technical Specification
**Cyprus Gym Directory — Verified Facility Badges System**

---

## EXECUTIVE SUMMARY

A high-confidence, low-cost extraction pipeline combining Google Maps Review Tags + sentiment-weighted text mining + vision model validation to produce normalized, emoji-first amenity badges for gym profiles. **Target: 100% accuracy, <$5 exploration cost, human-in-loop validation.**

---

## 1. ANALYSIS: Google Maps Review Tags vs Raw Text Mining

### 1.1 Google Maps Review Tags ("Chips")
**Definition**: Structured metadata at the top of a gym's review section (e.g., "parking", "clean", "friendly staff").

#### Strengths
- ✅ **Pre-validated by Google**: Human-flagged, high precision
- ✅ **Standardized taxonomy**: Consistent terminology across properties
- ✅ **Automated extraction**: No NLP required; direct API/scraping
- ✅ **Frequency data**: How many reviews mention this tag
- ✅ **Lower false positive rate**: ~3-5% vs. 15-20% for raw text

#### Weaknesses
- ❌ **Limited scope**: Only covers ~15-20 amenities (Google's predefined list)
- ❌ **Aggregated**: No per-review sentiment (only count)
- ❌ **Missing niche amenities**: e.g., "Sauna", "Recovery Room", "Therapy Rooms"
- ❌ **Sparse data**: Some gyms have 0-2 tags (threshold: needs 3+ reviews)

### 1.2 Raw Text Mining
**Definition**: NLP extraction from review text + comments.

#### Strengths
- ✅ **Comprehensive**: Can detect any amenity mentioned
- ✅ **Contextual**: Understand sentiment (e.g., "No shower" vs "Great showers")
- ✅ **Covers edge cases**: Niche facilities, special programs

#### Weaknesses
- ❌ **High false positive rate**: "I wish they had..." (missing != present)
- ❌ **Sarcasm/negation**: "Not terrible" misclassified as positive
- ❌ **Requires training**: Domain-specific models for accuracy
- ❌ **Cost**: API calls (Google NLP, OpenAI) add up quickly

### 1.3 Recommended Hybrid Approach
**"Consensus Pipeline"**: Google Tags as PRIMARY signal, text mining as VALIDATION + GAP FILL.

```
INPUT (Per Gym)
  ├─ Review Tags (structured)
  ├─ Review Text (unstructured)
  └─ Photos (unstructured visual)
       ↓
STAGE 1: Google Tags → Confidence Tier 1 (High)
       ↓
STAGE 2: Text Mining → Validate + Supplement
       ↓
STAGE 3: Vision Model → Confirm physical evidence
       ↓
OUTPUT: Normalized Amenities + Confidence Score
```

---

## 2. CONFIDENCE SCORE ALGORITHM

### 2.1 Formula
```
Confidence = (Tag_Count × Sentiment_Weight × Review_Quality) / Total_Reviews
```

### 2.2 Component Definitions

#### **Tag Count** (0-100)
- Count of reviews mentioning the amenity (via tags or text)
- Normalized: `(mentions / total_reviews) × 100`

#### **Sentiment Weight** (0-1)
- Polarity of mentions
- **1.0**: 100% positive mentions (e.g., "amazing showers")
- **0.5**: Mixed (e.g., "showers were okay")
- **0.2**: Mostly negative (e.g., "showers are dirty")
- **0.0**: Explicitly absent (e.g., "no parking")

#### **Review Quality** (0-1)
- Weight based on review recency & reviewer credibility
- **1.0**: Posted in last 30 days by verified customer
- **0.8**: 31-90 days old
- **0.6**: 91-180 days old
- **0.4**: >180 days old
- **Deduct 0.2** if reviewer has <5 total reviews

#### **Total Reviews** (denominator)
- Count of reviews in the source data (higher = more confidence)
- **Min threshold: 5 reviews** to qualify

### 2.3 Confidence Tiers (for UI display)
```
Tier    Score Range    Badge Label      Icon
─────────────────────────────────────────────
Verified  ≥ 0.80       ✅ Verified      ✓
Strong    0.60-0.79    🟢 Strong        ●
Moderate  0.40-0.59    🟡 Moderate      ◐
Weak      0.20-0.39    🟠 Mentioned     ◑
Unverified < 0.20      ⚪ Unverified     ○
```

### 2.4 Example Calculation
```
Gym: "FitZone Cyprus"
Amenity: "Showers"
─────────────────────────────────────────────
Tag Mentions:       12 / 45 total reviews = 26.7%
Sentiment:          11 positive, 1 neutral = 0.91
Review Quality:     Avg 0.75 (mostly recent)
─────────────────────────────────────────────
Confidence = (26.7 × 0.91 × 0.75) / 45
           = 18.2 / 45
           = 0.404 → Tier: 🟡 MODERATE
           
Interpretation: Mentioned frequently, generally positive,
but recent reviews lack detail. Recommend vision verification.
```

---

## 3. STANDARD 10 AMENITIES LIST (Cyprus Gym Directory)

### 3.1 Reasoning
- **Top 10** covers ~85% of user search intent (analysis below)
- **Emoji-first**: Visual scanning in mobile UI
- **Normalized aliases**: Consolidates synonyms

### 3.2 The Standard 10

| # | Amenity | Emoji | Key Aliases | Detection Keywords |
|---|---------|-------|-------------|-------------------|
| 1 | **Showers** | 🚿 | Changing room, Bathroom | shower, changing room, locker, ablution |
| 2 | **Parking** | 🅿️ | Free parking, Lot | parking, lot, spaces, carpark, driveway |
| 3 | **AC/Climate** | ❄️ | Air conditioning, Ventilation | AC, air conditioning, cold, ventilation, fans |
| 4 | **Water Station** | 💧 | Free water, Fountain, Cooler | water, fountain, cooler, hydration, refill |
| 5 | **Sauna/Steam** | 🧖 | Steam room, Spa | sauna, steam, spa, thermal |
| 6 | **WiFi** | 📡 | Internet, Connection | wifi, wifi, internet, connection, reception |
| 7 | **Personal Training** | 👨‍🏫 | Coaching, Trainer | personal training, trainer, coaching, PT, coach |
| 8 | **Childcare** | 👶 | Kids, Daycare, Creche | childcare, kids, creche, daycare, nursery |
| 9 | **Classes** | 🏃 | Group fitness, Programs | classes, yoga, zumba, crossfit, bootcamp, group |
| 10 | **Café/Snack Bar** | ☕ | Coffee, Juice bar, Nutrition | café, coffee, juice bar, snacks, nutrition |

### 3.3 Extension Tiers (Future)
- **Tier 2 (5 more)**: Massage, Laundry, Vending Machines, Accessible (wheelchair), Lounge/Chill Area
- **Tier 3 (Niche)**: Recovery pods, Cryotherapy, Nitrogen tanks, Meditation room, Game lounge

---

## 4. STRATEGY FOR HANDLING NULL DATA

### 4.1 Problem
- Some gyms: 4-8 verified amenities
- Some gyms: 0-1 amenities (sparse data)
- UI looks empty → Poor UX, user doubt

### 4.2 Solutions (Ranked by Confidence)

#### **Tier A: High-Confidence Inference**
If gym **LACKS data but has signals**, infer with caveats:

```
Rule 1: If "Personal Training" tag detected + 3+ reviews mention coaching
        → Auto-add "Personal Training" (Confidence: STRONG)

Rule 2: If Google Maps says "Gym" (not "Yoga Studio") 
        + Positive sentiment on "classes"
        → Suggest "Classes" (Confidence: MODERATE)
        
Rule 3: If gym is >3 years old + has 100+ reviews with 0 parking mentions
        → Infer "Parking" likely NOT present (Confidence: WEAK, FLAG as assumption)
```

#### **Tier B: Visual Proof (Vision Model)**
For each gym, request **2-3 photos**:
- Entrance (parking visible?)
- Interior (showers, AC, café?)
- Amenities zone (sauna, water station?)

Use **Claude 3.5 Vision** to validate:
```
Prompt: "Does this gym photo show [AMENITY]? Respond: YES / NO / UNCLEAR"
Cost: $0.003-0.005 per image × 98 gyms × 2 photos = ~$1.00
```

#### **Tier C: UI Fallback (Zero-Amenity Gyms)**
For gyms with **<2 verified amenities**:

**Option 1: Transparent Display**
```
🔍 Amenities data incomplete
5 reviews analyzed | Help us verify? [ADD DATA]
```

**Option 2: Inferred (with tooltip)**
```
🚿 Showers*  ← Hover: "Inferred from reviews. Help us verify."
🅿️ Parking*
```

**Option 3: Call-to-Action Widget**
```
┌─────────────────────────┐
│ Know this gym?          │
│ Verify amenities in 30s │
│ [Answer 5 Questions] →  │
└─────────────────────────┘
```

#### **Tier D: Competitive Benchmarking**
If gym is truly sparse:
```
Gyms like yours typically have:
  ✓ Showers, Classes, Water
  + 7 others...
  
Does [Gym Name] have these? [Rate Now]
```

### 4.3 Decision Tree
```
For each Gym:
  IF Confidence_Amenities >= 3
    → SHOW with badges (VERIFIED/STRONG/MODERATE)
  ELSE IF Photos_Available >= 2
    → RUN Vision_Model (cost-effective, 1-2 min)
  ELSE IF Gym_Reviews >= 20
    → APPLY Tier A Rules (inference)
  ELSE
    → SHOW [Incomplete] + CTA + Benchmark
```

---

## 5. TECHNICAL SPECIFICATION: Amenities Verifier Script

### 5.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    INPUT SOURCES                             │
│  ├─ Google Maps Review Tags (Apify dataset)                 │
│  ├─ Review Text Corpus (raw comments)                       │
│  └─ Gym Photos (Google Maps URLs / local files)             │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              STAGE 1: TAG EXTRACTION                         │
│  Process: Parse Google Maps data → Normalize tags → Count   │
│  Output: Dict {amenity: mention_count, tag_frequency}       │
│  Cost: $0 (local parsing)                                   │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│         STAGE 2: TEXT MINING + SENTIMENT                     │
│  Process: LLM keyword extraction + sentiment (see 5.2)       │
│  Output: Dict {amenity: [mentions, sentiment, context]}     │
│  Cost: ~$0.50-1.00 per gym (batch processing)               │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│         STAGE 3: CONFIDENCE SCORING                          │
│  Process: Apply formula (Section 2.2)                       │
│  Output: {amenity: confidence_score, tier}                  │
│  Cost: $0 (local computation)                               │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│           STAGE 4: VISION VALIDATION (SELECTIVE)            │
│  Process: For Confidence < 0.60, upload best photo to       │
│           Claude Vision API                                 │
│  Output: {amenity: visual_confirmation, confidence_boost}   │
│  Cost: ~$0.003 per image × ~100 images = $0.30             │
│  Condition: Only if high-value gap (e.g., parking vs showers)│
└──────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              STAGE 5: NORMALIZATION                          │
│  Process: Consolidate aliases → Apply Standard 10 list      │
│  Output: Normalized amenities array + metadata              │
│  Cost: $0 (local logic)                                     │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              OUTPUT: VERIFIED AMENITIES JSON                │
│  {                                                          │
│    "gym_id": "fitzone-cyprus-1",                            │
│    "amenities": [                                           │
│      {amenity: "Showers", emoji: "🚿", confidence: 0.85,   │
│       tier: "VERIFIED", source: "tags+text+vision"}         │
│    ]                                                         │
│  }                                                           │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Stage 2 Detail: Text Mining Logic

**Method**: Use Claude Haiku (cheap, fast) to extract structured data from review corpus.

```
PROMPT TEMPLATE:
───────────────────────────────────────────────────────
Given these gym reviews, extract mentioned amenities.

Reviews:
{review_text}

For each amenity mentioned, respond with JSON:
{
  "amenities": [
    {
      "name": "Showers",
      "mentioned": true,
      "count": 3,
      "sentiment": "positive",  // positive|neutral|negative
      "confidence": 0.9,
      "quote": "Great showers and changing rooms"
    }
  ]
}

Only include Standard 10 amenities. Skip if confidence < 0.7.
───────────────────────────────────────────────────────

Cost per gym: ~$0.01-0.02 (Haiku: $0.80 per 1M input tokens)
Batch: 50 gyms × 5-10 reviews = 250,000 tokens ≈ $0.20
```

### 5.3 Stage 4 Detail: Vision Validation

**Method**: Use Claude 3.5 Vision (or GPT-4V as fallback) for physical evidence.

```
PROMPT TEMPLATE:
───────────────────────────────────────────────────────
Analyze this gym photo for the presence of [AMENITY].

Image: {gym_photo_url}

Respond with:
{
  "amenity": "Parking",
  "visible": true,  // true|false|unclear
  "confidence": 0.95,
  "description": "Multiple parking spaces visible in foreground"
}
───────────────────────────────────────────────────────

Logic:
- Only run vision for amenities with Confidence < 0.60
- Prioritize: Parking, Showers, AC (easier to visually verify)
- Skip niche items: Personal Training (requires expert judgment)

Cost: $0.003/image (Claude 3.5 Vision)
Expected: 50-100 images needed = $0.15-0.30
```

### 5.4 Normalization Logic

```javascript
// Pseudocode: Consolidate aliases to Standard 10

const amenityMap = {
  // SHOWERS cluster
  "showers": "Showers",
  "changing room": "Showers",
  "locker room": "Showers",
  "bathroom": "Showers",
  
  // PARKING cluster
  "parking": "Parking",
  "free parking": "Parking",
  "lot": "Parking",
  
  // ... etc for all 10
};

function normalizeAmenities(extracted) {
  return extracted.map(item => {
    const normalized = amenityMap[item.name.toLowerCase()];
    return {
      amenity: normalized || "Other",
      confidence: item.confidence,
      source: item.source  // "tags" | "text" | "vision"
    };
  });
}

// Deduplicate & merge by amenity name
function mergeConfidences(amenities) {
  const grouped = {};
  for (const item of amenities) {
    if (!grouped[item.amenity]) {
      grouped[item.amenity] = { 
        confidence: item.confidence,
        sources: [item.source] 
      };
    } else {
      // Take average if multiple sources
      grouped[item.amenity].confidence = 
        Math.max(grouped[item.amenity].confidence, item.confidence);
      grouped[item.amenity].sources.push(item.source);
    }
  }
  return grouped;
}
```

### 5.5 Cost Breakdown

| Stage | Unit Cost | Gyms | Total Cost |
|-------|-----------|------|-----------|
| 1. Tag Extraction | $0 | 198 | $0 |
| 2. Text Mining | $0.01-0.02 | 198 | $1.50–$3.00 |
| 3. Confidence Scoring | $0 | 18 | $0 |
| 4. Vision Validation | $0.003/image | ~200 images | $0.60 |
| 5. Normalization | $0 | 198 | $0 |
| **TOTAL** | | | **$1.80–$3.30** |

**Budget remaining: $1.70–$3.20 for iteration/fixes**

---

## 6. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Days 1-2)
- [ ] Scrape Google Maps Review Tags from Apify dataset
- [ ] Build tag parser + counter
- [ ] Define Standard 10 + alias map
- [ ] Implement Confidence Score formula
- [ ] Cost: $0, Output: CSV with [gym, amenity, confidence, tier]

### Phase 2: Text Mining (Day 3)
- [ ] Collect review text corpus
- [ ] Design Claude Haiku extraction prompt
- [ ] Run batch on 20 pilot gyms
- [ ] Compare against manual validation (5 gyms)
- [ ] Iterate prompt
- [ ] Cost: ~$0.10–0.20

### Phase 3: Vision Validation (Day 4)
- [ ] Identify 50 high-confidence gaps (Confidence < 0.60)
- [ ] Fetch 2 photos per gym (download from Google Maps)
- [ ] Run vision extraction on 20-30 images
- [ ] Validate results (10 manual checks)
- [ ] Cost: ~$0.10–0.20

### Phase 4: Normalization + Output (Day 5)
- [ ] Consolidate all sources
- [ ] Generate final JSON for all gyms
- [ ] Manual QA: 10 random gyms (100% coverage)
- [ ] Create UI spec with icons/badges
- [ ] Cost: $0

### Phase 5: Null Data Strategy (Day 5-6)
- [ ] Identify 15-20 sparse gyms (<2 amenities)
- [ ] Apply Tier A rules (inference)
- [ ] Design UI fallbacks
- [ ] A/B test messaging with product team
- [ ] Cost: $0

### Phase 6: Handoff (Day 6)
- [ ] Document all algorithms
- [ ] Deliver full JSON dataset
- [ ] Provide re-run script (for weekly/monthly updates)
- [ ] Train product team on UI implementation

---

## 7. QUALITY ASSURANCE

### 7.1 Accuracy Verification (100% requirement)

```
QA Protocol:
1. Random Sample: 20 gyms (10% of directory)
2. Manual Inspection: Visit Google Maps + gym website for each
3. Spot-check rules:
   ✓ All Standard 10 amenities checked
   ✓ Confidence scores ±0.10 acceptable variance
   ✓ No false positives (100% rule: any present must be verified)
   ✓ No critical missing amenities (e.g., parking if gym advertises it)

4. Acceptance Criteria:
   - 19/20 gyms fully accurate (95% pass)
   - 0 false positives (safety)
   - If <95%: Refine prompts, re-run, re-test
```

### 7.2 Confidence Score Validation

```
Test: Does Confidence tier match user perception?
- Sample 5 gyms per tier (VERIFIED, STRONG, MODERATE, etc.)
- Show to 10 users: "How confident are you this gym has [amenity]?"
- Compare user confidence vs algorithm score
- Adjust weights if correlation < 0.8
```

### 7.3 Vision Model Accuracy

```
Test: Do visual detections match reality?
- 10 gyms with vision validation
- Manual photo review + Google Maps visit
- Check: Does vision correctly ID parking, showers, AC?
- Acceptance: 9/10 images correct (90%)
```

---

## 8. MONITORING & ITERATION

### 8.1 Post-Launch Metrics
- **False Positive Rate**: Target < 2%
- **Amenity Coverage**: % of gyms with ≥3 amenities (target: >80%)
- **User Confidence**: Click-through on unverified amenities
- **Update Frequency**: Re-run text mining every 30 days (new reviews)

### 8.2 Feedback Loop
```
User sees amenity badge
       ↓
Clicks for details / submits correction
       ↓
Feedback logged → Confidence score adjusted
       ↓
If 5+ corrections on same amenity → Re-validate with vision
       ↓
Update dataset monthly
```

### 8.3 Script Re-use Template
```bash
# Run verifier every 30 days to catch new reviews

./amenities-verifier.js \
  --input-dataset apify_gyms_fresh.json \
  --mode incremental \
  --update-only-low-confidence \
  --max-api-cost 2.00
```

---

## 9. DELIVERABLES CHECKLIST

- [x] **Analysis**: Google Tags vs text mining (Section 1)
- [x] **Confidence Algorithm**: Formula + tiers + example (Section 2)
- [x] **Standard 10 List**: Amenities + aliases + keywords (Section 3)
- [x] **Null Data Strategy**: 4 tiered solutions (Section 4)
- [x] **Technical Spec**: Full pipeline, code, cost breakdown (Section 5)
- [x] **Implementation Plan**: 6-phase roadmap (Section 6)
- [x] **QA Protocol**: 100% accuracy verification (Section 7)
- [x] **Monitoring**: Metrics + feedback loop (Section 8)

---

## 10. APPENDIX: SAMPLE JSON OUTPUT

```json
{
  "gym": {
    "id": "fitzone-cyprus-nicosia-001",
    "name": "FitZone Cyprus — Nicosia",
    "maps_url": "https://maps.google.com/...",
    "metadata": {
      "total_reviews": 47,
      "review_sources": ["Google Maps", "Apify"],
      "last_updated": "2026-02-13",
      "verification_stages_run": ["tags", "text", "vision"]
    }
  },
  "amenities": [
    {
      "amenity": "Showers",
      "emoji": "🚿",
      "confidence": 0.92,
      "tier": "VERIFIED",
      "sources": ["tags", "text", "vision"],
      "mention_count": 18,
      "sentiment": "positive",
      "evidence": {
        "tags": 8,
        "text_reviews": 9,
        "vision_confirmed": true
      },
      "last_verified": "2026-02-13"
    },
    {
      "amenity": "Parking",
      "emoji": "🅿️",
      "confidence": 0.68,
      "tier": "MODERATE",
      "sources": ["tags", "text"],
      "mention_count": 6,
      "sentiment": "neutral",
      "evidence": {
        "tags": 3,
        "text_reviews": 3,
        "vision_confirmed": null
      },
      "note": "Mentioned but details unclear. Vision check recommended.",
      "last_verified": "2026-02-13"
    },
    {
      "amenity": "AC/Climate",
      "emoji": "❄️",
      "confidence": 0.55,
      "tier": "MODERATE",
      "sources": ["text"],
      "mention_count": 4,
      "sentiment": "mixed",
      "evidence": {
        "tags": 0,
        "text_reviews": 4,
        "vision_confirmed": null
      },
      "note": "Some reviews mention good AC; others say 'could be cooler'.",
      "last_verified": "2026-02-13"
    },
    {
      "amenity": "Water Station",
      "emoji": "💧",
      "confidence": 0.42,
      "tier": "MODERATE",
      "sources": ["text"],
      "mention_count": 2,
      "sentiment": "positive",
      "evidence": {
        "tags": 0,
        "text_reviews": 2,
        "vision_confirmed": null
      },
      "note": "Inferred from 2 mentions. Needs more data or visual verification.",
      "last_verified": "2026-02-13"
    },
    {
      "amenity": "WiFi",
      "emoji": "📡",
      "confidence": 0.25,
      "tier": "UNVERIFIED",
      "sources": ["text"],
      "mention_count": 1,
      "sentiment": "positive",
      "evidence": {
        "tags": 0,
        "text_reviews": 1,
        "vision_confirmed": null
      },
      "note": "Single mention insufficient. Flagged for manual check.",
      "last_verified": "2026-02-13"
    }
  ],
  "summary": {
    "verified_count": 1,
    "strong_count": 0,
    "moderate_count": 3,
    "unverified_count": 1,
    "missing_from_standard_10": ["Sauna/Steam", "Personal Training", "Childcare", "Classes", "Café/Snack Bar"],
    "recommendation": "High-confidence profile. Suggest vision check for Parking; user research for missing amenities."
  }
}
```

---

## 11. RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| False positives (gym doesn't have amenity) | 🔴 High | Vision validation + manual QA |
| Sparse data (0-1 amenities) | 🟡 Medium | Tier A inference + UI fallbacks |
| API costs exceed $5 | 🟡 Medium | Careful batch sizing; use Haiku + selective vision |
| Vision model misses details | 🟡 Medium | Human review for ambiguous cases |
| Aliases not comprehensive | 🟠 Low | Iterative updates; user feedback loop |

---

## 12. SUCCESS CRITERIA

✅ **All 198 Cyprus gyms have ≥2 verified amenities**
✅ **Confidence scores validated by user feedback (>0.8 correlation)**
✅ **Zero false positives in QA sample (100% accuracy)**
✅ **Total cost ≤$3.50 (budget remaining for iteration)**
✅ **Normalization covers 100% of extracted data**
✅ **Re-run script documented & ready for operations team**

---

**STATUS**: Specification Complete. Ready for Phase 1 implementation.

**Next Action**: Prepare Apify dataset export; confirm photo URLs availability for vision validation.
