import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import mealsImage from "../images/meals.jpg";

function PotluckMeals() {
  const isTesting = false;

  const [meals, setMeals] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  async function handleFetch() {
    const { data, error } = await supabase.rpc("get_potluck_meals");

    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setMeals([]);
      return;
    }
    console.log(errMsg);
    setMeals(data);
  }

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const mealName = e.target.elements.mealName.value;
    const guestName = e.target.elements.guestName.value;
    const dishType = e.target.elements.dishType.value;
    const serves = e.target.elements.serves.value;

    const newMeal = {
      meal_name: mealName,
      guest_name: guestName,
      dish_type: dishType.toLowerCase(),
      serves: parseInt(serves),
    };

    const { error } = await supabase.from("potluck_meals").insert(newMeal);

    const response = await supabase.rpc("get_potluck_meals");
    const data = response.data;

    if (!isTesting) {
      e.target.elements.mealName.value = "";
      e.target.elements.guestName.value = "";
      e.target.elements.dishType.value = "";
      e.target.elements.serves.value = "";
    }

    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setMeals([]);
      return;
    }
    setMeals(data);
  }

  return (
    <>
      <div className="container m-4">
        <div className="card p-2" style={{ width: "600px" }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Friday's Potluck</h1>

            <div className="row">
              <div className="col-5">
                <div className="text-center">
                  <img
                    src={mealsImage}
                    className="card-img-top rounded"
                    alt="Potluck Meals"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-center">Add Meal</h5>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="guestName">
                        What is your name?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="guestName"
                        defaultValue={isTesting ? "Bob" : ""}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="mealName">
                        What are you bringing?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="mealName"
                        defaultValue={isTesting ? "dirt" : ""}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="dishType">
                        What type of dish is this?
                      </label>
                      <select
                        className="form-control form-control-sm"
                        name="dishType"
                        defaultValue={isTesting ? "entree" : ""}
                      >
                        <option value="" disabled>
                          Select a type of dish
                        </option>
                        <option value="entree">Entree</option>
                        <option value="side">Side</option>
                        <option value="snack">Snack</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Drink</option>
                      </select>
                    </div>

                    <div className="mb-2">
                      <label className="col-form-label-sm" htmlFor="serves">
                        How many people will it feed?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="number"
                        name="serves"
                        defaultValue={isTesting ? "6" : ""}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Add Meal
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-7">
                {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                <div className="d-flex nowrap">
                  <h2 className="flex-fill align-self-center text-center">
                    Meals
                  </h2>
                  <button className="btn refresh-button" onClick={handleFetch}>
                    🔄
                  </button>
                </div>
                <div>
                  {meals.length === 0 ? (
                    <p>No beverages yet.</p>
                  ) : (
                    <ul>
                      {meals.map((meal) => (
                        <li key={`${meal.guest_name}`} className="mb-2">
                          <strong>{meal.guest_name}</strong>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {meal.meal}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PotluckMeals;
