import React, {FC, useEffect, useState} from "react";
import {Pagination, usePagination} from "@digdir/designsystemet-react";

interface PaginationProps {
    totalPages: number,
    sendCurrentPage: (page: number) => void,
    getCurentPage: number,
}

export const CustomPgaination: FC<PaginationProps> = ({totalPages, getCurentPage, sendCurrentPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const onChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, page: number) => {
        setCurrentPage(page);
        sendCurrentPage(page);
    }

    useEffect(() => {
        if (getCurentPage !== undefined) {
            setCurrentPage(getCurentPage);
        }
    }, [getCurentPage]);

    const {pages, prevButtonProps, nextButtonProps} = usePagination({
            currentPage,
            setCurrentPage,
            onChange,
            showPages: totalPages > 5 ? 5 : totalPages,
            totalPages: totalPages
        }
    );
    return (
        <Pagination>
            <Pagination.List>
                <Pagination.Item>
                    <Pagination.Button
                        aria-label='Forrige side'
                        datatype='tertiary'
                        {...prevButtonProps}
                    >
                        Forrige
                    </Pagination.Button>
                </Pagination.Item>
                {pages.map(({page, itemKey, buttonProps}) => (
                    <Pagination.Item key={itemKey}>
                        {typeof page === 'number' && (
                            <Pagination.Button
                                {...buttonProps}
                                aria-label={`Side ${page}`}
                                data-variant="primary"
                            > {page}
                            </Pagination.Button>
                        )}
                    </Pagination.Item>
                ))}
                <Pagination.Button aria-label='Neste side' {...nextButtonProps}>
                    Neste
                </Pagination.Button>
            </Pagination.List>
        </Pagination>
    )
}