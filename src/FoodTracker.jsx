import { useState, useEffect, useRef } from "react";

// ── FOOD DATABASE ─────────────────────────────────────────────────────
const FOOD_DB = {
  proteins: [
    { name: "Boiled Chicken Skinless Breast", unit: "100 gms", cal: 155 },
    { name: "Boiled Chicken Skinless Thigh", unit: "100 gms", cal: 195 },
    { name: "Boiled Lean Beef", unit: "100 gms", cal: 150 },
    { name: "Chicken Liver", unit: "100 gms", cal: 180 },
    { name: "Egg White", unit: "piece", cal: 17 },
    { name: "Grilled Bolty", unit: "100 gms", cal: 140 },
    { name: "Grilled Bory", unit: "100 gms", cal: 150 },
    { name: "Grilled Calamari", unit: "100 gms", cal: 140 },
    { name: "Grilled Chicken Skinless Breast", unit: "100 gms", cal: 170 },
    { name: "Grilled Chicken Skinless Thigh", unit: "100 gms", cal: 210 },
    { name: "Grilled Crab", unit: "100 gms", cal: 100 },
    { name: "Grilled Denes", unit: "100 gms", cal: 90 },
    { name: "Grilled Dove Hamam", unit: "100 gms", cal: 220 },
    { name: "Grilled Fillet Keshr Bayad", unit: "100 gms", cal: 100 },
    { name: "Grilled Lean Beef or Steak", unit: "100 gms", cal: 190 },
    { name: "Grilled Mackrel", unit: "100 gms", cal: 270 },
    { name: "Grilled Meat Liver", unit: "100 gms", cal: 200 },
    { name: "Grilled Minced Beef or Kofta", unit: "100 gms", cal: 280 },
    { name: "Grilled Moussa", unit: "100 gms", cal: 100 },
    { name: "Grilled Rabbit", unit: "100 gms", cal: 190 },
    { name: "Grilled Salmon", unit: "100 gms", cal: 170 },
    { name: "Grilled Shrimps", unit: "100 gms", cal: 100 },
    { name: "Grilled Skinless Duck", unit: "100 gms", cal: 205 },
    { name: "Grilled Turkey Skinless Breast", unit: "100 gms", cal: 150 },
    { name: "Grilled Turkey Skinless Thigh", unit: "100 gms", cal: 170 },
    { name: "Grilled Wakar", unit: "100 gms", cal: 100 },
    { name: "Sardines", unit: "100 gms", cal: 220 },
    { name: "Water Canned Light Tuna", unit: "can", cal: 200 },
  ],
  carbs: [
    { name: "Air Fried Fresh Potatoes", unit: "100 gms", cal: 130 },
    { name: "Air Popped Corn", unit: "100 gms", cal: 390 },
    { name: "Apple", unit: "100 gms", cal: 60 },
    { name: "Apricot", unit: "100 gms", cal: 50 },
    { name: "Aresh Cheese", unit: "100 gms", cal: 110 },
    { name: "Arsya", unit: "100 gms", cal: 250 },
    { name: "Artichoke", unit: "100 gms", cal: 50 },
    { name: "Balady Bread", unit: "100 gms", cal: 300 },
    { name: "Banana", unit: "100 gms", cal: 95 },
    { name: "BBQ Sauce (12g)", unit: "teaspoon", cal: 25 },
    { name: "Beets", unit: "100 gms", cal: 60 },
    { name: "Berries", unit: "100 gms", cal: 60 },
    { name: "Boiled Basmati Rice", unit: "100 gms", cal: 130 },
    { name: "Boiled Beans Fool", unit: "100 gms", cal: 120 },
    { name: "Boiled Cauliflower", unit: "100 gms", cal: 35 },
    { name: "Boiled Chickpeas", unit: "100 gms", cal: 180 },
    { name: "Boiled Freek", unit: "100 gms", cal: 130 },
    { name: "Boiled Green Peas", unit: "100 gms", cal: 90 },
    { name: "Boiled Lupine", unit: "100 gms", cal: 120 },
    { name: "Boiled Oat Pasta", unit: "100 gms", cal: 160 },
    { name: "Boiled Pasta", unit: "100 gms", cal: 160 },
    { name: "Boiled Potato", unit: "100 gms", cal: 100 },
    { name: "Boiled Red Kidney Beans", unit: "100 gms", cal: 130 },
    { name: "Boiled Rice", unit: "100 gms", cal: 130 },
    { name: "Boiled Taro", unit: "100 gms", cal: 150 },
    { name: "Breadstick", unit: "100 gms", cal: 420 },
    { name: "Broccoli", unit: "100 gms", cal: 35 },
    { name: "Cabbage", unit: "100 gms", cal: 30 },
    { name: "Cantaloupe", unit: "100 gms", cal: 50 },
    { name: "Carrot", unit: "100 gms", cal: 45 },
    { name: "Cherries", unit: "100 gms", cal: 60 },
    { name: "Chia Seeds", unit: "100 gms", cal: 500 },
    { name: "Coloured Pepper", unit: "100 gms", cal: 35 },
    { name: "Custard Apple Fruit", unit: "100 gms", cal: 100 },
    { name: "Dark Chocolate (70%+)", unit: "100 gms", cal: 580 },
    { name: "Date", unit: "100 gms", cal: 300 },
    { name: "Edamame", unit: "100 gms", cal: 130 },
    { name: "Eggplant", unit: "100 gms", cal: 40 },
    { name: "Fresh Orange Juice", unit: "100 ml", cal: 55 },
    { name: "Full Cream Milk", unit: "100 ml", cal: 70 },
    { name: "Full Cream Yogurt (105g)", unit: "small cup", cal: 70 },
    { name: "Garlic Clove", unit: "piece", cal: 5 },
    { name: "Grapefruit", unit: "100 gms", cal: 45 },
    { name: "Grapes", unit: "100 gms", cal: 70 },
    { name: "Guava", unit: "100 gms", cal: 70 },
    { name: "Half Cream Milk", unit: "100 ml", cal: 55 },
    { name: "Harankash", unit: "100 gms", cal: 60 },
    { name: "Honey (8g)", unit: "teaspoon", cal: 30 },
    { name: "Jam Light", unit: "100 gms", cal: 250 },
    { name: "Ketchup (12g)", unit: "teaspoon", cal: 15 },
    { name: "Kiwi", unit: "100 gms", cal: 65 },
    { name: "Lemon", unit: "piece", cal: 17 },
    { name: "Light Greek Yogurt (105g)", unit: "small cup", cal: 55 },
    { name: "Light Labneh", unit: "100 gms", cal: 180 },
    { name: "Light White Cheese", unit: "100 gms", cal: 180 },
    { name: "Light Yogurt (105g)", unit: "small cup", cal: 50 },
    { name: "Light Yogurt (180g)", unit: "piece", cal: 90 },
    { name: "Mango", unit: "100 gms", cal: 80 },
    { name: "Meshmesheya", unit: "100 gms", cal: 250 },
    { name: "Molasses (8g)", unit: "teaspoon", cal: 25 },
    { name: "Mushrooms", unit: "100 gms", cal: 40 },
    { name: "Mustard (10g)", unit: "teaspoon", cal: 10 },
    { name: "Onions", unit: "100 gms", cal: 40 },
    { name: "Orange", unit: "100 gms", cal: 50 },
    { name: "Peach", unit: "100 gms", cal: 40 },
    { name: "Pear", unit: "100 gms", cal: 60 },
    { name: "Persimmon (Kaki)", unit: "100 gms", cal: 130 },
    { name: "Pineapple", unit: "100 gms", cal: 60 },
    { name: "Plum", unit: "100 gms", cal: 60 },
    { name: "Pomegranates", unit: "100 gms", cal: 85 },
    { name: "Pomegranates Molasses", unit: "teaspoon", cal: 25 },
    { name: "Pumpkin", unit: "100 gms", cal: 30 },
    { name: "Raisins", unit: "100 gms", cal: 300 },
    { name: "Raw Belila", unit: "100 gms", cal: 380 },
    { name: "Raw Cocoa", unit: "100 gms", cal: 300 },
    { name: "Raw Lentils", unit: "100 gms", cal: 360 },
    { name: "Raw Oats", unit: "100 gms", cal: 380 },
    { name: "Raw Quinoa", unit: "100 gms", cal: 387 },
    { name: "Skimmed Milk", unit: "100 ml", cal: 35 },
    { name: "Strawberry", unit: "100 gms", cal: 40 },
    { name: "Sugar (4g)", unit: "teaspoon", cal: 17 },
    { name: "Sweet Corn", unit: "100 gms", cal: 90 },
    { name: "Sweet Potato", unit: "100 gms", cal: 90 },
    { name: "Tangerine", unit: "100 gms", cal: 65 },
    { name: "Teen Barshomy", unit: "piece", cal: 70 },
    { name: "Teen Shoky", unit: "piece", cal: 45 },
    { name: "Tomato", unit: "100 gms", cal: 20 },
    { name: "Watermelon", unit: "100 gms", cal: 35 },
    { name: "White Beans", unit: "100 gms", cal: 150 },
    { name: "Whole Wheat Brown Toast", unit: "piece", cal: 75 },
    { name: "Whole Wheat Flour", unit: "100 gms", cal: 400 },
    { name: "Whole Wheat Tortilla", unit: "100 gms", cal: 300 },
  ],
  fats: [
    { name: "Avocado (MUFA)", unit: "100 gms", cal: 180 },
    { name: "Blue Cheese", unit: "100 gms", cal: 380 },
    { name: "Brie Cheese", unit: "100 gms", cal: 350 },
    { name: "Butter", unit: "100 gms", cal: 900 },
    { name: "Cheddar Cheese", unit: "100 gms", cal: 400 },
    { name: "Coconut", unit: "100 gms", cal: 370 },
    { name: "Coconut Milk", unit: "100 ml", cal: 140 },
    { name: "Corn Oil", unit: "teaspoon", cal: 45 },
    { name: "Edam Cheese", unit: "100 gms", cal: 370 },
    { name: "Egg Yolk", unit: "piece", cal: 70 },
    { name: "Emmental Cheese", unit: "100 gms", cal: 380 },
    { name: "Flaxseed Oil", unit: "teaspoon", cal: 45 },
    { name: "Gouda Cheese", unit: "100 gms", cal: 380 },
    { name: "Halloumi Cheese", unit: "100 gms", cal: 410 },
    { name: "Mayonnaise Light (10g)", unit: "teaspoon", cal: 35 },
    { name: "Mozzarella Cheese", unit: "100 gms", cal: 300 },
    { name: "Olive Oil (MUFA)", unit: "teaspoon", cal: 45 },
    { name: "Olives (MUFA)", unit: "piece", cal: 6 },
    { name: "Parmesan Cheese", unit: "100 gms", cal: 450 },
    { name: "Pumpkin Seeds", unit: "100 gms", cal: 500 },
    { name: "Raw Almonds (MUFA)", unit: "100 gms", cal: 580 },
    { name: "Raw Cashew (MUFA)", unit: "100 gms", cal: 550 },
    { name: "Raw Hazelnuts (MUFA)", unit: "100 gms", cal: 750 },
    { name: "Raw Peanut Butter (MUFA)", unit: "100 gms", cal: 600 },
    { name: "Raw Peanuts (MUFA)", unit: "100 gms", cal: 580 },
    { name: "Raw Pecan (MUFA)", unit: "100 gms", cal: 700 },
    { name: "Raw Pistachio", unit: "100 gms", cal: 560 },
    { name: "Raw Walnuts", unit: "100 gms", cal: 660 },
    { name: "Romy Cheese", unit: "100 gms", cal: 410 },
    { name: "Roquefort Cheese", unit: "100 gms", cal: 369 },
    { name: "Sunflower Oil", unit: "teaspoon", cal: 45 },
    { name: "Sunflower Seeds", unit: "100 gms", cal: 584 },
    { name: "Tahini (5g)", unit: "teaspoon", cal: 89 },
  ],
};

