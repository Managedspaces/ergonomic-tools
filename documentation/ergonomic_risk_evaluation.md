# Ergonomic Risk Evaluation Logic for Digital Workstation Assessment

This document provides the structured ergonomic risk evaluation logic for a digital workstation assessment tool. It translates established ergonomic principles from the EU Display Screen Equipment Directive (90/270/EEC), ISO ergonomic guidelines (ISO 9241, ISO 11226), and common occupational health standards into actionable, code-ready rules.

The evaluation covers ten essential categories. For each category, risk factors, scoring logic, threshold rules, and recommended corrective actions are defined, followed by a structured JSON logic block designed for integration into a software risk evaluation engine.

---

## 1. Monitor Positioning

The positioning of the monitor is critical to maintaining a neutral neck posture and preventing musculoskeletal disorders of the cervical spine and shoulders.

### Risk Factors
- Monitor top edge is below or significantly above eye level, causing neck flexion or extension.
- Monitor is positioned too close or too far, not at arm's length, leading to forward head posture or eye strain.
- Monitor is offset to the side, causing sustained neck twisting.
- Monitor tilt does not align with the natural line of sight.

### Scoring Logic
- **Height Alignment**: Top edge at eye level (Score: 0); Slightly below eye level (Score: 1); Significantly below or above eye level (Score: 4).
- **Distance**: Approximately arm's length (Score: 0); Too close or too far (Score: 3).
- **Lateral Alignment**: Directly in front of the user (Score: 0); Offset requiring neck twist (Score: 4).

### Threshold Rules
- **0 - 1.25 (Low)**: Optimal monitor setup.
- **1.26 - 2.5 (Moderate)**: Minor adjustments to monitor height or distance needed.
- **2.51 - 3.75 (High)**: Significant risk of neck strain; adjustments required soon.
- **3.76 - 5.0 (Critical)**: Immediate risk of injury; urgent repositioning required.

### Recommended Corrective Actions
- **Low**: Maintain current monitor positioning as it supports a neutral neck posture.
- **Moderate**: Adjust the monitor height or distance slightly to optimize your viewing angle and reduce minor strain.
- **High**: Raise the monitor using a stand or books so the top edge is at eye level, and ensure it is placed directly in front of you.
- **Critical**: Immediately reposition the monitor directly in front of you at arm's length, with the top edge at eye level, to prevent severe neck and shoulder strain.

### JSON Logic Block
```json
{
  "category": "monitor_positioning",
  "riskFactors": [
    "monitor_height_incorrect",
    "monitor_distance_incorrect",
    "monitor_offset"
  ],
  "scoringLogic": {
    "height": { "at_eye_level": 0, "slightly_below": 1, "significantly_off": 4 },
    "distance": { "arms_length": 0, "too_close_or_far": 3 },
    "alignment": { "directly_in_front": 0, "offset": 4 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Maintain current monitor positioning as it supports a neutral neck posture.",
    "moderate": "Adjust the monitor height or distance slightly to optimize your viewing angle and reduce minor strain.",
    "high": "Raise the monitor using a stand or books so the top edge is at eye level, and ensure it is placed directly in front of you.",
    "critical": "Immediately reposition the monitor directly in front of you at arm's length, with the top edge at eye level, to prevent severe neck and shoulder strain."
  }
}
```

---

## 2. Keyboard and Mouse Placement

Proper placement of input devices is necessary to prevent repetitive strain injuries and maintain neutral wrist and arm postures.

### Risk Factors
- Keyboard or mouse positioned above or below resting elbow level.
- Mouse positioned far from the keyboard, requiring excessive reaching.
- Wrists bent in extension or flexion while typing or using the mouse.
- Resting wrists on sharp desk edges.

### Scoring Logic
- **Height**: At elbow level (Score: 0); Slightly off elbow level (Score: 2); Significantly above or below (Score: 4).
- **Proximity**: Mouse immediately next to keyboard (Score: 0); Reaching required to use mouse (Score: 3).
- **Wrist Posture**: Neutral and straight (Score: 0); Slightly bent (Score: 2); Sharply bent or resting on sharp edge (Score: 5).

### Threshold Rules
- **0 - 1.25 (Low)**: Optimal input device placement.
- **1.26 - 2.5 (Moderate)**: Minor adjustments to device proximity or height needed.
- **2.51 - 3.75 (High)**: Significant risk of wrist/arm strain.
- **3.76 - 5.0 (Critical)**: Immediate risk of repetitive strain injury.

