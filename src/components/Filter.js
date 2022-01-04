import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { choose } from "../functionsJS/checkbox";
// import { set } from "mongoose";

export const Filter = ({
  handleIncomingEndPoint,
  handleIncomingFirstEndPoint,
  handleDeletingEndPoint,
  onChange,
  recipesIn,
  recipesAPINextEndPointPlace,
  recipesIndexPlace,
  previousNext,
  placeValue,
  recipesAPINextEndPoint,
  placeRecipesIndex,
}) => {
  var endPoint =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    window.sessionStorage.getItem("place") +
    "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe";
  var endPoint2 = "http://localhost:9000/placeFood";

  const [findByCourse, setFindByCourse] = useState(false);
  const [calories, setCalories] = useState({ from: "", to: "" });
  const [ingredientUpTo, setIngredientUpTo] = useState("");
  const [diets, setDiets] = useState([]);
  const [health, setHealth] = useState([
    "vegetarian",
    "vegan",
    "paleo",
    "low-sugar",
    "alcohol-free",
    "immunity",
  ]);

  if (sessionStorage.getItem("findByCourse")) {
    if (findByCourse === false) {
      setFindByCourse(true);
    }
  }

  const findCourses = (e) => {
    if (sessionStorage.getItem("findByCourse")) {
      sessionStorage.removeItem("findByCourse");
      e.target.parentElement.classList.remove("checked");
      setFindByCourse(false);
      console.log(e.target);
    } else {
      sessionStorage.setItem("findByCourse", true);
      e.target.parentElement.classList.add("checked");
      setFindByCourse(true);
      console.log(e.target);
    }
  };

  const handleChoose = (e) => {
    if (e.target.checked) {
      e.target.parentElement.classList.add("checked");
      setDiets([...diets, e.target.value]);
    } else {
      e.target.parentElement.classList.remove("checked");
      setDiets(diets.filter((diet) => diet !== e.target.value));
    }
  };

  const handleCheckedDiet = () => {
    var checkboxs = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxs.length; i++) {
      if (diets.includes(checkboxs[i].value)) {
        checkboxs[i].checked = true;
      }
    }
  };

  const load = (recipesIndex) => {
    if (null === window.sessionStorage.getItem("findInCommunity")) {
      var caloriesFromMix = "";

      var caloriesToMix = "";
      var caloriesFromToMix = "";
      var ingredientUpToMix = "";

      var dietsMix = "";
      var healthMix = "";

      if (null !== window.sessionStorage.getItem("caloriesFrom")) {
        caloriesFromMix = window.sessionStorage.getItem("caloriesFrom");
      } else {
        caloriesFromMix = calories.from;
      }

      if (null !== window.sessionStorage.getItem("caloriesTo")) {
        caloriesToMix = window.sessionStorage.getItem("caloriesTo");
      } else {
        caloriesToMix = calories.to;
      }

      if (null !== window.sessionStorage.getItem("ingredientUpTo")) {
        ingredientUpToMix = window.sessionStorage.getItem("ingredientUpTo");
      } else {
        ingredientUpToMix = ingredientUpTo;
      }

      if (caloriesFromMix != "" && caloriesToMix == "") {
        caloriesFromToMix = "&calories=" + caloriesFromMix + "%2B";
      } else if (caloriesFromMix != "" && caloriesToMix != "") {
        caloriesFromToMix =
          "&calories=" + caloriesFromMix + "-" + caloriesToMix;
      } else if (caloriesFromMix == "" && caloriesToMix != "") {
        caloriesFromToMix = "&calories=" + caloriesToMix;
      } else {
        caloriesFromToMix = "";
      }

      ingredientUpToMix === ""
        ? (ingredientUpToMix = "")
        : (ingredientUpToMix = "&ingr=" + ingredientUpToMix);
      for (let i = 0; i < diets.length; ++i) {
        if (health.includes(diets[i].toLowerCase())) {
          healthMix = healthMix + "&health=" + diets[i].toLowerCase();
        } else {
          dietsMix = dietsMix + "&diet=" + diets[i].toLowerCase();
        }
      }

      if (!recipesAPINextEndPoint.recipesAPINextEndPointIncluded) {
        endPoint =
          endPoint +
          caloriesFromToMix +
          ingredientUpToMix +
          healthMix +
          dietsMix;
      } else {
        endPoint = recipesIndex;
      }

      fetch(endPoint)
        .then((response) => response.json())
        .then((fetchResult) => {
          let fetched = fetchResult.hits;
          console.log(fetched);

          if (0 == fetched.length) {
            recipesPrevious = { previousIncluded: false, previousIndex: "0" };
            recipesNext = { nextIncluded: false, nextIndex: "0" };
            recipesIn([], recipesPrevious, recipesNext);

            var recipesAPINextEndPointMix = {
              recipesAPINextEndPointIncluded: false,
              recipesAPINextEndPointStart: recipesIndex,
            };

            recipesAPINextEndPointPlace(recipesAPINextEndPointMix);
          } else {
            recipesPrevious = {
              previousIncluded: false,
              previousIndex: "0",
            };
            recipesNext = { nextIncluded: false, nextIndex: "0" };
            recipesIn(fetched, recipesPrevious, recipesNext);

            if (!recipesAPINextEndPoint.recipesAPINextEndPointIncluded) {
              handleIncomingFirstEndPoint(
                endPoint,
                fetchResult._links.next.href
              );
            } else {
                if ("next" != previousNext) {
                    handleDeletingEndPoint();
                } else {
                    handleIncomingEndPoint(fetchResult._links.next.href);
                }
              

            }

            var recipesAPINextEndPointMix = {
              recipesAPINextEndPointIncluded: false,
              recipesAPINextEndPointStart: recipesIndex,
            };

            recipesAPINextEndPointPlace(recipesAPINextEndPointMix);
          }
        });
    } else {
      var recipesPrevious = {};
      var recipesNext = {};

      if (null === window.sessionStorage.getItem("place")) {
        recipesPrevious = {
          previousIncluded: false,
          previousIndex: "0",
        };
        recipesNext = { nextIncluded: false, nextIndex: "0" };
        recipesIn([], recipesPrevious, recipesNext);
      } else {
        if ("" == window.sessionStorage.getItem("place")) {
          recipesPrevious = {
            previousIncluded: false,
            previousIndex: "0",
          };
          recipesNext = { nextIncluded: false, nextIndex: "0" };
          recipesIn([], recipesPrevious, recipesNext);
        } else {
          var caloriesFromMix = "";

          var caloriesToMix = "";
          var ingredientUpToMix = "";

          var dietsMix = "";

          if (null !== window.sessionStorage.getItem("caloriesFrom")) {
            caloriesFromMix = window.sessionStorage.getItem("caloriesFrom");
          } else {
            caloriesFromMix = calories.from;
          }

          if (null !== window.sessionStorage.getItem("caloriesTo")) {
            caloriesToMix = window.sessionStorage.getItem("caloriesTo");
          } else {
            caloriesToMix = calories.to;
          }

          if (null !== window.sessionStorage.getItem("ingredientUpTo")) {
            ingredientUpToMix = window.sessionStorage.getItem("ingredientUpTo");
          } else {
            ingredientUpToMix = ingredientUpTo;
          }

          if (0 != diets.length) {
            for (let i = 0; i < diets.length; ++i) {
              if (diets.length - 1 == i) {
                dietsMix = dietsMix + diets[i];
              } else {
                dietsMix = dietsMix + diets[i] + ",";
              }
            }
          } else {
            dietsMix = "place";
          }

          caloriesFromMix === ""
            ? (caloriesFromMix = "0")
            : (caloriesFromMix = caloriesFromMix);
          caloriesToMix === ""
            ? (caloriesToMix = "0")
            : (caloriesToMix = caloriesToMix);
          ingredientUpToMix === ""
            ? (ingredientUpToMix = "0")
            : (ingredientUpToMix = ingredientUpToMix);

          fetch(
            endPoint2 +
              "/" +
              window.sessionStorage.getItem("place") +
              "/" +
              caloriesFromMix +
              "/" +
              caloriesToMix +
              "/" +
              ingredientUpToMix +
              "/" +
              dietsMix +
              "/" +
              recipesIndex
          )
            .then((response) => response.json())
            .then((data) => {
              if (undefined !== data[0].foodPrevious) {
                if (undefined !== data[0].foodNext) {
                  recipesPrevious = {
                    previousIncluded: true,
                    previousIndex: data[0].foodPrevious.toString(),
                  };

                  recipesNext = {
                    nextIncluded: true,
                    nextIndex: data[0].foodNext.toString(),
                  };
                } else {
                  recipesPrevious = {
                    previousIncluded: true,
                    previousIndex: data[0].foodPrevious.toString(),
                  };
                  recipesNext = {
                    nextIncluded: false,
                    nextIndex: "0",
                  };
                }
              } else {
                if (undefined !== data[0].foodNext) {
                  recipesPrevious = {
                    previousIncluded: false,
                    previousIndex: "0",
                  };

                  recipesNext = {
                    nextIncluded: true,
                    nextIndex: data[0].foodNext.toString(),
                  };
                } else {
                  recipesPrevious = {
                    previousIncluded: false,
                    previousIndex: "0",
                  };
                  recipesNext = {
                    nextIncluded: false,
                    nextIndex: "0",
                  };
                }
              }

              window.sessionStorage.setItem("recipesIndex", recipesIndex);
              var recipesIndexMix = {
                indexIncluded: false,
                indexStart: recipesIndex,
              };
              recipesIn(data[0].result, recipesPrevious, recipesNext);
              recipesIndexPlace(recipesIndexMix);
            });
        }
      }
    }
  };

  if (!recipesAPINextEndPoint.recipesAPINextEndPointIncluded) {
  } else {
    load(recipesAPINextEndPoint.recipesAPINextEndPointStart);
  }

  if (!placeRecipesIndex.indexIncluded) {
  } else {
    load(placeRecipesIndex.indexStart);
  }

  const placeLoad = () => {
    window.sessionStorage.setItem("caloriesFrom", calories.from);
    window.sessionStorage.setItem("caloriesTo", calories.to);
    window.sessionStorage.setItem("ingredientUpTo", ingredientUpTo);
    window.sessionStorage.removeItem("recipesIndex");
    load("0");
  };

  useEffect(() => {
    handleCheckedDiet();
    choose();

    if (placeValue) {
    } else {
      var recipesIndex = "";

      if (null !== window.sessionStorage.getItem("recipesIndex")) {
        recipesIndex = window.sessionStorage.getItem("recipesIndex");
      } else {
        recipesIndex = "0";
      }
      load(recipesIndex);
    }
  });

  console.log(findByCourse);

  return (
    <div className="filter">
      <div className="filter-header">
        <h2>Filter</h2>
        <label className="checkbox-label">
          By Courses
          <input
            type="checkbox"
            id="find-course"
            checked={findByCourse}
            onClick={(e) => findCourses(e)}
            onChange={onChange}
          ></input>
        </label>
      </div>

      <div className="filter-section">
        <div id="calories" className="filter-section-body">
          <label>Calories</label>
          <input
            id="from"
            placeholder="From"
            value={calories.from}
            onChange={(e) => {
              setCalories({
                from: e.target.value,
                to: calories.to,
              });
            }}
          ></input>
          <input
            id="to"
            placeholder="To"
            value={calories.to}
            onChange={(e) => {
              setCalories({
                to: e.target.value,
                from: calories.from,
              });
            }}
          ></input>
        </div>
        <div id="ingredients" className="filter-section-body">
          <label>Ingredients</label>
          <input
            id="num-of-ingredients"
            placeholder="Up to"
            value={ingredientUpTo}
            onChange={(e) => {
              setIngredientUpTo(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div id="diets" className="filter-section">
        <div className="diet-choice">
          <label>Diet</label>
          <div className="grid-25">
            <label className="checkbox-label">
              Vegetarian
              <input
                type="checkbox"
                id="vegetarian"
                value="Vegetarian"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Vegan
              <input
                type="checkbox"
                id="vegan"
                value="Vegan"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Paleo
              <input
                type="checkbox"
                id="paleo"
                value="Paleo"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              High-Fiber
              <input
                type="checkbox"
                id="high-fiber"
                value="High-Fiber"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>

            <label className="checkbox-label">
              High-Protein
              <input
                type="checkbox"
                id="high-protein"
                value="High-Protein"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Low-Carb
              <input
                type="checkbox"
                id="low-carb"
                value="Low-Carb"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Low-Fat
              <input
                type="checkbox"
                id="low-fat"
                value="Low-Fat"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Low-Sodium
              <input
                type="checkbox"
                id="low-sodium"
                value="Low-Sodium"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>

            <label className="checkbox-label">
              Low-Sugar
              <input
                type="checkbox"
                id="low-sugar"
                value="Low-Sugar"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Alcohol-Free
              <input
                type="checkbox"
                id="alcohol-free"
                value="Alcohol-Free"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Balanced
              <input
                type="checkbox"
                id="balanced"
                value="Balanced"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
            <label className="checkbox-label">
              Immunity
              <input
                type="checkbox"
                id="immunity"
                value="Immunity"
                onChange={(e) => handleChoose(e)}
              ></input>
            </label>
          </div>
        </div>
      </div>
      <div className="submit">
        <input
          type="submit"
          value="APPLY"
          formMethod=""
          onClick={placeLoad}
        ></input>
      </div>
    </div>
  );
};
