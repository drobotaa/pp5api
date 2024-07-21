import React, { useEffect, useState } from "react";
import CommentCreateForm from "../comments/CommentCreateFrom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Offer from "./Offer";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import ResourceA from "../../components/ResourceA";
import { fetchMoreData } from "../../utilities.js/utilities";
import PopularMarketers from "../profiles/PopularMarketers";

function OfferPage() {

  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] })


  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`)
        ])
        setPost({ results: [post] })
        setComments(comments)
      } catch (err) {
        // console.log(err)
      }
    }

    handleMount();
  }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularMarketers mobile />
        <Offer {...post.results[0]} setPosts={setPost} offerPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll 
              children={comments.results.map(comment => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments} />
              ))}
              dataLength={comments.results.length}
              loader={<ResourceA spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
            
          ) : currentUser ? (
            <span>No comments, be the first!</span>
          ) : (
            <span>No comments</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularMarketers />
      </Col>
    </Row>
  );
}

export default OfferPage;