### Recommended Corrective Actions
- **Low**: Keep your keyboard and mouse in their current positions to maintain neutral wrist alignment.
- **Moderate**: Move your mouse closer to the keyboard to reduce reaching, and ensure both are close to elbow height.
- **High**: Adjust your chair or desk height so your keyboard and mouse are at elbow level, keeping your wrists straight.
- **Critical**: Immediately stop resting your wrists on sharp edges. Adjust your setup so the keyboard and mouse are at elbow level and your wrists remain perfectly straight while working.

### JSON Logic Block
```json
{
  "category": "keyboard_mouse_placement",
  "riskFactors": [
    "incorrect_height",
    "mouse_too_far",
    "wrists_bent",
    "sharp_edges"
  ],
  "scoringLogic": {
    "height": { "elbow_level": 0, "slightly_off": 2, "significantly_off": 4 },
    "proximity": { "next_to_keyboard": 0, "reaching_required": 3 },
    "wristPosture": { "neutral": 0, "slightly_bent": 2, "sharply_bent": 5 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Keep your keyboard and mouse in their current positions to maintain neutral wrist alignment.",
    "moderate": "Move your mouse closer to the keyboard to reduce reaching, and ensure both are close to elbow height.",
    "high": "Adjust your chair or desk height so your keyboard and mouse are at elbow level, keeping your wrists straight.",
    "critical": "Immediately stop resting your wrists on sharp edges. Adjust your setup so the keyboard and mouse are at elbow level and your wrists remain perfectly straight while working."
  }
}
```

---

## 3. Chair Ergonomics

A properly adjusted chair provides essential support for the spine and lower extremities, mitigating the risks associated with prolonged sitting.

### Risk Factors
- Lack of adequate lumbar support for the lower back.
- Seat height not adjustable, resulting in feet dangling or knees positioned higher than hips.
- Seat pan too deep, causing pressure on the back of the knees, or too shallow, failing to support the thighs.
- Armrests preventing the user from sitting close to the desk.

### Scoring Logic
- **Lumbar Support**: Full support conforming to the spine (Score: 0); Partial support (Score: 2); No support (Score: 5).
- **Feet Support**: Feet flat on the floor or on a footrest (Score: 0); Feet dangling or on tiptoes (Score: 5).
- **Adjustability**: Fully adjustable height and backrest (Score: 0); Somewhat adjustable (Score: 2); Fixed chair (Score: 4).

### Threshold Rules
- **0 - 1.25 (Low)**: Optimal seating support.
- **1.26 - 2.5 (Moderate)**: Minor adjustments or additions like a footrest needed.
- **2.51 - 3.75 (High)**: Significant risk of lower back or leg discomfort.
- **3.76 - 5.0 (Critical)**: Unsuitable seating causing immediate postural degradation.

### Recommended Corrective Actions
- **Low**: Your chair is well-adjusted; ensure you continue to sit fully back in the seat.
- **Moderate**: Adjust your chair height or add a basic footrest to ensure your feet are firmly supported.
- **High**: Use a lumbar cushion for your lower back and adjust the chair so your hips are slightly higher than your knees.
- **Critical**: Your current chair poses a high ergonomic risk. Transition to a fully adjustable ergonomic chair, or immediately add a firm lumbar support and a proper footrest to stabilize your posture.

### JSON Logic Block
```json
{
  "category": "chair_ergonomics",
  "riskFactors": [
    "no_lumbar_support",
    "feet_not_flat",
    "seat_pan_incorrect",
    "obstructive_armrests"
  ],
  "scoringLogic": {
    "lumbarSupport": { "full": 0, "partial": 2, "none": 5 },
    "feetSupport": { "flat_or_footrest": 0, "dangling": 5 },
    "adjustability": { "fully_adjustable": 0, "somewhat": 2, "fixed": 4 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Your chair is well-adjusted; ensure you continue to sit fully back in the seat.",
    "moderate": "Adjust your chair height or add a basic footrest to ensure your feet are firmly supported.",
    "high": "Use a lumbar cushion for your lower back and adjust the chair so your hips are slightly higher than your knees.",
    "critical": "Your current chair poses a high ergonomic risk. Transition to a fully adjustable ergonomic chair, or immediately add a firm lumbar support and a proper footrest to stabilize your posture."
  }
}
```

