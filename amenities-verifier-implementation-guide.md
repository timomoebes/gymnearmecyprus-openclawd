# Amenities Verifier: Implementation Guide
**Quick-Start for Data Engineers, SEO Team, and Product**

---

## TLDR: What You Need to Know

### For Data Engineering
**Your job**: Build the extraction pipeline

1. **Input**: Google Maps Review Tags + Review Text (from Apify)
2. **Process**: 5-stage pipeline (tags → text mining → scoring → vision → normalization)
3. **Output**: JSON with verified amenities + confidence scores
4. **Budget**: $3.50 total (text mining + vision)
5. **Time**: 5-6 days (phase-by-phase)

**Key metric**: Confidence Score = (Tag_Count × Sentiment × Review_Age) / Total_Reviews

**Start with**: Tag extraction (zero cost). Move to text mining only after validating tags.

---

### For SEO Team
**Your job**: Competitive gap analysis + user search intent

**Research questions to answer**:
1. **What do users actually search for?**
   - Search your Ahrefs/Semrush data: "Cyprus gym + [amenity]"
   - Rank by search volume: Parking > WiFi > Showers > Classes?
   - Tailor Standard 10 list based on real demand

2. **Are our top amenities competitive?**
   - Benchmark: 198 Cyprus gyms vs. Turkish/Greek equivalents
   - Gap: Which amenities do we have that competitors don't?
   - Opportunity: Which gaps can we fill?

3. **Where to invest in UI?**
   - Emoji-first badges work best for mobile (high visual recall)
   - Order by search volume: Put top 3 amenities above the fold

**Deliverable**: Update amenities priority ranking + UX spec

---

### For Product
**Your job**: UX implementation + user feedback loop

1. **Phase 1 (weeks 1-2)**:
   - Design 4 UI states (Verified / Strong / Moderate / Unverified)
   - Add [+] button to collect user corrections
   - A/B test messaging for sparse amenities

2. **Phase 2 (weeks 3-4)**:
   - Launch with verified badges only (hide low-confidence)
   - Monitor click-through on details
   - Collect user corrections (feedback loop)

3. **Phase 3+ (ongoing)**:
   - Re-run verifier every 30 days
   - Update badges based on user feedback
   - Adjust confidence thresholds if needed

---

## QUICK REFERENCE: The Standard 10

| # | Amenity | Emoji | Why It Matters |
|---|---------|-------|---|
| 1 | Showers | 🚿 | Basic hygiene. Every gym should have. |
| 2 | Parking | 🅿️ | Top search intent in Cyprus (car-centric). |
| 3 | AC/Climate | ❄️ | Mediterranean heat. User comfort critical. |
| 4 | Water Station | 💧 | Free hydration. Health-conscious angle. |
| 5 | Sauna/Steam | 🧖 | Premium amenity. Differentiator for upscale gyms. |
| 6 | WiFi | 📡 | Work-out + productivity. Remote workers. |
| 7 | Personal Training | 👨‍🏫 | High-intent query (premium service). |
| 8 | Childcare | 👶 | Parent gym-goers. Underserved. |
| 9 | Classes | 🏃 | Group fitness is major draw. |
| 10 | Café/Snack Bar | ☕ | Post-workout nutrition + retention. |

**SEO Note**: If your Ahrefs data shows different demand patterns, update this list. It's a starting point, not gospel.

---

## PHASE-BY-PHASE CHECKLIST

### Phase 1: Tag Extraction (Day 1)
**Owner**: Data Engineering

- [ ] Export Google Maps Review Tags from Apify
  - Format: `[{gym_id, gym_name, tag_name, mention_count, total_reviews}]`
- [ ] Build parser to normalize tag names
  - Input: "parking", "Free Parking", "lot" → Output: "Parking"
- [ ] Count mentions per gym per amenity
- [ ] Generate CSV: `[gym_id, amenity, mention_count, total_reviews, raw_frequency%]`
- [ ] Spot-check: 5 random gyms vs. Google Maps (verify accuracy)
- [ ] **Output**: `tags-extracted.csv` (ready for Stage 2)

**Example CSV**:
```
gym_id,amenity,mention_count,total_reviews,frequency
fitzone-nicosia-001,Showers,8,47,17.0%
fitzone-nicosia-001,Parking,3,47,6.4%
fitzone-nicosia-001,Classes,5,47,10.6%
...
```

---

### Phase 2: Text Mining (Day 2-3)
**Owner**: Data Engineering

**Tool**: Claude Haiku API (cheapest, fast enough for this task)

