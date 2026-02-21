# Photo Reordering Feature (Featured Listings Only)

## Overview
Added drag-and-drop photo reordering capability exclusively for featured gym listings. Free tier users can upload up to 3 photos but cannot change their order.

## Implementation Details

### Component Updates
**File:** `components/owner/OwnerPhotoUpload.tsx`

#### New State Variables
- `draggedIndex`: Tracks which photo is currently being dragged
- `dragOverIndex`: Tracks which photo position the dragged photo is hovering over

#### New Functions
- `handlePhotoDragStart(index)`: Initiates photo drag (featured only)
- `handlePhotoDragOver(e, index)`: Handles drag-over state for visual feedback
- `handlePhotoDragEnd()`: Cleans up drag state
- `handlePhotoDrop(e, dropIndex)`: Reorders photos and saves to database

#### Visual Feedback
- **Dragged photo**: 50% opacity, slightly scaled down (95%), blue border
- **Drop target**: Blue border (2px), slightly scaled up (105%)
- **Cursor**: Changes to `cursor-move` for featured users
- **Hint text**: "(Drag to reorder)" for featured users with 2+ photos

### UI/UX Improvements

#### Featured Users (isFeatured=true)
- Photos are draggable (`draggable={true}`)
- Visual hint: "(Drag to reorder)" appears next to photo count
- Smooth animations on drag/drop with border and scale transitions
- Order changes save automatically to database

#### Free Users (isFeatured=false)
- Photos are not draggable
- Link displayed: "Upgrade to reorder photos →" (links to /pricing)
- Clean indication that reordering is a premium feature

### Pricing Page Update
**File:** `app/pricing/page.tsx`

Added "Drag-and-drop photo ordering" to Featured Monthly plan benefits list:
- Position: After "Up to 10 photos"
- Inherited by: Featured Yearly and Featured Lifetime (via "Everything in Monthly")

## Feature Highlights

### Premium Differentiation
| Feature | Free | Featured |
|---------|------|----------|
| Upload photos | ✅ (3 max) | ✅ (10 max) |
| Delete photos | ✅ | ✅ |
| Reorder photos | ❌ | ✅ |

### User Flow
1. **Featured user uploads 2+ photos**
   - Sees "(Drag to reorder)" hint
   - Can drag any photo to new position
   - Order saves automatically
   - Success message confirms save

2. **Free user uploads 2+ photos**
   - No drag functionality
   - Sees "Upgrade to reorder photos →" link
   - Clicking link goes to /pricing page

### Error Handling
- If save fails, photos revert to previous order
- Error message displays: "Failed to save order: [error message]"
- Database refetch ensures UI matches server state

## Testing Checklist
- [ ] Featured user can drag-and-drop photos
- [ ] Free user cannot drag photos
- [ ] Order persists after page reload
- [ ] Visual feedback works (opacity, scale, borders)
- [ ] Error handling reverts order on failure
- [ ] "Upgrade to reorder" link works for free users
- [ ] Pricing page lists feature correctly

## Technical Notes
- Uses native HTML5 drag-and-drop API (no external library)
- Photo order stored in `featured_images` array (Supabase)
- Array order determines display order
- Reordering calls `saveFeaturedImagesToGymAction(gymId, newImages)`
