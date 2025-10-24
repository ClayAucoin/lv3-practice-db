import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import utensilsImage from "../images/utensils.jpg";

function PotluckUtensils() {
  const isTesting = true;

  const [utensils, setUtensils] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  async function handleFetch() {
    async function getUtensils() {
      const { data, error } = await supabase.rpc("get_potluck_utensils");

      if (error) {
        console.log(error);
        setErrMsg(error.message);
        setUtensils([]);
        return;
      }
      setUtensils(data);
    }

    console.log(errMsg);
    getUtensils();
  }

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const utensilName = e.target.elements.utensilName.value;
    const guestName = e.target.elements.guestName.value;
    const serves = e.target.elements.serves.value;

    const newBeverage = {
      utensil_name: utensilName,
      guest_name: guestName,
      serves: parseInt(serves),
    };

    const { error } = await supabase
      .from("potluck_utensils")
      .insert(newBeverage);

    const response = await supabase.rpc("get_potluck_utensils");
    const data = response.data;

    if (!isTesting) {
      e.target.elements.utensilName.value = "";
      e.target.elements.guestName.value = "";
      e.target.elements.serves.value = "";
    }

    if (error) {
      console.log(error);
      setErrMsg(error.message);
      setUtensils([]);
      return;
    }
    setUtensils(data);
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
                    src={utensilsImage}
                    className="card-img-top rounded"
                    alt="Potluck Utensils"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="mt-4">
                  <h5 className="text-center">Add Beverage</h5>

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
                      <label
                        className="col-form-label-sm"
                        htmlFor="utensilName"
                      >
                        What are you bringing?
                      </label>
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        name="utensilName"
                        defaultValue={isTesting ? "pitch fork" : ""}
                      />
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
                        Add Utensil
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-7">
                {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                <div className="d-flex nowrap">
                  <h2 className="flex-fill align-self-center text-center">
                    Utensils
                  </h2>
                  <button className="btn refresh-button" onClick={handleFetch}>
                    🔄
                  </button>
                </div>
                <div>
                  {utensils.length === 0 ? (
                    <p>No utensils yet.</p>
                  ) : (
                    <ul>
                      {utensils.map((utensil) => (
                        <li key={`${utensil.guest_name}`} className="mb-2">
                          <strong>{utensil.guest_name}</strong>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {utensil.utensil}
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
export default PotluckUtensils;