const todayKey = () => new Date().toISOString().split("T")[0];

const defaultProfile = {
  name: "", email: "", useEmail: false,
  calGoal: 2000, proteinGoal: 150, carbsGoal: 250, fatsGoal: 65,
  waterGoal: 8, sleepGoal: 8, weight: "", weightUnit: "kg",
  reminderInterval: 60, reminderStart: 7, reminderEnd: 22,
};

async function callAI(prompt) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    return data.content?.map((b) => b.text || "").join("") || "No response.";
  } catch {
    return "AI analysis unavailable right now.";
  }
}

// ── COLORS ────────────────────────────────────────────────────────────
const C = {
  bg: "#0a0a0a", card: "#161616", border: "#252525",
  green: "#6abe30", greenDark: "#4d8f22", greenGlow: "rgba(106,190,48,0.15)",
  text: "#ffffff", muted: "#888", accent: "#ff6b35", blue: "#3b9eff",
  red: "#ff4444", yellow: "#ffd166",
};

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body { background: ${C.bg}; }
  input, select, textarea { outline: none; }
  ::-webkit-scrollbar { display: none; }
  @keyframes slideUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:translateY(0);} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes dropIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  .slide-up { animation: slideUp 0.4s ease forwards; }
  .drop-in { animation: dropIn 0.3s ease forwards; }
