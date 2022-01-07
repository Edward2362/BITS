import React from "react";

const Comment = ({ comment }) => {
    var options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return (
        <div className="comment">
            <div className="comment-owner-avatar">
                <img
                    src={comment.customerImage}
                    alt="avatar"
                ></img>
            </div>
            <div className="comment-information">
                <div className="comment-owner-with-date">
                    <p>
                        {comment.customerFirstName +
                            " " +
                            comment.customerLastName}
                    </p>
                    <p>
                        {new Date(comment.commentDate).toLocaleDateString(
                            "en-US",
                            options
                        )}
                    </p>
                </div>
                <p>{comment.commentDescription}</p>
            </div>
        </div>
    );
};

export default Comment;