---

## 4. Desk Setup

The desk surface dictates the vertical alignment of the entire workstation and must accommodate the user's physical dimensions.

### Risk Factors
- Desk is too high, causing shoulder elevation, or too low, causing spinal flexion.
- Inadequate leg clearance under the desk, restricting movement.
- Sharp edges on the work surface pressing against forearms.

### Scoring Logic
- **Height Suitability**: Allows elbows to rest at 90 degrees (Score: 0); Slightly too high or low (Score: 2); Significantly too high or low (Score: 4).
- **Leg Clearance**: Ample space to move legs freely (Score: 0); Restricted space causing cramped posture (Score: 4).
- **Surface Edges**: Smooth or rounded (Score: 0); Sharp edges causing pressure (Score: 3).

### Threshold Rules
- **0 - 1.25 (Low)**: Optimal desk setup.
- **1.26 - 2.5 (Moderate)**: Minor adjustments to chair height to compensate for desk height.
- **2.51 - 3.75 (High)**: Significant risk due to restricted movement or poor height.
- **3.76 - 5.0 (Critical)**: Severe postural compromise due to inadequate desk structure.

### Recommended Corrective Actions
- **Low**: Your desk setup is optimal and provides adequate space and height.
- **Moderate**: Clear items from under your desk to improve leg room, or slightly adjust your chair height.
- **High**: If your desk is too high, raise your chair and use a footrest. If it is too low, consider desk risers.
- **Critical**: Your desk setup forces a harmful posture. Immediately clear all under-desk obstructions and implement desk risers or a keyboard tray to achieve proper elbow alignment.

### JSON Logic Block
```json
{
  "category": "desk_setup",
  "riskFactors": [
    "incorrect_height",
    "inadequate_leg_clearance",
    "sharp_edges"
  ],
  "scoringLogic": {
    "heightSuitability": { "optimal": 0, "slightly_off": 2, "significantly_off": 4 },
    "legClearance": { "ample": 0, "restricted": 4 },
    "surfaceEdges": { "smooth": 0, "sharp": 3 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Your desk setup is optimal and provides adequate space and height.",
    "moderate": "Clear items from under your desk to improve leg room, or slightly adjust your chair height.",
    "high": "If your desk is too high, raise your chair and use a footrest. If it is too low, consider desk risers.",
    "critical": "Your desk setup forces a harmful posture. Immediately clear all under-desk obstructions and implement desk risers or a keyboard tray to achieve proper elbow alignment."
  }
}
```

---

## 5. Laptop-only Work Risk

Working directly on a laptop inherently violates ergonomic principles by coupling the screen and keyboard, forcing a trade-off between neck and wrist posture.

### Risk Factors
- Using a laptop without an external monitor, causing neck flexion.
- Using a laptop without an external keyboard and mouse, causing wrist strain.
- Prolonged continuous use (greater than 2 hours) in a laptop-only configuration.

### Scoring Logic
- **External Devices**: Uses both external monitor and keyboard/mouse (Score: 0); Uses one external device (Score: 3); Uses no external devices (Score: 5).
- **Duration of Laptop-only Use**: Less than 1 hour daily (Score: 1); 1 to 4 hours daily (Score: 3); More than 4 hours daily (Score: 5).

### Threshold Rules
- **0 - 1.25 (Low)**: Low risk, adequately mitigated by peripherals.
- **1.26 - 2.5 (Moderate)**: Moderate risk; acceptable for short durations.
- **2.51 - 3.75 (High)**: High risk of neck and wrist strain due to prolonged exposure.
- **3.76 - 5.0 (Critical)**: Immediate high risk of musculoskeletal injury.

### Recommended Corrective Actions
- **Low**: Continue using your external peripherals to maintain a healthy posture.
- **Moderate**: Limit direct laptop use to short periods and use at least an external mouse.
- **High**: Elevate your laptop on a stand to eye level and connect an external keyboard and mouse for daily work.
- **Critical**: Stop using the laptop as a standalone device for prolonged work immediately. You must deploy a laptop stand, external keyboard, and external mouse to prevent severe neck and wrist injuries.

