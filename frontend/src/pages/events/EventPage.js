import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import ResourceA from "../../components/ResourceA";
import PopularMarketers from "../profiles/PopularMarketers";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null); // Changed initial state to null for clearer checks
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: eventData } = await axiosReq.get(`/event/${id}/`);
        setEvent(eventData); // Set the event data directly
      } catch (err) {
        console.error(err); // Log error for debugging
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularMarketers mobile />
        {event ? (
          <Event {...event} eventPage />
        ) : (
          <ResourceA spinner /> // Show spinner while loading
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularMarketers />
      </Col>
    </Row>
  );
}

export default EventPage;