- [ ] Collect raw review text (50-100 reviews per gym)
- [ ] Build batch processing script
  ```python
  for gym in gyms:
    reviews = load_reviews(gym.id)
    response = claude.extract_amenities(reviews)  # Claude Haiku
    save_results(gym.id, response)
    cost_tracker += $0.01-0.02
  ```
- [ ] Extract: `[amenity, mention_count, sentiment, confidence]`
- [ ] Compare with Phase 1 tags (do they match?)
- [ ] Pilot on 20 gyms first
  - Manual review 5 gyms: Does Claude agree with tags?
  - If accuracy <80%, refine prompt
  - If accuracy >85%, proceed to full batch
- [ ] **Output**: `text-extracted.json`

**Prompt to use** (see spec Section 5.2):
```
Given these gym reviews, extract mentioned amenities.
For each Standard 10 amenity, respond with: 
{name, mentioned, count, sentiment, confidence}
```

---

### Phase 3: Confidence Scoring (Day 3)
**Owner**: Data Engineering

- [ ] Merge Phase 1 + Phase 2 data
  - For each gym + amenity combo:
    - Tag_Count (from Phase 1)
    - Sentiment (from Phase 2)
    - Review_Quality (calculate recency)
  
- [ ] Implement confidence formula:
  ```
  Confidence = (Tag_Count × Sentiment_Weight × Review_Quality) / Total_Reviews
  ```
  
- [ ] Classify into tiers:
  - 0.80+ = VERIFIED ✅
  - 0.60-0.79 = STRONG 🟢
  - 0.40-0.59 = MODERATE 🟡
  - 0.20-0.39 = MENTIONED 🟠
  - <0.20 = UNVERIFIED ⚪

- [ ] Validate scoring with manual checks
  - Sample 10 gyms
  - Compare confidence tiers vs. Google Maps reality
  - Adjust weights if needed
  
- [ ] **Output**: `confidence-scored.json`

**Example output**:
```json
{
  "gym_id": "fitzone-nicosia-001",
  "amenities": [
    {"amenity": "Showers", "confidence": 0.92, "tier": "VERIFIED", "sources": ["tags", "text"]},
    {"amenity": "Parking", "confidence": 0.55, "tier": "MODERATE", "sources": ["tags"]},
  ]
}
```

---

### Phase 4: Vision Validation (Day 4)
**Owner**: Data Engineering (optional, if budget allows)

- [ ] Identify low-confidence amenities
  - Filter: confidence < 0.60 AND (amenity = "Parking" OR "Showers" OR "AC")
  - Expected: ~50-100 amenities to validate

- [ ] Download 1-2 photos per gym (from Google Maps or Apify)
  - Prefer: Exterior (parking), interior (showers), main hall (AC)

- [ ] Build vision validation script
  ```python
  for amenity in low_confidence:
    response = claude_vision.analyze(photo, f"Is there {amenity}?")
    # Return: visible (true/false), confidence (0-1)
  ```

- [ ] Run on 20-30 test images first
  - Manual review 5 images: Does vision match reality?
  - Adjust prompts if needed
  
- [ ] If successful, run full batch
  - Expected cost: ~$0.003 per image × 100 images = $0.30
  - Expected time: 10-15 minutes

- [ ] **Output**: `vision-validated.json`

---

### Phase 5: Normalization + Null Data Strategy (Day 5)
**Owner**: Data Engineering + Product

- [ ] Consolidate all sources into final JSON
  - Merge: tags + text + vision
  - Deduplicate aliases
  - Keep best confidence score per amenity

- [ ] Identify sparse gyms (<2 amenities)
  - Apply Tier A rules (logical inference)
  - Example: "If gym has 'Classes' tag but no 'WiFi' tag, don't assume it lacks WiFi"
  - Document each inference with confidence < 0.50

- [ ] Design UI for sparse cases
  - Option A: Show [Incomplete] + CTA
  - Option B: Show inferred amenities with * (confidence caveat)
  - Option C: Benchmark against similar gyms + suggest

- [ ] **Output**: 
  - `amenities-final.json` (all 198 gyms, all amenities)
  - `ui-fallback-spec.md` (how to handle <2 amenities cases)

---

### Phase 6: QA + Handoff (Day 5-6)
**Owner**: Data Engineering + QA

**Accuracy Verification (100% requirement)**:
- [ ] Random sample: 20 gyms (13% of 198)
- [ ] Manual check: Google Maps + gym website for EACH
  - Verify: All Standard 10 amenities present/absent?
  - Confidence scores ±0.10 acceptable?
