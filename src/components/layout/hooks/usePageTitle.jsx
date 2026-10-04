import React from 'react';
import PageTitle from '../components/PageTitle';
import { usePageTitle } from '../constants/pageTitles';

// HOC untuk menambahkan PageTitle ke halaman
export const withPageTitle = (pageName, options = {}) => {
  return (WrappedComponent) => {
    const WithPageTitleComponent = (props) => {
      const pageConfig = usePageTitle(pageName);
      
      return (
        <>
          <PageTitle 
            title={options.title || pageConfig.title}
            subtitle={options.subtitle || pageConfig.subtitle}
            breadcrumbs={options.breadcrumbs || pageConfig.breadcrumbs}
            showBackButton={options.showBackButton !== false}
            customBackAction={options.customBackAction}
            className={options.className}
          />
          <WrappedComponent {...props} />
        </>
      );
    };

    WithPageTitleComponent.displayName = `withPageTitle(${WrappedComponent.displayName || WrappedComponent.name})`;
    
    return WithPageTitleComponent;
  };
};

// Hook untuk menggunakan PageTitle secara manual
export const usePageTitleConfig = (pageName, options = {}) => {
  const pageConfig = usePageTitle(pageName);
  
  return {
    title: options.title || pageConfig.title,
    subtitle: options.subtitle || pageConfig.subtitle,
    breadcrumbs: options.breadcrumbs || pageConfig.breadcrumbs,
    showBackButton: options.showBackButton !== false,
    customBackAction: options.customBackAction,
    className: options.className
  };
};
