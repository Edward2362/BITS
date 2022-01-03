import { useEffect, useState } from "react";
export default function DisplaySpecific() {
    // test
    var endPoint =
        "https://api.edamam.com/api/recipes/v2/b79327d05b8e5b838ad6cfd9576b30b6?type=public&app_id=fe1da2d2&app_key=%2006a4dadc3c947a1b4b7a0e15622cb4fe";
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [ingredient, setIngredient] = useState([]);
    const [test, setTest] = useState({ name: "", list: [] });
    let fetched = [];
    const load = () => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((fetchResult) => {
                fetched = fetchResult.recipe;
                console.log(fetched);
                setName(fetched.label);
                console.log("name", name);
                setImg(fetched.image);
                console.log("image", img);
                setIngredient(fetched.ingredientLines);
                console.log("ingredient", ingredient);
            });
        setTest({ name: "123", list: [123, 123] });
    };
    const load2 = () => {
        console.log("test", test);
    };
    const load3 = () => {
        load();
        load2();
    };
    useEffect(load3, []);
    return (
        <div
            className="container-fluid"
            style={{
                padding: "16px",
                minWidth: "1000px",
                width: "calc(100% - 190px * 2)",
                margin: "0 auto",
            }}
        >
            <div className="page-wrapper ">
                <div className="container recipe-detail-container ">
                    <div className="rm ">
                        <div className="recipe-main-photo">
                            <img className="recipe-cover-photo" src={img} />
                        </div>
                        <div className="recipe-detail-content">
                            <h3 className="recipe-name">{name}</h3>

                            <div className="button-recipe">
                                <span>346 Saves</span>
                                <button className="btn btn-link">
                                    <img className="icon-like" />
                                </button>
                            </div>

                            <div className="recipe-stats-info">
                                <img
                                    className="star-icon"
                                    src="https://www.cooky.vn/React/images/icons/star.svg"
                                    alt="1"
                                />
                                <img
                                    className="star-icon"
                                    src="https://www.cooky.vn/React/images/icons/star.svg"
                                    alt="2"
                                />
                                <img
                                    className="star-icon"
                                    src="https://www.cooky.vn/React/images/icons/star.svg"
                                    alt="3"
                                />
                                <img
                                    className="star-icon"
                                    src="https://www.cooky.vn/React/images/icons/star.svg"
                                    alt="4"
                                />
                                <img
                                    className="star-icon"
                                    src="https://www.cooky.vn/React/images/icons/star.svg"
                                    alt="5"
                                />
                                <span>9</span>
                                <div className="total-likes">
                                    <img src="https://www.cooky.vn/React/images/icons/heart.svg" />
                                    <span>346</span>
                                </div>

                                <div>
                                    <img src="https://www.cooky.vn/React/images/icons/view.svg" />
                                    <span>11k</span>
                                </div>
                            </div>

                            <div className="recipe-owner">
                                <a>
                                    <div className="recipe-owner-avatar">
                                        <img src="https://image.cooky.vn/usr/g10/96128/avt/s140/cooky-avatar-636959526416611860.jpg" />
                                    </div>
                                    <div className="recipe-owner-name">
                                        <span></span>
                                    </div>
                                </a>
                                <div className="make-recipe-button">
                                    <img src="https://www.cooky.vn/React/images/icons/i-made-it-desktop.svg" />
                                    <span>I made it</span>
                                </div>
                            </div>

                            <div className="recipe-desc-less">
                                <p></p>
                            </div>
                            <div id="ingredients-list">
                                {ingredient.map((ingredients) => {
                                    return (
                                        <div className="ingredient-item">
                                            <span className="ingredient-name">
                                                {ingredients}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="recipe-ads-banner-container">
                                <div className="banner-wrapper">
                                    <div className="banner animated-place-holder"></div>
                                </div>
                            </div>

                            <div className="recipe-steps-list">
                                <h3 className="how-to-make">Steps</h3>
                                <div className="cook-step-content"></div>
                            </div>

                            <div className="recipe-steps-list">
                                <h3 className="how-to-make">Diet</h3>
                                <div className="cook-step-content"></div>
                            </div>

                            <h3 className="how-to-make">Comments</h3>
                            <div className="recipe-comment-form-action">
                                <div className="user-avatar">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                                </div>
                                <div className="form-content">
                                    <textarea
                                        className="recipe-description"
                                        placeholder="Comment"
                                        spellcheck="false"
                                    ></textarea>
                                    <div className="comment-btn-action">
                                        <form>
                                            <button className="btn-submit-review">
                                                Upload
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="recipe-review"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
