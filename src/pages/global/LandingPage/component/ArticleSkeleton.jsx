import React from "react";
import { Container, Card, CardBody, Row, Col } from "react-bootstrap";

const ArticleSkeleton = () => {
  const skeletonStyles = `
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
    }
    
    .skeleton-title {
      height: 24px;
      width: 70%;
    }
    
    .skeleton-text {
      height: 16px;
      width: 100%;
    }
    
    .skeleton-text-short {
      height: 16px;
      width: 60%;
    }
    
    .skeleton-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .skeleton-menu {
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
    
    .skeleton-image {
      height: 200px;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  return (
    <>
      <style>{skeletonStyles}</style>
      <Container className="py-5">
        <h2 className="pbs-title-section text-center mb-5">
          Artikel Terbaru
        </h2>

        <Row className="justify-content-center">
          {[1, 2, 3].map((index) => (
            <Col key={index} sm={12} md={8} lg={6} className="mb-4">
              <Card className="shadow-lg border-0 mx-3 h-100 rounded-4">
                <CardBody>
                  <div className="skeleton skeleton-title mb-3"></div>
                  <div className="skeleton skeleton-text mb-2"></div>
                  <div className="skeleton skeleton-text mb-3"></div>
                  <div className="skeleton skeleton-text-short"></div>

                  {index === 1 && (
                    <div className="d-flex justify-content-between align-items-center mb-3 pt-3">
                      <div className="d-flex">
                        <span className="skeleton skeleton-dot me-1"></span>
                        <span className="skeleton skeleton-dot me-1"></span>
                        <span className="skeleton skeleton-dot"></span>
                      </div>
                      <div className="skeleton skeleton-menu"></div>
                    </div>
                  )}
                </CardBody>

                {index === 1 && (
                  <div className="p-3">
                    <div className="skeleton skeleton-image rounded-4 w-100"></div>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ArticleSkeleton;
