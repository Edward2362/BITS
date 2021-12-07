import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

 function FetchRandomRecipes() {
    const [recipeDataReturn, setRecipeDataReturn] = useState([]);
    const [userecipeDataReturn, setUserRecipeDataReturn] = useState([]);
    const [userFoodReturn, setUserFoodReturn] = useState([]);
    let fetched = []
    let endPoint = "https://api.edamam.com/api/recipes/v2/?q=dessert&type=public&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe&random=true"
    const display1=()=>{
    fetch(endPoint)
    .then(response=>response.json())
    .then(fetchResult=>{
        console.log("f",fetchResult);
    })
    }
    useEffect(display1,[])
    return <div></div>
    function SearchAPI(prop) {
    const [recipeDataReturn, setRecipeDataReturn] = useState([])
    const [termReturn, setTermReturn] = useState("")
    const [nextEndPointReturn, setNextEndPointReturn] = useState("")
    const [userRecipeReturn, setUserRecipeReturn] = useState([])
    const [cal, setCal] = useState({ from: "", to: "" });
    const [diet, setDiet] = useState([]);
    const [health, setHealth] = useState([]);
    let recipeData = []
    let fetched = []
    let nEndP = ""
    let phrase = "chicken"
    let calories = ""
    let diets = ""
    let healths = ""
    if (cal.from != "" && cal.to == "") {
      calories = "&calories=" + cal.from + "+";
  } else if (cal.from != "" && cal.to != "") {
      calories = "&calories=" + cal.from + "-" + cal.to;
  } else if (cal.from == "" && cal.to != "") {
      calories = "&calories=" + cal.to;
  } else {
      calories = "";
  }
  for (let i = 0; i < diet.length; i++) {
      diets = diets + "&diet=" + diet[i];
  }
    const endPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=" + phrase + "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe" + calories + diets
    const load = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(fetchResult => {
                    fetched = fetchResult.hits;
                    console.log("test",fetched)
                    if(0 == fetched.length){
                        setUserRecipeReturn([])
                        setRecipeDataReturn([])
                        setNextEndPointReturn("")
                    }else{
                        nEndP = fetchResult._links.next.href
                    }
                   
                
                
            })
    }
    console.log("123: ", recipeDataReturn);
    console.log(recipeDataReturn.length);
    useEffect(() => {
            load()
    },[])
    return <div></div>
}
 }

 function LandingPage() {
    const [recipeDataReturn, setRecipeDataReturn] = useState([]);
    const [userecipeDataReturn, setUserRecipeDataReturn] = useState([]);
    const [userFoodReturn, setUserFoodReturn] = useState([]);
    let fetched = []
    let endPoint = "https://api.edamam.com/api/recipes/v2/?q=dessert&type=public&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe&random=true"
    const display1=()=>{
    fetch(endPoint)
    .then(response=>response.json())
    .then(fetchResult=>{
        fetched = fetchResult.hits;
        console.log("f",fetchResult);
    })
    }
    useEffect(display1,[])
    /*
                     <div className="row">
                        {recipeDataReturn.map((data) => {
                            return <div className="col">
                                <div className="card" style={{ width: "12rem", border: "none", borderRadius: "2px" }}>
                                    <img className="card-img-top" src={data.recipe.image} alt="Card image cap" style={{ borderRadius: "5px" }} />
                                    <div className="card-body">
                                        <a href="/displayData" className="card-title" style={{ color: "black" }} onClick={() => {
                                            window.sessionStorage.setItem("recipe_id", data._links.self.href)
                                        }}>{data.recipe.label}</a>
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
    */
    return <section style={{paddingLeft: "500px",paddingRight: "400px", paddingTop: "10px", paddingBottom: "10px;"}}>
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{marginBottom: "20px"}}>
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner" style={{borderRadius: "15px"}}>
      <div className="carousel-item active">
        <img className="d-block w-100" src="https://media.cooky.vn/ads/s/cooky-ads-637647023121328984.jpg" alt="First slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src="https://media.cooky.vn/ads/s/cooky-ads-637647024813184219.jpg" alt="Second slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src="https://media.cooky.vn/ads/s/cooky-ads-637647022853830603.jpg" alt="Third slide"/>
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
  <div className="container-fluid">
    <div className="home-top-box" style={{marginBottom: "20px"}}>
      <div className="headline" style={{borderBottom: "#000054 solid"}}>
        <h2>Recipe by web</h2>
      </div>
      <div className="row">
                        {recipeDataReturn.map((data) => {
                            return <div className="col">
                                <div className="card" style={{ width: "12rem", border: "none", borderRadius: "2px" }}>
                                    <img className="card-img-top" src={data.recipe.image} alt="Card image cap" style={{ borderRadius: "5px" }} />
                                    <div className="card-body">
                                        <a href="/displayData" className="card-title" style={{ color: "black" }} onClick={() => {
                                            window.sessionStorage.setItem("recipe_id", data._links.self.href)
                                        }}>{data.recipe.label}</a>
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
    </div>
  </div>
  
  <div className="container-fluid">
    <div className="home-top-box" style={{marginBottom: "20px"}}>
      <div className="headline" style={{borderBottom: "#000054 solid"}}>
        <h2>Recipe by users</h2>
      </div>
    </div>
    <div className="row">
      { userFoodReturn.map((data) => {
                            return <div className="col">
                                <div className="card" style={{ width: "12rem", border: "none", borderRadius: "2px" }}>
                                    <img className="card-img-top" src={data.image} alt="Card image cap" style={{ borderRadius: "5px" }} />
                                    <div className="card-body">
                                        <a href="/foodAdded" className="card-title" style={{ color: "black" }} onClick={() => {
                                            window.sessionStorage.setItem("foodId", data.id)
                                        }}>{data.name}</a>
                                    </div>
                                </div>
                            </div>;
                        })}
    </div>
  </div>
</section>
    ;
}

export default function MakeCourses() {
  const [recipeDataReturn, setRecipeDataReturn] = useState([])
  const [phrase, setPhrase] = useState("")
  const [nextEndPointReturn, setNextEndPointReturn] = useState("")
  const [userRecipeReturn, setUserRecipeReturn] = useState([])
  const [cal, setCal] = useState({ from: "", to: "" });
  const [diet, setDiet] = useState([]);
  const [health, setHealth] = useState([]);
  const [course, setCourse] = useState([]);
  let recipeData = []
  let fetched = []
  let combination = []
  let nEndP = ""
  let calories = 1000
  let diets = ""
  let healths = ""
  let checker = true
  const endPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=" + phrase + "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe&calories=3000"
  const load = () => {
  }
  console.log("123: ", recipeDataReturn);
  console.log(recipeDataReturn.length);
  const SearchButton = () => {
    fetch(endPoint)
    .then(response => response.json())
    .then(fetchResult => {
            fetched = fetchResult.hits;
            console.log("test",fetched)
             while(true){
                let preLength = combination.length;
                let check = false;
                for (let i = 0; i < fetched.length - 2; i++) {
                  if(check){
                    break;
                  }else{
                    for (let j = i + 1; j < fetched.length - 1; j++) {
                      if(check){
                        break;
                      }else{
                        for (let k = j + 1; k < fetched.length; k++) {
                          if(fetched[i].recipe.calories/fetched[i].recipe.yield + fetched[j].recipe.calories/fetched[j].recipe.yield + fetched[k].recipe.calories/fetched[k].recipe.yield <calories){
                            console.log(fetched)
                            let arr = [fetched[i],fetched[j],fetched[k]]
                            combination.push(arr)
                            check = true;
                            console.log(combination)
                          }
                          if(check){
                            fetched.splice(i,1)
                            fetched.splice(j-1,1)
                            fetched.splice(k-2,1)
                            break;
                          }
                        }
                      }
                    }
                  }
                  }
                  if(preLength === combination.length){
                    break;
                  }

              }

            if(0 == fetched.length){
                setUserRecipeReturn([])
                setRecipeDataReturn([])
                setNextEndPointReturn("")
            }else{
                nEndP = fetchResult._links.next.href
            }
           
        
        
    })
  }
// Next button
const NextButton = () => {
  fetch(nEndP)
  .then(response => response.json())
  .then(fetchResult => {
          fetched = fetchResult.hits;
          console.log("test",fetched)
           while(true){
              let preLength = combination.length;
              let check = false;
              for (let i = 0; i < fetched.length - 2; i++) {
                if(check){
                  break;
                }else{
                  for (let j = i + 1; j < fetched.length - 1; j++) {
                    if(check){
                      break;
                    }else{
                      for (let k = j + 1; k < fetched.length; k++) {
                        if(fetched[i].recipe.calories/fetched[i].recipe.yield + fetched[j].recipe.calories/fetched[j].recipe.yield + fetched[k].recipe.calories/fetched[k].recipe.yield <calories){
                          console.log(fetched)
                          let arr = [fetched[i],fetched[j],fetched[k]]
                          combination.push(arr)
                          check = true;
                          console.log(combination)
                        }
                        if(check){
                          fetched.splice(i,1)
                          fetched.splice(j-1,1)
                          fetched.splice(k-2,1)
                          break;
                        }
                      }
                    }
                  }
                }
                }
                if(preLength === combination.length){
                  break;
                }

            }

          if(0 == fetched.length){
              setUserRecipeReturn([])
              setRecipeDataReturn([])
              setNextEndPointReturn("")
          }else{
              nEndP = fetchResult._links.next.href
          }
         
      
      
  })
}
//Next Button




  useEffect(() => {
          load()
  },[])
  return <div>
    <input type="text" placeholder="Input search phrase" value={phrase} onChange ={(e)=>{setPhrase(e.target.value)}}></input>
    <button onClick= {SearchButton}>Search</button>
    <button onClick= {NextButton}>Next</button>
  </div>
}