### JSON Logic Block
```json
{
  "category": "laptop_only_risk",
  "riskFactors": [
    "no_external_monitor",
    "no_external_keyboard_mouse",
    "prolonged_duration"
  ],
  "scoringLogic": {
    "externalDevices": { "both": 0, "one": 3, "none": 5 },
    "duration": { "under_1_hr": 1, "1_to_4_hrs": 3, "over_4_hrs": 5 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Continue using your external peripherals to maintain a healthy posture.",
    "moderate": "Limit direct laptop use to short periods and use at least an external mouse.",
    "high": "Elevate your laptop on a stand to eye level and connect an external keyboard and mouse for daily work.",
    "critical": "Stop using the laptop as a standalone device for prolonged work immediately. You must deploy a laptop stand, external keyboard, and external mouse to prevent severe neck and wrist injuries."
  }
}
```

---

## 6. Work Posture

A neutral body posture minimizes muscular effort and reduces mechanical load on joints and spinal discs.

### Risk Factors
- Slouching or leaning forward away from the backrest.
- Head protruding forward past the shoulders (forward head posture).
- Shoulders raised or tense due to improper desk height or stress.
- Twisting the torso to view screens or documents.

### Scoring Logic
- **Back Alignment**: Fully supported and upright (Score: 0); Occasional slouching (Score: 2); Constant slouching or leaning forward (Score: 5).
- **Neck Alignment**: Neutral, ears aligned with shoulders (Score: 0); Frequent forward head posture (Score: 4).
- **Shoulder Tension**: Relaxed (Score: 0); Frequently raised or tense (Score: 3).

### Threshold Rules
- **0 - 1.25 (Low)**: Excellent neutral posture.
- **1.26 - 2.5 (Moderate)**: Occasional postural lapses requiring mindfulness.
- **2.51 - 3.75 (High)**: Significant postural deviations causing muscular fatigue.
- **3.76 - 5.0 (Critical)**: Sustained harmful postures leading to chronic pain.

### Recommended Corrective Actions
- **Low**: Maintain your excellent neutral posture and keep utilizing your chair's backrest.
- **Moderate**: Be mindful of your posture. Ensure you sit back in your chair and relax your shoulders periodically.
- **High**: Actively correct your forward head posture by bringing your screen closer and leaning back into your chair's lumbar support.
- **Critical**: Your current posture is causing severe strain. Immediately adjust your workstation to support an upright posture, keep your head aligned over your shoulders, and stop twisting your torso.

### JSON Logic Block
```json
{
  "category": "work_posture",
  "riskFactors": [
    "slouching",
    "forward_head_posture",
    "raised_shoulders",
    "torso_twisting"
  ],
  "scoringLogic": {
    "backAlignment": { "supported": 0, "occasional_slouch": 2, "constant_slouch": 5 },
    "neckAlignment": { "neutral": 0, "forward_head": 4 },
    "shoulderTension": { "relaxed": 0, "tense": 3 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Maintain your excellent neutral posture and keep utilizing your chair's backrest.",
    "moderate": "Be mindful of your posture. Ensure you sit back in your chair and relax your shoulders periodically.",
    "high": "Actively correct your forward head posture by bringing your screen closer and leaning back into your chair's lumbar support.",
    "critical": "Your current posture is causing severe strain. Immediately adjust your workstation to support an upright posture, keep your head aligned over your shoulders, and stop twisting your torso."
  }
}
```

---

## 7. Screen Time Exposure

Prolonged visual and physical engagement with digital screens contributes to visual fatigue and systemic sedentary risks.

### Risk Factors
- Prolonged continuous screen time without changing visual focus.
- High total daily screen time exceeding recommended occupational limits.
- Lack of adherence to the 20-20-20 visual rest rule.

### Scoring Logic
- **Continuous Screen Time**: Less than 1 hour (Score: 0); 1 to 2 hours (Score: 2); More than 2 hours without a break (Score: 5).
- **Total Daily Time**: Less than 4 hours (Score: 0); 4 to 7 hours (Score: 2); More than 7 hours (Score: 4).

### Threshold Rules
- **0 - 1.25 (Low)**: Healthy screen exposure management.
- **1.26 - 2.5 (Moderate)**: Moderate exposure requiring better pacing.
- **2.51 - 3.75 (High)**: High exposure increasing risk of visual and mental fatigue.
- **3.76 - 5.0 (Critical)**: Excessive exposure requiring immediate intervention.

