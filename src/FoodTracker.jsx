import { useEffect, useState } from "react";
import "./index.css";

const COLORS = {
  bg: "#0a0a0a",
  card: "#161616",
  border: "#262626",
  green: "#6abe30",
  blue: "#3b82f6",
  yellow: "#facc15",
  red: "#ef4444",
  text: "#ffffff",
  muted: "#9ca3af",
};

const FOOD_DB = {
  proteins: [
    { name: "Chicken Breast", cal: 165 },
    { name: "Lean Beef", cal: 190 },
    { name: "Egg White", cal: 17 },
    { name: "Tuna", cal: 200 },
    { name: "Salmon", cal: 170 },
  ],

  carbs: [
    { name: "Rice", cal: 130 },
    { name: "Oats", cal: 380 },
    { name: "Banana", cal: 95 },
    { name: "Sweet Potato", cal: 90 },
    { name: "Bread", cal: 75 },
  ],

  fats: [
    { name: "Olive Oil", cal: 45 },
    { name: "Peanut Butter", cal: 600 },
    { name: "Avocado", cal: 180 },
    { name: "Almonds", cal: 580 },
    { name: "Cheddar Cheese", cal: 400 },
  ],
};

function Progress({ value, max, color }) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div
      style={{
        width: "100%",
        height: 10,
        background: "#222",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: color,
          transition: "0.3s",
        }}
      />
    </div>
  );
}

function FoodSection({
  title,
  foods,
  items,
  setItems,
  color,
}) {
  const [search, setSearch] = useState("");

  const filtered = foods.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const addFood = (food) => {
    setItems([
      ...items,
      {
        name: food.name,
        cal: food.cal,
      },
    ]);
  };

  return (
    <div
      className="card"
      style={{
        padding: 18,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          marginBottom: 16,
          color,
        }}
      >
        {title}
      </div>

      <input
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={inputStyle}
      />

      <div
        style={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {filtered.map((food, index) => (
          <div
            key={index}
            style={{
              background: "#111",
              borderRadius: 14,
              padding: 14,
              border: `1px solid ${COLORS.border}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {food.name}
              </div>

              <div
                style={{
                  color: COLORS.muted,
                  fontSize: 13,
                }}
              >
                {food.cal} calories
              </div>
            </div>

            <button
              onClick={() => addFood(food)}
              style={{
                background: color,
                border: "none",
                borderRadius: 12,
                padding: "10px 14px",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Added Foods
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#0f0f0f",
                padding: 12,
                borderRadius: 12,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{item.name}</span>

              <span
                style={{
                  color,
                  fontWeight: 700,
                }}
              >
                {item.cal} cal
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const createProfile = () => {
    if (!name || !email) return;

    const profiles =
      JSON.parse(localStorage.getItem("profiles")) || [];

    const existing = profiles.find(
      (p) => p.email === email
    );

    if (existing) {
      onLogin(existing);
      return;
    }

    const profile = {
      id: Date.now(),
      name,
      email,
    };

    profiles.push(profile);

    localStorage.setItem(
      "profiles",
      JSON.stringify(profiles)
    );

    onLogin(profile);
  };

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          padding: 24,
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: COLORS.green,
            marginBottom: 10,
          }}
        >
          Calories Tracker
        </div>

        <div
          style={{
            color: COLORS.muted,
            marginBottom: 24,
          }}
        >
          Create profile or continue with email
        </div>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...inputStyle,
            marginTop: 14,
          }}
        />

        <button
          onClick={createProfile}
          style={{
            width: "100%",
            marginTop: 18,
            background: COLORS.green,
            border: "none",
            borderRadius: 14,
            padding: 16,
            color: "#fff",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function MacroCard({ title, value, goal, color }) {
  return (
    <div
      className="card"
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <div
        style={{
          color,
          fontWeight: 700,
          marginBottom: 10,
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          marginBottom: 10,
        }}
      >
        {value}
      </div>

      <Progress value={value} max={goal} color={color} />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#111",
  border: `1px solid ${COLORS.border}`,
  borderRadius: 14,
  padding: 14,
  color: "#fff",
  fontSize: 15,
};

export default function FoodTracker() {
  const [profile, setProfile] = useState(null);

  const [proteins, setProteins] = useState([]);
  const [carbs, setCarbs] = useState([]);
  const [fats, setFats] = useState([]);

  // LOAD CURRENT USER
  useEffect(() => {
    const current = localStorage.getItem(
      "current-profile"
    );

    if (current) {
      setProfile(JSON.parse(current));
    }
  }, []);

  // LOAD USER DATA
  useEffect(() => {
    if (!profile) return;

    const saved = localStorage.getItem(
      `food-data-${profile.email}`
    );

    if (saved) {
      const data = JSON.parse(saved);

      setProteins(data.proteins || []);
      setCarbs(data.carbs || []);
      setFats(data.fats || []);
    }
  }, [profile]);

  // SAVE USER DATA
  useEffect(() => {
    if (!profile) return;

    localStorage.setItem(
      `food-data-${profile.email}`,
      JSON.stringify({
        proteins,
        carbs,
        fats,
      })
    );

    localStorage.setItem(
      "current-profile",
      JSON.stringify(profile)
    );
  }, [proteins, carbs, fats, profile]);

  if (!profile) {
    return (
      <LoginScreen
        onLogin={(p) => {
          setProfile(p);
        }}
      />
    );
  }

  const proteinCalories = proteins.reduce(
    (s, i) => s + i.cal,
    0
  );

  const carbsCalories = carbs.reduce(
    (s, i) => s + i.cal,
    0
  );

  const fatsCalories = fats.reduce(
    (s, i) => s + i.cal,
    0
  );

  const totalCalories =
    proteinCalories +
    carbsCalories +
    fatsCalories;

  return (
    <div className="app-container safe-area">
      <div
        style={{
          padding: "50px 16px 120px",
        }}
      >
        <div
          style={{
            marginBottom: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: COLORS.green,
                }}
              >
                Calories Tracker
              </div>

              <div
                style={{
                  color: COLORS.muted,
                  marginTop: 6,
                }}
              >
                Welcome {profile.name}
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem(
                  "current-profile"
                );

                window.location.reload();
              }}
              style={{
                background: COLORS.red,
                border: "none",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 12,
                fontWeight: 700,
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className="card"
          style={{
            padding: 24,
            marginBottom: 20,
            background:
              "linear-gradient(135deg,#6abe30,#4f8f22)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.8)",
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            TOTAL CALORIES
          </div>

          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            {totalCalories}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <MacroCard
            title="Protein"
            value={proteinCalories}
            goal={600}
            color={COLORS.blue}
          />

          <MacroCard
            title="Carbs"
            value={carbsCalories}
            goal={1000}
            color={COLORS.green}
          />

          <MacroCard
            title="Fats"
            value={fatsCalories}
            goal={500}
            color={COLORS.yellow}
          />
        </div>

        <FoodSection
          title="Proteins"
          foods={FOOD_DB.proteins}
          items={proteins}
          setItems={setProteins}
          color={COLORS.blue}
        />

        <FoodSection
          title="Carbs"
          foods={FOOD_DB.carbs}
          items={carbs}
          setItems={setCarbs}
          color={COLORS.green}
        />

        <FoodSection
          title="Fats"
          foods={FOOD_DB.fats}
          items={fats}
          setItems={setFats}
          color={COLORS.yellow}
        />
      </div>
    </div>
  );
}
