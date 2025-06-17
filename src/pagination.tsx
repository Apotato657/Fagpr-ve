import {Pagination, usePagination} from "@digdir/designsystemet-react";
import React, {FC, useEffect, useState} from "react";

interface Paginationprops {
    totalPages: number,
    sendCurrentPage: (page: number) => void,
    getCurrentPage: number,
}

export const CustomPagination: FC<Paginationprops> = ({totalPages, sendCurrentPage, getCurrentPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const onChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, page: number) => {
        setCurrentPage(page);
        sendCurrentPage(page);
    }

    useEffect(() => {
        if (getCurrentPage !== undefined) {
            setCurrentPage(getCurrentPage);
        }
    }, [getCurrentPage]);

    const {pages, prevButtonProps, nextButtonProps,} = usePagination({
            currentPage,
            setCurrentPage,
            onChange,
            totalPages: totalPages,
            showPages: totalPages > 6 ? 6 : totalPages,
        }
    );

    return (
        <Pagination className={'paginationWrapper'}>
            <Pagination.List>
                <Pagination.Item>
                    <Pagination.Button aria-label='Forrige side' {...prevButtonProps}>
                        Forrige
                    </Pagination.Button>
                </Pagination.Item>
                {pages.map(({page, itemKey, buttonProps}) => (
                    <Pagination.Item key={itemKey}>
                        {typeof page === 'number' && (
                            <Pagination.Button {...buttonProps} aria-label={`Side ${page}`}>
                                {page}
                            </Pagination.Button>
                        )}
                    </Pagination.Item>
                ))}
                <Pagination.Item>
                    <Pagination.Button aria-label='Neste side' {...nextButtonProps}>
                        Neste
                    </Pagination.Button>
                </Pagination.Item>
            </Pagination.List>
        </Pagination>
    )
}