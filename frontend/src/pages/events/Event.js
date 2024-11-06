import React from 'react';
import styles from '../../styles/Offer.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import UserAvatar from '../../components/UserAvatar';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { DropDown } from '../../components/DropDown';

const Event = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        title,
        description,
        date,
        location,
        updated_at,
        eventPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/event/${id}/edit`);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this event?")) { // Confirmation before delete
            try {
                await axiosRes.delete(`/event/${id}/`);
                history.push('/');
            } catch (err) {
                console.error("Failed to delete event:", err);
                alert("An error occurred while trying to delete the event. Please try again."); // User feedback
            }
        }
    };

    return (
        <Card className={styles.Offer}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <UserAvatar src={profile_image} height={60} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{updated_at}</span> 
                        {is_owner && eventPage && <DropDown handleEdit={handleEdit} handleDelete={handleDelete} />}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {title && <Card.Title className=''>{title}</Card.Title>}
                {location && <Card.Text className='text-center'>Location: {location}</Card.Text>}
                {description && <Card.Text className='text-center'>{description}</Card.Text>}
            </Card.Body>
            <Card.Footer>
            {date && <Card.Text className='text-center'>{date}</Card.Text>} 
            </Card.Footer>
        </Card>
    );
};

export default Event;