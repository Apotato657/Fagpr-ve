import {FC, ReactNode} from 'react';
import './detail-row.css';

interface DetailRowProps {
    label?: string;
    children: ReactNode[] | ReactNode;
}

export const DetailRow: FC<DetailRowProps> = ({label, children}) => {
    return (
        <>
            <dt>
                {label}
            </dt>
            <dd>
                {children}
            </dd>
        </>
    );
};

export const DetailGroup: FC<DetailRowProps> = ({children}) => {
    return <dl>{children}</dl>;
};