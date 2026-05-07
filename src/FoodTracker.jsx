import { useEffect, useState } from "react";

/* PASTE YOUR FULL FOOD_DB HERE */
const FOOD_DB = {
  proteins: [
    { name: "Boiled Chicken Skinless Breast", unit: "100 gms", cal: 155 },
  ],
  carbs: [
    { name: "Boiled Rice", unit: "100 gms", cal: 130 },
  ],
  fats: [
    { name: "Olive Oil", unit: "teaspoon", cal: 45 },
  ],
};

export default function FoodTracker() {
  const [profiles, setProfiles] = useState(() => {
    return JSON.parse(localStorage.getItem("profiles")) || [];
  });

  const [currentProfile, setCurrentProfile] = useState("");
  const [email, setEmail] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("proteins");
  const [selectedFood, setSelectedFood] = useState("");
  const [grams, setGrams] = useState(100);

  const [foods, setFoods] = useState(() => {
    return JSON.parse(localStorage.getItem("foods")) || [];
  });

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  const addProfile = () => {
    if (!currentProfile) return;

    const newProfile = {
      name: currentProfile,
      email,
    };

    setProfiles([...profiles, newProfile]);

    setCurrentProfile("");
    setEmail("");
  };

  const addFood = () => {
    if (!selectedFood) return;

    const food = FOOD_DB[selectedCategory].find(
      (f) => f.name === selectedFood
    );

    if (!food) return;

    let calories = food.cal;

    if (food.unit.includes("100")) {
      calories = Math.round((food.cal / 100) * grams);
    }

    const newFood = {
      name: food.name,
      grams,
      calories,
      unit: food.unit,
    };

    setFoods([...foods, newFood]);
  };

  const totalCalories = foods.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="app">
      <div className="title">Calories Calculator</div>

      <div className="card">
        <div className="section-title">Profiles</div>

        <input
          placeholder="Name"
          value={currentProfile}
          onChange={(e) => setCurrentProfile(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={addProfile}>Add Profile</button>

        {profiles.map((p, i) => (
          <div key={i} className="food-item">
            <div>{p.name}</div>
            <div className="small">{p.email}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="section-title">Total Calories</div>
        <div className="total">{totalCalories}</div>
      </div>

      <div className="card">
        <div className="section-title">Add Food</div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedFood("");
          }}
        >
          <option value="proteins">Proteins</option>
          <option value="carbs">Carbs</option>
          <option value="fats">Fats</option>
        </select>

        <select
          value={selectedFood}
          onChange={(e) => setSelectedFood(e.target.value)}
        >
          <option value="">Select Food</option>

          {FOOD_DB[selectedCategory].map((food, i) => (
            <option key={i} value={food.name}>
              {food.name} — {food.cal} cal ({food.unit})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Grams"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
        />

        <button onClick={addFood}>Add Food</button>
      </div>

      <div className="card">
        <div className="section-title">Food List</div>

        {foods.map((food, i) => (
          <div key={i} className="food-item">
            <div>{food.name}</div>

            <div className="small">
              {food.grams} gms • {food.calories} calories
            </div>

            <button
              className="delete"
              onClick={() =>
                setFoods(foods.filter((_, index) => index !== i))
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
