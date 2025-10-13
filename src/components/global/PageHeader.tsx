import { type JSX } from 'react';

type PageHeaderProps = {
    label: string;
    headerCss: string;
};

function PageHeader({ label, headerCss }: PageHeaderProps): JSX.Element {
    return (
        <h2 className={headerCss}>
            {label}
        </h2>
    );
}

export default PageHeader;