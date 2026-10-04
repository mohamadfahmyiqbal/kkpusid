import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

export const Card = ({
  variant = 'default',
  theme = 'primary', // For premium cards (primary, success, warning)
  className = '',
  children,
  style = {},
  ...props
}) => {
  let customClass = 'border-0 shadow-sm';
  let customStyle = { ...style };
  let renderExtras = null;

  if (variant === 'premium') {
    customClass = 'premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card';
    
    // Default gradients for premium themes
    const themes = {
      primary: {
        gradient: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
        shadow: "rgba(7, 89, 133, 0.3)",
      },
      success: {
        gradient: "linear-gradient(135deg, #065f46 0%, #059669 40%, #10b981 100%)",
        shadow: "rgba(5, 150, 105, 0.3)",
      },
      warning: {
        gradient: "linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)",
        shadow: "rgba(217, 119, 6, 0.3)",
      },
    };
    
    const activeTheme = themes[theme] || themes.primary;
    
    // Don't override if user explicitly passed background or boxShadow
    if (!customStyle.background) customStyle.background = activeTheme.gradient;
    if (!customStyle.boxShadow) customStyle.boxShadow = `0 20px 40px -10px ${activeTheme.shadow}`;

    renderExtras = <div className="glass-sheen" />;
  } else if (variant === 'form') {
    customClass = 'premium-form-card border-0 shadow-sm';
  } else if (variant === 'stat') {
    customClass = 'dashboard-stat-card shadow-sm bg-white rounded-4 border-light-1';
  }

  const finalClassName = `${customClass} ${className}`.trim();

  return (
    <BootstrapCard className={finalClassName} style={customStyle} {...props}>
      {renderExtras}
      {children}
    </BootstrapCard>
  );
};

Card.Body = BootstrapCard.Body;
Card.Header = BootstrapCard.Header;
Card.Footer = BootstrapCard.Footer;
Card.Img = BootstrapCard.Img;
Card.ImgOverlay = BootstrapCard.ImgOverlay;
Card.Title = BootstrapCard.Title;
Card.Subtitle = BootstrapCard.Subtitle;
Card.Text = BootstrapCard.Text;
Card.Link = BootstrapCard.Link;

export default Card;