- [ ] Spot-check rules:
  - ✅ No false positives (if marked present, gym must have it)
  - ✅ No critical missing (if gym advertises it, must be marked)
- [ ] Acceptance: 19/20 correct (95%+)
  - If <95%: Refine prompts, re-run, re-test

- [ ] Document all findings
- [ ] Deliver:
  - [ ] `amenities-final.json`
  - [ ] `confidence-algorithm.js` (reproducible formula)
  - [ ] `rerun-verifier.sh` (script for monthly updates)
  - [ ] QA Report (accuracy % + edge cases)

---

## RESOURCE ALLOCATION

| Role | Time | Tasks |
|------|------|-------|
| **Data Eng** | 5-6 days | Phases 1-5: extraction, scoring, validation |
| **QA** | 1-2 days | Manual verification (20 gyms) |
| **SEO** | 1-2 days | Competitive analysis + search demand validation |
| **Product** | 2-3 days | UI design + spec |
| **Total** | ~9-11 days | Parallel where possible |

---

## BUDGET TRACKER

```
Phase 1: Tag Extraction     → $0.00
Phase 2: Text Mining        → $1.50-3.00  (198 gyms × $0.01-0.02)
Phase 3: Confidence Scoring → $0.00
Phase 4: Vision Validation  → $0.60       (200 images × $0.003)
Phase 5: Normalization      → $0.00
──────────────────────────────────────────
TOTAL                       → $1.80-3.30
Budget remaining            → $1.70-3.20 (for iteration/fixes)
```

**Cost tracking**: Log every API call. If approaching $5, pause and reassess.

---

## COMMON PITFALLS

❌ **Pitfall 1**: Trusting Google Tags alone
- **Why**: Sparse on niche amenities (sauna, childcare)
- **Fix**: Always supplement with text mining

❌ **Pitfall 2**: Over-confident in text mining
- **Why**: "I wish they had..." gets picked up as present
- **Fix**: Require sentiment + multiple mentions

❌ **Pitfall 3**: Validating confidence without real data
- **Why**: Metrics look good, but users see wrong info
- **Fix**: Manual QA on 20 random gyms (non-negotiable)

❌ **Pitfall 4**: Ignoring sparse data problem
- **Why**: 30% of gyms end up with 0-1 amenity (UI looks broken)
- **Fix**: Plan Tier A inference + UI fallbacks early

❌ **Pitfall 5**: Forgetting to document aliases
- **Why**: Next person rebuilds the mapping
- **Fix**: Commit `Standard10-aliases.json` to repo

---

## SUCCESS METRICS

**Hard metrics**:
- ✅ All 198 gyms have ≥2 verified amenities
- ✅ Confidence validation: User perception matches algorithm (>0.8 correlation)
- ✅ Zero false positives in QA sample
- ✅ Total cost ≤$3.50

**Soft metrics**:
- User trust (click-through on verified badges)
- Correction rate (feedback loop)
- Re-run efficiency (script runs in <5 min, costs <$0.50)

---

## TOOLS & RESOURCES

**APIs**:
- Claude Haiku (text extraction): $0.80 per 1M input tokens
- Claude 3.5 Vision (validation): $0.003 per image
- Ahrefs/Semrush (SEO research): Not paid yet and would like to skip

**Code templates**:
- See spec Section 5.4 for pseudocode
- Use: Node.js + Anthropic SDK (minimal dependencies)

**Data sources**:
- Google Maps scraped via Apify (already available)
- Review text corpus (export from Apify)
- Photos: Google Maps URLs or downloaded locally

---

## HANDOFF CHECKLIST (End of Phase 6)

Deliver to Product + Operations:
- [ ] `amenities-final.json` (198 gyms, all amenities)
- [ ] `confidence-algorithm.js` (exact formula used)
- [ ] `rerun-verifier.sh` (monthly update script)
- [ ] `Standard10-aliases.json` (all normalizations)
- [ ] `ui-implementation-spec.md` (badge design + fallbacks)
- [ ] `QA-Report.md` (manual validation results)
- [ ] `MONITORING.md` (ongoing feedback loop)

---

## NEXT STEPS

1. **Confirm**: Do you have Apify dataset export ready? (Google Tags + Review Text)
2. **Decide**: Do you want vision validation? (adds cost but high confidence)
3. **SEO input**: What do Cyprus gym users actually search for? (Ahrefs data)
4. **Timeline**: When do you need this live? (Affects phase sequencing)

---

**Prepared by**: Amenities Verifier Spec Team
**Status**: Ready for Phase 1 kickoff