`;

// ── COMPONENTS ────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = C.green }) {
  const pct = Math.min((value / max) * 100, 100);
  const over = value > max;
  return (
    <div style={{ background: "#1e1e1e", borderRadius: 99, height: 10, overflow: "hidden", marginBottom: 4 }}>
      <div style={{
        height: "100%", borderRadius: 99, width: `${pct}%`,
        background: over ? `linear-gradient(90deg,${C.red},#ff8888)` : `linear-gradient(90deg,${color},${color}cc)`,
        transition: "width 0.5s ease",
        boxShadow: over ? `0 0 8px ${C.red}66` : `0 0 8px ${color}66`,
      }} />
    </div>
  );
}

function MacroCard({ label, current, goal, color, unit = "cal" }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, padding: "14px 16px", border: `1px solid ${C.border}`, flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: C.muted, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
        <span style={{ color, fontSize: 12, fontWeight: 700 }}>{current}/{goal}</span>
      </div>
      <ProgressBar value={current} max={goal} color={color} />
      <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>{unit}</div>
    </div>
  );
}

function Btn({ children, onClick, color = C.green, style = {}, small = false }) {
  return (
    <button onClick={onClick} style={{
      background: `linear-gradient(135deg,${color},${color}cc)`,
      color: "#fff", border: "none", borderRadius: small ? 10 : 14,
      padding: small ? "8px 14px" : "14px 20px",
      fontSize: small ? 13 : 15, fontWeight: 700, cursor: "pointer",
      boxShadow: `0 4px 15px ${color}44`, transition: "all 0.2s",
      fontFamily: "inherit", ...style,
    }}>{children}</button>
  );
}

