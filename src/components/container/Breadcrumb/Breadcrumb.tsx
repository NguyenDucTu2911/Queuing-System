import React from 'react';

interface BreadcrumbProps {
    items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav>
            <ul className="breadcrumb">
                {items.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        {index !== 0 && <span className="separator">/</span>}
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
