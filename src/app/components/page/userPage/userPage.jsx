import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";

import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCards from "../../ui/meetingsCard";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCards
                                completedMeetings={user.completedMeetings}
                            />
                        </div>

                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