function Input({ label, value, onChange, type = "text", placeholder = "", style = {} }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "12px 14px", color: C.text,
          fontSize: 15, fontFamily: "inherit", ...style,
        }}
      />
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [p, setP] = useState(defaultProfile);
  const set = (k, v) => setP(prev => ({ ...prev, [k]: v }));

  const steps = [
    // Step 0 – Welcome
    <div key={0} className="slide-up" style={{ padding: 30, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>🥗</div>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: C.green, marginBottom: 10, textAlign: "center" }}>Calories Calculator</h1>
      <p style={{ color: C.muted, textAlign: "center", lineHeight: 1.6, marginBottom: 40 }}>Your personal nutrition & health tracker. Let's set up your profile.</p>
      <Btn onClick={() => setStep(1)} style={{ width: "100%", padding: 18, fontSize: 17 }}>Get Started 🚀</Btn>
      <button onClick={() => onDone(defaultProfile)} style={{ background: "none", border: "none", color: C.muted, marginTop: 16, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Continue as Guest</button>
    </div>,

    // Step 1 – Login
    <div key={1} className="slide-up" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Sign In</h2>
      <p style={{ color: C.muted, marginBottom: 28, fontSize: 14 }}>Optional — save your data with email</p>
      <Input label="Your Name" value={p.name} onChange={v => set("name", v)} placeholder="e.g. Ahmed" />
      <Input label="Email (optional)" value={p.email} onChange={v => set("email", v)} type="email" placeholder="you@example.com" />
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <Btn onClick={() => setStep(2)} style={{ flex: 1 }}>{p.email ? "Continue with Email" : "Continue"}</Btn>
      </div>
      <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: C.muted, marginTop: 14, fontSize: 13, cursor: "pointer", display: "block", width: "100%", textAlign: "center", fontFamily: "inherit" }}>Skip →</button>
    </div>,

    // Step 2 – Goals
    <div key={2} className="slide-up" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Daily Goals</h2>
      <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>Set your nutrition targets</p>
      <Input label="Daily Calorie Goal (kcal)" value={p.calGoal} onChange={v => set("calGoal", +v)} type="number" placeholder="2000" />
      <Input label="Protein Goal (g)" value={p.proteinGoal} onChange={v => set("proteinGoal", +v)} type="number" placeholder="150" />
      <Input label="Carbs Goal (g)" value={p.carbsGoal} onChange={v => set("carbsGoal", +v)} type="number" placeholder="250" />
      <Input label="Fats Goal (g)" value={p.fatsGoal} onChange={v => set("fatsGoal", +v)} type="number" placeholder="65" />
      <Btn onClick={() => setStep(3)} style={{ width: "100%", marginTop: 8 }}>Next →</Btn>
    </div>,

    // Step 3 – Body & Water
    <div key={3} className="slide-up" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Body & Hydration</h2>
      <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>Track your weight and water intake</p>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 2 }}>
          <Input label="Current Weight" value={p.weight} onChange={v => set("weight", v)} type="number" placeholder="70" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Unit</div>
          <select value={p.weightUnit} onChange={e => set("weightUnit", e.target.value)}
            style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 10px", color: C.text, fontSize: 15, fontFamily: "inherit" }}>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
        </div>
      </div>
      <Input label="Daily Water Goal (bottles 600ml)" value={p.waterGoal} onChange={v => set("waterGoal", +v)} type="number" placeholder="8" />
      <Input label="Sleep Goal (hours)" value={p.sleepGoal} onChange={v => set("sleepGoal", +v)} type="number" placeholder="8" />
      <Btn onClick={() => setStep(4)} style={{ width: "100%", marginTop: 8 }}>Next →</Btn>
    </div>,

    // Step 4 – Reminders
    <div key={4} className="slide-up" style={{ padding: 24 }}>
      <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Water Reminders 💧</h2>
      <p style={{ color: C.muted, marginBottom: 24, fontSize: 14 }}>We'll remind you to drink water</p>
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Remind me every</div>
        <select value={p.reminderInterval} onChange={e => set("reminderInterval", +e.target.value)}
          style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", color: C.text, fontSize: 15, fontFamily: "inherit" }}>
          <option value={30}>Every 30 minutes</option>
          <option value={60}>Every 1 hour</option>
          <option value={90}>Every 90 minutes</option>
          <option value={120}>Every 2 hours</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>Start Time</div>
          <select value={p.reminderStart} onChange={e => set("reminderStart", +e.target.value)}
            style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 10px", color: C.text, fontSize: 14, fontFamily: "inherit" }}>
            {[6,7,8,9,10].map(h => <option key={h} value={h}>{h}:00 AM</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>End Time</div>
          <select value={p.reminderEnd} onChange={e => set("reminderEnd", +e.target.value)}
            style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 10px", color: C.text, fontSize: 14, fontFamily: "inherit" }}>
            {[20,21,22,23].map(h => <option key={h} value={h}>{h > 12 ? h-12 : h}:00 {h >= 12 ? "PM" : "AM"}</option>)}
          </select>
        </div>
      </div>
      <Btn onClick={() => onDone(p)} style={{ width: "100%", padding: 18, fontSize: 17 }}>Start Tracking! 🎉</Btn>
    </div>,
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'SF Pro Display',-apple-system,sans-serif" }}>
      <style>{css}</style>
      {step > 0 && (
        <div style={{ padding: "52px 24px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setStep(s => s - 1)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px", color: C.text, cursor: "pointer", fontFamily: "inherit" }}>← Back</button>
          <div style={{ display: "flex", gap: 6, flex: 1, justifyContent: "center" }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: 4, flex: 1, borderRadius: 99, background: i <= step ? C.green : C.border, transition: "background 0.3s" }} />
            ))}
          </div>
        </div>
      )}
      {steps[step]}
    </div>
  );
}

