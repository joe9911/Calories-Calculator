import React, { useState, useEffect } from "react";

const COLORS = {
  bg: "#0b0b0f",
  card: "#17171c",
  border: "#2a2a33",
  green: "#6abe30",
  blue: "#3b82f6",
  yellow: "#facc15",
  text: "#ffffff",
  muted: "#9ca3af",
};

const FOOD_DB = {
  proteins: [
    { name: "Chicken Breast", cal: 165 },
    { name: "Egg Whites", cal: 17 },
    { name: "Tuna", cal: 200 },
  ],
  carbs: [
    { name: "Rice", cal: 130 },
    { name: "Banana", cal: 95 },
    { name: "Oats", cal: 380 },
  ],
  fats: [
    { name: "Olive Oil", cal: 45 },
    { name: "Almonds", cal: 580 },
    { name: "Peanut Butter", cal: 600 },
  ],
};

function ProgressBar({ value, max, color }) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div
      style={{
        height: 10,
        background: "#23232b",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: color,
          borderRadius: 999,
          transition: "0.3s",
        }}
      />
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 24,
        padding: 20,
        marginBottom: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      {children}
    </div>
  );
}

function MacroSection({ title, color, foods, onAdd, items }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(100);

  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const addFood = () => {
    if (!selected) return;

    const calories = Math.round((selected.cal / 100) * qty);

    onAdd({
      name: selected.name,
      qty,
      cal: calories,
    });

    setSearch("");
    setSelected(null);
    setQty(100);
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h2 style={{ color, fontSize: 20 }}>{title}</h2>
        <span style={{ color: COLORS.muted, fontSize: 14 }}>
          {items.reduce((s, i) => s + i.cal, 0)} cal
        </span>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${title}`}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 14,
          border: `1px solid ${COLORS.border}`,
          background: "#101014",
          color: COLORS.text,
          marginBottom: 10,
        }}
      />

      {search && (
        <div
          style={{
            maxHeight: 160,
            overflowY: "auto",
            marginBottom: 10,
          }}
        >
          {filtered.map((food, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(food);
                setSearch(food.name);
              }}
              style={{
                padding: 12,
                borderRadius: 12,
                background:
                  selected?.name === food.name ? `${color}33` : "#101014",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              <div style={{ color: COLORS.text }}>{food.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>
                {food.cal} cal per 100g
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        placeholder="Quantity"
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 14,
          border: `1px solid ${COLORS.border}`,
          background: "#101014",
          color: COLORS.text,
          marginBottom: 12,
        }}
      />

      <button
        onClick={addFood}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 14,
          border: "none",
          background: color,
          color: "white",
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        Add Food
      </button>

      {items.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#101014",
                padding: 14,
                borderRadius: 14,
                marginBottom: 10,
              }}
            >
              <div style={{ color: COLORS.text, fontWeight: 600 }}>
                {item.name}
              </div>
              <div style={{ color: COLORS.muted, fontSize: 13 }}>
                {item.qty}g • {item.cal} cal
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          calorieGoal: 2200,
          waterGoal: 8,
        };
  });

  const [log, setLog] = useState(() => {
    const saved = localStorage.getItem("log");
    return saved
      ? JSON.parse(saved)
      : {
          proteins: [],
          carbs: [],
          fats: [],
        };
  });

  const [water, setWater] = useState(() => {
    const saved = localStorage.getItem("water");
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("log", JSON.stringify(log));
  }, [log]);

  useEffect(() => {
    localStorage.setItem("water", JSON.stringify(water));
  }, [water]);

  const totalCalories = [
    ...log.proteins,
    ...log.carbs,
    ...log.fats,
  ].reduce((sum, item) => sum + item.cal, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0b0b0f,#111827)",
        color: COLORS.text,
        padding: 20,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          paddingBottom: 120,
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 900,
              color: COLORS.green,
              marginBottom: 6,
            }}
          >
            Calories Tracker
          </h1>

          <p style={{ color: COLORS.muted }}>
            Professional fitness tracker for iPhone
          </p>
        </div>

        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <div style={{ color: COLORS.muted, marginBottom: 4 }}>
                Daily Calories
              </div>
              <div style={{ fontSize: 42, fontWeight: 900 }}>
                {totalCalories}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ color: COLORS.muted }}>Goal</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>
                {profile.calorieGoal}
              </div>
            </div>
          </div>

          <ProgressBar
            value={totalCalories}
            max={profile.calorieGoal}
            color={COLORS.green}
          />
        </Card>

        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <h2 style={{ fontSize: 20 }}>Water Intake</h2>
            <span style={{ color: COLORS.blue, fontWeight: 700 }}>
              {water}/{profile.waterGoal}
            </span>
          </div>

          <ProgressBar
            value={water}
            max={profile.waterGoal}
            color={COLORS.blue}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 10,
              marginTop: 16,
            }}
          >
            {Array.from({ length: profile.waterGoal }).map((_, index) => (
              <button
                key={index}
                onClick={() => setWater(index + 1)}
                style={{
                  aspectRatio: 1,
                  borderRadius: 16,
                  border: "none",
                  fontSize: 24,
                  background: index < water ? "#1d4ed8" : "#1f2937",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                💧
              </button>
            ))}
          </div>
        </Card>

        <MacroSection
          title="Proteins"
          color={COLORS.blue}
          foods={FOOD_DB.proteins}
          items={log.proteins}
          onAdd={(item) =>
            setLog((prev) => ({
              ...prev,
              proteins: [...prev.proteins, item],
            }))
          }
        />

        <MacroSection
          title="Carbs"
          color={COLORS.green}
          foods={FOOD_DB.carbs}
          items={log.carbs}
          onAdd={(item) =>
            setLog((prev) => ({
              ...prev,
              carbs: [...prev.carbs, item],
            }))
          }
        />

        <MacroSection
          title="Fats"
          color={COLORS.yellow}
          foods={FOOD_DB.fats}
          items={log.fats}
          onAdd={(item) =>
            setLog((prev) => ({
              ...prev,
              fats: [...prev.fats, item],
            }))
          }
        />
      </div>
    </div>
  );
}

