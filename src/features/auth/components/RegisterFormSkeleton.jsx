import React from "react";
import { Container, Card, Form, Row, Col } from "react-bootstrap";

const RegisterFormSkeleton = () => {
  const skeletonStyles = `
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
    }
    
    .skeleton-title {
      height: 32px;
      width: 60%;
      margin: 0 auto 24px;
    }
    
    .skeleton-label {
      height: 20px;
      width: 120px;
      margin-bottom: 8px;
    }
    
    .skeleton-input {
      height: 38px;
      width: 100%;
    }
    
    .skeleton-button {
      height: 48px;
      width: 100%;
      border-radius: 8px;
    }
    
    .skeleton-alert {
      height: 40px;
      width: 100%;
      margin-bottom: 16px;
      border-radius: 4px;
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
      <div id="l-main-wrapper" className="auth-register-page">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} className="px-2 px-sm-3">
              <Card className="shadow-lg border-0 rounded-4 register-card">
                <Card.Body className="p-3 p-sm-4 p-md-5">
                  {/* Title */}
                  <div className="skeleton skeleton-title"></div>
                  
                  {/* Alert placeholder */}
                  <div className="skeleton skeleton-alert"></div>
                  
                  <Form>
                    <Row>
                      {/* Name Field */}
                      <Col md={12} className="mb-3">
                        <div className="skeleton skeleton-label"></div>
                        <div className="skeleton skeleton-input"></div>
                      </Col>
                      
                      {/* NIK Field */}
                      <Col md={6} className="mb-3">
                        <div className="skeleton skeleton-label"></div>
                        <div className="skeleton skeleton-input"></div>
                      </Col>
                      
                      {/* Phone Field */}
                      <Col md={6} className="mb-3">
                        <div className="skeleton skeleton-label"></div>
                        <div className="skeleton skeleton-input"></div>
                      </Col>
                      
                      {/* Email Field */}
                      <Col md={12} className="mb-3">
                        <div className="skeleton skeleton-label"></div>
                        <div className="skeleton skeleton-input"></div>
                      </Col>
                      
                      {/* Password Field */}
                      <Col md={12} className="mb-4">
                        <div className="skeleton skeleton-label"></div>
                        <div className="skeleton skeleton-input"></div>
                        {/* Password strength placeholder */}
                        <div className="mt-2">
                          <div className="skeleton" style={{ height: "4px", width: "100%" }}></div>
                        </div>
                      </Col>
                    </Row>
                    
                    {/* Submit Button */}
                    <div className="skeleton skeleton-button"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegisterFormSkeleton;
