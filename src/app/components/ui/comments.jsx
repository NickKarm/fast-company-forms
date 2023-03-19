import React from "react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
const Comments = () => {
    const { userId } = useParams();

    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id));
        });
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>

            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;
