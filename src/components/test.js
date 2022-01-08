
import { useEffect, useState } from 'react';
export default function MakeCourses(prop) {
    const [recipeDataReturn, setRecipeDataReturn] = useState([])
    const [result, setResult] = useState([])
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
    const endPoint = "https://api.edamam.com/api/recipes/v2?type=public&q=" + prop + "&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe&calories=3000"
    const load = () => {
        fetch(endPoint)
        .then(response => response.json())
        .then(fetchResult => {
                fetched = fetchResult.hits;
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
                                let arr = [fetched[i],fetched[j],fetched[k]]
                                combination.push(arr)
                                check = true;
                                setResult(combination)
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
                    setNextEndPointReturn(nEndP)
                }          
        })
    }
      console.log("result", result)

    useEffect(() => {
            load()
    },[])
  }