### Recommended Corrective Actions
- **Low**: Continue your current healthy screen habits and varied work tasks.
- **Moderate**: Implement the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.
- **High**: Break up your continuous screen time. Schedule non-screen tasks to interrupt long blocks of computer work.
- **Critical**: Your screen time is dangerously continuous. You must mandate 5-10 minute visual and physical breaks away from the screen every hour to prevent severe eye strain and fatigue.

### JSON Logic Block
```json
{
  "category": "screen_time_exposure",
  "riskFactors": [
    "prolonged_continuous_use",
    "high_total_daily_use",
    "no_visual_rest"
  ],
  "scoringLogic": {
    "continuousTime": { "under_1_hr": 0, "1_to_2_hrs": 2, "over_2_hrs": 5 },
    "totalDailyTime": { "under_4_hrs": 0, "4_to_7_hrs": 2, "over_7_hrs": 4 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Continue your current healthy screen habits and varied work tasks.",
    "moderate": "Implement the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
    "high": "Break up your continuous screen time. Schedule non-screen tasks to interrupt long blocks of computer work.",
    "critical": "Your screen time is dangerously continuous. You must mandate 5-10 minute visual and physical breaks away from the screen every hour to prevent severe eye strain and fatigue."
  }
}
```

---

## 8. Break Frequency

Movement is essential for musculoskeletal health; static postures degrade tissue health and reduce circulation.

### Risk Factors
- Infrequent micro-breaks during intensive tasks.
- Lack of postural changes (e.g., transitioning between sitting and standing).
- Remaining in an essentially fixed posture for extended periods.

### Scoring Logic
- **Break Frequency**: Every 30-45 minutes (Score: 0); Every 1-2 hours (Score: 2); More than 2 hours (Score: 5).
- **Postural Changes**: Frequent transitions or stretching (Score: 0); Rare movement (Score: 4).

### Threshold Rules
- **0 - 1.25 (Low)**: Excellent movement habits.
- **1.26 - 2.5 (Moderate)**: Could benefit from more frequent micro-breaks.
- **2.51 - 3.75 (High)**: High risk of stiffness and circulatory issues.
- **3.76 - 5.0 (Critical)**: Severe sedentary risk requiring immediate behavioral change.

### Recommended Corrective Actions
- **Low**: Maintain your excellent habit of taking frequent breaks and changing postures.
- **Moderate**: Set a gentle reminder to stand up and stretch briefly every hour.
- **High**: Actively integrate movement into your day. Stand up during phone calls or walk to speak with colleagues instead of messaging.
- **Critical**: Your lack of movement poses a serious health risk. You must enforce a strict routine of standing, stretching, and walking for at least 5 minutes every single hour.

### JSON Logic Block
```json
{
  "category": "break_frequency",
  "riskFactors": [
    "infrequent_breaks",
    "lack_of_postural_changes",
    "static_posture"
  ],
  "scoringLogic": {
    "breakFrequency": { "every_30_45_mins": 0, "every_1_to_2_hrs": 2, "over_2_hrs": 5 },
    "posturalChanges": { "frequent": 0, "rare": 4 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Maintain your excellent habit of taking frequent breaks and changing postures.",
    "moderate": "Set a gentle reminder to stand up and stretch briefly every hour.",
    "high": "Actively integrate movement into your day. Stand up during phone calls or walk to speak with colleagues instead of messaging.",
    "critical": "Your lack of movement poses a serious health risk. You must enforce a strict routine of standing, stretching, and walking for at least 5 minutes every single hour."
  }
}
```

---

## 9. Lighting and Glare

Proper environmental lighting prevents visual fatigue, headaches, and awkward postures adopted to avoid screen glare.

### Risk Factors
- Direct glare on the screen from unshielded windows or overhead lights.
- Inadequate general lighting causing squinting.
- High contrast between the bright screen and a dark surrounding environment.

### Scoring Logic
- **Glare Presence**: None (Score: 0); Occasional or minor (Score: 2); Constant and disruptive (Score: 5).
- **Lighting Adequacy**: Well-lit and comfortable (Score: 0); Too dim or excessively bright (Score: 3).
- **Contrast**: Balanced (Score: 0); High contrast/dark room (Score: 3).

