import React from "react";
import { useState } from "react";
import Heart from "react-heart";

const FvrAndCmt = () => {
    const [active, setActive] = useState(false);
    return (
        <div>
            <div className="comment-area">
                <textarea className="comment-box"></textarea>
                <div className="custom-width-btn">
                    <button className="btn-cmt">Commend</button>
                </div>
            </div>
            <div className="favorite-icon-area">
                <div className="heart-icon">
                    <Heart
                        isActive={active}
                        onClick={() => setActive(!active)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FvrAndCmt;

// .comment-area {
//     display: flex;
//     flex-direction: column;
// }

// .comment-area textarea {
//     outline: none;
//     height: 10vh;
//     /* line-height: 3vh; */
//     padding: 10px;
//     box-sizing: border-box;
// }

// .comment-area textarea:focus {
//     outline: none;
//     height: 10vh;
//     /* line-height: 3vh; */
//     background-color: #e09f3e;
// }

// .comment-box {
//     resize: none;
//     border: none;
//     width: 30vw;
//     height: 8vh;
//     border-radius: 10px;
//     background-color: rgb(255, 242, 235);
//     transition: background-color 0.25s;
// }

// .custom-width-btn {
//     width: 30vw;
//     margin-top: 5px;
//     float: right;
// }

// .btn-cmt {
//     float: right;
//     bottom: 0;
//     border: solid;
//     border-radius: 5px;
//     border-color: #ff8f00;
//     height: 30px;
//     background-color: #ff8f00;
//     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
//     transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
//     color: white;
// }

// .btn-cmt:hover {
//     cursor: pointer;
//     background-color: #ff7b00;
//     border-color: #ff7b00;
// }

// .btn-cmt input {
//     cursor: pointer;
//     background: none;
//     border: none;
//     font-weight: 500;
//     color: white;
// }

// .favorite-icon-area {
//     display: flex;
//     width: 300px;
//     height: 300px;
// }

// .heart-icon {
//     width: 2rem;
// }