// ── FOOD LOG SECTION ──────────────────────────────────────────────────
function MacroSection({ macro, label, color, items, onAdd, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [qty, setQty] = useState("");
  const [mealName, setMealName] = useState("");
  const [search, setSearch] = useState("");

  const foods = FOOD_DB[macro] || [];
  const filtered = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const totalCal = items.reduce((s, i) => s + i.cal, 0);

  const calcCal = () => {
    if (!selectedFood || !qty) return 0;
    if (selectedFood.unit === "piece" || selectedFood.unit === "can" || selectedFood.unit === "teaspoon" || selectedFood.unit.includes("cup")) {
      return Math.round(selectedFood.cal * qty);
    }
    return Math.round((selectedFood.cal / 100) * qty);
  };

  const handleAdd = () => {
    if (!selectedFood || !qty) return;
    onAdd({ name: selectedFood.name, qty, unit: selectedFood.unit, cal: calcCal(), meal: mealName || "General" });
    setSelectedFood(null); setQty(""); setMealName(""); setSearch(""); setShowForm(false);
  };

  return (
    <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.border}`, marginBottom: 16, overflow: "hidden" }}>
      <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color }}>{label}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color }}>{totalCal} cal</span>
        </div>
      </div>

      {items.length > 0 && (
        <div style={{ padding: "8px 16px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{item.qty} {item.unit} · {item.meal}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color, fontWeight: 700, fontSize: 14 }}>{item.cal}</span>
                <button onClick={() => onDelete(i)} style={{ background: "#ff444422", border: "none", borderRadius: 8, padding: "4px 8px", color: C.red, cursor: "pointer", fontSize: 16 }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "12px 16px" }}>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} style={{ width: "100%", background: `${color}22`, border: `1px dashed ${color}66`, borderRadius: 12, padding: "12px", color, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
            + Add {label}
          </button>
        ) : (
          <div className="drop-in">
            <Input label="Search food" value={search} onChange={setSearch} placeholder={`Search ${label}...`} />
            {search && (
              <div style={{ background: "#1a1a1a", borderRadius: 12, border: `1px solid ${C.border}`, maxHeight: 180, overflowY: "auto", marginBottom: 12 }}>
                {filtered.slice(0, 20).map((f, i) => (
                  <div key={i} onClick={() => { setSelectedFood(f); setSearch(f.name); }} style={{
                    padding: "10px 14px", cursor: "pointer", borderBottom: `1px solid ${C.border}`,
                    background: selectedFood?.name === f.name ? `${color}22` : "transparent",
                    transition: "background 0.2s",
                  }}>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{f.unit} · {f.cal} cal</div>
                  </div>
                ))}
                {filtered.length === 0 && <div style={{ padding: 14, color: C.muted, fontSize: 13 }}>No results</div>}
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <Input label={`Qty (${selectedFood?.unit || "unit"})`} value={qty} onChange={setQty} type="number" placeholder="100" />
              </div>
              <div style={{ flex: 1 }}>
                <Input label="Meal name" value={mealName} onChange={setMealName} placeholder="Lunch" />
              </div>
            </div>
            {selectedFood && qty && (
              <div style={{ background: `${color}15`, borderRadius: 10, padding: "10px 14px", marginBottom: 12, textAlign: "center" }}>
                <span style={{ color, fontWeight: 800, fontSize: 18 }}>{calcCal()} cal</span>
                <span style={{ color: C.muted, fontSize: 12, marginLeft: 6 }}>estimated</span>
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={handleAdd} color={color} style={{ flex: 1 }}>Add ✓</Btn>
              <Btn onClick={() => { setShowForm(false); setSearch(""); setSelectedFood(null); }} color="#333" style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── DIARY SCREEN ──────────────────────────────────────────────────────
function DiaryScreen({ profile, log, setLog }) {
  const [dateOffset, setDateOffset] = useState(0);
  const getDate = (offset) => {
    const d = new Date(); d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  };
  const dateStr = getDate(dateOffset);
  const dayLog = log[dateStr] || { proteins: [], carbs: [], fats: [] };

  const updateLog = (macro, items) => {
    setLog(prev => ({ ...prev, [dateStr]: { ...prev[dateStr] || { proteins: [], carbs: [], fats: [] }, [macro]: items } }));
  };

  const totalCal = [...dayLog.proteins, ...dayLog.carbs, ...dayLog.fats].reduce((s, i) => s + i.cal, 0);

  const displayDate = () => {
    if (dateOffset === 0) return "Today";
    if (dateOffset === -1) return "Yesterday";
    const d = new Date(); d.setDate(d.getDate() + dateOffset);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  };

  return (
    <div style={{ padding: "52px 16px 100px" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: C.green }}>Calories Calculator</h1>
        <p style={{ color: C.muted, fontSize: 14 }}>{profile.name ? `Hello, ${profile.name} 👋` : "Track your nutrition"}</p>
      </div>

      {/* Date Nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
        <button onClick={() => setDateOffset(o => o - 1)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, cursor: "pointer", fontSize: 16 }}>‹</button>
        <div style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{displayDate()}</div>
          <div style={{ color: C.muted, fontSize: 12 }}>{dateStr}</div>
        </div>
        <button onClick={() => setDateOffset(o => Math.min(0, o + 1))} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: dateOffset === 0 ? C.border : C.text, cursor: "pointer", fontSize: 16 }}>›</button>
      </div>

      {/* Total Calories */}
      <div style={{ background: `linear-gradient(135deg,${C.greenDark},${C.green})`, borderRadius: 20, padding: "20px", marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Total Calories</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>{totalCal}</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Goal: {profile.calGoal} kcal</div>
        <ProgressBar value={totalCal} max={profile.calGoal} color="#fff" />
      </div>

      {/* Macro Sections */}
      <MacroSection macro="proteins" label="Proteins" color={C.blue}
        items={dayLog.proteins}
        onAdd={item => updateLog("proteins", [...(dayLog.proteins || []), item])}
        onDelete={i => updateLog("proteins", dayLog.proteins.filter((_, idx) => idx !== i))} />
      <MacroSection macro="carbs" label="Carbs" color={C.green}
        items={dayLog.carbs}
        onAdd={item => updateLog("carbs", [...(dayLog.carbs || []), item])}
        onDelete={i => updateLog("carbs", dayLog.carbs.filter((_, idx) => idx !== i))} />
      <MacroSection macro="fats" label="Fats" color={C.yellow}
        items={dayLog.fats}
        onAdd={item => updateLog("fats", [...(dayLog.fats || []), item])}
        onDelete={i => updateLog("fats", dayLog.fats.filter((_, idx) => idx !== i))} />
    </div>
  );
}

// ── HOME SCREEN ───────────────────────────────────────────────────────
function HomeScreen({ profile, log, water, setWater, sleep, setSleep }) {
  const dateStr = todayKey();
  const dayLog = log[dateStr] || { proteins: [], carbs: [], fats: [] };
  const totalCal = [...(dayLog.proteins||[]), ...(dayLog.carbs||[]), ...(dayLog.fats||[])].reduce((s, i) => s + i.cal, 0);
  const totalProt = (dayLog.proteins||[]).reduce((s,i)=>s+i.cal,0);
  const totalCarb = (dayLog.carbs||[]).reduce((s,i)=>s+i.cal,0);
  const totalFat = (dayLog.fats||[]).reduce((s,i)=>s+i.cal,0);
  const todayWater = water[dateStr] || 0;
  const todaySleep = sleep[dateStr] || { hours: 0, status: "" };

  const sleepEmoji = todaySleep.hours >= (profile.sleepGoal || 8) ? "😍" : todaySleep.hours >= 6 ? "😊" : "😴";
  const sleepMsg = todaySleep.hours >= (profile.sleepGoal || 8) ? "Great sleeping, keep it up!" : todaySleep.hours >= 6 ? "Almost there!" : "Set your sleep time";

  return (
    <div style={{ padding: "52px 16px 100px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: C.green }}>Home</h1>
        <p style={{ color: C.muted, fontSize: 14 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
      </div>

      {/* Sleep Card */}
      <div style={{ background: C.card, borderRadius: 20, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Sleep time status</div>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{sleepEmoji}</div>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 14 }}>{sleepMsg}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.text }}>{String(todaySleep.hours).padStart(2,"0")}:00</div>
            <div style={{ color: C.muted, fontSize: 12 }}>hours slept</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {[5,6,7,8,9,10].map(h => (
            <button key={h} onClick={() => setSleep(prev => ({ ...prev, [dateStr]: { hours: h } }))}
              style={{ flex: 1, background: todaySleep.hours === h ? C.green : C.border, border: "none", borderRadius: 8, padding: "8px 0", color: todaySleep.hours === h ? "#fff" : C.muted, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{h}h</button>
          ))}
        </div>
      </div>

      {/* Today Summary */}
      <div style={{ background: C.card, borderRadius: 20, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Today's Nutrition</div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: C.green }}>{totalCal}</div>
          <div style={{ color: C.muted, fontSize: 13 }}>/ {profile.calGoal} kcal</div>
        </div>
        <ProgressBar value={totalCal} max={profile.calGoal} />
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <MacroCard label="Protein" current={totalProt} goal={profile.proteinGoal * 4} color={C.blue} />
          <MacroCard label="Carbs" current={totalCarb} goal={profile.carbsGoal * 4} color={C.green} />
          <MacroCard label="Fats" current={totalFat} goal={profile.fatsGoal * 9} color={C.yellow} />
        </div>
      </div>

      {/* Water */}
      <div style={{ background: C.card, borderRadius: 20, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>💧 Water</div>
          <div style={{ color: C.blue, fontWeight: 700 }}>{todayWater} / {profile.waterGoal} bottles</div>
        </div>
        <ProgressBar value={todayWater} max={profile.waterGoal} color={C.blue} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 14 }}>
          {Array.from({ length: profile.waterGoal }).map((_, i) => (
            <button key={i} onClick={() => setWater(prev => ({ ...prev, [dateStr]: i < todayWater ? i : i + 1 }))}
              style={{ aspectRatio: "1", background: i < todayWater ? "#1a3a5c" : "#1a1a1a", border: `2px solid ${i < todayWater ? C.blue : C.border}`, borderRadius: 14, cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
              {i < todayWater ? "✅" : "💧"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SESSIONS / AI SCREEN ──────────────────────────────────────────────
function SessionsScreen({ profile, log, inbody, setInbody }) {
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);
  const [inbodyForm, setInbodyForm] = useState({ weight: "", bodyFat: "", muscleMass: "", bmi: "", visceralFat: "", bodyWater: "", date: todayKey() });
  const [showInbodyForm, setShowInbodyForm] = useState(false);
  const [inbodyAI, setInbodyAI] = useState("");
  const [inbodyLoading, setInbodyLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const analyzeNutrition = async () => {
    setLoading(true);
    const today = todayKey();
    const dayLog = log[today] || { proteins: [], carbs: [], fats: [] };
    const allFoods = [...(dayLog.proteins||[]).map(f=>f.name), ...(dayLog.carbs||[]).map(f=>f.name), ...(dayLog.fats||[]).map(f=>f.name)];
    const totalCal = [...(dayLog.proteins||[]), ...(dayLog.carbs||[]), ...(dayLog.fats||[])].reduce((s,i)=>s+i.cal,0);
    const prompt = `You are a nutrition coach. Analyze this person's food log:
Name: ${profile.name || "User"}
Goal: Eat healthier
Daily calorie goal: ${profile.calGoal} kcal
Today's total calories: ${totalCal} kcal
Foods eaten today: ${allFoods.join(", ") || "Nothing logged yet"}
Recent days logged: ${Object.keys(log).slice(-7).join(", ")}

Give a friendly, motivating analysis in 3-4 short paragraphs covering:
1. How today's intake looks vs their goal
2. Nutritional balance (protein/carbs/fats)
3. Specific recommendations for improvement
4. One encouraging message
Keep it conversational and practical.`;
    const result = await callAI(prompt);
    setAiText(result);
    setLoading(false);
  };

  const analyzeInbody = async (data) => {
    setInbodyLoading(true);
    const prompt = `You are a body composition expert. Analyze this InBody scan:
Weight: ${data.weight} kg
Body Fat: ${data.bodyFat}%
Muscle Mass: ${data.muscleMass} kg
BMI: ${data.bmi}
Visceral Fat: ${data.visceralFat}
Body Water: ${data.bodyWater}%
Date: ${data.date}
Person's goal: Eat healthier

Give a comprehensive analysis in 3-4 paragraphs covering:
1. Overall body composition assessment
2. Areas of concern or strength
3. Specific diet and exercise recommendations
4. Motivating next steps
Be specific, encouraging, and practical.`;
    const result = await callAI(prompt);
    setInbodyAI(result);
    setInbodyLoading(false);
  };

  const handleInbodySave = () => {
    setInbody(prev => [...prev, inbodyForm]);
    analyzeInbody(inbodyForm);
    setShowInbodyForm(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "52px 16px 100px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: C.green }}>AI Sessions</h1>
        <p style={{ color: C.muted, fontSize: 14 }}>Your personal nutrition coach</p>
      </div>

      {/* Nutrition AI */}
      <div style={{ background: C.card, borderRadius: 20, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>🤖 Nutrition Analysis</div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>AI analyzes your food log and gives personalized insights</div>
        <Btn onClick={analyzeNutrition} style={{ width: "100%" }} color={C.green}>
          {loading ? "Analyzing... ⏳" : "Analyze My Nutrition"}
        </Btn>
        {aiText && (
          <div style={{ marginTop: 16, background: "#0d1a0d", borderRadius: 14, padding: 16, border: `1px solid ${C.green}33` }}>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🤖 AI Coach Says:</div>
            <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiText}</div>
          </div>
        )}
      </div>

      {/* InBody Upload */}
      <div style={{ background: C.card, borderRadius: 20, padding: 20, border: `1px solid ${C.border}`, marginBottom: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>📊 InBody Analysis</div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>Upload or enter your InBody scan results</div>

        {/* Image Upload */}
        <label style={{ display: "block", background: "#1a1a1a", border: `2px dashed ${C.border}`, borderRadius: 14, padding: 20, textAlign: "center", cursor: "pointer", marginBottom: 14 }}>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
          {imgPreview ? (
            <img src={imgPreview} alt="InBody scan" style={{ maxWidth: "100%", borderRadius: 10, maxHeight: 200, objectFit: "contain" }} />
          ) : (
            <>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
              <div style={{ color: C.muted, fontSize: 14 }}>Tap to upload InBody scan photo</div>
            </>
          )}
        </label>

        <Btn onClick={() => setShowInbodyForm(true)} color={C.blue} style={{ width: "100%", marginBottom: 12 }}>
          Enter InBody Data Manually
        </Btn>

        {showInbodyForm && (
          <div className="drop-in" style={{ background: "#0d0d1a", borderRadius: 14, padding: 16, border: `1px solid ${C.blue}33`, marginTop: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <Input label="Weight (kg)" value={inbodyForm.weight} onChange={v => setInbodyForm(p=>({...p,weight:v}))} type="number" placeholder="70" style={{ fontSize: 14 }} />
              <Input label="Body Fat %" value={inbodyForm.bodyFat} onChange={v => setInbodyForm(p=>({...p,bodyFat:v}))} type="number" placeholder="20" style={{ fontSize: 14 }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Input label="Muscle Mass (kg)" value={inbodyForm.muscleMass} onChange={v => setInbodyForm(p=>({...p,muscleMass:v}))} type="number" placeholder="35" style={{ fontSize: 14 }} />
              <Input label="BMI" value={inbodyForm.bmi} onChange={v => setInbodyForm(p=>({...p,bmi:v}))} type="number" placeholder="22" style={{ fontSize: 14 }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Input label="Visceral Fat" value={inbodyForm.visceralFat} onChange={v => setInbodyForm(p=>({...p,visceralFat:v}))} type="number" placeholder="8" style={{ fontSize: 14 }} />
              <Input label="Body Water %" value={inbodyForm.bodyWater} onChange={v => setInbodyForm(p=>({...p,bodyWater:v}))} type="number" placeholder="55" style={{ fontSize: 14 }} />
            </div>
            <Input label="Date" value={inbodyForm.date} onChange={v => setInbodyForm(p=>({...p,date:v}))} type="date" />
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={handleInbodySave} color={C.blue} style={{ flex: 1 }}>Save & Analyze</Btn>
              <Btn onClick={() => setShowInbodyForm(false)} color="#333" style={{ flex: 1 }}>Cancel</Btn>
            </div>
          </div>
        )}

        {inbodyLoading && <div style={{ color: C.muted, textAlign: "center", padding: 20, animation: "pulse 1.5s infinite" }}>🤖 Analyzing your body composition...</div>}

        {inbodyAI && (
          <div style={{ marginTop: 16, background: "#0d0d1a", borderRadius: 14, padding: 16, border: `1px solid ${C.blue}33` }}>
            <div style={{ color: C.blue, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>📊 Body Composition Analysis:</div>
            <div style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{inbodyAI}</div>
          </div>
        )}

        {inbody.length > 1 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>📈 InBody History</div>
            {inbody.slice(-3).map((entry, i) => (
              <div key={i} style={{ background: "#1a1a1a", borderRadius: 12, padding: 12, marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: C.muted, fontSize: 12 }}>{entry.date}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                  <span style={{ color: C.text }}>⚖️ {entry.weight}kg</span>
                  <span style={{ color: C.accent }}>🔥 {entry.bodyFat}%</span>
                  <span style={{ color: C.green }}>💪 {entry.muscleMass}kg</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── WATER REMINDER BANNER ─────────────────────────────────────────────
function WaterReminderBanner({ profile, onDismiss }) {
  return (
    <div className="drop-in" style={{
      position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 430, zIndex: 1000,
      background: `linear-gradient(135deg,#1a3a5c,#0d2040)`,
      borderBottom: `3px solid ${C.blue}`,
      padding: "52px 20px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 40 }}>💧</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Time to Drink Water!</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Stay hydrated — drink a glass of water now</div>
        </div>
        <button onClick={onDismiss} style={{ background: C.blue, border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>✓ Got it</button>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("home");
  const [log, setLog] = useState({});
  const [water, setWater] = useState({});
  const [sleep, setSleep] = useState({});
  const [inbody, setInbody] = useState([]);
  const [showWaterReminder, setShowWaterReminder] = useState(false);
  const reminderRef = useRef(null);

  // Water reminder logic
  useEffect(() => {
    if (!profile) return;
    const checkReminder = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= profile.reminderStart && hour < profile.reminderEnd) {
        setShowWaterReminder(true);
      }
    };
    if (reminderRef.current) clearInterval(reminderRef.current);
    reminderRef.current = setInterval(checkReminder, profile.reminderInterval * 60 * 1000);
    return () => clearInterval(reminderRef.current);
  }, [profile]);

  if (!profile) return <Onboarding onDone={(p) => setProfile(p)} />;

  const tabs = [
    { id: "diary", label: "Diary", icon: "📓" },
    { id: "home", label: "Home", icon: "🏠" },
    { id: "sessions", label: "Sessions", icon: "🤖" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", color: C.text, fontFamily: "'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif", position: "relative", overflowX: "hidden" }}>
      <style>{css}</style>

      {showWaterReminder && <WaterReminderBanner profile={profile} onDismiss={() => setShowWaterReminder(false)} />}

      <div style={{ overflowY: "auto", minHeight: "100vh" }}>
        {tab === "diary" && <DiaryScreen profile={profile} log={log} setLog={setLog} />}
        {tab === "home" && <HomeScreen profile={profile} log={log} water={water} setWater={setWater} sleep={sleep} setSleep={setSleep} />}
        {tab === "sessions" && <SessionsScreen profile={profile} log={log} inbody={inbody} setInbody={setInbody} />}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`,
        display: "flex", paddingBottom: 20,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: "none", border: "none", padding: "12px 0 0",
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: tab === t.id ? C.green : C.muted, transition: "color 0.2s" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 20, height: 3, background: C.green, borderRadius: 99 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
