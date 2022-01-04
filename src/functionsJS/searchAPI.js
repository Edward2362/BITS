
import { useEffect, useState } from 'react';
import Results from '../components/Results';
export default function SearchAPI(prop) {
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
    const endPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=" + prop + "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe" + calories + diets
    const load = () => {
        fetch(endPoint)
            .then(response => response.json())
            .then(fetchResult => {
                    fetched = fetchResult.hits;
                    console.log(fetched)
                    if(0 == fetched.length){
                        setUserRecipeReturn([])
                        setRecipeDataReturn([])
                        setNextEndPointReturn("")
                    }else{
                        //nEndP = fetchResult._links.next.href
                    }
                   
                
                
            })
    }
    console.log("123: ", recipeDataReturn);
    console.log(recipeDataReturn.length);
    useEffect(() => {
            load()
    },[])
    return <div>
        <Results/>
    </div>
}