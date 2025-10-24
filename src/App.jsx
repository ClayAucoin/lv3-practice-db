import { useState } from "react";
import PotluckMeals from "./components/PotluckMeals";
import PotluckBeverages from "./components/PotluckBeverages";
import PotluckUtensils from "./components/PotluckUtensils";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("meals");

  function goToMeals() {
    setCurrentPage("meals");
  }

  function goToBeverages() {
    setCurrentPage("beverages");
  }

  function goToUtensils() {
    setCurrentPage("utensils");
  }

  let pageContent;

  if (currentPage === "meals") {
    pageContent = <PotluckMeals />;
  }

  if (currentPage === "beverages") {
    pageContent = <PotluckBeverages />;
  }

  if (currentPage === "utensils") {
    pageContent = <PotluckUtensils />;
  }

  return (
    <>
      <div className="container m-4">
        <div className="card p-2" style={{ width: "600px" }}>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <button className="btn btn-primary" onClick={goToMeals}>
                Check Meals
              </button>
              <button className="btn btn-primary" onClick={goToBeverages}>
                Check Beverages
              </button>
              <button className="btn btn-primary" onClick={goToUtensils}>
                Check Utensils
              </button>
            </div>
          </div>
        </div>
      </div>
      {pageContent}
    </>
  );
}

export default App;
