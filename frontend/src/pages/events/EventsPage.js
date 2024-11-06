import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import ResourceA from "../../components/ResourceA";
import NoResults from '../../assets/noresults.png';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utilities.js/utilities";
import PopularMarketers from "../profiles/PopularMarketers";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function EventsPage({ message, filter = "" }) {
    const currentUser = useCurrentUser();
    const [events, setEvents] = useState({ results: [] });
    const [isReady, setIsReady] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axiosReq.get(`/event/?${filter?`${filter}&` : ''}search=${query}`);
                setEvents(data);
                setIsReady(true);
            } catch (err) {
                // console.error("Error fetching events:", err);
            }
        };

        setIsReady(false);
        const timer = setTimeout(() => {
            fetchEvents();
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [pathname, filter, query, currentUser]);

    return (
        <Row className="h-100">
            <Col lg={8} className="py-2 p-0 p-lg-2">
                <PopularMarketers mobile />

                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '1.5rem', marginRight: '10px' }} />
                <Form onSubmit={(event) => event.preventDefault()} className="d-flex mb-3">
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        placeholder="Search events by name, description, date or location!"
                        className="mr-2"
                    />
                </Form>

                {isReady ? (
                    <>
                        {events.results.length ? (
                            <InfiniteScroll
                                children={
                                    events.results.map((event) => (
                                        <Event key={event.id} {...event} setEvents={setEvents} />
                                    ))
                                }
                                dataLength={events.results.length}
                                loader={<ResourceA spinner />}
                                hasMore={!!events.next}
                                next={() => fetchMoreData(events, setEvents)}
                            />
                        ) : (
                            <Container className="text-center">
                                <ResourceA src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className="text-center">
                        <ResourceA spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularMarketers />
            </Col>
        </Row>
    );
}

export default EventsPage;