import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

function Paginationing({pageObject, onChangePageNumber, pageSizeDefault}) {

    const [currentPage, setCurrentPage] = useState(pageObject.currentPage);
    const [totalItems, setTotalItems] = useState(pageObject.totalItems);
    const [pageSize, setPageSize] = useState(pageSizeDefault || pageObject.pageSize);

    useEffect(() => {
        setCurrentPage(pageObject.currentPage);
        setTotalItems(pageObject.totalItems);
        setPageSize(pageObject.pageSize);
    }, []);

    useEffect(() => {
        setCurrentPage(pageObject.currentPage);
        setTotalItems(pageObject.totalItems);
        setPageSize(pageObject.pageSize);
    }, [pageObject]);

    if (!pageObject) {
        return (<></>)
    }

    if (totalItems === 0) {
        return (<></>)
    }

    return (
        <div className="pagination-container">
            <Pagination current={parseInt(currentPage)} onChange={onChangePageNumber} total={parseInt(totalItems)} showSizeChanger={false} defaultPageSize={pageSize}/>
        </div>
    )
}

export default Paginationing