### Threshold Rules
- **0 - 1.25 (Low)**: Excellent visual environment.
- **1.26 - 2.5 (Moderate)**: Minor lighting adjustments needed.
- **2.51 - 3.75 (High)**: Significant risk of visual discomfort and headaches.
- **3.76 - 5.0 (Critical)**: Unacceptable lighting conditions causing severe eye strain.

### Recommended Corrective Actions
- **Low**: Your lighting environment is optimal; continue to keep the screen free of glare.
- **Moderate**: Adjust window blinds or reposition your screen slightly to eliminate minor reflections.
- **High**: Position your monitor at a right angle to windows. Ensure your room is adequately lit to reduce the contrast between the screen and the background.
- **Critical**: Immediate action required to stop severe eye strain. Reposition your desk away from direct light sources, close blinds, and use ambient task lighting to balance screen brightness.

### JSON Logic Block
```json
{
  "category": "lighting_and_glare",
  "riskFactors": [
    "screen_glare",
    "inadequate_lighting",
    "high_contrast"
  ],
  "scoringLogic": {
    "glarePresence": { "none": 0, "occasional": 2, "constant": 5 },
    "lightingAdequacy": { "well_lit": 0, "too_dim_or_bright": 3 },
    "contrast": { "balanced": 0, "high_contrast": 3 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Your lighting environment is optimal; continue to keep the screen free of glare.",
    "moderate": "Adjust window blinds or reposition your screen slightly to eliminate minor reflections.",
    "high": "Position your monitor at a right angle to windows. Ensure your room is adequately lit to reduce the contrast between the screen and the background.",
    "critical": "Immediate action required to stop severe eye strain. Reposition your desk away from direct light sources, close blinds, and use ambient task lighting to balance screen brightness."
  }
}
```

---

## 10. Workstation Space and Layout

An organized workspace ensures that frequently used items are within the primary reach zone, preventing repetitive overreaching and twisting.

### Risk Factors
- Cluttered desk surface restricting necessary movement.
- Frequently used items (e.g., phone, notebook) placed out of comfortable arm's reach.
- Inadequate space to operate the mouse smoothly.

### Scoring Logic
- **Reachability**: Primary items within easy reach (Score: 0); Frequent stretching required (Score: 4).
- **Clutter**: Clear and organized (Score: 0); Restricted movement due to clutter (Score: 3).

### Threshold Rules
- **0 - 1.25 (Low)**: Efficient and safe workspace layout.
- **1.26 - 2.5 (Moderate)**: Minor reorganization needed.
- **2.51 - 3.75 (High)**: High risk of shoulder/back strain from overreaching.
- **3.76 - 5.0 (Critical)**: Highly restrictive workspace forcing continuous awkward postures.

### Recommended Corrective Actions
- **Low**: Your workspace layout is highly efficient; maintain this clear organization.
- **Moderate**: Reorganize your desk slightly to bring your phone or primary documents closer to you.
- **High**: Clear unnecessary clutter from your desk. Ensure your keyboard, mouse, and frequently used items are located within your primary, comfortable reach zone.
- **Critical**: Your workspace layout is causing repetitive strain. Immediately clear the desk of obstructions and position all essential tools directly in front of you within a bent-arm's reach.

### JSON Logic Block
```json
{
  "category": "workstation_space_layout",
  "riskFactors": [
    "cluttered_desk",
    "items_out_of_reach",
    "inadequate_mouse_space"
  ],
  "scoringLogic": {
    "reachability": { "easy_reach": 0, "frequent_stretching": 4 },
    "clutter": { "clear": 0, "restricted_movement": 3 }
  },
  "thresholds": {
    "low": { "min": 0, "max": 1.25 },
    "moderate": { "min": 1.26, "max": 2.5 },
    "high": { "min": 2.51, "max": 3.75 },
    "critical": { "min": 3.76, "max": 5.0 }
  },
  "recommendations": {
    "low": "Your workspace layout is highly efficient; maintain this clear organization.",
    "moderate": "Reorganize your desk slightly to bring your phone or primary documents closer to you.",
    "high": "Clear unnecessary clutter from your desk. Ensure your keyboard, mouse, and frequently used items are located within your primary, comfortable reach zone.",
    "critical": "Your workspace layout is causing repetitive strain. Immediately clear the desk of obstructions and position all essential tools directly in front of you within a bent-arm's reach."
  }
}
```

---
