import React from "react";

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <div className="comment-owner-avatar">
                <img
                    src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                    alt="avatar"
                ></img>
            </div>
            <div className="comment-information">
                <div className="comment-owner-with-date">
                    <p>{comment.customerLastName}</p>
                    <p>{comment.commentDate.toString()}</p>
                </div>
                <p>{comment.commentDescription}</p>
            </div>
        </div>
    );
};

export default Comment;
