'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { IPagination } from "@/types/pagination";
import { FC } from "react";

interface TablePaginationProps extends IPagination {}

const TablePagination: FC<TablePaginationProps> = ({totalPage, currentPage, itemPerPage, url, q}) => {
  const pageLinks = [];

  for (let i = 1; i < totalPage + 1; i++) {
    pageLinks.push({
      url: `${url}/${i}/${itemPerPage}` + (q && `?q=${q}`),
      page: i,
      isActive: i === currentPage
    });
  }

  return (
    <Pagination>
      <PaginationContent className="!flex-wrap">
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${url}/${currentPage - 1}/${itemPerPage}` + (q && `?q=${q}`)} />
          </PaginationItem>
        )}
        {pageLinks.map(pageLink => (
          <PaginationItem key={pageLink.url}>
            <PaginationLink href={pageLink.url} isActive={pageLink.isActive}>
              {pageLink.page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage <= totalPage && (
          <PaginationItem>
            <PaginationNext href={`${url}/${currentPage + 1}/${itemPerPage}` + (q && `?q=${q}`)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination;
