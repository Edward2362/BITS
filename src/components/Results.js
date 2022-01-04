import React from "react";
import { Filter } from "./Filter";
import Recipe from "./Recipe";
import Course from "./Course";
import { recipes } from "./fakedata";
import { useState, useEffect } from "react";
import SearchAPI from "../functionsJS/searchAPI";
const Results = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [nextEPoint, setNextEPoint] = useState([]);
  const [current, setCurrent] = useState(0);
  
  const endPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=" + window.sessionStorage.getItem("value") + "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe";
    const load = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(fetchResult => {
              console.log(fetchResult)
                    let fetched = fetchResult.hits;
                    console.log(fetched)
                    if(0 == fetched.length){
                        setRecipeData([])
                    }else{
                      let URL_array = nextEPoint;
                      URL_array.push(endPoint)
                      URL_array.push(fetchResult._links.next.href) 
                        setNextEPoint(URL_array)
                        setRecipeData(fetched)
                        console.log(nextEPoint)
                    }
            })
    }

    useEffect(() => {
            load()
    },[])
  const apply = (calories, dietLabels, healths) => {
     let currentPage = 0;
    setRecipeData([]);;
    const endPoint =
      "https://api.edamam.com/api/recipes/v2?type=public&q=" +
      sessionStorage.getItem("value") +
      "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe" +
      calories +
      dietLabels +
      healths;
    fetch(endPoint)
      .then((response) => response.json())
      .then((fetchResult) => {
        let fetched = fetchResult.hits
       if(0== fetched.length){
        setRecipeData([])
       }else{
        let URL_array = nextEPoint;
        URL_array.push(fetchResult._links.next.href)
        console.logg("first URL: ",URL_array) 
          setNextEPoint(URL_array)
          setRecipeData(fetched)
          window.sessionStorage.setItem("currentPage", (fetchResult.from - 1)/20)
       }
      });
  };
  const next = () =>{
    console.log("currentPageNext:", window.sessionStorage.getItem("currentPage"))
    let currentPage = parseInt(window.sessionStorage.getItem("currentPage"));
    const NextEndPointURL = nextEPoint[currentPage+1];
    fetch(NextEndPointURL)
            .then(response => response.json())
            .then(fetchResult => {
                    console.log("page: ",(fetchResult.from - 1)/20)
                    let fetched = fetchResult.hits;
                    if(0 == fetched.length){
                        setRecipeData([])
                    }else{
                      if(currentPage==nextEPoint.length-2){
                        let URL_array = nextEPoint;
                      URL_array.push(fetchResult._links.next.href) 
                        setNextEPoint(URL_array)
                        console.log("Next EndPoint: ",nextEPoint)
                        setRecipeData(fetched)
                      }
                    }
                    window.sessionStorage.setItem("currentPage", (fetchResult.from - 1)/20)
            })
  }
  const previous = () =>{
    let currentPage = parseInt(window.sessionStorage.getItem("currentPage"));
    const PreviousEndPointURL = nextEPoint[currentPage-1];
    fetch(PreviousEndPointURL)
            .then(response => response.json())
            .then(fetchResult => {
                    let fetched = fetchResult.hits;
                    if(0 == fetched.length){
                        setRecipeData([])
                    }else{
                      let URL_array = nextEPoint;
                        setNextEPoint(URL_array)
                        setRecipeData(fetched)
                        window.sessionStorage.setItem("currentPage", (fetchResult.from - 1)/20)
                    }
            })
  }
  return (
    <>
      <div className="page-header">
        <div className="page-header-overlay">
          <div className="page-header-body">
            <h1>Results</h1>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="page-body">
            <div className="white-bg">
              <Filter onSubmit={apply} />
              <hr></hr>
              <div className="recipes-section">
                {/* <Course key={1} data="first" />
                                <Course key={2} data="second" /> */}
                {/* 

                                <div className="" data-carousel="second">
                                    <button
                                        id="prev"
                                        className="carousel-button prev"
                                        data-carousel-button="prev"
                                        onClick={() => handleClick("prev")}
                                    ></button>
                                    <button
                                        id="next"
                                        className="carousel-button next"
                                        data-carousel-button="next"
                                        onClick={() => handleClick("next")}
                                    ></button>
                                </div> */}
                <div className="filter-section-grid">
                  {recipeData.map((recipe) => (
                    <Recipe recipe={recipe} />
                  ))}
                </div>
              </div>
              <button onClick={previous} >Previous</button>
              <button onClick={next} >Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
