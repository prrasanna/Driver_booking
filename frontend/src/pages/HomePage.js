import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Carousel, Spinner } from "react-bootstrap";

export default function HomePage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching image URLs (replace with real API if needed)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Example placeholder images
        const data = [
          "https://picsum.photos/id/1018/1200/500",
          "https://picsum.photos/id/1015/1200/500",
          "https://picsum.photos/id/1019/1200/500",
        ];
        setImages(data);
      } catch (error) {
        console.error("Error fetching images", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand className="fw-bold">🚖 Acting Driver App</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Carousel */}
      <Container className="mt-4">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Carousel fade interval={3000}>
            {images.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded-3 shadow"
                  src={url}
                  alt={`slide-${index}`}
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded-pill px-3">
                  <h5>Welcome to Acting Driver</h5>
                  <p>Your reliable ride, anytime!</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Container>
    </>
  );
}
