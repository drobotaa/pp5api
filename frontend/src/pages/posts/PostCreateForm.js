import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

import Upload from "../../assets/upload_image_resized.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import ResourceA from "../../components/ResourceA";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useNotification } from "../../hooks/useNotification";

function PostCreateForm() {

  useRedirect('loggedOut');

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    category_filter: '',
    image: '',
  })
  const { title, description, image, category_filter } = postData;
  const { showNotification, Notification } = useNotification();

  const imageFile = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeUpload = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image)
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', imageFile.current.files[0])
    formData.append('category_filter', category_filter)
    try {
      const { data } = await axiosReq.post('/posts/', formData);
      showNotification("Offer Created Successfully!")
      history.push(`/posts/${data.id}`)
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Offer Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
        {errors.title?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      <Form.Group>
        <Form.Label>Offer Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={6}
          value={description}
          onChange={handleChange}
        />
        {errors.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>
      <Form.Group>
        <Form.Label>Offer Category</Form.Label>
        <Form.Control
          as="select"
          name="category_filter"
          value={category_filter}
          onChange={handleChange}
          className="text-center"
        >
          <option value="">--Please choose an option--</option>
          <option value="clothing">Clothing</option>
          <option value="housekeeping">Housekeeping</option>
          <option value="food">Food</option>
          <option value="electronics">Electronics</option>
          <option value="services">Services</option>
          <option value="tourism">Tourism</option>
        </Form.Control>
        {errors.category?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}
      </Form.Group>



      <Button
        className={`${btnStyles.Button} ${btnStyles.ColorChange}`}
        onClick={() => history.goBack()}
      >
        Maybe Later
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.ColorChange}`} type="submit">
        Post!
      </Button>
    </div>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={12}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image className={`${appStyles.Image} ${styles.Image}`} src={image} rounded />
                    </figure>
                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.ColorChange} btn`}
                        htmlFor="image-upload"
                      >
                        Change the Image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <ResourceA src={Upload} message="Click or tap to add an image" />
                  </Form.Label>
                )}

                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeUpload}
                  ref={imageFile}
                  style={{ display: 'none' }}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
        </Row>
      </Form>
      
      <Notification />
    </>
  );
}

export default PostCreateForm;